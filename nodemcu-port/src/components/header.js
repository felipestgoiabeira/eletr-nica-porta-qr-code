import React from 'react';

//import logo from '';
import { withRouter } from 'react-router';

// menus de cursos e alunos
export const Menus = () => (
  <>
    <div className="ui simple dropdown item">
      <span className="text">Usuários</span>
      <i className="dropdown icon"></i>
      <div className="menu">
        <a href="/register" className="item">
          {' '}
          Adicionar Usuário{' '}
        </a>
        <a href="/cursos" className="item">
          Ver Usuários
        </a>
      </div>
    </div>

    <a className="item" href="/log">
      Acessos
    </a>
      
  
  </>
);

//para usuário logado
const Logout = () => (
  <div className="right menu">
    <a href="/logout" className="ui item">
      Logout
    </a>
  </div>
);

const Mount = props => (
  <div className="ui stackable menu" style={{ margin: 10 }}>
   {/*  <div className="item">
      <img className="logo" src={logo} alt="logoCeuma" />
    </div> */}

    <a className="item" href="/">
      
      Home
    </a>

    <>
      <Menus />
      <Logout />
    </>
  </div>
);

function Menu({ location }) {
  const path = location.pathname;

  if (path !== '/login') {
    return <Mount />;
  }
  return '';
}

export default withRouter(Menu);
