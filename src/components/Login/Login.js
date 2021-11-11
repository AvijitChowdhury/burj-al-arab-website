
import React, { useContext } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { UserContext } from './../../App';
import { useHistory,useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import "./Login.css";


const Login = () =>{
  const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
  const history  = useHistory();
  const location = useLocation();
  const   { from } = location.state || { from: { pathname: "/" } };

  initializeApp(firebaseConfig);
  

  const handleGoogleSignIn = ()=>{
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        
        const user = result.user;
        const {displayName,email} = user;
        const signInUser = {
         name: displayName,email,
        }
        setLoggedInUser(signInUser);
        history.replace(from);
        console.log(signInUser);
        // ...
      }).catch((error) => {
   
        const errorMessage = error.message;
     
        console.log(errorMessage);
        // ...
      });

  }
  return (
    <div className="loginform">
      
      <p>
        This is login form
      </p>
     
      <Button variant="contained" onClick={handleGoogleSignIn} style={{backgroundColor:'aqua'}}>Google Login</Button>
      <br />
      
    </div>
  );
};

export default Login;