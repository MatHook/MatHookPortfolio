import { useState, useEffect } from "react";
import axios from "axios";
import { CodeBlock, monoBlue } from "react-code-blocks";
import { Row, Container } from "react-bootstrap";

const PracPage = () => {
  const [tasks, setTasks] = useState([]);

  //TODO: make options to choose directory
  useEffect(() => {
    axios
      .get("https://api.github.com/repos/MatHook/FDT/contents/Arrays")
      .then(({ data }) => {
        data.forEach((item) => {
          if (item.type === "file")
            axios
              .get(item.download_url)
              .then((res) => {
                console.log(data);
                setTasks((tasks) => [...tasks, res]);
              })
              .catch((err) => {
                console.error(err);
              });
        });
      });
  }, []);

  return (
    <Container>
      <h1>Prac Page</h1>
      {tasks.map((item, key) => (
        <Row key={key}>
          <div className="w-100 p-3">
            <span>{key + 1} Task</span>
            <CodeBlock
              text={item.data}
              language={"javascript"}
              theme={monoBlue}
              showLineNumbers={true}
              codeBlock={true}
            />
          </div>
        </Row>
      ))}
    </Container>
  );
};
export default PracPage;
