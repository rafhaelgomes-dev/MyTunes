import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.listaMusicasNaTela = this.listaMusicasNaTela.bind(this);
    this.state = {
      novoArraydeMusicas: [],
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
  }

  render() {
    // const { listaDeMusicas } = this.props;
    const { novoArraydeMusicas } = this.state;
    return (
      <div>
        {novoArraydeMusicas.map((element, i) => (
          <div key={ i }>
            <p key={ i }>{element.trackName}</p>
            <audio data-testid="audio-component" src={ element.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  listaDeMusicas: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default MusicCard;
