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
    randomId: false
  };


  onSubmit = (query) => {
    this.setState({
      query,
      randomId: Math.floor(Math.random() * 100),
      images: [],
      page: 1
    });
  };



  componentDidUpdate = async (prevProps, prevState) => {
    const prevRandomId = prevState.randomId;
    const prevPage = prevState.page;
    const prevQuery = prevState.query;
    const { randomId, page, query } = this.state;

    if (prevRandomId !== randomId || prevPage !== page || prevQuery !== query) {
      this.loadResult();
    }
  };

  loadResult = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ loading: true });
      fetchImages(query, page).then(result => {
        // const data = result;
        // const total = data.totalHits;
        // const img = data.hits;

        if (result.length === 0) {
          notifyInfo();
          return;
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...result],
            showBtn: result.length === 12 || result.length === 0 ? true : false,
          }));
          success(query);
        }
      });
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
        <Searchbar onSubmit={ this.onSubmit } />
        { loading && <Loader /> }
        { images.length > 0 && <Gallery imgItems={ images } /> } 
        { this.state.showBtn && <Pagination onClick={ this.handleLoadMore }>Load More</Pagination> }
        <Toaster position="top-right" reverseOrder={true}/>
      </Wrapper>
    )
  }
};