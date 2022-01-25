import { ModalWindow, Overlay } from "./Modal.styled";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
  }, [onClose]);
  // useEffect(() => {
  //   console.log("cyzkb");
  //   const handleKeyDown = (e) => {
  //     if (e.code === "Escape") {
  //       onClose();
  //     }
  //   };
  //   window.removeEventListener("keydown", handleKeyDown);
  // }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};
// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
// componentWillUnmount() {
//   window.removeEventListener('keydown', this.handleKeyDown);
// }
// handleKeyDown = (e) => {
//   if (e.code === 'Escape') {
//     this.props.onClose();
//   }
// };

// handleBackdropClick = (e) => {
//   if (e.currentTarget === e.target) {
//     this.props.onClose();
//   }
// };

//   render() {
// return createPortal(
//   <Overlay onClick={this.handleBackdropClick}>
//     <ModalWindow>{this.props.children}</ModalWindow>
//   </Overlay>,
//   modalRoot
// );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
