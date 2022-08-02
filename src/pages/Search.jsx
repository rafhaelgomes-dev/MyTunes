import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      music: '',
      disabled: true,
      loading: false,
      albunsArtistaPesquisado: [],
      notAlbum: false,
      artista: '',
    };
    this.saveMusic = this.saveMusic.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.listaAlbuns = this.listaAlbuns.bind(this);
    this.exibeNomeArtista = this.exibeNomeArtista.bind(this);
  }

  saveMusic(event) {
    const { target } = event;
    const { value } = target;
    const number = 2;
    this.setState({
      music: value,
      artista: value,
    });
    if (value.length >= number) {
      this.setState({
        disabled: false,
      });
    }
    if (value.length < number) {
      this.setState({
        disabled: true,
      });
    }
  }

  async searchMusic(event) {
    const { music } = this.state;
    event.preventDefault();
    this.setState({
      music: '',
    });
    this.setState({
      loading: true,
    });
    const artistMusic = await searchAlbumsAPI(music);
    this.setState({
      albunsArtistaPesquisado: [...artistMusic],
      loading: false,
    });
    if (artistMusic[0] === undefined) {
      this.setState({
        notAlbum: true,
      });
    }
    if (artistMusic[0] !== undefined) {
      this.setState({
        notAlbum: false,
      });
    }
  }

  listaAlbuns() {
    const { albunsArtistaPesquisado } = this.state;
    if (albunsArtistaPesquisado[0] === undefined) {
      return;
    }
    if (albunsArtistaPesquisado[0] !== undefined) {
      return albunsArtistaPesquisado.map((element, index) => (
        <div key={ index }>
          <img src={ element.artworkUrl100 } alt={ element.artistName } />
          <p>{element.collectionName}</p>
          <p>{element.artistName}</p>
          <Link
            to={ `/album/${element.collectionId}` }
            data-testid={ `link-to-album-${element.collectionId}` }
          >
            Album Completo
          </Link>
        </div>
      ));
    }
  }

  exibeNomeArtista() {
    const { albunsArtistaPesquisado, artista } = this.state;
    if (albunsArtistaPesquisado[0] === undefined) {
      return;
    }
    if (albunsArtistaPesquisado[0] !== undefined) {
      return <p>{`Resultado de álbuns de: ${artista}`}</p>;
    }
  }

  render() {
    const { disabled, music, loading, notAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <p>Carregando...</p> : (
          <form>
            <input
              data-testid="search-artist-input"
              value={ music }
              onChange={ this.saveMusic }
            />
            <button
              type="submit"
              disabled={ disabled }
              data-testid="search-artist-button"
              onClick={ this.searchMusic }
            >
              Pesquisar
            </button>
          </form>

        )}
        {notAlbum ? null : this.exibeNomeArtista()}
        {notAlbum ? <p>Nenhum álbum foi encontrado</p> : this.listaAlbuns()}
      </div>
    );
  }
}

export default Search;
