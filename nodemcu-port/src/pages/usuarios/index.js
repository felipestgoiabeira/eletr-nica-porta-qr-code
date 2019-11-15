import React, { Component } from 'react';
//import './style.css';
import api from '../../services/api';


const Usuarios = props => {
  return (
    <tr>
      <td>{props.usuario.name}</td>
      <td>{props.usuario.email}</td>
      <td>{props.usuario.type.toUpperCase()}</td>
      <td>{props.usuario.hour_start}</td>
      <td>{props.usuario.hour_end}</td>

      <td>
        <a href={'/usuarios/' + props.usuario.id}>Editar</a>
      </td>
      <td>
        <a className="action" href={'/deletarUsuario/' + props.usuario.id}>
          Deletar
        </a>
      </td>
    </tr>
  );
};

export default class UsuariosListar extends Component {
  constructor(props) {
    super(props);
    this.state = { usuarios: [] };
  }

  componentDidMount() {
    api
      .get('/users')
      .then(response => {
        this.setState({ usuarios: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  usuarioList() {
    return this.state.usuarios.map(function (cursoAtual, i) {
      return <Usuarios usuario={cursoAtual} key={i} />;
    });
  }

  render() {
    return (
      <div className="tb">
        <h3>Tabela de Usuarios</h3>
        <table className="ui celled table" style={{ marginTop: 20 }}>
          <thead >
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Tipo</th>
              <th scope="col">Hora de Entrada</th>
              <th scope="col">Hora de Saída</th>
              <th scope="col">Editar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>{this.usuarioList()}</tbody>
        </table>
        <br />
      </div>
    );
  }
}
