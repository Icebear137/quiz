import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setIsShowModal, result } = props;

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="result">
          <div className="result-content">
            <div className="result-content-score">
              <div>
                <span>Total question: {result.countTotal}</span>
              </div>
              <div>
                <span>Correct answer: {result.countCorrect}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalResult;
