import React, { useState, useEffect } from 'react';
//import './style.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import { FormField, Form, GridColumn } from 'semantic-ui-react';

//select

//table
const Logs = props => (
  <>
    <tr>
      {console.log("Props",props)}
      <td>{props.log.user.name}</td>
      <td>{props.log.user.email}</td>
      <td>{props.log.user.type.toUpperCase()}</td>
      <td>{props.log.user.hour_start}</td>
      <td>{props.log.user.hour_end}</td>
      <td>{props.log.created_at}</td>    
    </tr>
  </>
);

export default function LogsListar() {
  //store the alunos to show on table
  const [logs, setLog] = useState([]);

  

  useEffect(() => {
    //alunos from api
    api
      .get('/log')

      .then(response => {
        console.log(response);
        setLog(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    // get cursos from api
    
  }, []);

  //make the list of select


  //filter on alunos
  function logList() {

    // make the list of alunos to table
    return logs.map(function(logAtual, i) {
      return <Logs log={logAtual} key={i} />;
    });
  }



  return (
    <div className="tb">
      
      <h2>Log de Acessos</h2>
      
      <table className="ui celled table" style={{ marginTop: 20 }}>
        <thead >
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Tipo</th>
            <th scope="col">Hora de Entrada</th>
            <th scope="col">Hora de Saída</th>
            <th scope="col">Acesso</th>
          
          </tr>
        </thead>
        <tbody>{logList()}</tbody>
      </table>
      <br />
    </div>
  );
}
