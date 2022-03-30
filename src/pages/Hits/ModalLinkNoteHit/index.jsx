import { useCallback, useContext, useEffect, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"
import { ChosseMonthYear, Container, SearchNotes } from "./styles"

import { api } from "../../../services/api"
import { useNotification } from "../../../hooks/useNotification"
import { months, years } from "./monthAndYear"
import { AuthContext } from "../../../contexts/AuthContext"
import { currency, currencyValue } from "../../../utils/masks"

const getFormatdPrice = price => price.toFixed(2)

export function ModalLinkNoteHit({ isOpen, onRequestClose, selectStore }) {
  useWithSSRAuth()

  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])

  const { user } = useContext(AuthContext)
  const dispatch = useNotification()
  const [provider,setProvider] = useState("")
  const [month,setMonth] = useState("")
  const [year,setYear] = useState("")
  const [notesNumber, setNotesNumber] = useState("")
  const [nfs, setNfs] = useState([])
  const [hit, setHit] = useState({})
  const [providersIds, setProvidersIds] = useState([])
  const [checkedState, setCheckedState] = useState([])
  const [total, setTotal] = useState(0)

  const [lastHit,setLastHit] = useState("")
  const [currentHit,setCurrentHit] = useState("")
  const [valueNerus,setValueNerus] = useState("")
  const [salesReport,setSalesReport] = useState("")
  const [notes, setNotes] = useState([])

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item)

    setCheckedState(updatedCheckedState)

    const nts = []
    const totalPrice = updatedCheckedState.reduce((sum, currentState, index) => {
      if (currentState) {
        nts.push(nfs[index])
        return sum + Number(nfs[index].value)
      }
      
      return sum
    }, 0)
    setNotes(nts)
    setTotal(totalPrice)
  }

  function searchHit() {
    const getMonthText = monthNumber => ({
      "1": "JAN", "2": "FEV", "3": "MAR", "4": "ABR", "5": "MAI", "6": "JUN", 
      "7": "JUL", "8": "AGO", "9": "SET", "10": "OUT", "11": "NOV", "12": "DEZ",
    })[monthNumber]

    if (!provider) {
      dispatch({
        type: "error",
        message: `Editora inválida!`,
      })

      return
    }

    const data = {
      providers_id: parseInt(provider),
      month: !month ? getMonthText(`${new Date().getMonth() + 1}`): month,
      year: !year ? new Date().getFullYear() : parseInt(year),
      store: !selectStore ? user.store : selectStore
    }

    api.get(`hits?data=${JSON.stringify(data)}`)
      .then(response => {
        const [hit] = response.data

        if (!hit) {
          dispatch({
            type: "error",
            message: `Não foi encontrado dados para essa filtragem!`,
          })
          setHit({})
          return
        }

        setLastHit("")
        setCurrentHit("")
        setValueNerus("")
        setSalesReport("")

        setHit(hit)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Falha ao tentar consultar editora!`,
        })
      })
  }

  function searchNotes() {
    if (!notesNumber) {
      dispatch({
        type: "error",
        message: `Númeração inválida!`,
      })

      return
    }

    api.get(`notes/consult/nfs?note=${notesNumber}`)
      .then(response => {
        setCheckedState(new Array(response.data.length).fill(false))
        setNfs(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar consultar notas!`,
        })
      })
  }

  function handleUpdateHit() {
    if (selectStore && selectStore !== user.store) {
      dispatch({
        type: "error",
        message: "Apenas usuários dessa loja podem alterar os dados!",
      })
      return
    }

    if (!provider) {
      dispatch({
        type: "error",
        message: "Nenhum fornecedor selecionado!",
      })
      return
    }

    const data = {
      id: hit.id,
      last_hit: !lastHit ? hit.last_hit : lastHit,
      current_hit: !currentHit ? hit.current_hit : currentHit,
      value_nerus: !valueNerus ? hit.value_nerus : currencyValue(valueNerus),
      sales_report: !salesReport ? hit.sales_report : currencyValue(salesReport),
      notes
    }

    api.put("hits/update", data)
      .then(response => {
        setLastHit("")
        setCurrentHit("")
        setValueNerus("")
        setSalesReport("")
        setHit({})
        setNfs([])
        setProvider("")
        setTotal(0)
        setNotesNumber("")

        dispatch({
          type: "success",
          message: `Acerto atualizado com sucesso!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Falha ao tentar atualizar acerto!`,
        })
      })
  }

  useEffect(() => {
    api.get("providers/names/ids")
      .then(response => {
        setProvidersIds(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar consultar editoras!`,
        })
      })
  }, [])

  return (
    <>
      <Container>
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-goal-hit-link"
        >
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>

          <h2>Vincular notas</h2>

          <select className="input" value={provider} onChange={event => setProvider(event.target.value)}>
            <option value="">-- Escolher editora --</option>
            {
              providersIds.map(provider => {
                return (
                  <option key={provider.id} value={provider.id}>{provider.provider}</option>
                )
              })
            }
          </select>


          <ChosseMonthYear>
            <details>
              <summary>Escolher mês/ano</summary>
              <select className="input" onChange={event => setMonth(event.target.value)}>
                <option value="">-- Escolher mês --</option>
                {
                  months.map(month => {
                    return (
                      <option key={month.month_name} value={month.month_name}>{month.month_name}</option>
                    )
                  })
                }
              </select>
              <select className="input" onChange={event => setYear(event.target.value)}>
                <option value="">-- Escolher ano --</option>
                {
                  years.map(year => {
                    return (
                      <option key={year.year} value={year.year}>{year.year}</option>
                    )
                  })
                }
              </select>
            </details>
          </ChosseMonthYear>

          <button
            type="button"
            onClick={() => searchHit()}
            className="button"
          >
            Pré-visualização
          </button>

          <span>
            Último acerto: { hit.last_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1") }
          </span>
          <input 
            type="date" 
            className="input"
            value={lastHit}
            placeholder="Último acerto"
            onChange={event => setLastHit(event.target.value)}
          />

          <span>
            Acerto atual: { hit.current_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1") }
          </span>
          <input 
            type="date" 
            className="input"
            value={currentHit}
            placeholder="Último acerto"
            onChange={event => setCurrentHit(event.target.value)}
          />

          <span>Valor nerus</span>
          <input 
            type="text" 
            onKeyUp={handleKeyUp}
            maxLength={10}
            className="input"
            value={currencyValue(valueNerus)}
            placeholder={ !hit || !hit.value_nerus || hit.value_nerus === 0 ? "" : hit.value_nerus }
            onChange={event => setValueNerus(event.target.value)}
          />

          <span>Valor vendas</span>
          <input 
            type="text" 
            onKeyUp={handleKeyUp}
            maxLength={10}
            className="input"
            value={currencyValue(salesReport)}
            placeholder={ !hit || !hit.sales_report || hit.sales_report === 0 ? "" : hit.sales_report }
            onChange={event => setSalesReport(event.target.value)}
          />

          <span>Valor notas</span>
          <input 
            type="text" 
            className="input" 
            placeholder="Valor notas" 
            value={getFormatdPrice(total)} 
            disabled
          />

          <SearchNotes>
            <input 
              type="text" 
              placeholder="Número nota"
              value={notesNumber}
              onChange={event => setNotesNumber(event.target.value)}
            />

            <button
              onClick={() => searchNotes()}
              type="button"
            >
              Consultar notas
            </button>
          </SearchNotes>
          
          <button
            type="button"
            onClick={() => handleUpdateHit()}
            className="button"
          >
            Vincular
          </button>

          <table>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Nota fiscal</th>
                <th>Editora</th>
                <th>Valor total</th>
                <th>Emissão</th>
              </tr>
            </thead>
            <tbody>
              {
                nfs.map((note, index) => {
                  return (
                    <tr key={note.id}>
                      <td>
                        <input 
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={note.provider}
                          value={note.provider}
                          checked={checkedState[index]} 
                          onChange={() => handleOnChange(index)}                    
                        />
                      </td>
                      <td>{note.nf}</td>
                      <td>{note.provider}</td>
                      <td>{note.value}</td>
                      <td>
                        {
                          new Intl.DateTimeFormat("pt-BR").format(new Date(note.issue))
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
    </>
  )
}