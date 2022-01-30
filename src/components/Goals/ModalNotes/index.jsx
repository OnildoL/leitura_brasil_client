import Modal from "react-modal"
import { useCallback, useState } from "react"

import closeImg from "../../../assets/Img/close.svg"

import { currency, currencyValue } from "../../../utils/masks"
import { Container, FormContainer } from "./styles"
import { api } from "../../../services/api"
import { useNotification } from "../../../hooks/useNotification"
import { usePermission } from "../../../hooks/usePermission"

export function ModalNotes({ isOpen, onRequestClose, goal, goals, notes, requestId }) {
  const [goalId, setGoalId] = useState(0)
  const [requestValue, setRequestValue] = useState("")
  const [accessKey, setAccessKey] = useState("")

  const dispatch = useNotification()
  const { userCanSeeAdmin } = usePermission()

  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])

  function handleUpdateRequest(event) {
    event.preventDefault()

    if (!goalId && !requestValue) {
      dispatch({
        type: "error",
        message: `Preencher campos!`,
      })

      return
    }

    const [goals_id, month] = goalId.split(",")

    const data = { 
      goals_id: !goalId ? goal.goals_id : Number(goals_id),
      month: !goalId ? goal.request_month : month,
      id: requestId,
      request_value: !requestValue ? goal.request_value: currencyValue(requestValue) 
    }
    
    api.put("requests", data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Pedido atualizado!`,
        })

        onRequestClose()
      })
      .catch(error => console.log(error))
  }

  function handleLinkNote(event) {
    event.preventDefault()

    const data = { requests_inputs_id: requestId, access_key: accessKey }

    api.put("requests/link", data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Nota vinculada!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: error.response.data.message,
        })
      })

    setAccessKey("")
  }
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

        {userCanSeeAdmin && <FormContainer onSubmit={handleUpdateRequest}>
          <h2>Pedido</h2>

          <select onChange={event => setGoalId(event.target.value)}>
            <option value="">-- Escolher mês referência --</option>
            {
              goals.map(goal => {
                return (
                  <option key={goal.id} value={`${goal.id},${goal.month}`}>{`${new Intl.NumberFormat('pt-BR', {
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
            onChange={event => setRequestValue(event.target.value)}
            placeholder="Valor pedido"
          />

          <button type="submit">
            Atualizar
          </button>
        </FormContainer>}

        <details>
          <summary>Vincular nota</summary>
          <FormContainer onSubmit={handleLinkNote}>
            <h2>Vincular nota</h2>

            <input 
              type="text"
              maxLength={44}
              onChange={event => setAccessKey(event.target.value)}
              placeholder="Chave de acesso"
              required
            />

            <button type="submit">
              Vincular
            </button>
          </FormContainer>
        </details>

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
