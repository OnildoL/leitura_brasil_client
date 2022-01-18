import Modal from "react-modal"
import { useContext, useState } from "react"
import { Header } from "../Header"
import { Footer } from "../Footer"

import closeImg from "../../assets/Img/close.svg"

import { Container, Content, FormContainer, Sectors } from "./styles"
import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { useCan } from "../../hooks/useCan"
import { api } from "../../services/api"
import { useNotification } from "../../hooks/useNotification"
import { ModalSector } from "./ModalSector"
import { AuthContext } from "../../contexts/AuthContext"

export function Goals() {
  useWithSSRAuth()
  const { user } = useContext(AuthContext)

  const dispatch = useNotification()

  const userCanSeeAdmin = useCan({
    roles: ["developer", "manager"]
  })

  const userCanSeeSelectStore = useCan({
    roles: ["manager"] // Criar table de permissions
  })

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
      goal, 
      year: new Date().getFullYear(), 
      month, 
      store 
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
              <i className="uil uil-apps table__icon"></i>
              Setores
            </h1>
            <p>Listagem de todas as metas e pedidos.</p>
          </section>

          {userCanSeeAdmin && <section className="panel">
            <h1>
              <i className="uil uil-setting table__icon"></i>
              Opções
            </h1>
            {userCanSeeSelectStore && <select value={selectedStore} onChange={event => setSelectedStore(event.target.value)}>
              <option value="">-- Escolher Loja --</option>
              <option value="31">Leitura Manaíra</option>
              <option value="69">Leitura Mangabeira</option>
              <option value="04">Leitura Tacaruna</option>
              <option value="109">Leitura Riomar</option>
              <option value="98">Leitura Recife</option>
              <option value="108">Leitura Caruaru</option>
              <option value="76">Leitura Campina Grande</option>
            </select>}
            <button
              onClick={handleOpenNewGoalModal}
              type="button"
            >
              <i className="uil uil-trophy table__icon"></i>
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
                  <option value="informatica, games e midias">Informatica, games e midias</option>
                  <option value="presentes">Presentes</option>
                  <option value="papelaria">Papelaria</option>
                  <option value="volta as aulas">Volta as aulas</option>
                </select>

                <input
                  type="text"
                  placeholder="Meta"
                  value={goal}
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
  
                <select value={store} onChange={event => setStore(event.target.value)} required>
                  <option value="">-- Escolher loja --</option>
                  <option value="31">Leitura Manaíra</option>
                  <option value="69">Leitura Mangabeira</option>
                  <option value="04">Leitura Tacaruna</option>
                  <option value="109">Leitura Riomar</option>
                  <option value="98">Leitura Recife</option>
                  <option value="108">Leitura Caruaru</option>
                  <option value="76">Leitura Campina Grande</option>
                </select>

                <button type="submit">
                  Cadastrar
                </button>
              </FormContainer>
            </Modal>
          </section>}

          <Sectors>
            <div>
              <i className="uil uil-books"></i>
              <h3>livraria</h3>
              <button
                onClick={() => handleSectorFiltering("livraria")}
                type="button"
              >
                Visualizar
                <i className="uil uil-arrow-right"></i>
              </button>
            </div>
            <div>
              <i className="uil uil-book-open"></i>
              <h3>hq</h3>
              <button
                onClick={() => handleSectorFiltering("hq")}
                type="button"
              >
                Visualizar
                <i className="uil uil-arrow-right"></i>
              </button>
            </div>
            <div>
              <i className="uil uil-desktop"></i>
              <h3>informatica, games e midias</h3>
              <button
                onClick={() => handleSectorFiltering("informatica, games e midias")}
                type="button"
              >
                Visualizar
                <i className="uil uil-arrow-right"></i>
              </button>
            </div>
            <div>
              <i className="uil uil-gift"></i>
              <h3>presentes</h3>
              <button
                onClick={() => handleSectorFiltering("presentes")}
                type="button"
              >
                Visualizar
                <i className="uil uil-arrow-right"></i>
              </button>
            </div>
            <div>
              <i className="uil uil-pen"></i>
              <h3>papelaria</h3>
              <button
                onClick={() => handleSectorFiltering("papelaria")}
                type="button"
              >
                Visualizar
                <i className="uil uil-arrow-right"></i>
              </button>
            </div>
            <div>
              <i className="uil uil-bell"></i>
              <h3>volta as aulas</h3>
              <button
                onClick={() => handleSectorFiltering("volta as aulas")}
                type="button"
              >
                Visualizar
                <i className="uil uil-arrow-right"></i>
              </button>
            </div>

            <ModalSector 
              isOpen={isSectorModalOpen} 
              onRequestClose={handleCloseSectorModal}
              sector={toSector}
              sectors={sectors}
            />

          </Sectors>
        </Content>
      </Container>
      <Footer />
    </>
  )
}