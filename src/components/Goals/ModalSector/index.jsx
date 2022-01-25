import Modal from "react-modal"
import { UilSearchAlt, UilTrashAlt, UilPen, UilUsdCircle, UilShoppingCartAlt } from '@iconscout/react-unicons'
import { useCallback, useContext, useState } from "react"

import closeImg from "../../../assets/Img/close.svg"

import { Container, Content, FormContainer, Summary } from "./styles"
import { api } from "../../../services/api"
import { v4 } from "uuid"
import { currency, currencyValue } from "../../../utils/masks"
import { AuthContext } from "../../../contexts/AuthContext"
import { useNotification } from "../../../hooks/useNotification"

export function ModalSector({ isOpen, onRequestClose, sector, sectors }) {
  const { user } = useContext(AuthContext)
  const dispatch = useNotification()
  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])

  const [goalsIdPerMonth, setGoalsIdPerMonth] = useState([])

  const [requestsAndNotes, SetRequestsAndNotes] = useState([])
  const [sectorTotalPerMonth, setSectorTotalPerMonth] = useState([])
  const [consolidation, setConsolidation] = useState({})
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false)
  
  const [provider, setProvider] = useState("")
  const [monthRequest, setMonthRequest] = useState("")
  const [requestValue, setRequestValue] = useState("")

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
    
    SetRequestsAndNotes(requestNotes)
  }

  function handleOpenGoalsModal({ year, sector, store }) {
    api.get(`/goals/consolidated/${year}/${store}`)
      .then(response => {
        filtersConsolidatedBySector({ response, sector })
      })
      .catch(error => console.log(error))

    api.get(`/goals/consolidation/${year}/${store}`)
      .then(response => {
        setConsolidation(response.data)
      })
      .catch(error => console.log(error))

    api.get(`/goals/consolidated/${year}/${store}/${sector}`)
      .then(response => {
        listRequestsAndNotes({ response })
      })
      .catch(error => console.log(error))

    api.get(`requests/${year}/${sector}/${store}/`)
      .then(response => setGoalsIdPerMonth(response.data))
      .catch(error => console.log(error))

    setIsGoalsModalOpen(true)
  }

  function handleCloseGoalsModal() {
    setIsGoalsModalOpen(false)
  }

  function handleOpenNewRequestModal() {
    setIsNewRequestModalOpen(true)
  }

  function handleCloseNewRequestModal() {
    setIsNewRequestModalOpen(false)
  }

  async function handleCreateNewRequest(event) {
    event.preventDefault()
    const { id, month, year } = goalsIdPerMonth.find(goal => goal.id === Number(monthRequest))

    const data = { 
      provider,
      month: month,
      year: `${new Date().getFullYear()}`, 
      request_value: currencyValue(requestValue), 
      store: user.store,
      goals_id: id
    }
    
    api.post("requests", data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Pedido cadastrado!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: error.response.data.message,
        })
      })

    setProvider("")
    setMonthRequest("")
    setRequestValue("")
    
    handleCloseNewRequestModal()
    handleCloseGoalsModal()
    handleOpenGoalsModal({ year, sector, store: user.store })
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
                        <i><UilSearchAlt size="16"/></i>
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
            {sectors[0]?.store === user?.store && <button
              className="button"
              onClick={handleOpenNewRequestModal}
              type="button"
            >
              <i className="table__icon"><UilShoppingCartAlt size="16"/></i>
              Novo pedido
            </button>}

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
                            className="button_icon"
                            type="button"
                          >
                            <i><UilPen size="16"/></i>
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
                  <i><UilUsdCircle /></i>
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
                  <i><UilUsdCircle /></i>
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
                  <i><UilUsdCircle /></i>
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
                {
                  consolidation.consolidated?.map(month => {
                    return (
                      <tr key={month.id}>
                        <td>{month.month}</td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              minimumFractionDigits: 0, 
                              maximumFractionDigits: 0, 
                              style: 'currency',
                              currency: 'BRL'
                            }).format(month.goal ?? 0)
                          } 
                        </td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              minimumFractionDigits: 0, 
                              maximumFractionDigits: 0, 
                              style: 'currency',
                              currency: 'BRL'
                            }).format(month.request ?? 0)
                          } 
                        </td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              minimumFractionDigits: 0, 
                              maximumFractionDigits: 0, 
                              style: 'currency',
                              currency: 'BRL'
                            }).format(month.note ?? 0)
                          } 
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
                  <i><UilUsdCircle /></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0, 
                    style: 'currency',
                    currency: 'BRL'
                  }).format(consolidation.totals?.goal)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total pedidos</p>
                  <i><UilUsdCircle /></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0, 
                    style: 'currency',
                    currency: 'BRL'
                  }).format(consolidation.totals?.request)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total entradas</p>
                  <i><UilUsdCircle /></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0, 
                    style: 'currency',
                    currency: 'BRL'
                  }).format(consolidation.totals?.input)}
                </strong>
              </div>
            </Summary>

            <h2>PEDIDOS {sector?.toUpperCase()}</h2>
            
            <table id="table-notes">
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
                        <td>
                          {request_note.issue && new Intl.DateTimeFormat('pt-BR', { 
                              dateStyle: "short", 
                            }).format(new Date(request_note.issue))
                          }
                        </td>
                        <td>
                          <button
                            className="button_icon"
                            type="button"
                          >
                            <i><UilSearchAlt size="16"/></i>
                          </button>
                          <button
                            className="button_icon"
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
          </Content>
        </Container>

      </Modal>
      <Modal
        isOpen={isNewRequestModalOpen}
        onRequestClose={handleCloseNewRequestModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button 
          type="button" 
          onClick={handleCloseNewRequestModal} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <FormContainer onSubmit={handleCreateNewRequest}>
          <h2>Cadastrar pedido</h2>

          <input
            type="text"
            placeholder="Fornecedor"
            onChange={event => setProvider(event.target.value)}
            required
          />

          <input
            type="text"
            onKeyUp={handleKeyUp}
            onChange={event => setRequestValue(event.target.value)}
            placeholder="Valor do pedido"
            required
          />

          <select onChange={event => setMonthRequest(event.target.value)} required>
            <option value="">-- Escolher mês referência --</option>
            {
              goalsIdPerMonth.map(goal_id => {
                return (
                  <option key={goal_id.id} value={goal_id.id}>{`${new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0, 
                    style: 'currency',
                    currency: 'BRL'
                  }).format(goal_id.goal ?? 0)} - ${goal_id.month}`}</option>
                )
              })
            }
          </select>

          <button type="submit">
            Cadastrar
          </button>
        </FormContainer>
      </Modal>
    </>
  )
}