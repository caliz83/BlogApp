import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { sendUserData } from '../services/DataService';

const CreateAccount = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUser = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleSubmit = () => {
        let userData = {
            Id: 0,
            Username: username,
            Password: password
        }
        console.log(userData);
        //CreateAccount(userData); 
        sendUserData(AddUsers, createdUser); //creating the account
    }


  return (
    <div>
      <Form style={{width: "40", marginLeft: "33%", marginTop: "10%", backgroundColor: "lightseagreen", borderRadius: 5, padding: 80}}>
      <h1 className='text-center'>Create Account</h1>
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
    </Form>
    </div>
  )
}

export default CreateAccount
