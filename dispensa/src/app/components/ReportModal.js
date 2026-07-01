"use client";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ClipboardList, FileText, User } from "lucide-react";

export function ReportModal({ products, pantryName }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Filter out products that might not have valid data if needed
  const validProducts = products || [];

  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition hover:scale-[1.02] active:scale-[0.98]"
        title="Relatório de Inserções"
      >
        <ClipboardList className="h-4 w-4" />
        <span className="d-none d-md-inline">Relatório</span>
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-bottom-0 pt-4 px-4 pb-0">
          <Modal.Title className="fw-bold fs-4 text-dark flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-600" />
            Relatório de Inserções
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="px-4 pb-4 pt-2">
          <p className="text-muted small mb-4">
            Histórico de itens adicionados na despensa <strong>{pantryName}</strong>.
          </p>

          <div className="bg-light rounded-3 border overflow-hidden">
            <div className="max-h-[60vh] overflow-y-auto">
              {validProducts.length === 0 ? (
                <div className="p-5 text-center text-gray-500 text-sm">
                  Nenhum produto cadastrado nesta despensa ainda.
                </div>
              ) : (
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 sticky top-0 border-b border-gray-200 shadow-sm z-10">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 w-2/5">Produto</th>
                      <th className="px-4 py-3 font-semibold text-gray-900 w-1/5 text-center">Adicionado</th>
                      <th className="px-4 py-3 font-semibold text-gray-900 w-2/5">Usuário</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {validProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-medium text-gray-900">{p.name}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium text-xs">
                            {p.initial_quantity || p.quantity || "N/D"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-gray-100 text-gray-500">
                              <User className="h-3 w-3" />
                            </div>
                            <span className="text-gray-700">
                              {p.added_by_username || "Desconhecido"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-top-0 px-4 py-3">
          <button
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition active:scale-[0.98]"
            onClick={handleClose}
          >
            Fechar Relatório
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
