
import PropTypes from 'prop-types'; 
import { Loader } from '../Loader';
import { Btn } from "./Button.styled";

export const Button = ({ onClick, loading }) => {
  return (
    <Btn type="button" onClick={onClick}>
      {!loading ? (
        'Load more'
      ) : (
        <Loader/>
      )}
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
loading: PropTypes.bool.isRequired,
}