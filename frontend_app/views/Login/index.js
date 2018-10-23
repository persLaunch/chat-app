
import LoginForm from './components/LoginForm'
import React from 'react'

export default function Login() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 col-md-offset-3 col-lg-offset-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
