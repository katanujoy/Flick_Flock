import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { useApi } from "../contexts/globalendpoints";

const HomePage = () => {
  const { getMovies } = useApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div style={{ backgroundColor: "#000", color: "#fff" }}>
      {/* Hero Section */}
      <div 
        className="text-center py-5"
        style={{
          backgroundImage: "radial-gradient(ellipse at top, rgba(229, 9, 20, 0.15) 0%, transparent 60%)",
          padding: "4rem 0"
        }}
      >
        <Container>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "600",
            letterSpacing: "0.5px",
            color: "#e50914",
            marginBottom: "1rem"
          }}>
            🎬 Welcome to FlickFlock
          </h1>
          <p style={{
            color: "#999",
            fontSize: "1.2rem",
            marginBottom: "2rem"
          }}>
            Your ultimate movie club experience. Stream, review, and connect with fellow film lovers.
          </p>
          <Button 
            variant="danger" 
            size="lg"
            style={{
              backgroundColor: "#e50914",
              border: "none",
              padding: "12px 24px",
              fontWeight: "600",
              letterSpacing: "0.5px"
            }}
          >
            Explore Now
          </Button>
        </Container>
      </div>

      {/* Movie Slideshow */}
      <Container className="my-5">
        <h2 
          className="mb-4 text-center"
          style={{
            color: "#fff",
            fontWeight: "600",
            letterSpacing: "0.5px"
          }}
        >
          Now Trending
        </h2>
        {movies.length > 0 ? (
          <Carousel>
            {movies.slice(0, 6).map((movie) => (
              <Carousel.Item key={movie.id}>
                <div className="d-flex justify-content-center">
                  <img
                    src={movie.poster_url}
                    className="d-block w-75 rounded shadow"
                    alt={movie.title}
                    style={{ 
                      maxHeight: "500px", 
                      objectFit: "cover",
                      border: "1px solid #333"
                    }}
                  />
                </div>
                <Carousel.Caption style={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  padding: "1.5rem",
                  borderRadius: "4px",
                  left: "12.5%",
                  right: "12.5%",
                  bottom: "20px"
                }}>
                  <h3 style={{ color: "#e50914" }}>{movie.title}</h3>
                  <p style={{ color: "#ddd" }}>
                    <strong style={{ color: "#fff" }}>Genre:</strong> {movie.genre} |{" "}
                    <strong style={{ color: "#fff" }}>Year:</strong> {movie.release_year}
                  </p>
                  <p style={{ color: "#ddd" }}>{movie.description?.slice(0, 150)}...</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p className="text-center" style={{ color: "#999" }}>Loading movies...</p>
        )}
      </Container>

      {/* About Section */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="/movie-bg.jpg"
              alt="FlickFlock Experience"
              className="img-fluid rounded shadow"
              style={{ border: "1px solid #333" }}
            />
          </Col>
          <Col md={6}>
            <h2 style={{ 
              color: "#fff",
              fontWeight: "600",
              marginBottom: "1.5rem"
            }}>
              What is FlickFlock?
            </h2>
            <p style={{ 
              color: "#ddd",
              lineHeight: "1.6",
              marginBottom: "2rem"
            }}>
              FlickFlock is a modern social platform for movie lovers. Create clubs, join discussions, follow users, and
              recommend your favorite movies. Whether you're a casual viewer or a serious critic, FlickFlock connects you
              with people who share your passion for cinema.
            </p>
            <Button 
              variant="outline-danger"
              style={{
                color: "#e50914",
                borderColor: "#e50914",
                fontWeight: "600",
                padding: "10px 20px"
              }}
            >
              Join the Community
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;