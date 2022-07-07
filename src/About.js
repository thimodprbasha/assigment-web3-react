import "./App.css";

import { Card , Container } from "react-bootstrap";

function About() {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default About;
