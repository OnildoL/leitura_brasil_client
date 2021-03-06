import Modal from "react-modal"
import { CSVLink } from "react-csv"
import { v4 } from "uuid"
import { UilSearchAlt, UilChartLine, UilTrashAlt, UilExport, UilEdit, UilUsdCircle, UilShoppingCartAlt } from '@iconscout/react-unicons'
import { useCallback, useContext, useState } from "react"
import closeImg from "../../../assets/Img/close.svg"
import { Container, Content, FormContainer, Summary, SummaryConsolidation } from "./styles"
import { api } from "../../../services/api"
import { currency, currencyValue } from "../../../utils/masks"
import { AuthContext } from "../../../contexts/AuthContext"
import { useNotification } from "../../../hooks/useNotification"
import { usePermission } from "../../../hooks/usePermission"
import { ModalNotes } from "../ModalNotes"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"

const headers_requests = [
  { label: "Ano", key: "year" },
  { label: "Mês", key: "request_month" },
  { label: "Fornecedor", key: "request_provider" },
  { label: "Valor Pedido", key: "request_value" },
  { label: "Valor Nota", key: "note_value" },
  { label: "Nota Fiscal", key: "nf" },
  { label: "Emissão", key: "issue" },
]

export function ModalSector({ isOpen, onRequestClose, sector, sectors }) {
  useWithSSRAuth()
  const { user } = useContext(AuthContext)
  const dispatch = useNotification()
  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])
  const { userCanSeeAdmin, userCanSeeDev } = usePermission()
  const [order, setOrder] = useState("ASC")
  const [goalsIdPerMonth, setGoalsIdPerMonth] = useState([])
  const [requestsAndNotes, SetRequestsAndNotes] = useState([])
  const [sectorTotalPerMonth, setSectorTotalPerMonth] = useState([])
  const [consolidation, setConsolidation] = useState({})
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)
  const [isConsolidatedModalOpen, setIsConsolidatedModalOpen] = useState(false)
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false)
  const [isUpdateGoalModalOpen, setIsUpdateGoalModalOpen] = useState(false)
  const [updateGoal,setUpdateGoal] = useState("")
  const [idGoal,setIdGoal] = useState("")
  const [provider, setProvider] = useState("")
  const [monthRequest, setMonthRequest] = useState("")
  const [requestValue, setRequestValue] = useState("")
  const [totalSectorGoal, setTotalSectorGoal] = useState(0)
  const [totalSectorRequest, setTotalSectorRequest] = useState(0)
  const [totalSectorInput, setTotalSectorInput] = useState(0)

  const monthNumber = [
    {monthNumber: 1, FEV: 1, month: "FEV"}, 
    {monthNumber: 2, MAR: 2, month: "MAR"}, 
    {monthNumber: 3, ABR: 3, month: "ABR"}, 
    {monthNumber: 4, MAI: 4, month: "MAI"}, 
    {monthNumber: 5, JUN: 5, month: "JUN"}, 
    {monthNumber: 6, JUL: 6, month: "JUL"}, 
    {monthNumber: 7, AGO: 7, month: "AGO"}, 
    {monthNumber: 8, SET: 8, month: "SET"}, 
    {monthNumber: 9, OUT: 9, month: "OUT"}, 
    {monthNumber: 10, NOV: 10, month: "NOV"}, 
    {monthNumber: 11, DEZ: 11, month: "DEZ"}, 
    {monthNumber: 12, JAN: 12, month: "JAN"}
  ]
  const findNumberMonth = (months, mth) => months.find(month => month.month === mth)
  const sortingString = (col) => {
    if (order === "ASC") {
      const sorted = [...requestsAndNotes].sort((a, b) => 
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      )
      SetRequestsAndNotes(sorted)
      setOrder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...requestsAndNotes].sort((a, b) => 
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      )
      SetRequestsAndNotes(sorted)
      setOrder("ASC")
    }
  }
  const sortingMonth = (col) => {
    if (order === "ASC") {
      const sorted = [...requestsAndNotes].sort((a, b) => {
        const a_month = findNumberMonth(monthNumber, a[col])
        const b_month = findNumberMonth(monthNumber, b[col])
        return a_month.monthNumber > b_month.monthNumber ? 1 : -1
      })
      SetRequestsAndNotes(sorted)
      setOrder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...requestsAndNotes].sort((a, b) => { 
        const a_month = findNumberMonth(monthNumber, a[col])
        const b_month = findNumberMonth(monthNumber, b[col])
        return a_month.monthNumber < b_month.monthNumber ? 1 : -1
      })
      SetRequestsAndNotes(sorted)
      setOrder("ASC")
    }
  }
  // const [goalSort, setGoalSort] = useState([])
  // const sortingMonthDefault = (col, data) => {
  //   if (order === "ASC") {
  //     const sorted = [...data].sort((a, b) => {
  //       const a_month = findNumberMonth(monthNumber, a[col])
  //       const b_month = findNumberMonth(monthNumber, b[col])
  //       return a_month.monthNumber > b_month.monthNumber ? 1 : -1
  //     })
  //     setGoalSort(sorted)
  //   }
  // }
  const sortingNumber = (col) => {
    if (order === "ASC") {
      const sorted = [...requestsAndNotes].sort((a, b) => 
        Number(a[col]) > Number(b[col]) ? 1 : -1
      )
      SetRequestsAndNotes(sorted)
      setOrder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...requestsAndNotes].sort((a, b) => 
        Number(a[col]) < Number(b[col]) ? 1 : -1
      )
      SetRequestsAndNotes(sorted)
      setOrder("ASC")
    }
  }

  function filtersConsolidatedBySector({ response }) {
    const { goal, request, input, totalSector } = response.data

    setTotalSectorGoal(goal)
    setTotalSectorRequest(request)
    setTotalSectorInput(input)

    // sortingMonthDefault("month", totalSector)
    setSectorTotalPerMonth(totalSector)
  }

  function listRequestsAndNotes(response) {
    const requestNotes = []
    for (const request_note of response.data) {
      for (const request of request_note.requests) {
        const note = request_note.notes
          .filter(note => note.requests_inputs_id === request.request_id)
          .reduce((accumulator, { note_value, issue, note_id, requests_inputs_id }) => {
            accumulator.note_value = accumulator.note_value + Number(note_value) || Number(note_value)
            accumulator.requests_inputs_id = requests_inputs_id
            accumulator.note_id = note_id
            accumulator.issue = issue
    
            return accumulator
          }, {})

        const nf = request_note.notes
          .filter(note => note.requests_inputs_id === request.request_id)
          .sort(function(a, b) { return Number(b.note_value) - Number(a.note_value) })[0]

        requestNotes.push({
          id: v4(),
          year: request_note.year,
          nf: !nf ? "" : nf.nf,
          input: !nf ? "" : nf.input,
          ...request,
          ...note
        })
      }
    }
    
    SetRequestsAndNotes(requestNotes)
  }

  function handleOpenConsolidated({ year, store }) {
    api.get(`/goals/consolidation/${year}/${store}`)
      .then(response => {
        setConsolidation(response.data)
      })
      .catch(error => console.log(error))

    setIsConsolidatedModalOpen(true)
  }

  function handleCloseConsolidated() {
    setIsConsolidatedModalOpen(false)
  }

  const [dataSelected, setDataSelected] = useState({})

  function handleOpenGoalsModal({ year, sector, store }) {
    api.get(`/goals/consolidate/${year}/${store}/${sector}`)
      .then(response => {
        filtersConsolidatedBySector({ response })
      })
      .catch(error => console.log(error))
    
    setDataSelected({ year, sector, store })
    api.get(`/goals/consolidated/${year}/${store}/${sector}`)
      .then(response => listRequestsAndNotes(response))
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

  function handleOpenUpdateGoalModal(id) {
    setIdGoal(id)
    setIsUpdateGoalModalOpen(true)
  }

  function handleCloseUpdateGoalModal() {
    setIsUpdateGoalModalOpen(false)
  }

  function handleCreateNewRequest(event) {
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
          message: `Já existe pedido cadastrado`,
        })
      })

    setProvider("")
    setMonthRequest("")
    setRequestValue("")
    
    handleCloseNewRequestModal()
    handleCloseGoalsModal()
    handleOpenGoalsModal({ year, sector, store: user.store })
  }

  function handleUpdateGoal(event) {
    event.preventDefault()
    const data = { goal: currencyValue(updateGoal), id: idGoal }
    
    api.put("goals", data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Meta atualizada!`,
        })
      })
      .catch(error => console.log(error))
    
    handleCloseUpdateGoalModal()
    handleCloseGoalsModal()
  }

  const [notes, setNotes] = useState([])
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [requestId, setRequestId] = useState(0)
  const [requestData, setRequestData] = useState(0)

  function handleOpenNotesModal() {
    setIsNotesModalOpen(true)
  }
  function handleCloseNotesModal() {
    setIsNotesModalOpen(false)
  }
  function viewNote(request) {
    const requestInputsId = request.requests_inputs_id
    setRequestId(request.requests_inputs_id ?? request.request_id)

    setRequestData(request)
    
    api.get(`notes/${!requestInputsId ? request.request_id : requestInputsId}`)
      .then(response => {
        setNotes(response.data)

        handleOpenNotesModal()
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro interno ao tentar puxar notas vinculadas ao pedido!",
        })
        setNotes([])
        handleOpenNotesModal()
      })
  }

  function handleRemoveRequest(request_id) {
    const reallyWantoRemove = window.confirm("Deseja realmente remover esse pedido?")
    const { year, store, sector } = dataSelected

    const data = { id: request_id }

    if (reallyWantoRemove) {
      api.put(`requests/remove/request`, data)
      .then(response => {

        api.get(`/goals/consolidate/${year}/${store}/${sector}`)
          .then(response => filtersConsolidatedBySector({ response }))
          .catch(error => console.log(error))

        api.get(`/goals/consolidated/${year}/${store}/${sector}`)
          .then(response => listRequestsAndNotes(response))
          .catch(error => console.log(error))

        dispatch({
          type: "success",
          message: "Pedido removido com sucesso!",
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Falha ao tentar remover o pedido, verifique se existe nota vinculada!",
        })
      })
    }
  }

  function handleRemoveGoal(goal_id) {
    const reallyWantoRemove = window.confirm("Deseja realmente remover essa meta?")

    const data = { id: goal_id }

    if (reallyWantoRemove) {
      api.put("goals/remove", data)
        .then(response => {
          dispatch({
            type: "success",
            message: "Meta removida com sucesso!",
          })
        })
        .catch(error => {
          dispatch({
            type: "error",
            message: "Erro ao tentar remover a meta, verificar se existe pedidos vinculados!",
          })
        })
    }
  }

  const csvReportRequests = {
    filename: `${Date.now()}.csv`,
    headers: headers_requests,
    data: requestsAndNotes,
    separator: ";"
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
              sectors.sort((a, b) => parseInt(a.year) < parseInt(b.year) ? 1 : -1).map(sector => {
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
                      <button
                      onClick={() => handleOpenConsolidated({ 
                        year: sector.year, 
                        store: sector.store 
                      })}
                        type="button"
                      >
                        <i><UilChartLine size="16"/></i>
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

            <table>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Meta</th>
                  <th>Pedido</th>
                  <th>Entrada</th>
                  {userCanSeeAdmin && <th>Ações</th>}
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
                        {userCanSeeAdmin && <td>
                          <button
                            className="button_icon"
                            onClick={() => handleOpenUpdateGoalModal(sector.id)}
                            type="button"
                          >
                            <i><UilEdit size="16"/></i>
                          </button>
                          <button
                            className="button_icon"
                            onClick={() => handleRemoveGoal(sector.id)}
                            type="button"
                          >
                            <i><UilTrashAlt size="16"/></i>
                          </button>
                        </td>}
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

            <Summary>
              <section>
                {
                  sectors[0]?.store === user?.store && userCanSeeAdmin && <button
                  className="button"
                  onClick={handleOpenNewRequestModal}
                  type="button"
                >
                  <i className="table__icon"><UilShoppingCartAlt size="16"/></i>
                  Novo pedido
                </button>
                }
                <span>
                  <CSVLink {...csvReportRequests}>
                    <i className="table__icon"><UilExport size="16"/></i>
                    Exportar CSV
                  </CSVLink>
                </span>
              </section>
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
            
            {/* {userCanSeeDev && <div className="search">
              <input type="text" placeholder="Pesquisar" /> 
              <select>
                <option value="">-- Escolher coluna --</option>
                <option value="0">Fornecedor</option>
                <option value="1">Mês</option>
                <option value="4">Nota Fiscal</option>
              </select>
              <button
              >
                Pesquisar
              </button>
            </div>} */}

            <table>
              <thead>
                <tr>
                  <th onClick={() => sortingString("request_provider")}>Fornecedor</th>
                  <th onClick={() => sortingMonth("request_month")}>Mês</th>
                  <th onClick={() => sortingNumber("request_value")}>Valor Pedido</th>
                  <th onClick={() => sortingNumber("note_value")}>Valor Nota</th>
                  <th onClick={() => sortingNumber("nf")}>Número</th>
                  <th>Emissão</th>
                  <th>Entrada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                  requestsAndNotes.map(request_note => {
                    return (
                      <tr key={request_note.id}>
                        <td>{request_note.request_provider.toUpperCase()}</td>
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
                          {
                            request_note.issue && new Intl.DateTimeFormat('pt-BR', { 
                              dateStyle: "short", 
                            }).format(new Date(request_note.issue))
                          }
                        </td>
                        <td>
                          {
                            request_note.input?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")
                          }
                        </td>
                        <td>
                          <button
                            className="button_icon"
                            onClick={() => viewNote(request_note)}
                            type="button"
                          >
                            <i><UilSearchAlt size="16"/></i>
                          </button>
                          {userCanSeeAdmin && <button
                            className="button_icon"
                            onClick={() => handleRemoveRequest(request_note.request_id)}
                            type="button"
                          >
                            <i><UilTrashAlt size="16"/></i>
                          </button>}
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
        isOpen={isConsolidatedModalOpen}
        onRequestClose={handleCloseConsolidated}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-goals"
      >
        <button 
          type="button" 
          onClick={handleCloseConsolidated} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container>
          <Content>
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

            <SummaryConsolidation>
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
            </SummaryConsolidation>
            
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
            maxLength={20}
            onChange={event => setProvider(event.target.value)}
            required
          />

          <input
            type="text"
            onKeyUp={handleKeyUp}
            maxLength={10}
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
      <Modal
        isOpen={isUpdateGoalModalOpen}
        onRequestClose={handleCloseUpdateGoalModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button 
          type="button" 
          onClick={handleCloseUpdateGoalModal} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <FormContainer onSubmit={handleUpdateGoal}>
          <h2>Editar meta</h2>

          <input
            type="text"
            placeholder="Meta"
            onKeyUp={handleKeyUp}
            maxLength={11}
            onChange={event => setUpdateGoal(event.target.value)}
            required
          />

          <button type="submit">
            Atualizar
          </button>
        </FormContainer>
      </Modal>

      <ModalNotes 
        isOpen={isNotesModalOpen}
        onRequestClose={handleCloseNotesModal}
        goals={goalsIdPerMonth}
        goal={requestData}
        notes={notes}
        requestId={requestId}
      />
    </>
  )
}