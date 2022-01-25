import { ImageGalleryItem } from '../ImageGalleryItem';
import { ImageGalleryList } from '.';
import PropTypes from 'prop-types'; 

export const ImageGallery = ({ images, onClick, showModal }) => (
  <ImageGalleryList>
    {images.map(({ id, webformatURL, largeImageURL, tags }, index) => (
      <ImageGalleryItem
        key={id}
        image={webformatURL}
        tags={tags}
        onClick={onClick}
        showModal={showModal}
        imageForModal={largeImageURL}
      />
    ))}
    
  </ImageGalleryList>
);

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
images: PropTypes.arrayOf(
  PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  })
),
}