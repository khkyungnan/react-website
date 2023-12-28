import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  const imageUrl = 'https://via.placeholder.com/300';
  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={imageUrl}
              alt="About Us"
              className="img-fluid"
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>About Us</Card.Title>
              <Card.Text>리액트 홈페이지에 오신걸 환영합니다.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
