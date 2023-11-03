import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Lottie from 'react-lottie'
import Logo from '../../assets/logo.png'
import animationData from '../../assets/Animation - 1698868454752.json'
import animatedButton from '../../assets/Animation - 1698870361535.json'

function Login() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const defaultOptionsbutton = {
    loop: true,
    autoplay: true,
    animationData: animatedButton,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>

      <img style={{width:'300px'}} src={Logo}/>
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
      
      <div
        onClick={handleLogin} 
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          position:'relative',
        }}
      >
        <Lottie 
          options={defaultOptionsbutton}
          height={100}
          width={400}
          color={'blac'}
        />
        <span style={{ position:'absolute', left:'44.5%', top:'13%', fontWeight: 'bold', fontSize:'50px', color:'white' }}>
          Log In
        </span>
      </div>
    </div>
  );
}

export default Login;
