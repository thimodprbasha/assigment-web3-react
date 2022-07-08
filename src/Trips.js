import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

const content_center = {
  display: "flex",
  justifyContent: "end",
};

const chageColorRow = (condtion) => {
  return condtion.usertype === "Subscriber"
    ? { backgroundColor: "#e4f2df" }
    : { backgroundColor: "#f2f2f2" };
};

function Trips() {
  const navigate = useNavigate();
  var perPage = 15;
  const [tripsData, setTripsData] = useState(null);
  const [page, setPage] = useState(1);

  const onNext = () => {
    setPage(page + 1);
  };

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    const response = fetch(
      `https://web422-app-assignment-1.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`
    );
    response
      .then((res) => res.json())
      .then((trips) => {
        setTripsData(trips.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>Trips</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <div className="col" style={content_center}>
                <Button style={{ margin: "5px" }} variant="success">
                  Subscribers
                </Button>
                <Button style={{ margin: "5px" }} variant="secondary">
                  Customer
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} className="pt-4">
          {tripsData && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>BikeID</th>
                  <th>Start Station</th>
                  <th>End Station</th>
                  <th>Duration (Minutes)</th>
                </tr>
              </thead>
              <tbody>
                {tripsData.map((trip) => (
                  <tr
                    style={chageColorRow(trip)}
                    onClick={() => {
                      navigate(`/trip/${trip._id}`);
                    }}
                  >
                    <td>{trip.bikeid}</td>
                    <td>{trip["start station name"]}</td>
                    <td>{trip["end station name"]}</td>
                    <td>{trip.tripduration}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                onPrev();
              }}
            />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                onNext();
              }}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default Trips;
