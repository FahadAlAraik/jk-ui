import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function TextArModal({ show, onHide, textAr }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={{ direction: 'rtl' }} // Set RTL direction
    >
      <Modal.Header>
        <Modal.Title>الترجمة العربية</Modal.Title> {/* Arabic title */}
      </Modal.Header>
      <Modal.Body>
        <p>{textAr}</p>
      </Modal.Body>
      <Modal.Footer
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="secondary" onClick={onHide}>
          إذهب للترجمة
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TextArModal;
