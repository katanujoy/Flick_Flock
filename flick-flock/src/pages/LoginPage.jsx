import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/authcontext';
import { useApi } from '../contexts/globalendpoints';
import '../styles/LoginPage.css'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loginUser } = useApi();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      localStorage.setItem('access_token', data.access_token);
      login(data.user);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid credentials',
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h3 className="text-center mb-4">Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </Card>
    </Container>
  );
}

export default LoginPage;
