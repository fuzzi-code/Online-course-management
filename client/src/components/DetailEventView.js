import React,{useState} from 'react'
import {Modal,Button,Image} from 'react-bootstrap'

function VerticallyCenteredModal(props) {
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Image src={`http://localhost:5000/${props.eventImage}`} fluid />
          {/* <h4>Date : {String(props.date).slice(0,10)} Time: {props.time}</h4> */}
          <p>
            {props.description}
          </p>
          <p>
          <h4>Source</h4>
          <a href={props.source}>
            {props.source}
          </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function DetailEventView(props) {
    
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <>
        <a href='#' onClick={() => setModalShow(true)}>
          Read more...
        </a>
  
        <VerticallyCenteredModal name={props.name}
                                  // date={props.date}
                                  // time={props.time}
                                  description={props.description}
                                  eventImage={props.eventImage}
                                  source={props.source}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
  export default DetailEventView  