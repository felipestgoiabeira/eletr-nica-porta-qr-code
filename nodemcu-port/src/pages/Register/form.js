import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
// import './index.css'
import { Form, Grid, FormField } from 'semantic-ui-react';
import api from '../../services/api';
import moment from 'moment';
import { Redirect } from 'react-router-dom'

const isSameOrBefore = (startTime, endTime) => {
  return moment(startTime, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
}
var errorOnRequest = false;
var error = '';
var redirect = false;

const App = ({
  values,
  handleChange,
  onChange,
  handleBlur,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <div className="column">
      <h3>{'Registrar Usuário'}</h3>
      
      <Grid columns={2}>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            {redirect && <Redirect to='/usuarios' />}
            {errorOnRequest && <p className="error">{error}</p>}
            <FormField>
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nome}
                placeholder="Nome do Usuário"
              />
              {touched.nome && errors.nome && (
                <p className="error">{errors.nome}</p>
              )}
            </FormField>
            <FormField>
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email do Usuário"
              />
              {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
              )}
            </FormField>

            <FormField>
              <label>Hora de Entrada</label>
              <input
                type="time"
                name="hora_entrada"
                onChange={handleChange}
                value={values.hora_entrada}
                onBlur={handleBlur}
                min="06:00" max="23:59"
              />
              {touched.hora_entrada && errors.hora_entrada && (
                <p className="error">{errors.hora_entrada}</p>
              )}
            </FormField>
            <FormField>
              <label>Hora de Saída</label>
              <input
                type="time"
                name="hora_saida"
                onChange={handleChange}
                value={values.hora_saida}
                onBlur={handleBlur}
                min="06:00" max="23:59"
              />
              {touched.hora_saida && errors.hora_saida && (
                <p className="error">{errors.hora_saida}</p>
              )}
            </FormField>
            <FormField>
              <label>Tipo de usuário</label>

              <select
                name="admin"
                onBlur={handleBlur}
                value={values.admin}
                onChange={handleChange}
              >
                <option value="0">Comum</option>
                <option value="1">Administrador</option>

              </select>
            </FormField>
            <FormField>
              <label>Classificação</label>
              <select
                name="type"
                onBlur={handleBlur}
                value={values.type}
                onChange={handleChange}
              >
                <option value="1">Docente</option>
                <option value="2">Discente</option>

              </select>
              
            </FormField>

            <FormField>
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                onChange={handleChange}
                value={values.senha}
                onBlur={handleBlur}
                placeholder="Insira a senha"
              />
              {touched.senha && errors.senha && (
                <p className="error">{errors.senha}</p>
              )}
            </FormField>

            <FormField>
              <label>Confirme a senha</label>
              <input
                type="password"
                name="senha2"
                onChange={handleChange}
                value={values.senha2}
                onBlur={handleBlur}
                placeholder="Insira a senha"
              />
              {touched.senha2 && errors.senha2 && (
                <p className="error">{errors.senha2}</p>
              )}
            </FormField>


            <button type="submit" className="ui primary basic button">
              Registrar
            </button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const FormikApp = withFormik({
  enableReinitialize: true,
  mapPropsToValues({ id, nome, email, senha, senha2, 
    hora_entrada, hora_saida,type, update, admin }) {
    return {
      id: id||'',
      nome: nome || '',
      email: email || '',
      senha: senha || '',
      senha2: senha2 || '',
      hora_entrada: hora_entrada || '',
      hora_saida: hora_saida || '',
      update: update || false,
      admin: admin || '',
      type: type || ''
    };
  },
  validationSchema: Yup.object().shape({
    nome: Yup.string().required('Insira o nome'),
    senha: Yup.string().required('Insira a senha'),
    senha2: Yup.string().required('Confirme a senha'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('Insira o email'),
    hora_entrada: Yup.string().required("Informe a hora de entrada").test("test_entrada",
      "Hora de entrada deve ser menor que o de Saída.",
      (value) => {
        return isSameOrBefore(value, "18:00");
      }),
    hora_saida: Yup.string().required("Informe a hora de saída")
  }),
  handleSubmit(values, { props, resetForm }) {
    const data = {
      name: values.nome,
      email: values.email,
      password: values.senha,
      password2: values.senha2,
      user: values.user,
      type: values.type,
      admin: values.admin,
      hour_start: values.hora_entrada,
      hour_end: values.hora_saida
    }
    let rota = "/register";

    const actions = (response, props) =>{
      ///console.log("Props", props)
      if (response.data.error) {
        errorOnRequest = true;
        error = response.data.error
        resetForm();

      }
      if (response.status === 200 && response.data.name) {
        console.log(response)
        //props.history.push('/');
        redirect = true;
        resetForm()
      }
    }
    try {
      
      if(values.update){
        console.log(props.history) 
        rota = "/users/"+ values.id
        console.log(rota)
        api.put(rota, data).then(response=>{
          actions(response, props)
        })

      }
      else{
      api.post(rota, data).then(response => {
          console.log(response);
          actions(response, props)
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
})(App);

export default FormikApp;
