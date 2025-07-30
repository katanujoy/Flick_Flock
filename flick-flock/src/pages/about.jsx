import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#f5f5f5",
        minHeight: "100vh",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            <h1 className="text-center display-4 fw-bold text-warning">🎬 About FlickFlock</h1>
            <p className="lead text-center text-muted">
              Your ultimate destination to discover, share, and connect over movies.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10}>
            <Card
              bg="dark"
              text="light"
              className="shadow-lg border-0"
              style={{ backgroundImage: "url('/cinema1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <Card.Body style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", padding: "2rem" }}>
                <Card.Text>
                  <p>
                    <strong>FlickFlock</strong> is a movie-centered social platform where cinephiles can track what
                    they’re watching, follow other movie lovers, and share opinions through reviews and discussions.
                  </p>
                  <p>
                    Whether you're into cult classics, mainstream blockbusters, or indie treasures, FlickFlock helps you
                    find your next favorite film — and the people who love it just as much as you do.
                  </p>
                  <p>
                    Our mission is to bring the movie community together in one immersive, interactive space. Create
                    watchlists, follow friends, recommend films, and never lose track of what to watch next!
                  </p>
                  <p>
                    Built for movie fans. Inspired by cinema. Powered by community. 🎥🍿
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;