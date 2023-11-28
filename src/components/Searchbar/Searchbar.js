import { CiSearch } from 'react-icons/ci';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { Component } from 'react'
import { notifyInputQuerry } from '../Notify/Notify'

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = event => {
    const query = event.currentTarget.value;
    this.setState({ query: query });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      notifyInputQuerry();
      return;
    }
    this.props.onSubmit(this.state.query);
    event.target.reset();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <CiSearch size={22} />
          </SearchFormButton>
          <SearchFormInput
            value={this.state.query}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </SearchForm>
      </Header>
    );
  }
};
