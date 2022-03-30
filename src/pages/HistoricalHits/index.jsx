import Modal from "react-modal"
import closeImg from "../../assets/Img/close.svg"
import { useRef, useState } from "react"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { useNotification } from "../../hooks/useNotification"
import { api } from "../../services/api"
import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { Container, Content } from "./styles"

export function HistoricalHits() {
  useWithSSRAuth()

  const [historicalModalOpen, setHistoricalModalOpen] = useState(false)
  const [fileHistorical, setFileHistorical] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [store, setStore] = useState("")
  const dispatch = useNotification()
  const el = useRef()


  function handleOpenHistoricalInsertModal() {
    setHistoricalModalOpen(true)
  }

  function handleCloseHistoricalInsertModal() {
    setHistoricalModalOpen(false)
  }

  function handleChange(e) {
    const file = e.target.files[0]
    setFileHistorical(file)
  }

  function handleSaveHistoricalHits(event) {
    event.preventDefault()
    
    const formData = new FormData()
    formData.append("file", fileHistorical)

    api.post(`historicals?month=${month}&year=${year}&store=${store}`, formData)
      .then(response => {
        dispatch({
          type: "success",
          message: "Histórico registrado com sucesso!",
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro ao tentar registrar o histórico!",
        })
      })

    setStore("")
    setMonth("")
    setYear("")
    setFileHistorical("")
    handleCloseHistoricalInsertModal()
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <section>
            <h1>Históricos</h1>
            <p>Área para inserir histórico de acertos</p>
          </section>

          <section className="panel">
            <h1>
              Opções
            </h1>
            <button
              className="button"
              onClick={handleOpenHistoricalInsertModal}
              type="button"
            >
              Inserir histórico
            </button>
          </section>

          <Modal
              isOpen={historicalModalOpen}
              onRequestClose={handleCloseHistoricalInsertModal}
              overlayClassName="react-modal-overlay"
              className="react-modal-content"
            >
              <button 
                type="button" 
                onClick={handleCloseHistoricalInsertModal} 
                className="react-modal-close"
              >
                <img src={closeImg} alt="Fechar modal" />
              </button>

              <form onSubmit={handleSaveHistoricalHits}>

              <input 
                type="file"
                ref={el} 
                onChange={handleChange} 
                required
              />

              <input 
                type="text" 
                onChange={event => setMonth(event.target.value)}
                placeholder="Mês" 
                required
              />

              <input 
                type="text" 
                onChange={event => setYear(event.target.value)}
                placeholder="Ano" 
                required
              />

              <select onChange={event => setStore(event.target.value)} required>
                <option value="">-- Escolher Loja --</option>
                <option value="31">(31) Leitura Manaíra</option>
                <option value="69">(69) Leitura Mangabeira</option>
                <option value="04">(04) Leitura Tacaruna</option>
                <option value="109">(109) Leitura Riomar</option>
                <option value="98">(98) Leitura Recife</option>
                <option value="108">(108) Leitura Caruaru</option>
                <option value="76">(76) Leitura Campina Grande</option>
              </select>
              
              <button
                className="button"
                type="submit"
              >
                Registrar
              </button>
            </form>
          </Modal>
        </Content>
      </Container>
      <Footer />
    </>
  )
}