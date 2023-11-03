import React from 'react';
import './App.css';
import Home from './components/DashBoard/Home/Home';
import Login from './components/Login/Login'
import { useAuth0 } from "@auth0/auth0-react";
import { PuffLoader } from 'react-spinners';

function App() {
  const { isAuthenticated, isLoading} = useAuth0();

  if (isLoading) return <div style={{position: 'fixed', left: '40%', top: '20%'}}>
    <PuffLoader color="#ffd94c" size={300}/>
    </div>

  return (
    <>
        {
          !isAuthenticated ? 
          <Login/> :
          <Home/>
        }
    </> 
  );
}

export default App;
