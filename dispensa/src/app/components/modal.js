import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import style from "@/app/style/button.module.css";
import Link from "next/link";

export function Modal_function({ pantryId, productId }) {
  const [showMainModal, setShowMainModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successmensage, setsuccessmensage] = useState("");

  // Funções para abrir/fechar o modal principal
  const handleCloseMainModal = () => setShowMainModal(false);
  const handleShowMainModal = () => setShowMainModal(true);

  // Funções para abrir/fechar o modal de exclusão
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  // Função para confirmar a exclusão
  const handleConfirmDelete = () => {
    console.log("Produto excluído!"); // Lógica para excluir o produto
    setsuccessmensage("Exclusão Realizado com Sucesso!");
    setTimeout(() => {
      setsuccessmensage("");
      handleCloseDeleteModal(); // Fecha o modal de exclusão
      handleCloseMainModal(); // Fecha o modal principal
    }, 2000);
  };

  return (
    <>
      {/* Botão para abrir o modal principal */}
      <Button variant="primary" onClick={handleShowMainModal}>
        Realizar Alterações No Produto
      </Button>

      {/* Modal Principal */}
      <Modal show={showMainModal} onHide={handleCloseMainModal}>
        <Modal.Header closeButton>
          <Modal.Title>[Nome do Produto]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-6 bg-clip-padding">
            <p>Você Deseja Editar o Produto:</p>
            <Link href={`/pantries/${pantryId}/products/${productId}/edit`}>
              <Button
                variant="btn custom-button"
                onClick={handleCloseMainModal}
                className={`btn btn-secondary ms-3 ${style.btn_custom}`}
              >
                Editar
              </Button>
            </Link>
          </div>
          <div className="m-6 bg-clip-padding">
            <p>Você Deseja Excluir o Produto:</p>
            <Button
              variant="btn btn-danger"
              onClick={handleShowDeleteModal} // Abre o modal de exclusão
              className="ms-3"
            >
              Excluir
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMainModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este produto? Esta ação não pode ser
          desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
        {successmensage && (
          <div className=" d-flex alert alert-success mt-3">
            {successmensage}
          </div>
        )}
      </Modal>
    </>
  );
}

export function Modal_function_pratries({ pantryId }) {
  const [showMainModal, setShowMainModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successmensage, setsuccessmensage] = useState("");

  // Funções para abrir/fechar o modal principal
  const handleCloseMainModal = () => setShowMainModal(false);
  const handleShowMainModal = () => setShowMainModal(true);

  // Funções para abrir/fechar o modal de exclusão
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  // Função para confirmar a exclusão
  const handleConfirmDelete = () => {
    console.log("Dispensa excluída!"); // Lógica para excluir o produto
    setsuccessmensage("Exclusão Realizado com Sucesso!");
    setTimeout(() => {
      setsuccessmensage("");
      handleCloseDeleteModal(); // Fecha o modal de exclusão
      handleCloseMainModal(); // Fecha o modal principal
    }, 2000);
  };

  return (
    <>
      {/* Botão para abrir o modal principal */}
      <Button variant="primary" onClick={handleShowMainModal}>
        Realizar Alterações Na Dispensa
      </Button>

      {/* Modal Principal */}
      <Modal show={showMainModal} onHide={handleCloseMainModal}>
        <Modal.Header closeButton>
          <Modal.Title>[Nome da Dispensa]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-6 bg-clip-padding">
            <p>Você Deseja Editar a Dispensa:</p>
            <Link href={`/pantries/${pantryId}/edit`}>
              <Button
                variant="btn custom-button"
                onClick={handleCloseMainModal}
                className={`btn btn-secondary ms-3 ${style.btn_custom}`}
              >
                Editar
              </Button>
            </Link>
          </div>
          <div className="m-6 bg-clip-padding">
            <p>Você Deseja Excluir a Dispensa:</p>
            <Button
              variant="btn btn-danger"
              onClick={handleShowDeleteModal} // Abre o modal de exclusão
              className="ms-3"
            >
              Excluir
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMainModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir esta dispensa? Esta ação não pode
          ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
        {successmensage && (
          <div className=" d-flex alert alert-success mt-3">
            {successmensage}
          </div>
        )}
      </Modal>
    </>
  );
}
