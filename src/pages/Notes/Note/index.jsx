import { useCallback, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"
import { useNotification } from "../../../hooks/useNotification"
import { dateMask, initialDateMask } from "../../../utils/masks"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"
import { FormContainer } from "./styles"
import { api } from "../../../services/api";

export function Note({ isOpen, onRequestClose, note }) {
  useWithSSRAuth()

  const dispatch = useNotification()

  const handleKeyUpDateMask = useCallback((e) => {
    dateMask(e)
  }, [])

  const [input, setInput] = useState("")

  function handleUpdateNote(event) {
    event.preventDefault()

    const update = {
      access_key: note.access_key,
      input: !input ? note.input : input === "0" ? "" : initialDateMask(input),
    }
    
    api.put("notes", update)
      .then(response => {
        setInput("")
    
        onRequestClose()

        dispatch({
          type: "success",
          message: `Nota atualizado com sucesso!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar atualizar nota!`,
        })
      })
  }

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
        <p>{note.access_key}</p>

        <FormContainer onSubmit={handleUpdateNote}>
          <div>Entrada</div>

          <input 
            type="text"
            onKeyUp={handleKeyUpDateMask}
            maxLength={10}
            onChange={event => setInput(event.target.value)}
            placeholder={note.input?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1") ?? "Data da entrada"}
          />

          <button type="submit">
            Atualizar
          </button>
        </FormContainer>

      </Modal>
    </>
  )
}