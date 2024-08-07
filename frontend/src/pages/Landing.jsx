import React from "react";
import Logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg"
import { Container, Col, Row } from "react-bootstrap";
import '../assets/css/landing.css';
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Container>
        <nav>
         <img src={Logo} alt="logo" width="160" height='50'></img>
        </nav>
      

      <Row className="landing-row">

        <Col className="info d-xs-flex justify-content-center align-items-center" xs={12} lg={7}>
        <h1 style={{fontWeight: '700', fontSize: '4rem'}}>
          Track <span>Job</span> Applications
        </h1>
        <p>
          Our job tracking application simplifies your workflow by enabling
          seamless task assignment, real-time progress tracking, and effective
          deadline management. With integrated communication tools for enhanced
          collaboration and detailed performance reporting, it keeps you
          organized and productive. 
        </p>

        <button style={{backgroundColor: 'var(--primary-500)', color: 'white', marginRight: '2rem'}} className="btn mr-4" onClick={()=>navigate('/register')}>Register</button>
        <button style={{backgroundColor: 'var(--primary-500)', color: 'white'}} className="btn" onClick={()=>navigate('/register')}>Login / Test the App</button>

        </Col>

        <Col>
        <img src={main} alt="landing-img" className="img d-none d-lg-block"></img>
        </Col>
        
      </Row>


    </Container>
  );
};

export default Landing;
