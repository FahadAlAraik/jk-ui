import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setError("يرجى تأكيد أنك لست روبوتًا"); // Arabic message: Please verify you're not a robot
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        { username, password, captchaToken },
        { withCredentials: true }
      );
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "فشل تسجيل الدخول");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-4">تسجيل الدخول</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Control
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center mb-3">
            <ReCAPTCHA
              sitekey="6Lch93ArAAAAACOKP9F5Aw7evQbVPnaiS8WdhugM" // Replace with your own site key in production
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          <Button variant="primary" type="submit" className="w-100">
            دخول
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
