import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      music: '',
      disabled: true,
    };
    this.searchMusic = this.searchMusic.bind(this);
  }

  searchMusic(event) {
    const { target } = event;
    const { value } = target;
    const number = 2;
    this.setState({
      music: value,
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

  render() {
    const { disabled, music } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            value={ music }
            onChange={ this.searchMusic }
          />
          <button
            type="submit"
            disabled={ disabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
