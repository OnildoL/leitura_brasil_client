import Modal from "react-modal"
import { useState } from "react"

import closeImg from "../../../assets/Img/close.svg"

import { Container, Content, Summary } from "./styles"
import { api } from "../../../services/api"
import { v4 } from "uuid"

export function ModalSector({ isOpen, onRequestClose, sector, sectors }) {
  const [requestsAndNotes, SetRequestsAndNotes] = useState([])
  const [sectorTotalPerMonth, setSectorTotalPerMonth] = useState([])
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)
  
  const [totalSectorGoal, setTotalSectorGoal] = useState(0)
  const [totalSectorRequest, setTotalSectorRequest] = useState(0)
  const [totalSectorInput, setTotalSectorInput] = useState(0)

  function filtersConsolidatedBySector({ response, sector }) {
    const totalSector = []
    const sectors = [sector]
    
    for (const sector of sectors) {
      const result = response.data.filter(data => data.sector === sector)

      for (const goal_month of result) {
        const { goal, id } = goal_month

        const { request } = goal_month.requests.reduce((accumulator, { request_value }) => {
        accumulator.request = accumulator.request + Number(request_value) || Number(request_value)
        return accumulator
        }, {})

        const { note } = goal_month.notes.reduce((accumulator, { note_value }) => {
        accumulator.note = accumulator.note + Number(note_value) || Number(note_value)
        return accumulator
        }, {})

        totalSector.push({
          id,
          goal,
          sector: sector,
          month: goal_month.month,
          request: request ?? 0,
          input: note ?? 0
        })
      }

      const { goal, request, input } = totalSector.reduce((accumulator, { goal, request, input }) => {
        accumulator.goal = accumulator.goal + Number(goal) || Number(goal)
        accumulator.request = accumulator.request + request || request
        accumulator.input = accumulator.input + input || input

        return accumulator
      }, {})

      setTotalSectorGoal(goal)
      setTotalSectorRequest(request)
      setTotalSectorInput(input)
    }

    setSectorTotalPerMonth(totalSector)
  }

  function listRequestsAndNotes({ response }) {
    const requestNotes = []
    for (const request_note of response.data) {
      for (const request of request_note.requests) {
        const note = request_note.notes.find(note => note.requests_inputs_id === request.request_id)
        requestNotes.push({
          id: v4(),
          year: request_note.year,
          ...request,
          ...note
        })
      }
    }
    console.log(requestNotes)
    SetRequestsAndNotes(requestNotes)
  }

  function handleOpenGoalsModal({ year, sector, store }) {
    api.get(`/goals/consolidated/${year}/${store}`)
      .then(response => {
        filtersConsolidatedBySector({ response, sector })
      })
      .catch(error => console.log(error))

    api.get(`/goals/consolidated/${year}/${store}/${sector}`)
      .then(response => {
        listRequestsAndNotes({ response })
      })
      .catch(error => console.log(error))

    setIsGoalsModalOpen(true)
  }

  function handleCloseGoalsModal() {
    setIsGoalsModalOpen(false)
  }

  return (
    <>
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

        <h2>{sector?.toUpperCase()}</h2>

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
                        onClick={() => handleOpenGoalsModal({
                          year: sector.year,
                          sector: sector.sector,
                          store: sector.store
                        })}
                        type="button"
                      >
                        <i className="uil uil-search-alt"></i>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </Modal>

      <Modal
        isOpen={isGoalsModalOpen}
        onRequestClose={handleCloseGoalsModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-goals"
      >
        <button 
          type="button" 
          onClick={handleCloseGoalsModal} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container>
          <Content>
            <h2>METAS {sector?.toUpperCase()}</h2>

            <table>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Meta</th>
                  <th>Pedido</th>
                  <th>Entrada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                  sectorTotalPerMonth.map(sector => {
                    return (
                      <tr key={sector.id}>
                        <td>{sector.month}</td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              minimumFractionDigits: 0, 
                              maximumFractionDigits: 0, 
                              style: 'currency',
                              currency: 'BRL'
                            }).format(sector.goal ?? 0)
                          } 
                        </td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              minimumFractionDigits: 0, 
                              maximumFractionDigits: 0, 
                              style: 'currency',
                              currency: 'BRL'
                            }).format(sector.request ?? 0)
                          } 
                        </td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              minimumFractionDigits: 0, 
                              maximumFractionDigits: 0, 
                              style: 'currency',
                              currency: 'BRL'
                            }).format(sector.input ?? 0)
                          } 
                        </td>
                        <td>
                          <button
                            className="button"
                            type="button"
                          >
                            <i className="uil uil-pen"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <Summary>
              <div>
                <header>
                  <p>Total metas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0,
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalSectorGoal)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total pedidos</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0,
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalSectorRequest)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total entradas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0, 
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalSectorInput)}
                </strong>
              </div>
            </Summary>

            <h2>CONSOLIDADO DO ANO</h2>

            <table>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Meta</th>
                  <th>Pedido</th>
                  <th>Entrada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>FEV</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                </tr>
              </tbody>
            </table>

            <Summary>
              <div>
                <header>
                  <p>Total metas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total pedidos</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total entradas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
            </Summary>

            <h2>PEDIDOS {sector?.toUpperCase()}</h2>

            <table>
              <thead>
                <tr>
                  <th>Referência</th>
                  <th>Fornecedor</th>
                  <th>Mês</th>
                  <th>Valor Pedido</th>
                  <th>Valor Nota</th>
                  <th>Número</th>
                  <th>Emissão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                  requestsAndNotes.map(request_note => {
                    return (
                      <tr key={request_note.id}>
                        <td>{request_note.year}</td>
                        <td>{request_note.request_provider}</td>
                        <td>{request_note.request_month}</td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(request_note.request_value ?? 0)
                          }  
                        </td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(request_note.note_value ?? 0)
                          }  
                        </td>
                        <td>{request_note.nf}</td>
                        <td>{request_note.issue}</td>
                        <td>
                          <button
                            className="button"
                            type="button"
                          >
                            <i className="uil uil-search-alt"></i>
                          </button>
                          <button
                            className="button"
                            type="button"
                          >
                            <i className="uil uil-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </Content>
        </Container>

      </Modal>
    </>
  )
}