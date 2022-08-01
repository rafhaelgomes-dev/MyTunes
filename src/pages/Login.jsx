import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      buttonDisabled: true,
      carregando: false,
      redirect: false,
    };
    this.nameSetState = this.nameSetState.bind(this);
    this.saveUserApi = this.saveUserApi.bind(this);
  }

  nameSetState(event) {
    const { target } = event;
    const { value } = target;
    const number = 3;
    this.setState({
      nome: value,
    });
    if (value.length >= number) {
      this.setState({
        buttonDisabled: false,
      });
    }
    if (value.length < number) {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  async saveUserApi(event) {
    event.preventDefault();
    const { nome } = this.state;
    const dadosUser = {
      name: nome,
    };
    this.setState({
      carregando: true,
    });
    await createUser(dadosUser);
    this.setState({
      carregando: false,
      redirect: true,
    });
  }

  render() {
    const { nome, buttonDisabled, carregando, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            value={ nome }
            onChange={ (event) => this.nameSetState(event) }
          />
          <button
            type="submit"
            disabled={ buttonDisabled }
            data-testid="login-submit-button"
            onClick={ this.saveUserApi }
          >
            Entrar
          </button>
          {carregando === true ? <p>Carregando...</p> : null}
          {redirect === true ? <Redirect to="/search" /> : null}
        </form>
      </div>
    );
  }
}

export default Login;
