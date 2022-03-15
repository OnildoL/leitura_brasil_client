import Modal from "react-modal"
import { CSVLink } from "react-csv"
import { 
  UilFileCheckAlt, 
  UilExport, 
  UilSearchAlt, 
  UilSetting, 
  UilDollarAlt, 
  UilPlusCircle, UilSync, UilLink, UilEdit } from '@iconscout/react-unicons'
import { useContext, useEffect, useState } from 'react'
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { useNotification } from '../../hooks/useNotification'
import { api } from '../../services/api'
import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { Container, Content, TableContent } from "./styles"

import closeImg from "../../assets/Img/close.svg"
import { ModalNotesEndHitEdit } from "./ModalNotesEndHitEdit"
import { ModalProvider } from "./ModalProvider"
import { ModalEditProvider } from "./ModalEditProvider"
import { AuthContext } from "../../contexts/AuthContext"
import { ModalLinkNoteHit } from "./ModalLinkNoteHit"
import { ModalConsolidation } from "./ModalConsolidation"

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

  const { user } = useContext(AuthContext)

  const dispatch = useNotification()
  const [hitsModalOpen, setHitsModalOpen] = useState(false)
  const [isProviderEditionModalOpen, setIsProviderEditionModalOpen] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [providerModalOpen, setProviderModalOpen] = useState(false)
  const [consolidationModalOpen, setConsolidationModalOpen] = useState(false)
  const [linkHitModalOpen, setLinkHitModalOpen] = useState(false)
  const [providers, setProviders] = useState([])
  const [providerId, setProviderId] = useState(0)
  const [provider, setProvider] = useState("")
  const [hits, setHits] = useState([])
  const [viewhitNote, setViewhitNOte] = useState([])
  const [hit, setHit] = useState([])

  // Edita editora com informações por loja
  const [providersId, setProvidersId] = useState({})

  function handleOpenConsolidation() {
    setConsolidationModalOpen(true)
  }

  function handleCloseConsolidation() {
    setConsolidationModalOpen(false)
  }

  function handleOpenLinkHitModal() {
    setLinkHitModalOpen(true)
  }

  function handleCloseLinkHitModal() {
    setLinkHitModalOpen(false)
  }

  function handleOpenProviderModal() {
    setProviderModalOpen(true)
  }

  function handleCloseProviderModal() {
    setProviderModalOpen(false)
  }
  
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

  function handleCreateNewHit() {
    const getMonthText = monthNumber => ({
      "1": "JAN", "2": "FEV", "3": "MAR", "4": "ABR", "5": "MAI", "6": "JUN", 
      "7": "JUL", "8": "AGO", "9": "SET", "10": "OUT", "11": "NOV", "12": "DEZ",
    })[monthNumber]

    const currentHit = hits[0]
    
    const new_hit = {
      situation: "-",
      month: getMonthText(`${new Date().getMonth() + 1}`),
      year: new Date().getFullYear(),
      last_hit: !currentHit ? "" : (currentHit.current_hit || currentHit.last_hit),
      store: user.store,
      providers_info_id: providerId
    }

    api.post("hits", new_hit)
      .then(response => {
          api.get(`hits/${new_hit.providers_info_id}`)
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
        dispatch({
          type: "success",
          message: "Novo acerto cadastrado com sucesso!",
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Já existe acerto cadastrado para esse mês/ano!",
        })
      })
  }

  function handleOpenProviderEditionModal() {
    setIsProviderEditionModalOpen(true)
  }

  function handleCloseProviderEditionModal() {
    setIsProviderEditionModalOpen(false)
  }

  // Edita editora com informações por loja
  function handleEditionProviderInfo(provider) {
    setProvidersId(provider)
    handleOpenProviderEditionModal()
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
  
  const csvReportRequests = {
    filename: `${Date.now()}.csv`,
    headers: headers_requests,
    data: hits,
    separator: ";"
  }

  const [hitList, setHitList] = useState("yes")

  function handleChange(event) {
    setHitList(event.target.value)

    api.get(`providers/${event.target.value}`)
      .then(response => {
        setProviders(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro interno ao consultar editoras!",
        })
      })
  }

  function handleReloadPageProviders() {
    api.get(`providers/${hitList}`)
      .then(response => {
        setProviders(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro interno ao consultar editoras!",
        })
      })
  }
  
  function handleReloadPageHits() {
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
    api.get(`providers/${hitList}`)
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
              onClick={() => handleReloadPageProviders()}
              title="Atualizar listagem das editoras"
              type="button"
            >
              <i className="table__icon"><UilSync size="16" /></i>
              Atualizar
            </button>
            <button
              className="button"
              onClick={() => handleOpenConsolidation()}
              title="Consolidado de todos os anos"
              type="button"
            >
              <i className="table__icon"><UilDollarAlt size="16" /></i>
              Consolidado
            </button>
            <button
              className="button"
              onClick={() => handleOpenProviderModal()}
              title="Cadastrar uma nova editora"
              type="button"
            >
              <i className="table__icon"><UilPlusCircle size="16" /></i>
              Nova editora
            </button>
            <button
              className="button"
              onClick={() => handleOpenLinkHitModal()}
              title="Vincular notas nos acertos"
              type="button"
            >
              <i className="table__icon"><UilLink size="16" /></i>
              Vincular notas
            </button>
          </section>

          <div>
            <span>Listar por: </span>

            <input type="radio" id="activated" name="providers" value="yes"
              onChange={handleChange}
            />
            <label htmlFor="activated">Ativadas</label>

            <input type="radio" id="deactivated" name="providers" value="no"
              onChange={handleChange}
            />
            <label htmlFor="deactivated">Desativadas</label>
          </div>

          <TableContent>
            <thead>
              <tr>
                <th className="sticky-col first-col">Ações</th>
                <th>N° Nerus</th>
                <th className="sticky-col second-col">Editora</th>
                {/* <th>Acerto</th> */}
                <th>Desconto</th>
                <th>Frete</th>
                <th>Mapa bate?</th>
                <th>Último acerto</th>
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
                          onClick={() => handleEditionProviderInfo(provider)}
                          title="Editar dados da editora"
                          className="button_icon"
                        >
                          <i><UilEdit className="table__icon" size="16" /></i>
                        </button>
                      </td>
                      <td >{provider.number_nerus}</td>
                      <td className="sticky-col second-col" title={provider.brand}>{provider.provider.toUpperCase()}</td>
                      {/* <td >{provider.right}</td> */}
                      <td >{provider.discount}</td>
                      <td >{provider.shipping?.toUpperCase()}</td>
                      <td >{provider.map?.toUpperCase()}</td>
                      <td >
                        {
                          provider.current_hit?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </TableContent>

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
            <button
              className="button"
              onClick={() => handleReloadPageHits()}
              title="Atualizar listagem de acertos"
              type="button"
            >
              <i className="table__icon"><UilSync size="16" /></i>
              Atualizar
            </button>

            <button
              className="button"
              onClick={() => handleCreateNewHit()}
              title="Cadastrar um novo pedido"
              type="button"
            >
              <i className="table__icon"><UilPlusCircle size="16" /></i>
              Novo acerto
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
                  <th>Motivo</th>
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
                        <td >
                          {
                            !hit.last_hit || hit.last_hit === "-" ? "" : hit.last_hit.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")
                          }
                        </td>
                        <td >
                          {
                            !hit.current_hit || hit.current_hit === "-" ? "" : hit.current_hit.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")
                          }
                        </td>
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
                        <td>{hit.reason}</td>
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
      
      <ModalEditProvider
        isOpen={isProviderEditionModalOpen}
        onRequestClose={handleCloseProviderEditionModal}
        provider={providersId}
      />

      <ModalProvider
        isOpen={providerModalOpen}
        onRequestClose={handleCloseProviderModal}
      />

      <ModalLinkNoteHit
        isOpen={linkHitModalOpen}
        onRequestClose={handleCloseLinkHitModal}
      />

      <ModalConsolidation
        isOpen={consolidationModalOpen}
        onRequestClose={handleCloseConsolidation}
      />
      <Footer />
    </>
  )
}
