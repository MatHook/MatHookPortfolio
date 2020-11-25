import { useState, useEffect } from "react";
import axios from "axios";
import { CodeBlock, monoBlue } from "react-code-blocks";
import { Row, Container } from "react-bootstrap";

const PracPage = () => {
  const [tasks, setTasks] = useState([]);
  const [path, setPath] = useState("Arrays");

  //TODO: make options to choose directory
  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/MatHook/FDT/contents/${path}`)
      .then(({ data }) => {
        data.forEach((item) => {
          console.log(item);
          if (
            (item.type === "file" && item.name.includes(".ts")) ||
            item.name.includes(".js")
          )
            axios
              .get(item.download_url)
              .then((res) => {
                setTasks((tasks) => [...tasks, res]);
              })
              .catch((err) => {
                console.error(err);
              });
        });
      });
  }, [path]);

  const changePath = (newPath) => {
    setTasks([]);
    setPath(newPath);
  };

  return (
    <Container>
      <Row className="p-0 justify-content-around">
        <h1>Practice Page</h1>
        <h1>{path}</h1>
      </Row>
      <Row className="p-0 justify-content-around">
        <button onClick={() => changePath("Arrays")}>Arrays</button>
        <button onClick={() => changePath("MathNums")}>MathNums</button>
        <button onClick={() => changePath("Strings")}>Strings</button>
        <button onClick={() => changePath("YndTest")}>Yandex Test</button>
        <button onClick={() => changePath("Interviews")}>Interviews</button>
      </Row>
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
