import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchImages } from 'API';
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';
import { Pagination } from './Button/Button';
import { Wrapper } from './App.styled'
import { Loader } from './Loader/Loader'
import {notifyInfo, success} from './Notify/Notify'




export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    showBtn: false,
  };


  onSubmit = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1
    });
    
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const { query, page } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.loadResult();
    }
  };

  loadResult = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ loading: true });
      const img = await fetchImages(query, page);
      if (img.length === 0) {
        notifyInfo();
        return;
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...img],
        }));
        showBtn === this.state.page < M(totalHits / 12) ? true : false;
        success(query);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  

  render () {
    const { loading, images } = this.state;
    return (
      <Wrapper>
        <Searchbar onSubmit={ this.handleSubmit } />
        { loading && <Loader /> }
        { images.length > 0 && <Gallery imgItems={ images } /> } 
        { images.length > 0 && <Pagination onClick={ this.handleLoadMore }>Load More</Pagination> }
        <Toaster position="top-right" reverseOrder={true}/>
      </Wrapper>
    )
  }
};
