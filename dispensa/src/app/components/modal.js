import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import style from "@/app/style/button.module.css";
export function Modal_function() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Realizar Alterações No Produto
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* Colocar o nome do produto  */}
          <Modal.Title>[Nome do Produto]</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body className="m-6 bg-clip-padding">
            Você Deseja Excluir o Produto:
            <Button
              variant="btn btn-danger"
              onClick={handleClose}
              className="ms-3"
            >
              Editar
            </Button>
          </Modal.Body>
        </div>
        <div>
          <Modal.Body className="m-6 bg-clip-padding">
            Você Deseja Editar o Produto:
            <Button
              variant="btn custom-button"
              onClick={handleClose}
              className={`btn btn-secondary ms-4 ${style.btn_custom}`}
            >
              Excluir
            </Button>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
