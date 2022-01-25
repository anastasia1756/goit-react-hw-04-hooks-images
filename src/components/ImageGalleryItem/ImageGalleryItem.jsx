import { ImageItem, Image } from '.';
import PropTypes from 'prop-types'; 

export const ImageGalleryItem = ({ imageForModal, image, tags, onClick }) => {

  return (
    <ImageItem>
      <Image src={image} alt={tags} onClick={() =>onClick(imageForModal)} />
    </ImageItem>
  );
};
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
}