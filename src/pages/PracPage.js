import { useState, useEffect } from "react";
import axios from "axios";
import { CodeBlock, monoBlue } from "react-code-blocks";
import { Row, Col, Container } from "react-bootstrap";

const PracPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/MatHook/FDT/contents/YndTest")
      .then(({ data }) => {
        data.forEach((item) => {
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
  }, []);

  return (
    <Container>
      <div>Prac Page</div>
      <Row>
        {tasks.map((item, key) => (
          <Col>
            <CodeBlock
              text={item.data}
              language={"javascript"}
              theme={monoBlue}
              showLineNumbers={true}
              key={tasks.indexOf(key)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default PracPage;
