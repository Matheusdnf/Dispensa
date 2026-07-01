"use client";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { deletePantry } from "@/app/lib/pantries";
import { deleteProduct } from "@/app/lib/products";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";
import { Settings, Pencil, Trash2 } from "lucide-react";

// ==========================================
// COMPONENTE: MODAL DE PRODUTO
// ==========================================
export function Modal_function({
  pantryId,
  productId,
  productName = "[Nome do Produto]",
}) {
  const { user } = useAuth();
  const [showMainModal, setShowMainModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseMainModal = () => setShowMainModal(false);
  const handleShowMainModal = () => setShowMainModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleConfirmDelete = async () => {
    await deleteProduct(productId, user.id);
    setSuccessMessage("Exclusão Realizada com Sucesso!");
    setTimeout(() => {
      setSuccessMessage("");
      handleCloseDeleteModal();
      handleCloseMainModal();
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleShowMainModal}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100 hover:text-indigo-800 active:scale-[0.98] w-full cursor-pointer"
      >
        <Settings className="h-4 w-4" />
        Realizar Alterações No Produto
      </button>

      {/* Modal Principal Redesenhado */}
      <Modal
        show={showMainModal}
        onHide={handleCloseMainModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-bottom-0 pt-4 px-4">
          <Modal.Title className="fw-bold fs-3 text-dark">
            {productName}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 pb-4">
          <p className="text-uppercase text-muted fw-bold small tracking-wider mb-3">
            Ações Disponíveis para este Produto:
          </p>

          {/* Container Unificado de Opções */}
          <div className="border rounded-3 overflow-hidden bg-light">
            {/* Opção: Editar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Pencil className="h-5 w-5" />
                </div>
                <div>
                  <h6 className="m-0 font-bold text-gray-900 text-sm">Editar</h6>
                  <p className="m-0 text-xs text-gray-500">
                    Alterar os detalhes e informações deste produto
                  </p>
                </div>
              </div>
              <Link
                href={`/pantries/${pantryId}/products/${productId}/edit`}
                passHref
              >
                <button
                  onClick={handleCloseMainModal}
                  className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-900 active:scale-[0.98] cursor-pointer"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </button>
              </Link>
            </div>

            {/* Opção: Excluir */}
            <div className="flex items-center justify-between p-4 bg-white">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h6 className="m-0 font-bold text-gray-900 text-sm">Excluir</h6>
                  <p className="m-0 text-xs text-gray-500">
                    Remover este produto permanentemente do sistema
                  </p>
                </div>
              </div>
              <button
                onClick={handleShowDeleteModal}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Excluir
              </button>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-light border-top-0 px-4 py-3 flex justify-end gap-2">
          <button
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-200 hover:bg-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition active:scale-[0.98] cursor-pointer"
            onClick={handleCloseMainModal}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este produto? Esta ação não pode ser
          desfeita.
          {successMessage && (
            <div
              className="alert alert-success mt-3 d-flex align-items-center mb-0"
              role="alert"
            >
              {successMessage}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 transition disabled:opacity-50 cursor-pointer"
            onClick={handleCloseDeleteModal}
            disabled={!!successMessage}
          >
            Cancelar
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-full bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            onClick={handleConfirmDelete}
            disabled={!!successMessage}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Confirmar Exclusão
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// ==========================================
// COMPONENTE: MODAL DE DISPENSA
// ==========================================
export function Modal_function_pratries({
  pantryId,
  pantryName = "[Nome da Dispensa]",
}) {
  const { user } = useAuth();
  const [showMainModal, setShowMainModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseMainModal = () => setShowMainModal(false);
  const handleShowMainModal = () => setShowMainModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleConfirmDelete = async () => {
    await deletePantry(pantryId, user.id);
    setSuccessMessage("Exclusão Realizada com Sucesso!");
    setTimeout(() => {
      setSuccessMessage("");
      handleCloseDeleteModal();
      handleCloseMainModal();
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleShowMainModal}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100 hover:text-indigo-800 active:scale-[0.98] w-full cursor-pointer"
      >
        <Settings className="h-4 w-4" />
        Realizar Alterações Na Dispensa
      </button>

      {/* Modal Principal Redesenhado */}
      <Modal
        show={showMainModal}
        onHide={handleCloseMainModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-bottom-0 pt-4 px-4">
          <Modal.Title className="fw-bold fs-3 text-dark">
            {pantryName}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 pb-4">
          <p className="text-uppercase text-muted fw-bold small tracking-wider mb-3">
            Ações Disponíveis para esta Dispensa:
          </p>

          {/* Container Unificado de Opções */}
          <div className="border rounded-3 overflow-hidden bg-light">
            {/* Opção: Editar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Pencil className="h-5 w-5" />
                </div>
                <div>
                  <h6 className="m-0 font-bold text-gray-900 text-sm">Editar</h6>
                  <p className="m-0 text-xs text-gray-500">
                    Alterar as configurações e dados desta dispensa
                  </p>
                </div>
              </div>
              <Link href={`/pantries/${pantryId}/edit`} passHref>
                <button
                  onClick={handleCloseMainModal}
                  className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-900 active:scale-[0.98] cursor-pointer"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </button>
              </Link>
            </div>

            {/* Opção: Excluir */}
            <div className="flex items-center justify-between p-4 bg-white">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h6 className="m-0 font-bold text-gray-900 text-sm">Excluir</h6>
                  <p className="m-0 text-xs text-gray-500">
                    Apagar permanentemente a dispensa e seus vínculos
                  </p>
                </div>
              </div>
              <button
                onClick={handleShowDeleteModal}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Excluir
              </button>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-light border-top-0 px-4 py-3 flex justify-end gap-2">
          <button
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-200 hover:bg-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition active:scale-[0.98] cursor-pointer"
            onClick={handleCloseMainModal}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir esta dispensa? Esta ação não pode
          ser desfeita.
          {successMessage && (
            <div
              className="alert alert-success mt-3 d-flex align-items-center mb-0"
              role="alert"
            >
              {successMessage}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 transition disabled:opacity-50 cursor-pointer"
            onClick={handleCloseDeleteModal}
            disabled={!!successMessage}
          >
            Cancelar
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-full bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            onClick={handleConfirmDelete}
            disabled={!!successMessage}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Confirmar Exclusão
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
