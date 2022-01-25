import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from ".";
import PropTypes from "prop-types";
export const Searchbar = ({ onSubmit }) => {
  const [searchedImage, setSearchedImage] = useState("");

  const handleInputChange = (e) => {
    setSearchedImage(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchedImage.trim() === "") {
      toast("Make sure you are looking for something!", {
        icon: "😉",
      });
      return;
    }
    onSubmit(searchedImage.trim());
    reset();
  };
  const reset = () => {
    setSearchedImage("");
  };
  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FaSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          value={searchedImage}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </SearchForm>
      <Toaster />
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
