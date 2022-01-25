
import React, { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from "../ImageGallery";
import { Searchbar } from "../Searchbar";
import { Button } from "../Button";
import { getImages } from "../../services/imagesApi";
import { Loader } from "../Loader";
import {  AppWpapper, Text} from "./App.styled";
import { Modal } from "../Modal";

export class App extends Component {
  state = {
    images: [],
    value: "",
    page: 1,
    error: "",
    loading: false,
    showModal: false,
    imageForModal: "",
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;


    try {
      if (prevState.value !== value) {
        const newImages = await getImages(value, page);
        newImages.length === 0 && toast.error('No such picture');
        this.setState({
          loading: true,
        });
        this.setState({
          loading: false,
          images: newImages,
        });
      }

    } catch (error) {
      this.setState({
        error,
      });
    }
    try {
      if (prevState.page !== page && page !== 1) {
        const newImages = await getImages(value, page);
        setTimeout(() => {
          this.setState({
            loading: false,
            images: [...prevState.images, ...newImages],
          });
        }, 1000);
      }
    } catch (error) {
      this.setState({
        status: "rejected",
      });
    }
  }

  toggleModal = (image) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      imageForModal: image,
    }));
  };

  loadMoreBtn = async () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
        loading: true,
      };
    });
  };

  handleFormSubmit = async (image) => {
    this.setState({ page: 1, value: image });
  };

  render() {
    const { images, loading, showModal,imageForModal } = this.state;
    const lengthOfImages = images.length;
   
    return (
      <AppWpapper>
         {showModal && (
      <Modal onClose={this.toggleModal}>
        <img src={imageForModal} alt={'beautiful pic'} />
      </Modal>)}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Toaster/>
        {lengthOfImages === 0 && !loading && (
          <Text>Enter image name you are looking for.</Text>
        )}
        {lengthOfImages > 0 && (
          <ImageGallery
            images={images}
            onClick={this.toggleModal}
            showModal={showModal}
          />
        )}
        
        {lengthOfImages > 0 && !loading && (
          <Button onClick={this.loadMoreBtn} loading={loading} />
        )}

        {loading && <Loader />}
      </AppWpapper>
    );
  }
}
