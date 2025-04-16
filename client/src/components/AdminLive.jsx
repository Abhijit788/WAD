import React, { useEffect, useState } from 'react'
import { getNGOEvents } from '../utils/Api.post';
import {useSelector} from 'react-redux'
import VCSS from './VCSS.jsx'; // Import the Card component
import { Row,Col } from 'react-bootstrap'
import { Admincard } from './Admincard.jsx';
export const AdminLive = () => {
    const [Data,setData] = useState([]);
    const user = useSelector((state)=>state.auth.user);
    const fetchLiveEvents=async()=>{
        const {data} = await getNGOEvents({user});
        setData(data.events);
        console.log(Data);
    }
    useEffect(()=>{
      fetchLiveEvents();
    },[])
  return (
    <>
      {Data?.map((event) => (
        <Col key={event._id} sm={12} md={6} lg={4} xl={4}> 
                       <Admincard event={event}/>
                       
         </Col>
     ))}
    </>
  )
}
