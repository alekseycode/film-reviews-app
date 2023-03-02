import '../stylesheets/loginLayout.css'

export const LoginLayout = () => {
  return (  
      <div className="wrapper">
          <div className="log-in-form">
              <div className="username-div">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"/>
              </div>
              <div className="password-div">
                <label htmlFor="username">Password</label>
                <input type="text" name="password" id="password" />
              </div>
          </div>
     </div>
  );
}