import Modal from "react-modal"
import { CSVLink } from "react-csv"
import { UilFileCheckAlt, UilExport, UilSearchAlt, UilSetting, UilDollarAlt, UilPlusCircle, UilBars, UilEdit } from '@iconscout/react-unicons'
import { useEffect, useState } from 'react'
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { useNotification } from '../../hooks/useNotification'
import { api } from '../../services/api'
import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { Container, Content, TableContent } from "./styles"

import closeImg from "../../assets/Img/close.svg"
import { ModalNotesEndHitEdit } from "./ModalNotesEndHitEdit"

const headers_requests = [
  { label: "Ano", key: "year" },
  { label: "Mês", key: "month" },
  { label: "Situção", key: "situation" },
  { label: "Último acerto", key: "last_hit" },
  { label: "Acerto atual", key: "current_hit" },
  { label: "Valor vendas", key: "sales_report" },
  { label: "Valor nerus", key: "value_nerus" },
  { label: "Total notas", key: "note_value" },
  { label: "NF de maior valor", key: "nf" },
]

export function Hits() {
  useWithSSRAuth()
  const dispatch = useNotification()
  const [hitsModalOpen, setHitsModalOpen] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [providers, setProviders] = useState([])
  const [providerId, setProviderId] = useState(0)
  const [provider, setProvider] = useState("")
  const [hits, setHits] = useState([])
  const [viewhitNote, setViewhitNOte] = useState([])
  const [hit, setHit] = useState([])

  function handleOpenHitsModal(provider_id, provider) {
    setProviderId(provider_id)
    setProvider(provider)

    setHitsModalOpen(true)
  }

  function handleCloseHitsModal() {
    setHitsModalOpen(false)
  }

  async function listHits(response) {
    const hits = []
    
    for await (const hit of response.data) {
      const notes = hit.notes

      if (notes) {
        const note_value = notes.reduce((accumulator, { note_value }) => {
          accumulator.note_value = accumulator.note_value + Number(note_value) || Number(note_value)
  
          return accumulator
        }, {})
  
        const nf = notes.sort(function(a, b) { return Number(b.note_value) - Number(a.note_value) })[0]
  
        hits.push({ 
          ...hit, 
          note_value: !note_value ? 0 : note_value.note_value, 
          nf: !nf ? "-" : nf.nf
        })
      }
    }

    setHits(hits)
  }

  function handleOpenNotesModal() {
    setIsNotesModalOpen(true)
  }
  function handleCloseNotesModal() {
    setIsNotesModalOpen(false)
  }

  function viewHitNotes(hit) {
    setHit(hit)
    setViewhitNOte(hit.notes)
    handleOpenNotesModal()
  }

  useEffect(() => {
    api.get(`hits/${providerId}`)
    .then(response => {
      listHits(response)
    })
    .catch(error => {
      setHits([])
      dispatch({
        type: "error",
        message: `Editora ${provider} sem acertos!`,
      })
    })
  }, [providerId])

  useEffect(() => {
    api.get("providers")
      .then(response => {
        setProviders(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro interno ao consultar editoras!",
        })
      })
  }, [])

  const csvReportRequests = {
    filename: `${Date.now()}.csv`,
    headers: headers_requests,
    data: hits,
    separator: ";"
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <section>
            <h1>
              <i><UilFileCheckAlt size="16" /></i>
              Acertos
            </h1>
            <p>Listagem de editoras.</p>
          </section>

          <section className="panel">
            <h1>
              <i className="table__icon"><UilSetting size="16" /></i>
              Opções
            </h1>
            <button
              className="button"
              title="Outras opções"
              type="button"
            >
              <i className="table__icon"><UilBars size="16" /></i>
            </button>
            <button
              className="button"
              title="Consolidado de todos os anos"
              type="button"
            >
              <i className="table__icon"><UilDollarAlt size="16" /></i>
              Consolidado
            </button>
            <button
              className="button"
              title="Cadastrar uma nova editora"
              type="button"
            >
              <i className="table__icon"><UilPlusCircle size="16" /></i>
              Nova editora
            </button>
          </section>

          <div>
            <TableContent>
              <thead>
                <tr>
                  <th className="sticky-col first-col">Ações</th>
                  <th className="sticky-col second-col">Editora</th>
                  <th>Acerto</th>
                  <th>Desconto</th>
                  <th>Frete</th>
                  <th>Mapa</th>
                  <th>Marca</th>
                  <th>N° Nerus</th>
                </tr>
              </thead>
              <tbody>
                {
                  providers.map(provider => {
                    return (
                      <tr key={provider.id}>
                        <td className="sticky-col first-col">
                          <button
                            onClick={() => handleOpenHitsModal(provider.id, provider.provider)}
                            title="Visualizar acertos"
                            className="button_icon"
                          >
                            <i><UilSearchAlt className="button_icon" size="16" /></i>
                          </button>
                          <button
                            title="Editar dados da editora"
                            className="button_icon"
                          >
                            <i><UilEdit className="table__icon" size="16" /></i>
                          </button>
                        </td>
                        <td className="sticky-col second-col">{provider.provider.toUpperCase()}</td>
                        <td >{provider.right}</td>
                        <td >{provider.discount}</td>
                        <td >{provider.shipping?.toUpperCase()}</td>
                        <td >{provider.map?.toUpperCase()}</td>
                        <td >{provider.brand?.toUpperCase()}</td>
                        <td >{provider.number_nerus}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </TableContent>
          </div>

          <Modal
            isOpen={hitsModalOpen}
            onRequestClose={handleCloseHitsModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content-hits"
          >
            <button
              type="button"
              onClick={handleCloseHitsModal}
              className="react-modal-close"
            >
              <img src={closeImg} alt="Fechar modal" />
            </button>
            
            <h1>EDITORA {provider?.toUpperCase()}</h1>

            <div>
              <span>
                <CSVLink {...csvReportRequests}>
                  <i className="table__icon"><UilExport size="16"/></i>
                  Exportar CSV
                </CSVLink>
              </span>
            </div>

            <div>
            <TableContent>
              <thead>
                <tr>
                  <th>Ações</th>
                  <th>Ano</th>
                  <th>Mês</th>
                  <th>Situação</th>
                  <th>Último acerto</th>
                  <th>Acerto atual</th>
                  <th>Valor vendas</th>
                  <th>Valor nerus</th>
                  <th>Valor nota</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {
                  hits.map(hit => {
                    return (
                      <tr key={hit.id}>
                        <td className="button_icon">
                          <button
                            onClick={() => viewHitNotes(hit)}
                            title="Visualizar notas vinculadas"
                          >
                            <i><UilSearchAlt className="table__icon" size="16" /></i>
                          </button>
                        </td>
                        <td>{hit.year}</td>
                        <td>{hit.month}</td>
                        <td title={hit.comments} className={hit.situation}>
                          {hit.situation?.toUpperCase()}
                        </td>
                        <td>{hit.last_hit}</td>
                        <td>{hit.current_hit}</td>
                        <td>
                          {
                            new Intl.NumberFormat("pt-BR", {
                              mininumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              style: "currency",
                              currency: "BRL"
                            }).format(hit.sales_report ?? 0)
                          }
                        </td>
                        <td>
                          {
                            new Intl.NumberFormat("pt-BR", {
                              mininumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              style: "currency",
                              currency: "BRL"
                            }).format(hit.value_nerus ?? 0)
                          }
                        </td>
                        <td>
                          {
                            new Intl.NumberFormat("pt-BR", {
                              mininumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              style: "currency",
                              currency: "BRL"
                            }).format(hit.note_value ?? 0)
                          }
                        </td>
                        <td>{hit.nf}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </TableContent>
          </div>

          </Modal>

        </Content>
      </Container>

      <ModalNotesEndHitEdit
        isOpen={isNotesModalOpen}
        onRequestClose={handleCloseNotesModal}
        datahit={hit}
        hitNote={viewhitNote}
      />
      <Footer />
    </>
  )
}
