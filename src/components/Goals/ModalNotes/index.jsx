import Modal from "react-modal"
import { useCallback } from "react"

import closeImg from "../../../assets/Img/close.svg"

import { currency } from "../../../utils/masks"
import { Container, FormContainer } from "./styles"

export function ModalNotes({ isOpen, onRequestClose, goals, notes }) {
  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-goal-note"
      >
        <button 
          type="button" 
          onClick={onRequestClose} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <FormContainer>
          <h2>Pedido</h2>

          <input 
            type="text"
            placeholder="Fornecedor"
          />

          <select required>
            <option value="">-- Escolher mês referência --</option>
            {
              goals.map(goal => {
                return (
                  <option key={goal.id} value={goal.id}>{`${new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0, 
                    style: 'currency',
                    currency: 'BRL'
                  }).format(goal.goal ?? 0)} - ${goal.month}`}</option>
                )
              })
            }
          </select>
          
          <input 
            type="text"
            onKeyUp={handleKeyUp}
            maxLength={10}
            placeholder="Valor pedido"
          />

          <button type="submit">
            Atualizar
          </button>
        </FormContainer>

        <h2>Notas fiscais</h2>
        <table>
          <thead>
            <tr>
              <th>Valor total</th>
              <th>Nota fiscal</th>
              <th>Emissão</th>
            </tr>
          </thead>
          <tbody>
            {
              notes.map(note => {
                return (
                  <tr>
                    <td>
                    {
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(note.value ?? 0)
                    }
                    </td>
                    <td>{note.nf}</td>
                    <td>
                    {
                      note.issue && new Intl.DateTimeFormat('pt-BR', { 
                        dateStyle: "short", 
                      }).format(new Date(note.issue))
                    }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Modal>
    </Container>
  )
}
