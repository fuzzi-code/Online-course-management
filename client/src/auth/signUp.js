import React,{useState} from 'react'
import {Container,Form,Button,Card,InputGroup,FormControl,Alert} from 'react-bootstrap'
import './auth.css'
import Login from './login'
import axios from 'axios'
import AddEvent from '../components/AddEvent'
import LandingPage from '../components/landingPage'

function SignUp({history}) {
    const styles={
        main:{
            paddingTop:'80px',
            fontSize:'20px',
            },
        card:{
            width:'40rem',
            justifyContent:'center',
            alignItems:'center',
            borderColor:'aquamarine'
        },
        title:{
            alignSelf:'center',
            paddingTop:'10px',
            text:{
                fontSize:'30px'
            }
        }                
    }
    const [signedUp,setsignUp]=useState(false)
    const [errorMessage,setErrorMessage]=useState('')
    
    const [input,setInput]=useState({
        name:'',
        email:'',
        password:'',
        passwordVerify:''
      })

    const handleChange=(event)=>{
        const {name,value}=event.target
        setInput(prevInput=>{
          return{
            ...prevInput,
            [name]:value
          }
        })
      }

      const handleClickEvent=async (event)=>{
        event.preventDefault()

        const config={
            header:{
                "Content-Type":"application/json"
            }
        }

        const newUser={
          name:input.name,
          email:input.email,
          password:input.password,
          passwordVerify:input.passwordVerify
        }
        
    
    axios.post('http://localhost:5000/auth/register',newUser)
       .then(res=>{
           if (!res.data.error){
               setsignUp(true)
           }else{
                setErrorMessage(res.data.error)
           }
       })
                         
        setInput({
          name:'',
          email:'',
          password:'',
          passwordVerify:''
        })
        
      }

    const [login, setlogin] = useState(false)
    const loginHandler=()=>{
        setlogin(!login)
    }

    if(login){
        return(
            <Login/>
        )
    }
    return (
        signedUp?<Login/>
        :
            <div style={styles.main}>
            <Container>
            <Card style={styles.card}>
            <div style={styles.title}><Card.Title style={styles.title.text}>Sign Up</Card.Title></div>
            <Card.Body>
            {errorMessage?<Alert variant="danger">{errorMessage}</Alert>:null}
                <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control type="text" name="name" value={input.name} placeholder="Enter name" onChange={handleChange} />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={input.email} type="email" placeholder="Enter email" onChange={handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={input.password} placeholder="Password" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="passwordVerify" value={input.passwordVerify} placeholder="Confirm Password" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" onClick={handleClickEvent}>
                    Sign Up
                </Button>
                <Card.Footer>
                <Form.Text className="text-muted">
                    Already have an account?<a href='#' onClick={loginHandler}> Login </a> here.
                    </Form.Text>
                    </Card.Footer>
                </Form>
                </Card.Body>  
                </Card>
            </Container>
            </div>
        )
    }
    


export default SignUp
