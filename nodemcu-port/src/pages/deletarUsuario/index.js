import React, { Component } from 'react';
import api from '../../services/api';

export default class AdicionarCursos extends Component {
  componentDidMount() {
    try {
      api.delete('users/' + this.props.match.params.id).then(response => {
        console.log(response);
      });
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <>
        <div className="exec">
          <br />
          <h3>Usuário Excluído</h3>
          <p>Você acaba de deletar o curso com sucesso!</p>
          <a href="/usuarios">Ver Usuários</a> |{' '}
          <a href="/register">Adicionar novo Usuário</a>
        </div>
      </>
    );
  }
}
