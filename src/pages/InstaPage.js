import { useEffect, useState } from "react";
import { fetchInstagramPosts } from "../services/insta";
import { Row, Col, Container } from "react-bootstrap";

const InstaPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchInstagramPosts("https://www.instagram.com/koohtam").then((items) => {
      if (mounted) {
        setPhotos(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <Container fluid={true}>
      <h1 className="text-center font-weight-bolder">
        Welcome to my Insta Feed
      </h1>
      <Row>
        {photos.map((item, key) => (
          <Col
            style={{ flexGrow: "unset" }}
            className="d-flex flex-column justify-content-center flex-wrap"
          >
            <a
              href={item.url}
              key={key}
              className="instagram-photo d-flex flex-column justify-content-center  flex-wrap"
            >
              <img
                src={item.displayUrl}
                alt="Caption"
                style={{ width: 400, height: 400 }}
              />
              <span className="text-dark">{item.caption}</span>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InstaPage;
