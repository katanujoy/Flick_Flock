import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light py-3 mt-auto"
      style={{
        borderTop: "1px solid #444",
        fontFamily: "monospace",
        backgroundImage: "linear-gradient(to right, #111, #222)",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <small>&copy; 2025 <strong>FlickFlock</strong>. All rights reserved.</small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <small>
              🎬 Watch. Rate. Follow.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
