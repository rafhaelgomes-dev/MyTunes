import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      User: [],
      loading: true,
    };
    this.loginuserdata = this.loginuserdata.bind(this);
  }

  componentDidMount() {
    this.loginuserdata();
  }

  async loginuserdata() {
    const data = await getUser();
    this.setState({
      User: [data],
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { User, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <p>Carregando...</p> : (
            <p data-testid="header-user-name">
              {`Olá
              ${User[0].name}
            `}
            </p>
          )
        }
        <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Músicas Favotitas
        </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
      </header>
    );
  }
}

export default Header;
