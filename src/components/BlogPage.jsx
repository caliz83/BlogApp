import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BlogPage = () => {
  const [blogItems, setBlogItems] = useState([]);

  return (
    <Container>
      <Row>
        <Col>
          {blogItems.map((item, i) => (
            <div key={item.Id}>
              {i % 2 == 0 ? (
                <Row key={item.Id}>
                  <Col md={6}>
                    <Row>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                      >
                        Title
                      </Col>
                      <Col style={{ border: "solid" }} md={12}>
                        <Row>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={6}
                          >
                            Publisher Name
                          </Col>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={6}
                          >
                            Date
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                      >
                        Image
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    style={{ border: "solid" }}
                    className="d-flex justify-content-center"
                    md={6}
                  >
                    Description
                  </Col>
                </Row>
              ) : (
                <Row key={item.Id}>
                  <Col
                    style={{ border: "solid" }}
                    className="d-flex justify-content-center"
                    md={6}
                  >
                    Description
                  </Col>
                  <Col style={{ border: "solid" }} md={6}>
                    <Row style={{ border: "solid" }}>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                      >
                        Title
                      </Col>
                      <Col style={{ border: "solid" }} md={12}>
                        <Row>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={6}
                          >
                            Publisher Name
                          </Col>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={6}
                          >
                            Date
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Col
                      style={{ border: "solid" }}
                      className="d-flex justify-content-center"
                      md={12}
                    >
                      Image
                    </Col>
                  </Col>
                </Row>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPage;
