import Modal from "react-modal"
import { useState } from "react"
import { Header } from "../Header"
import { Footer } from "../Footer"

import closeImg from "../../assets/Img/close.svg"

import { Container, Content, FormContainer, Sectors } from "./styles"
import { useWithSSRAuth } from "../../utils/withSSRAuth"

export function Goals() {
  useWithSSRAuth()

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

          <section className="panel">
            <h1>
              <i className="uil uil-setting table__icon"></i>
              Opções
            </h1>
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

              <FormContainer>
                <h2>Cadastrar meta</h2>

                <select required>
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
                  required
                />

                <input
                  type="number"
                  placeholder="Ano"
                  required
                />

                <select required>
                  <option value="">-- Escolher mês --</option>
                  <option value="">FEV</option>
                  <option value="">MAR</option>
                  <option value="">ABR</option>
                  <option value="">MAI</option>
                  <option value="">JUN</option>
                  <option value="">JUL</option>
                  <option value="">AGO</option>
                  <option value="">SET</option>
                  <option value="">OUT</option>
                  <option value="">NOV</option>
                  <option value="">DEZ</option>
                  <option value="">JAN</option>
                </select>
  
                <button type="submit">
                  Cadastrar
                </button>
              </FormContainer>
            </Modal>
          </section>

          <Sectors>
            <div>
              <i className="uil uil-books"></i>
              <h3>livraria</h3>
              <button
                onClick={handleOpenSectorModal}
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
                onClick={handleOpenSectorModal}
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
                onClick={handleOpenSectorModal}
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
                onClick={handleOpenSectorModal}
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
                onClick={handleOpenSectorModal}
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
                onClick={handleOpenSectorModal}
                type="button"
              >
                Visualizar
                <i className="uil uil-arrow-right"></i>
              </button>
            </div>

            <Modal
              isOpen={isSectorModalOpen}
              onRequestClose={handleCloseSectorModal}
              overlayClassName="react-modal-overlay"
              className="react-modal-content"
            >
              <button 
                type="button" 
                onClick={handleCloseSectorModal} 
                className="react-modal-close"
              >
                <img src={closeImg} alt="Fechar modal" />
              </button>

              <h2>Setor</h2>

              <table className="table_modal">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2020</td>
                    <td>
                      <button
                      
                      >
                        <i className="uil uil-search-alt"></i>
                      </button>
                      <button
                      
                      >
                        <i className="uil uil-usd-circle"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

            </Modal>
          </Sectors>
        </Content>
      </Container>
      <Footer />
    </>
  )
}