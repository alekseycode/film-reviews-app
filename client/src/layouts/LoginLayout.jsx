import '../stylesheets/loginLayout.css'
import { Link, Form, redirect, useActionData } from 'react-router-dom'
import {API_URL} from '../constants'
import axios from 'axios';

export default function LoginLayout() {
  const errorData = useActionData();

  return (  
    <div className="wrapper">
     {errorData && <div className="error">{errorData}</div>} 
    <Form className="log-in-form" method="post" action="/login">
      <div className="username-div">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div className="password-div">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
        <div className="submit-div">
          <Link to="/passwordReset">Forgot Password</Link> 
          <Link to="/register">Sign up</Link> 
        <button type="submit">Log in</button>
      </div>
    </Form>
  </div>
  
  );
}

export const loginAction = async ({request}) => {

  const data = await request.formData()
  

  const submission = {
    username: data.get('username'),
    password: data.get('password')
  }

  const auth = await axios.post(`${API_URL}/auth/login`, submission, {
    withCredentials: true
  });

  if (auth.data.error) {
      return auth.data.error;
  }

  return redirect('/')
}