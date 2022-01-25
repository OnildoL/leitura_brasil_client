import Modal from "react-modal"
import { 
  UilSetting, 
  UilApps, 
  UilTrophy, 
  UilBooks,
  UilBookOpen,
  UilArrowRight,
  UilDesktop,
  UilGift,
  UilPen,
  UilBell
} from '@iconscout/react-unicons'
import { useContext, useState, useCallback } from "react"
import { Header } from "../Header"
import { Footer } from "../Footer"

import closeImg from "../../assets/Img/close.svg"

import { Container, Content, FormContainer, Sectors, SectorsManager } from "./styles"

import { currency, currencyValue } from "../../utils/masks"
import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { api } from "../../services/api"
import { useNotification } from "../../hooks/useNotification"
import { ModalSector } from "./ModalSector"
import { AuthContext } from "../../contexts/AuthContext"
import { usePermission } from "../../hooks/usePermission"
import { Manager } from "./Manager"

export function Goals() {
  useWithSSRAuth()
  const { user } = useContext(AuthContext)

  const dispatch = useNotification()

  const handleKeyUp = useCallback((e) => {
    currency(e)
  }, [])

  const { userCanSeeAdmin, userCanSeeSelectStore, userCanSeeDev } = usePermission()

  const [selectedStore, setSelectedStore] = useState("")
  const [toSector, setToSector] = useState("")

  const [sector, setSector] = useState("")
  const [goal, setGoal] = useState("")
  const [month, setMonth] = useState("")
  const [store, setStore] = useState("")

  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false)
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false)

  function handleOpenSectorModal() {
    setIsSectorModalOpen(true)
  }

  function handleCloseSectorModal() {
    setIsSectorModalOpen(false)
  }

  function handleOpenNewGoalModal() {
    setIsNewGoalModalOpen(true)
  }

  function handleCloseNewGoalModal() {
    setIsNewGoalModalOpen(false)
  }

  const [sectors, setSectors] = useState([])

  function handleSectorFiltering(sector) {
    setToSector(sector)

    api.get("goals")
    .then(response => {
      let yearsSet = new Set()
      let years = []

      const allGoalsPerYear = response.data
      
      for (const goalData of allGoalsPerYear) {
        const theStoreis = !selectedStore ? user.store : selectedStore
        if (
          !yearsSet.has(goalData.year) && 
          goalData.sector === sector && 
          theStoreis === goalData.store
        ) {
          yearsSet.add(goalData.year)
          years.push({
            id: goalData.id,
            year: goalData.year,
            store: goalData.store,
            sector: goalData.sector
            })
        }
      }

      setSectors(years)

      handleOpenSectorModal()
    })
    .catch(error => console.log(error))
  }

  async function handleCreateNewGoal(event) {
    event.preventDefault()

    const data = { 
      sector, 
      goal: currencyValue(goal), 
      year: new Date().getFullYear(), 
      month, 
      store: !store ? user.store : store
    }

    api.post("goals", data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Meta cadastrada!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: error.response.data.message,
        })
      })

    setSector("")
    setGoal("")
    setMonth("")
    setStore("")
    
    handleCloseNewGoalModal()
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <section>
            <h1>
              <i className="table__icon"><UilApps size="16" /></i>
              Setores
            </h1>
            <p>Listagem de todas as metas e pedidos.</p>
          </section>

          {userCanSeeAdmin && <section className="panel">
            <h1>
              <i className="table__icon"><UilSetting size="16" /></i>
              Opções
            </h1>
            <button
              className="button"
              onClick={handleOpenNewGoalModal}
              type="button"
              >
              <i className="table__icon"><UilTrophy size="16"/></i>
              Nova meta
            </button>

            <Modal
              isOpen={isNewGoalModalOpen}
              onRequestClose={handleCloseNewGoalModal}
              overlayClassName="react-modal-overlay"
              className="react-modal-content"
            >
              <button 
                type="button" 
                onClick={handleCloseNewGoalModal} 
                className="react-modal-close"
              >
                <img src={closeImg} alt="Fechar modal" />
              </button>

              <FormContainer onSubmit={handleCreateNewGoal}>
                <h2>Cadastrar meta</h2>

                <select value={sector} onChange={event => setSector(event.target.value)} required>
                  <option value="">-- Escolher setor --</option>
                  <option value="livraria">Livraria</option>
                  <option value="hq">HQ</option>
                  <option value="informatica">Informatica, games e midias</option>
                  <option value="presentes">Presentes</option>
                  <option value="papelaria">Papelaria</option>
                  <option value="volta as aulas">Volta as aulas</option>
                </select>

                <input
                  type="text"
                  placeholder="Meta"
                  onKeyUp={handleKeyUp}
                  onChange={event => setGoal(event.target.value)}
                  required
                />

                <select value={month} onChange={event => setMonth(event.target.value)} required>
                  <option value="">-- Escolher mês --</option>
                  <option value="FEV">Fevereiro</option>
                  <option value="MAR">Março</option>
                  <option value="ABR">Abril</option>
                  <option value="MAI">Maio</option>
                  <option value="JUN">Junho</option>
                  <option value="JUL">Julho</option>
                  <option value="AGO">Agosto</option>
                  <option value="SET">Setembro</option>
                  <option value="OUT">Outubro</option>
                  <option value="NOV">Novembro</option>
                  <option value="DEZ">Dezembro</option>
                  <option value="JAN">Janeiro</option>
                </select>
  
                {userCanSeeDev && <select value={store} onChange={event => setStore(event.target.value)} required>
                  <option value="">-- Escolher loja --</option>
                  <option value="31">Leitura Manaíra</option>
                  <option value="69">Leitura Mangabeira</option>
                  <option value="04">Leitura Tacaruna</option>
                  <option value="109">Leitura Riomar</option>
                  <option value="98">Leitura Recife</option>
                  <option value="108">Leitura Caruaru</option>
                  <option value="76">Leitura Campina Grande</option>
                </select>}

                <button type="submit">
                  Cadastrar
                </button>
              </FormContainer>
            </Modal>
          </section>}

          {!userCanSeeSelectStore && <Sectors>
            <div>
              <i><UilBooks /></i>
              <h3>livraria</h3>
              <button
                className="button"
                onClick={() => handleSectorFiltering("livraria")}
                type="button"
              >
                Visualizar
                <i><UilArrowRight size="16"/></i>
              </button>
            </div>
            <div>
              <i><UilBookOpen /></i>
              <h3>hq</h3>
              <button
                className="button"
                onClick={() => handleSectorFiltering("hq")}
                type="button"
              >
                Visualizar
                <i><UilArrowRight size="16"/></i>
              </button>
            </div>
            <div>
              <i><UilDesktop /></i>
              <h3>informatica, games e midias</h3>
              <button
                className="button"
                onClick={() => handleSectorFiltering("informatica")}
                type="button"
              >
                Visualizar
                <i><UilArrowRight size="16"/></i>
              </button>
            </div>
            <div>
              <i><UilGift /></i>
              <h3>presentes</h3>
              <button
                className="button"
                onClick={() => handleSectorFiltering("presentes")}
                type="button"
              >
                Visualizar
                <i><UilArrowRight size="16"/></i>
              </button>
            </div>
            <div>
              <i><UilPen /></i>
              <h3>papelaria</h3>
              <button
                className="button"
                onClick={() => handleSectorFiltering("papelaria")}
                type="button"
              >
                Visualizar
                <i><UilArrowRight size="16"/></i>
              </button>
            </div>
            <div>
              <i><UilBell /></i>
              <h3>volta as aulas</h3>
              <button
                className="button"
                onClick={() => handleSectorFiltering("volta as aulas")}
                type="button"
              >
                Visualizar
                <i><UilArrowRight size="16"/></i>
              </button>
            </div>

            <ModalSector 
              isOpen={isSectorModalOpen} 
              onRequestClose={handleCloseSectorModal}
              sector={toSector}
              sectors={sectors}
            />

          </Sectors>}

          {userCanSeeSelectStore && <SectorsManager>
            <Manager store="31" store_name="leitura manaíra" />
            <Manager store="69" store_name="leitura mangabeira" />
            <Manager store="04" store_name="leitura tacaruna" />
            <Manager store="109" store_name="leitura riomar" />
            <Manager store="98" store_name="leitura recife" />
            <Manager store="108" store_name="leitura caruaru" />
            <Manager store="76" store_name="leitura campina grande" />
          </SectorsManager>}

        </Content>
      </Container>
      <Footer />
    </>
  )
}