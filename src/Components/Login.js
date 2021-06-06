import React from 'react';

import { loginUrl } from '../spotify';
import logo from '../Images/Oscarify.png';

import '../Styles/Login.css';

function Login() {
  return (
    <div className="login">
      <img src={logo} alt="Spotify Logo"></img>
      <a href={loginUrl}>Sign in with Spotify</a>
    </div>
  );
}

export default Login