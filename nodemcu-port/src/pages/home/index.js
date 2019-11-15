import React, { Component } from 'react';
export default class Home extends Component {
  render() {
    return (
      <div className="exec">
        <h3>
          <strong>LABORATÓRIO DE ELETRÔNICA 2019.2</strong>
        </h3>
        <p>
          <i className="angle right icon" />
          Em <strong>Usuários</strong> você pode <strong>Adicionar</strong> e  
          <strong>Ver</strong> os Usuários cadastrados.
        </p>
        <p>
          <i className="angle right icon" />
          Em <strong>Acessos</strong> você pode
          <strong>Ver</strong> os acessos ao laboratório.
        </p>
      </div>
    );
  }
}
