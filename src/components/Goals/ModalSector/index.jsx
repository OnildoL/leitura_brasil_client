import { useEffect, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"

export function ModalSector({ isOpen, onRequestClose, sector, sectors }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <h2>{sector.toUpperCase()}</h2>

      <table className="table_modal">
        <thead>
          <tr>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            sectors.map(sector => {
              return (
                <tr key={sector.id}>
                  <td>{sector.year}</td>
                  <td>{sector.sector}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </Modal>
  )
}