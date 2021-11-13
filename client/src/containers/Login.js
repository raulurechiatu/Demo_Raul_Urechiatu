import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
    console.log(credentials);
    const url = 'http://localhost:8000/db/test';

    fetch(url)
    .then(data => {
        data.json().then(mongoStatus => {
            return mongoStatus;
        })
    })
    .then(response => {
        console.log(response);
    })
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async event => {
//    event.preventDefault();
    const response = await loginUser({
      email,
      password
    });
    console.log(response);
    navigate('/dashboard');
  }

  return (
    <div className="Login">
      <Form>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" disabled={!validateForm()} onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
}