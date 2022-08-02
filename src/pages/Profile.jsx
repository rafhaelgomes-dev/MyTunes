import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
    };
  }

  componentDidMount() {
    this.recuperaUsuario();
  }

  async recuperaUsuario() {
    const user = await getUser();
    this.setState({
      user: [user],
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt={ user.name } />
        <h3>{user.name}</h3>
      </div>
    );
  }
}

export default Profile;
