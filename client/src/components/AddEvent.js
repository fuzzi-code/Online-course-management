import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {Form,Button,Card,Container,InputGroup,FormControl} from "react-bootstrap"
import DateSelect from './utils/DatePicker'

function AddEvent() {

    const [input,setInput]=useState(
        {
            name:'',
            // date:'',
            // time:'',
            description:'',
            eventImage:'',
            source:''
        }
    )
    const handleChange=(event)=>{
        const {name,value}=event.target
        setInput(prevInput=>{
          return{
            ...prevInput,
            [name]:value
          }
        })
      }

    const handleEventImage=(event)=>{
        setInput(prevInput=>{
          return{
            ...prevInput,
            eventImage:event.target.files[0]
          }
        })        
    }
      const handleClickEvent=(event)=>{
        event.preventDefault()
        const formData = new FormData();
        formData.append('name', input.name);
        // formData.append('date', input.date);
        // formData.append('time', input.time);
        formData.append('description',input.description);
        formData.append("eventImage",input.eventImage);
        formData.append("source",input.source)
      
        axios.post('http://localhost:5000/add-course',formData)
        .then(res=>console.log(res))
        .catch(err=>console.log(err)) 
        setInput({
            name:'',
            // date:'',
            //time:'',
            description:'',
            eventImage:'',
            source:''
        })
    }
    return (
       <Container>
        <br/>
        <Card>
        <Card.Title>Add Course</Card.Title>
        <Card.Body>
        <Form encType='multipart/form-data'>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Course Image</Form.Label>
                <Form.Control type="file" 
                eventImage="eventImage"
                accept=".png, .jpg, .jpeg, .webp"
                className="form-control-file" 
                onChange={handleEventImage}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" row={1}
                name="name"
                value={input.name}
                onChange={handleChange}/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="date">
                <Form.Label>Event Date</Form.Label>
                <DateSelect name="date" value={input.date}
                onChange={handleChange}/> */}
                {/* </Form.Control> */}
            {/* </Form.Group>
            <Form.Group className="mb-3" controlId="time">
                <Form.Label>Event Time</Form.Label>
                <Form.Control  type="text"row={1}
                name="time"
                value={input.time}
                onChange={handleChange}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Course Description</Form.Label>
                <Form.Control as="textarea" rows={3} 
                name="description"
                value={input.description}
                onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="source">
                <Form.Label>Source</Form.Label>
                <Form.Control as="textarea" rows={1} 
                name="source"
                value={input.source}
                onChange={handleChange}/>
            </Form.Group>
            <Button onClick={handleClickEvent}
                type="submit"
            >Submit</Button>
        </Form>
        </Card.Body>
        </Card>
        </Container>
    )
}

export default AddEvent
