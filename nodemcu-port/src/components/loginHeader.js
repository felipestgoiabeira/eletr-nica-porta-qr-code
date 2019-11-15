import React from 'react';
//import logo from '';
import { withRouter } from 'react-router';
import { Menus } from './header';

//quando o usuário não está logado
const Login = () => (
  <div className="right menu">
    <a href="/login" className="ui item">
      Login
    </a>
    
  </div>
);

const Mount = props => {
  return (
    <div className="ui stackable menu" style={{marginTop:10}}>
     {/*  <div className="item">
        <img className="logo" src={logo} alt="logoCeuma" />
      </div> */}

      <a className="item" href="/">
        
        Home
      </a>
      <>
        
        <Login />
      </>
    </div>
  );
};

function Menu({ location }) {
  return <Mount />;
}

export default withRouter(Menu);
