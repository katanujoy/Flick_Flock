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
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5">
        <h1 className="display-4 fw-bold">🎬 Welcome to FlickFlock</h1>
        <p className="lead">Your ultimate movie club experience. Stream, review, and connect with fellow film lovers.</p>
        <Button variant="warning" size="lg">Explore Now</Button>
      </div>

      {/* Movie Slideshow */}
      <Container className="my-5">
        <h2 className="mb-4 text-center">Now Trending</h2>
        {movies.length > 0 ? (
          <Carousel>
            {movies.slice(0, 6).map((movie) => (
              <Carousel.Item key={movie.id}>
                <div className="d-flex justify-content-center">
                  <img
                    src={movie.poster_url}
                    className="d-block w-75 rounded shadow"
                    alt={movie.title}
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
                <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
                  <h3>{movie.title}</h3>
                  <p><strong>Genre:</strong> {movie.genre} | <strong>Year:</strong> {movie.release_year}</p>
                  <p>{movie.description?.slice(0, 150)}...</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p className="text-center">Loading movies...</p>
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
            />
          </Col>
          <Col md={6}>
            <h2>What is FlickFlock?</h2>
            <p>
              FlickFlock is a modern social platform for movie lovers. Create clubs, join discussions, follow users, and
              recommend your favorite movies. Whether you're a casual viewer or a serious critic, FlickFlock connects you
              with people who share your passion for cinema.
            </p>
            <Button variant="outline-primary">Join the Community</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
