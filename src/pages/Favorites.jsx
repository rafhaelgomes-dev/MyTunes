import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteSongsMusic: [],
    };
  }

  componentDidMount() {
    this.recoverFavoriteSongs();
  }

  async recoverFavoriteSongs() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongsMusic: [favoriteSongs],
      loading: false,
    });
  }

  render() {
    const { loading, favoriteSongsMusic } = this.state;
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        {loading ? <p>Carregando...</p> : (
          <MusicCard
            listaDeMusicas={ favoriteSongsMusic[0] }
          />)}
      </div>
    );
  }
}

export default Favorites;
