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


  onSubmit = () => {
    this.setState({
      randomId: Math.floor(Math.random() * 100),
      images: [],
      page: 1
    });
    
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const prevRandomId = prevState.randomId;
    const prevPage = prevState.page;
    const { randomId, page } = this.state;

    if (prevRandomId !== randomId || prevPage !== page) {
      this.loadResult();
    }
  };

  loadResult = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ loading: true });
      const img = await fetchImages(query, page).then(result => {
        const data = result.data;
        const total = data.totalHits;
        if (img.length === 0) {
          notifyInfo();
          return;
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...img],
            showBtn: this.state.page < Math.ceil(total / 12)
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
        <Searchbar onSubmit={ this.handleSubmit } />
        { loading && <Loader /> }
        { images.length > 0 && <Gallery imgItems={ images } /> } 
        { this.state.showBtn && <Pagination onClick={ this.handleLoadMore }>Load More</Pagination> }
        <Toaster position="top-right" reverseOrder={true}/>
      </Wrapper>
    )
  }
};