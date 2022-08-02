import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.listaMusicasNaTela = this.listaMusicasNaTela.bind(this);
    this.recuperaMusicasFavoritas = this.recuperaMusicasFavoritas.bind(this);
    this.state = {
      novoArraydeMusicas: [],
      loading: false,
      checked: [],
      recuperarMusica: false,
    };
  }

  async componentDidMount() {
    await this.recuperaMusicasFavoritas();
    this.listaMusicasNaTela();
  }

  async listaMusicasNaTela() {
    const { listaDeMusicas } = this.props;
    const NovoArray = [];
    for (let i = 1; i < listaDeMusicas.length; i += 1) {
      NovoArray.push(listaDeMusicas[i]);
    }
    this.setState({
      novoArraydeMusicas: [...NovoArray],
    });
    for (let i = 0; i < NovoArray.length; i += 1) {
      this.setState((estadoAnterior) => ({
        checked: [...estadoAnterior.checked, false],
      }));
    }
  }

  async adicionaMusicaAosFavoritos(event, trackId) {
    const id = trackId;
    const { novoArraydeMusicas, checked } = this.state;
    const filtraMusica = novoArraydeMusicas.filter((element) => element.trackId === id);
    const index = event.target.id;
    const checkeds = checked;
    this.setState({
      loading: true,
    });
    if (checked[index] === true) {
      await removeSong(filtraMusica[0]);
      const checkeds2 = checked;
      checkeds2[index] = false;
      return this.setState({
        loading: false,
        checked: checkeds2,
      });
    }

    await addSong(filtraMusica[0]);
    checkeds[index] = true;
    this.setState({
      loading: false,
      checked: checkeds,
    });
  }

  async recuperaMusicasFavoritas() {
    const { listaDeMusicas } = this.props;
    const novoArraydeMusicas = [];
    for (let i = 1; i < listaDeMusicas.length; i += 1) {
      novoArraydeMusicas.push(listaDeMusicas[i]);
    }
    const { checked } = this.state;

    const musicasFavoritas = await getFavoriteSongs();

    // this.setState({
    //   recuperarMusica: true,
    //   favoriteSongsList: [...musicasFavoritas],
    // });
    const checkeds = checked;
    musicasFavoritas.forEach((element1) => {
      novoArraydeMusicas.forEach((element2, index) => {
        if (element1.trackId === element2.trackId) {
          checkeds[index] = true;
        }
      });
    });
    this.setState({
      recuperarMusica: true,
      checked: [...checkeds],
    });
  }

  render() {
    const { novoArraydeMusicas, loading, checked, recuperarMusica } = this.state;
    return (
      <div>
        {recuperarMusica ? (
          <div>
            {loading ? <p>Carregando...</p> : (
              <div>
                {novoArraydeMusicas.map((element, i) => (
                  <div key={ i }>
                    <p key={ i }>{element.trackName}</p>
                    <audio
                      data-testid="audio-component"
                      src={ element.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <label
                      htmlFor="label"
                    >
                      Favorita
                      <input
                        type="checkbox"
                        id={ `${i}` }
                        defaultChecked={ checked[i] }
                        data-testid={ `checkbox-music-${element.trackId}` }
                        onClick={
                          (eve) => this.adicionaMusicaAosFavoritos(eve, element.trackId)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : <p>Carregando...</p>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  listaDeMusicas: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default MusicCard;
