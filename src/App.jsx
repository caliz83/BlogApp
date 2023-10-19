import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import BlogPage from "./components/BlogPage";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Homosteading Blog</h1>
          </Col>
          <Navbar>
            <Routes>
              <Route path="/" element={<BlogPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/CreateAccount" element={<CreateAccount />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </Navbar>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
