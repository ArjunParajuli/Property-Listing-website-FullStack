import React from "react";
import Logo from "../assets/images/logo.svg";
import main from "../assets/images/landing.png"
import { Container, Col, Row } from "react-bootstrap";
import '../assets/css/landing.css';
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Container className="landing-body">
        <nav>
         <img src={Logo} alt="logo" width="160" height='50'></img>
        </nav>
      

      <Row className="landing-row">

        <Col className="info d-xs-flex justify-content-center align-items-center" xs={12} lg={7}>
        <h1 style={{ fontWeight: '700', fontSize: '4rem' }}>
            Find Your <span>Dream Home</span>
          </h1>
          <p>
            Explore our extensive listings to find the perfect property to rent or buy. 
            Whether you're searching for a cozy apartment or a spacious house, our platform 
            offers a seamless experience with detailed property descriptions, virtual tours, 
            and real-time availability updates. Start your journey towards your next home today.
          </p>

        <button style={{backgroundColor: 'var(--primary-500)', color: 'white', marginRight: '2rem'}} className="btn1 mr-4 bg-[#F26419]" onClick={()=>navigate('/register')}>Register</button>
        <button style={{backgroundColor: 'var(--primary-500)', color: 'white'}} className="btn1" onClick={()=>navigate('/register')}>Login / Test the App</button>

        </Col>

        <Col>
        <img src={main} alt="landing-img" className="img d-none d-lg-block"></img>
        </Col>
        
      </Row>


    </Container>
  );
};

export default Landing;



