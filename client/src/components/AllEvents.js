import React,{useEffect,useState} from 'react'
import {Card,Button,Container,Row,Col,Modal} from 'react-bootstrap'
import axios from 'axios'
import './AllEvents.css'
import DetailEventView from './DetailEventView'


function AllEvents() {
    const [allEvents,setAllEvents]=useState([])
    
    useEffect(async () => {
        axios.get("http://localhost:5000/")
        .then(res=>setAllEvents(res.data))
        .catch((err)=>console.log("error occured!!!"))
    }, [])
        
    return (
        <div>
        <br/>
        <Container>
        <Row xs={1} md={3} className="g-4">
        {allEvents.map((e)=>{
            
            return(
            <Col>
            <Card className='cardEvent'>
            <Card.Img variant="top" src={`http://localhost:5000/${e.courseImage}`}/>
            <Card.Body>
                <Card.Title>{e.courseName}</Card.Title>
                <Card.Text>
                <DetailEventView id={e._id} 
                                name={e.courseName}
                                description={e.courseDescription}
                                eventImage={e.courseImage}
                                source={e.courseUrl}
                    />
                {/* <a id={e._id} href="#" onClick={(id)=>getDetails(id)}>Read more...</a> */}
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>)
        })
        }
        </Row>
        </Container>      
        </div>
    )
}

export default AllEvents
