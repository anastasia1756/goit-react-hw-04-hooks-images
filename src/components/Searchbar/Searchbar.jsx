import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from '.';
import PropTypes from 'prop-types'; 

export class Searchbar extends Component {
  state = {
    searchedImage: '',
  };
  handleInputChange = (e) => {
    this.setState({ searchedImage: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (e) => {
    const { searchedImage } = this.state;
    e.preventDefault();
    if (searchedImage.trim() === '') {
      toast('Make sure you are looking for something!', {
        icon: '😉',
      });
      return;
    }
    this.props.onSubmit(searchedImage.trim());
    this.reset();
  };
  reset = () => {
    this.setState({ searchedImage: '' });
  };
  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FaSearch/>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            value={this.state.searchedImage}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </SearchForm>
        <Toaster/>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}