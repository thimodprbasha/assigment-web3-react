import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Tooltip, Marker } from "react-leaflet";
function Trip() {
  const { id } = useParams();
  const [tripData, setTripData] = useState(null);

  var startCordinate = [];
  var endCordinate = [];

  const styles = {
    center: {
      display: "flex",
      justifyContentCenter: "center",
    },
    card: {
      backgroundColor: "#f2f2f2",
    },

    flexLeft: {
      display: "flex",
      justifyContent: "end",
    },
  };

  useEffect(() => {
    const response = fetch(
      `https://web422-app-assignment-1.herokuapp.com/api/trips/${id}`
    );
    response
      .then((res) => res.json())
      .then((trip) => {
        setTripData(trip.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container>
      {tripData && (
        <Row>
          <Col md={12}>
            <Card style={{ width: "100%" }}>
              <Card.Body style={styles.card}>
                <Card.Title>
                  Bike : {tripData.bikeid} ({tripData.usertype})
                </Card.Title>
                <Card.Text>
                  {tripData["start station name"]} -{" "}
                  {tripData["end station name"]}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <MapContainer
              style={{ height: "400px", margin: "10px" }}
              center={[
                tripData["start station location"]["coordinates"][1],
                tripData["start station location"]["coordinates"][0],
              ]}
              zoom={15}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  tripData["start station location"]["coordinates"][1],
                  tripData["start station location"]["coordinates"][0],
                ]}
              >
                <Tooltip permanent direction="right">
                  Start:{tripData["start station name"]}
                </Tooltip>
              </Marker>
              <Marker
                position={[
                  tripData["end station location"]["coordinates"][1],
                  tripData["end station location"]["coordinates"][0],
                ]}
              >
                <Tooltip permanent direction="right">
                  End: {tripData["end station name"]}
                </Tooltip>
              </Marker>
            </MapContainer>
          </Col>
          <Col md={12} className="pt-4">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bike ID</Form.Label>
                <Form.Control type="text" value={tripData.bikeid} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Birth Year</Form.Label>
                <Form.Control type="text" value={tripData["birth year"]} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Subscriber"
                  checked={tripData.usertype === "Subscriber"}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Customer"
                  checked={tripData.usertype === "Customer"}
                />
              </Form.Group>
              <Col style={styles.flexLeft}>
                <Button variant="primary" type="submit">
                  Upload
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Trip;
