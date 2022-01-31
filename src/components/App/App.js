import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ImageGallery } from "../ImageGallery";
import { Searchbar } from "../Searchbar";
import { Button } from "../Button";
import { getImages } from "../../services/imagesApi";
import { Loader } from "../Loader";
import { AppWpapper, Text } from "./App.styled";
import { Modal } from "../Modal";

export const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageForModal, setImageForModal] = useState("");
  const [error, setError] = useState("");
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (value === "") {
          return;
        }

        const response = await getImages(value, page);
        const newImages = response.hits;
        setTotalHits(response.totalHits);

        newImages.length === 0 && toast.error("No such picture");
        setLoading(true);
        setLoading(false);
        setImages((state) => [...state, ...newImages]);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, [page, value]);

  const toggleModal = (image) => {
    setShowModal((state) => !state);
    setImageForModal(image);
  };
  const loadMoreBtn = async () => {
    setPage((state) => state + 1);
  };
  const handleFormSubmit = async (image) => {
    setPage(1);
    setImages([]);
    setValue(image);
  };
  const lengthOfImages = images.length;

  return (
    <AppWpapper>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imageForModal} alt={"beautiful pic"} />
        </Modal>
      )}
      <Searchbar onSubmit={handleFormSubmit} />
      <Toaster />
      {lengthOfImages === 0 && !loading && (
        <Text>Enter image name you are looking for.</Text>
      )}
      {lengthOfImages > 0 && (
        <ImageGallery
          images={images}
          onClick={toggleModal}
          showModal={showModal}
        />
      )}

      {lengthOfImages > 0 && !loading && images.length < totalHits && (
        <Button onClick={loadMoreBtn} loading={loading} />
      )}

      {loading && <Loader />}
    </AppWpapper>
  );
};
