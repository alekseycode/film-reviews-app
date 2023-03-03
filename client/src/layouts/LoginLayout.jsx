import '../stylesheets/loginLayout.css'
import {Link} from 'react-router-dom'

export const LoginLayout = () => {
  return (  
    <div class="wrapper">
    <div class="log-in-form">
      <div class="username-div">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div class="password-div">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div class="submit-div">
          <Link to="/register">Create new account</Link>   
        <button type="submit">Log in</button>
      </div>
    </div>
  </div>
  
  );
}