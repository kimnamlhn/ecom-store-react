import React from 'react'

const Register = () => {
  return (
    <div>
      <h3>Register New User</h3>

      <form action="/register" method="post" className="col-lg-7">
          <div className="form-group" data-validation-summary="displayName,email,password,confirmPassword"></div>

          <div className="form-group">
              <input className="form-control form-control-lg" name="displayName" type="text" placeholder="Display Name"/>
          </div>
          <div className="form-group">
              <input className="form-control form-control-lg" name="email" type="text" placeholder="Email"/>
          </div>
          <div className="form-group">
              <input className="form-control form-control-lg" name="password" type="password" placeholder="Password"/>
          </div>
          <div className="form-group">
              <input className="form-control form-control-lg" name="confirmPassword" type="password" placeholder="Confirm Password"/>
          </div>
          <div className="form-group">
              <button className="btn btn-lg btn-primary" type="submit">Register</button>
          </div>
      </form>

    </div>
  )
}

export default Register
