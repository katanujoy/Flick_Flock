import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem 0",
        fontFamily: "'Arial', sans-serif",
        backgroundImage: "radial-gradient(ellipse at top, rgba(229, 9, 20, 0.1) 0%, transparent 60%)"
      }}
    >
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            <h1 className="text-center" style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              letterSpacing: "0.5px",
              color: "#e50914",
              marginBottom: "1rem"
            }}>
              🎬 About FlickFlock
            </h1>
            <p className="text-center" style={{
              color: "#999",
              fontSize: "1.1rem",
              marginBottom: "2rem"
            }}>
              Your ultimate destination to discover, share, and connect over movies.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10}>
            <Card
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                border: "1px solid #333",
                borderRadius: "8px",
                overflow: "hidden"
              }}
            >
              <Card.Body style={{ 
                padding: "2rem",
                backgroundImage: "url('/cinema1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
                <div style={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  padding: "2rem",
                  borderRadius: "4px"
                }}>
                  <Card.Text style={{ color: "#fff", lineHeight: "1.6" }}>
                    <p style={{ marginBottom: "1.5rem" }}>
                      <strong style={{ color: "#e50914" }}>FlickFlock</strong> is a movie-centered social platform where cinephiles can track what
                      they're watching, follow other movie lovers, and share opinions through reviews and discussions.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                      Whether you're into cult classics, mainstream blockbusters, or indie treasures, FlickFlock helps you
                      find your next favorite film — and the people who love it just as much as you do.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                      Our mission is to bring the movie community together in one immersive, interactive space. Create
                      watchlists, follow friends, recommend films, and never lose track of what to watch next!
                    </p>
                    <p style={{ marginBottom: "0" }}>
                      Built for movie fans. Inspired by cinema. Powered by community. 🎥🍿
                    </p>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;