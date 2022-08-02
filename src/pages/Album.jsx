import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      listaDeMusicas: [],
      requisicaoFinalizada: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const musica = await getMusics(params.id);
    const NovoArray = [];
    for (let i = 1; i < musica.length; i += 1) {
      NovoArray.push(musica[i]);
    }
    this.setState({
      artistName: musica[0].artistName,
      albumName: musica[0].collectionName,
      listaDeMusicas: [...NovoArray],
      requisicaoFinalizada: true,
    });
  }

  render() {
    const { requisicaoFinalizada, artistName, albumName, listaDeMusicas } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        {requisicaoFinalizada ? <p data-testid="artist-name">{artistName}</p> : null}
        {requisicaoFinalizada ? <p data-testid="album-name">{albumName}</p> : null}
        {requisicaoFinalizada ? <MusicCard listaDeMusicas={ listaDeMusicas } /> : null}
      </div>
    );
  }
}

Album.defaultProps = {
  params: 'Stranger',
};

Album.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  params: PropTypes.string,
};

export default Album;
