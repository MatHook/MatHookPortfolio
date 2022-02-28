import { useState, useEffect } from "react";
import axios from "axios";
import { CodeBlock, monoBlue } from "react-code-blocks";
import { Row, Container } from "react-bootstrap";

const PracPage = () => {
  const [tasks, setTasks] = useState({});
  const [path, setPath] = useState("Arrays");

  useEffect(() => {
    (!tasks[path] || !tasks[path]?.length) && axios
      .get(`https://api.github.com/repos/MatHook/FDT/contents/${path}`)
      .then(({ data }) => {
        data.forEach((item) => {
          if (
            (item.type === "file" && item.name.includes(".ts")) ||
            item.name.includes(".js")
          )
            axios
              .get(item.download_url)
              .then(res => {
                setTasks(prev => ({
                  [path]: [
                    ...(prev[path] || []),
                    res.data
                  ]
                }));
              })
              .catch((err) => {
                console.error(err);
              });
        });
      });
  }, [path]);

  const values = ['Arrays', 'MathNums', 'Strings', 'YndTest', 'Interviews']

  const items = tasks[path] ? tasks[path] : []

  return (
    <Container>
      <Row className="p-0 justify-content-around">
        <h1>Practice Page</h1>
        <h1>{path}</h1>
      </Row>
      <Row className="p-0 justify-content-around">
        {values.map((p, i) => (
          <button
            key={i}
            onClick={() => setPath(p)}
          >
            {p}
          </button>))
        }
      </Row>
      {items.map((item, key) => (
        <Row key={key}>
          <div className="w-100 p-3">
            <span>{key + 1} Task</span>
            <CodeBlock
              text={item}
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
