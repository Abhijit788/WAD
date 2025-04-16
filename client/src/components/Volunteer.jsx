import React from 'react'
import Navbar from "./Navbar.jsx"
import { useEffect ,useState} from 'react'
import {V} from './V'
import VCSS from './VCSS.jsx'; // Import the Card component
import { Row,Col } from 'react-bootstrap'
import { getEvents } from '../utils/Api.post';
export const Volunteer = () => {
  const [dummy, setDummy] = useState([]);
  const fetchEvents = async()=>{
    const {data} = await getEvents();
    setDummy(data.events);
  }
  useEffect(()=>{
    fetchEvents();
  },[]);
  
  return (
    <>
    <Navbar/>
    <h1>
    <Row>
      {dummy.map((event) => (
        
         <Col key={event._id} sm={12} md={6} lg={4} xl={4}> 
                        <VCSS event={event}/>
                        
          </Col>
      ))}
    </Row>
    </h1>
    </>
    
  )
}
