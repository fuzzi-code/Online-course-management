import React,{useState} from 'react'
import {Container,Form,Button,Card, Alert} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import './auth.css'
import SignUp from './signUp'
import axios from 'axios'
import AddEvent from '../components/AddEvent'
import LandingPage from '../components/landingPage'
function Login() {
    const styles={
        main:{
            paddingTop:'150px',
            fontSize:'20px',
            alignItems:'center',
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
    const [signUp, setsignUp] = useState(false)
    const [loggedIn,setLoggedIn]=useState(false)
    const [errorMessage,setErrorMessage]=useState('')
    const signUpHandler=()=>{
        setsignUp(!signUp)
    }
    const [input,setInput]=useState({
        email:'',
        password:''
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
    const loginHandler=async (event)=>{
        event.preventDefault()
        const user={
            email:input.email,
            password:input.password
        }
        await axios.post('http://localhost:5000/auth/login',user)
        .then(res=>{
            if (!res.data.error){
                setLoggedIn(true)
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
    if(signUp){
        return(
            <SignUp/>
        )
    }
    console.log(loggedIn)
    return (
        loggedIn?<AddEvent/>
        :<div style={styles.main} className='background'>
        <Container>
        <Card style={styles.card}>
        <div style={styles.title}><Card.Title style={styles.title.text}>Login</Card.Title></div>
        <Card.Body>
        {errorMessage?<Alert variant='danger'>{errorMessage}</Alert>:null}
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" value={input.email} onChange={handleChange} placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={input.password} onChange={handleChange} placeholder="Password" />            </Form.Group>
            <Button variant="primary" type="submit" onClick={loginHandler}>
                Login
            </Button>
            <Card.Footer>
            <Form.Text className="text-muted">
                Do not have an account?<a href='#' onClick={signUpHandler}> Sign up</a> here.
                </Form.Text>
                </Card.Footer>
            </Form>
            </Card.Body>  
            </Card>
        </Container>
        </div>
    )
}

export default Login
