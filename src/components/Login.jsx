import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap/';
import { GetLoggedInUser, login } from '../services/DataService';

const Login = () => {

    let navigate = useNavigate();

    //useStates
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUser = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleSubmit = async () => {
        let userData = {
            Username: username,
            Password: password
        }

        let token = await login(userData);
        console.log(userData);

        if(token.token != null){
            localStorage.setItem("Token", token.token);
            GetLoggedInUser(username);
            navigate("/Dashboard");
        }
    }

  return (
    <div>
      <Form style={{width: "40", marginLeft: "33%", marginTop: "10%", backgroundColor: "lightseagreen", borderRadius: 5, padding: 80}}>
      <h1 className='text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={handleUser}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
      </Form.Group>
      
      <Button variant="outline-primary" onClick={handleSubmit}>
        Submit
      </Button>
      <p className='mt-3'>Don't have an account?</p>
      <Button variant="outline-primary" onClick={() => navigate("/CreateAccount")}>
        Create Account
      </Button>
    </Form>
    </div>
  )
}

export default Login
