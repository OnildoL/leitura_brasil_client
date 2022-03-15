import { useContext, useEffect, useState } from "react";
import Modal from "react-modal"
import { UilSearchAlt } from '@iconscout/react-unicons'
import closeImg from "../../../assets/Img/close.svg"
import { useNotification } from "../../../hooks/useNotification";
import { api } from "../../../services/api";
import { useWithSSRAuth } from "../../../utils/withSSRAuth";
import { Container, TableContent } from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";

export function ModalConsolidation({ isOpen, onRequestClose }) {
  useWithSSRAuth()
  
  const dispatch = useNotification()
  const { user } = useContext(AuthContext)

  const [consolidation, setConsolidation] = useState([])
  const [hitsYearMonthModalOpen, setHitsYearMonthModalOpen] = useState(false)
  const [dataYearMonth, setDataYearMonth] = useState([])

  function organizeConsolidatedListing(data) {
    const consolidation = []
    for (const hit of data) {
      const notes = hit.notes

      if (notes) {
        const note_value = notes.reduce((accumulator, { provider, value }) => {
          accumulator.provider = provider
          accumulator.note_value = accumulator.note_value + Number(value) || Number(value)
  
          return accumulator
        }, {})
  
        const nf = notes.sort(function(a, b) { return Number(b.value) - Number(a.value) })[0]
  
        consolidation.push({ 
          ...hit, 
          note_value: !note_value ? 0 : note_value.note_value, 
          nf: !nf ? "-" : nf.nf
        })
      }
    }
    
    setDataYearMonth(consolidation)
  }

  function handleOpenHitsYearMonthModal({ year, month }) {
    const data = { year, month, store: user.store }

    api.get(`hits/consolidation/year/month?data=${JSON.stringify(data)}`)
      .then(response => {
        organizeConsolidatedListing(response.data)
        setHitsYearMonthModalOpen(true)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Error interno ao tentar consultar acertos!",
        })
      })
  }

  function handleCloseHitsYearMonthModal() {
    setHitsYearMonthModalOpen(false)
  }

  useEffect(() => {
    api.get("hits/consolidation/hits")
      .then(response => {
        setConsolidation(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Error interno ao tentar consultar consolidado!",
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
            className="react-modal-content-hits"
        >
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>

          <h2>Consolidado</h2>

          <TableContent>
            <thead>
              <tr>
                <th>Ações</th>
                <th>Ano</th>
                <th>Mês</th>
                <th>Total vendas</th>
                <th>Total nerus</th>
                <th>Total notas</th>
              </tr>
            </thead>
            <tbody>
              {
                consolidation.map(data => {
                  return (
                    <tr key={data.id}>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleOpenHitsYearMonthModal({
                            year: data.yearName,
                            month: data.monthName
                          })}
                          className="button_icon"
                        >
                          <i><UilSearchAlt className="button_icon" size="16" /></i>
                        </button>
                      </td>
                      <td>{data.yearName}</td>
                      <td>{data.monthName}</td>
                      <td>
                        {
                          new Intl.NumberFormat("pt-BR", {
                            mininumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            style: "currency",
                            currency: "BRL"
                          }).format(data.sales_report ?? 0)
                        }
                      </td>
                      <td>
                        {
                          new Intl.NumberFormat("pt-BR", {
                            mininumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            style: "currency",
                            currency: "BRL"
                          }).format(data.value_nerus ?? 0)
                        }
                      </td>
                      <td>
                        {
                          new Intl.NumberFormat("pt-BR", {
                            mininumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            style: "currency",
                            currency: "BRL"
                          }).format(data.value_note ?? 0)
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </TableContent>
        </Modal>
      </Container>

      <Modal
        isOpen={hitsYearMonthModalOpen}
        onRequestClose={handleCloseHitsYearMonthModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-hits"
      >
          <button
            type="button"
            onClick={handleCloseHitsYearMonthModal}
            className="react-modal-close"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>

          <TableContent>
            <thead>
              <tr>
                <th>Ano</th>
                <th>Mês</th>
                <th>Editora</th>
                <th>Situação</th>
                <th>Último acerto</th>
                <th>Acerto atual</th>
                <th>Total nerus</th>
                <th>Total vendas</th>
                <th>Total notas</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {
                dataYearMonth.map(hit => {
                  return (
                    <tr>
                      <td>{hit.year}</td>
                      <td>{hit.month}</td>
                      <td>{hit.provider}</td>
                      <td className={hit.situation} title={hit.comments}>
                        {hit.situation?.toUpperCase()}
                      </td>
                      <td>{hit.last_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")}</td>
                      <td>{hit.current_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")}</td>
                      <td>
                        {
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          }).format(hit.value_nerus ?? 0)
                        }
                      </td>
                      <td>
                        {
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          }).format(hit.sales_report ?? 0)
                        }
                      </td>
                      <td>
                        {
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          }).format(hit.note_value ?? 0)
                        }
                      </td>
                      <td>{hit.reason}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </TableContent>
        </Modal>
    </>
  )
}
