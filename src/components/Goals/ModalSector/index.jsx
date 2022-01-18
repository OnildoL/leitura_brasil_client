import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"

export function ModalSector({ isOpen, onRequestClose, sector, sectors }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-table-goals"
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
            <th>Loja</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            sectors.map(sector => {
              return (
                <tr key={sector.id}>
                  <td>{sector.year}</td>
                  <td>{sector.store}</td>
                  <td className="button_icon">
                    <button
                      type="button"
                    >
                      <i className="uil uil-search-alt"></i>
                    </button>
                    <button
                      type="button"
                    >
                      <i className="uil uil-chart-line"></i>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </Modal>
  )
}