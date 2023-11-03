import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Logoff from '../../assets/logout.png';

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button style={{border:"none", background:"transparent", cursor:'pointer'}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <img style={{width:'30px'}} src={Logoff}/>
    </button>
      
  );
};

export default Logout;