import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"

export function Note({ isOpen, onRequestClose, note }) {
  return (
    <>
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

        <h2>Editar nota</h2>
        <p>{note}</p>
      </Modal>
    </>
  )
}