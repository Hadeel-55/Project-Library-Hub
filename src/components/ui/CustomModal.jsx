import { Modal } from "react-bootstrap";

const CustomModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered size="md">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
export default CustomModal;
