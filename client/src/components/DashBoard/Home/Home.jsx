import React from 'react';
import LetterForm from '../LetterForm/LetterForm';
import LetterList from '../LetterList/LetterList'; 
import Logout from '../../Logout/Logout';
import Logo from '../../../assets/logo.png'

const Home = () => {
  return (
    <div>
      <div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", marginTop:'-25px'}}>
        <img style={{width:'300px'}} src={Logo}/>
        <div style={{height:'50px', width:'1px', background:'#c2c2c2'}}></div>
        <h1 style={{color:'#fab23e'}}>Suvidha Foundation Admin Dashboard</h1>
        <Logout/>
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <LetterForm />
      <LetterList />
      </div>
    </div>
  );
};

export default Home;
