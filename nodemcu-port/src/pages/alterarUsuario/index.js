import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router';
import FormMake from '../Register/form';

export default function EditarCursos() {
  const [usuario, setUsuario] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    //Effect dont let be async
    async function getUsuario() {
      const response = await api.get('/users/' + id);
      setUsuario(response.data);
    }
    getUsuario();
  }, [id]);
  const valor = (usuario.type === 'docente') ? 1 : 2
 
  return (
    
    <FormMake
      nome={usuario.name}
      email={usuario.email}
      hora_entrada= {usuario.hour_start} 
      hora_saida= {usuario.hour_end} 
      admin= {usuario.admin}
      type={valor}
      id={`${id}`}
      update={true}
     
    />
  );
}
