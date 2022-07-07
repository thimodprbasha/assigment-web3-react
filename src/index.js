import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trip from "./Trip";
import Trips from "./Trips";
import About from "./About";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    {/* <Container>
      <Row>
        <Col>
          <Routes>
            <Route exact path="/" element={<About />} />
            <Route exact path="/trips" element={<Trips />} />
          </Routes>
        </Col>
      </Row>
    </Container>
    <br />
    <br /> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
