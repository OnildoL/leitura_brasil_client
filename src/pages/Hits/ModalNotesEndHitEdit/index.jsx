import { useCallback, useContext, useEffect, useState } from "react"
import { UilTrashAlt } from '@iconscout/react-unicons'
import Modal from "react-modal"

import closeImg from "../../../assets/Img/close.svg"
import { currency, currencyValue, dateMask, initialDateMask } from "../../../utils/masks"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"
import { Container, FormContainer, SituationTypeContainer, RadioBox } from "./styles"
import { useNotification } from "../../../hooks/useNotification"
import { api } from "../../../services/api"
import { usePermission } from "../../../hooks/usePermission"
import { AuthContext } from "../../../contexts/AuthContext"

export function ModalNotesEndHitEdit({ isOpen, onRequestClose, datahit, hitNote, selectStore }) {
  useWithSSRAuth()

  const dispatch = useNotification()

  const { user } = useContext(AuthContext)

  const { userCanSeeDev } = usePermission()
  const [lastHit, setLastHit] = useState("")
  const [currentHit, setCurrentHIt] = useState("")
  const [salesReport, setSalesReport] = useState("")
  const [valueNerus, setValueNerus] = useState("")
  const [reason, setReason] = useState("")
  const [comments, setComments] = useState("")

  const [situationTypeHit, setSituationTypeHit] = useState("")

  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])
  const handleKeyUpDateMask = useCallback((e) => {
    dateMask(e)
  }, [])

  function handleUpdateHit(event) {
    event.preventDefault()

    if (selectStore && selectStore !== user.store) {
      dispatch({
        type: "error",
        message: "Apenas usuários dessa loja podem alterar os dados!",
      })
      return
    }

    const date = new Intl.DateTimeFormat("pt-BR").format(new Date())

    const update = {
      id: datahit.id,
      last_hit: !lastHit ? datahit.last_hit : lastHit === "0" ? "" : initialDateMask(lastHit), 
      current_hit: !currentHit ? datahit.current_hit : currentHit === "0" ? "" : initialDateMask(currentHit), 
      sales_report: !salesReport ? datahit.sales_report : currencyValue(salesReport), 
      value_nerus: !valueNerus ? datahit.value_nerus : currencyValue(valueNerus),
      reason: !reason ? datahit.reason : reason,
      comments: !comments ? datahit.comments : `${datahit.comments ?? "-" }\n${date}: ${comments}`,
      situation: !situationTypeHit ? datahit.situation : situationTypeHit,
    }

    api.put("hits", update)
      .then(response => {
        setLastHit("")
        setCurrentHIt("")
        setSalesReport("")
        setValueNerus("")
        setComments("")
        setSituationTypeHit("")
    
        onRequestClose()

        dispatch({
          type: "success",
          message: `Acerto atualizado com sucesso!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar atualizar dados!`,
        })
      })
  }

  function handleRemoveNoteLinking(note_id) {
    const reallyWantoRemove = window.confirm("Deseja realmente desvincular essa nota?")

    if (reallyWantoRemove) {
      dispatch({
        type: "success",
        message: "Nota desvinculada com sucesso!",
      })
    }
  }

  return (
    <>
      <Container>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setSituationTypeHit("")
            onRequestClose()
          }}
          overlayClassName="react-modal-overlay"
          className="react-modal-goal-hit"
        >
          <button
            type="button"
            onClick={() => {
              setSituationTypeHit("")
              onRequestClose()
            }}
            className="react-modal-close"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>

          <FormContainer onSubmit={handleUpdateHit}>
            <h2>Editar acerto</h2>
           
            <div title={datahit.last_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")}>Último acerto</div>
            
            <input 
              type="text"
              onKeyUp={handleKeyUpDateMask}
              maxLength={10}
              onChange={event => setLastHit(event.target.value)}
              placeholder={datahit.last_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1") ?? ""}
            />

            <div title={datahit.current_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")}>Acerto atual</div>

            <input 
              type="text"
              onKeyUp={handleKeyUpDateMask}
              maxLength={10}
              onChange={event => setCurrentHIt(event.target.value)}
              placeholder={datahit.current_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1") ?? ""}
            />

            <div>Valor vendas</div>

            <input 
              type="text"
              onKeyUp={handleKeyUp}
              maxLength={10}
              // defaultValue={datahit.sales_report}
              onChange={event => setSalesReport(event.target.value)}
              placeholder={datahit.sales_report ?? 0}
            />
            
            <div>Valor nerus</div>

            <input 
              type="text"
              onKeyUp={handleKeyUp}
              maxLength={10}
              // defaultValue={datahit.value_nerus}
              onChange={event => setValueNerus(event.target.value)}
              placeholder={datahit.value_nerus ?? 0}
            />

            <div>Motivo</div>

            <input 
              type="text"
              onChange={event => setReason(event.target.value)}
              placeholder={datahit.reason ?? ""}
            />

            <div>
              Situação:&nbsp;
              <span className={datahit.situation}>{datahit.situation?.toUpperCase()}</span>
            </div>
            <SituationTypeContainer>
              <RadioBox
                type="button"
                onClick={() => { setSituationTypeHit("ok") }}
                isActive={situationTypeHit === "ok"}
                activeColor="green"
              >
                <span>OK</span>
              </RadioBox>

              <RadioBox
                type="button"
                onClick={() => { setSituationTypeHit("duvida") }}
                isActive={situationTypeHit === "duvida"}
                activeColor="red"
              >

                <span>Dúvida</span>
              </RadioBox>
            </SituationTypeContainer>

            <div title={datahit.comments}>Observações</div>

            <textarea 
              type="text"
              // defaultValue={datahit.comments}
              onChange={event => setComments(event.target.value)}
              placeholder={datahit.comments ?? "Digite aqui..."}
            />

            <button type="submit">
              Atualizar
            </button>
          </FormContainer>

          <h2>Notas vinculadas</h2>
          
          <table>
            <thead>
              <tr>
                <th>Nota fiscal</th>
                <th>Valor total</th>
                <th>Emissão</th>
                {userCanSeeDev && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {
                hitNote.map(note => {
                  return (
                    <tr key={note.note_id}>
                      <td>{note.nf}</td>
                      <td>
                        {
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          }).format(note.note_value ?? 0)
                        }  
                      </td>
                      <td>
                        {
                          new Intl.DateTimeFormat("pt-BR", { 
                            dateStyle: "short", 
                          }).format(new Date(note.issue))
                        }  
                      </td>
                      <td>
                        {userCanSeeDev && <button
                          onClick={() => handleRemoveNoteLinking(hitNote.note_id)}
                          className="buttonTrashAlt"
                          type="button"
                        >
                          <i><UilTrashAlt size="16" /></i>
                        </button>}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </Modal>
      </Container>
    </>
  )
}