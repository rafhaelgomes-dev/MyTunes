import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.listaMusicasNaTela = this.listaMusicasNaTela.bind(this);
    this.state = {
      novoArraydeMusicas: [],
      loading: false,
      checked: [],
    };
  }

  componentDidMount() {
    this.listaMusicasNaTela();
  }

  listaMusicasNaTela() {
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
    this.setState({
      loading: true,
    });
    await addSong(filtraMusica);
    const index = event.target.id;
    const checkeds = checked;
    checkeds[index] = true;
    this.setState({
      loading: false,
      checked: checkeds,
    });
  }

  render() {
    const { novoArraydeMusicas, loading, checked } = this.state;
    return (
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
                      (event) => this.adicionaMusicaAosFavoritos(event, element.trackId)
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        )}

      </div>
    );
  }
}

MusicCard.propTypes = {
  listaDeMusicas: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default MusicCard;
