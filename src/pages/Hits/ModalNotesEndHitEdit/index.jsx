import { useCallback, useState } from "react"
import { UilTrashAlt } from '@iconscout/react-unicons'
import Modal from "react-modal"

import closeImg from "../../../assets/Img/close.svg"
import { currency, currencyValue } from "../../../utils/masks"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"
import { Container, FormContainer, SituationTypeContainer, RadioBox } from "./styles"
import { useNotification } from "../../../hooks/useNotification"
import { api } from "../../../services/api"

export function ModalNotesEndHitEdit({ isOpen, onRequestClose, datahit, hitNote }) {
  useWithSSRAuth()

  const dispatch = useNotification()

  const [lastHit, setLastHit] = useState("")
  const [currentHit, setCurrentHIt] = useState("")
  const [salesReport, setSalesReport] = useState("")
  const [valueNerus, setValueNerus] = useState("")
  const [comments, setComments] = useState("")

  const [situationTypeHit, setSituationTypeHit] = useState("")

  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])

  function handleUpdateHit(event) {
    event.preventDefault()

    const update = {
      id: datahit.id,
      last_hit: !lastHit ? datahit.last_hit : lastHit, 
      current_hit: !currentHit ? datahit.current_hit : currentHit, 
      sales_report: !salesReport ? datahit.sales_report : currencyValue(salesReport), 
      value_nerus: !valueNerus ? datahit.value_nerus : currencyValue(valueNerus), 
      comments: !comments ? datahit.comments : comments,
      situation: !situationTypeHit ? datahit.comments : situationTypeHit,
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
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar atualizar dados!`,
        })
      })
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
           
            <div>Último acerto</div>
            
            <input 
              type="date"
              defaultValue={datahit.last_hit}
              onChange={event => setLastHit(event.target.value)}
            />

            <div>Acerto atual</div>

            <input 
              type="date"
              defaultValue={datahit.current_hit}
              onChange={event => setCurrentHIt(event.target.value)}
            />

            <div>Valor vendas</div>

            <input 
              type="text"
              onKeyUp={handleKeyUp}
              maxLength={10}
              defaultValue={datahit.sales_report}
              onChange={event => setSalesReport(event.target.value)}
              placeholder="Valor vendas"
            />
            
            <div>Valor nerus</div>

            <input 
              type="text"
              onKeyUp={handleKeyUp}
              maxLength={10}
              defaultValue={datahit.value_nerus}
              onChange={event => setValueNerus(event.target.value)}
              placeholder="Valor nerus"
            />
            <div>Situação: <span className={datahit.situation}>{datahit.situation?.toUpperCase()}</span></div>
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

            <div>Observações</div>

            <textarea 
              type="text"
              defaultValue={datahit.comments}
              onChange={event => setComments(event.target.value)}
              placeholder="Observações"
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
                <th>Ações</th>
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
                        <button
                          // onClick={() => handleRemoveNoteLinking(note.access_key)}
                          className="buttonTrashAlt"
                          type="button"
                        >
                          <i><UilTrashAlt size="16" /></i>
                        </button>
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