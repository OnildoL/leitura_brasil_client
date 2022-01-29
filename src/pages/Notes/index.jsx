import Modal from "react-modal";
import closeImg from "../../assets/Img/close.svg"
import { UilClipboardNotes, UilSearchAlt  } from "@iconscout/react-unicons"
import { useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useWithSSRAuth } from '../../utils/withSSRAuth';
import { Container, Content } from "./styles"

export function Notes() {
  useWithSSRAuth()

  const [optionsModalOpen, setOptionsModalOpen] = useState(false)

  function handleOpenOptions() {
    setOptionsModalOpen(true)
  }

  function handleCloseOptions() {
    setOptionsModalOpen(false)
  }

  return (
    <>
      <Header />
      <Container>
        <Content>

          <section>
            <h1>
              <i><UilClipboardNotes className="table__icon" size="16" /></i>
              Notas
            </h1>
            <p>Listagem de notas fiscais e produtos.</p>
          </section>

          <section className="panel">
            <button
              onClick={handleOpenOptions}
              type="button"
            >
              <i><UilClipboardNotes className="table__icon" size="16" /></i>
              Opções
            </button>
          </section>

          <div className="search panel">
            <input type="text" placeholder="Pesquisar" /> 
            <select>
              <option value="">-- Escolher coluna --</option>
              <option value="1">Número</option>
              <option value="3">Fornecedor</option>
              <option value="5">Etiqueta</option>
              <option value="6">Chegou</option>
              <option value="7">Entrada</option>
            </select>
            <button
            >
              Pesquisar
            </button>
          </div>

          <div>
            <table>
              <thead>
                <tr>
                  <th>Valor total</th>
                  <th>Número</th>
                  <th>Emissão</th>
                  <th>Fornecedor</th>
                  <th>Receber</th>
                  <th>Etiqueta</th>
                  <th>Chegou</th>
                  <th>Entrada</th>
                  <th>Frete</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>R$ 75.154,02</td>
                  <td>15484872</td>
                  <td>28/01/2022</td>
                  <td className="defaul_field">FORNECEDOR DE JUJUBAS LTDA NOVA EDITORA DO MOMENTO SENSACIONAL</td>
                  <td>Sim</td>
                  <td className="consignacao">CONSIGNAÇÃO</td>
                  <td>28/01/2022</td>
                  <td>28/01/2022</td>
                  <td>OK</td>
                  <td>
                    <button
                      className="button_icon"
                    >
                      <i><UilSearchAlt className="table__icon" size="16" /></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>R$ 75.154,02</td>
                  <td>15484872</td>
                  <td>28/01/2022</td>
                  <td className="defaul_field">FORNECEDOR DE JUJUBAS LTDA NOVA EDITORA DO MOMENTO SENSACIONAL</td>
                  <td>Sim</td>
                  <td className="consignacao">CONSIGNAÇÃO</td>
                  <td>28/01/2022</td>
                  <td>28/01/2022</td>
                  <td>OK</td>
                  <td>
                    <button
                      className="button_icon"
                    >
                      <i><UilSearchAlt className="table__icon" size="16" /></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>R$ 75.154,02</td>
                  <td>15484872</td>
                  <td>28/01/2022</td>
                  <td className="defaul_field">FORNECEDOR DE JUJUBAS LTDA NOVA EDITORA DO MOMENTO SENSACIONAL</td>
                  <td>Sim</td>
                  <td className="consignacao">CONSIGNAÇÃO</td>
                  <td>28/01/2022</td>
                  <td>28/01/2022</td>
                  <td>OK</td>
                  <td>
                    <button
                      className="button_icon"
                    >
                      <i><UilSearchAlt className="table__icon" size="16" /></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        
          <Modal
            isOpen={optionsModalOpen}
            onRequestClose={handleCloseOptions}
            overlayClassName="react-modal-overlay"
            className="react-modal-content-note"
          >
            <button 
              type="button" 
              onClick={handleCloseOptions} 
              className="react-modal-close"
            >
              <img src={closeImg} alt="Fechar modal" />
            </button>

            <h2>Opções de notas</h2>
            <p>Formato suportado: .xlsx ou .csv</p>

            <div>
              <span>Inserir notas</span>
              <input type="file" />
              <button className="button">
                Inserir
              </button>
            </div>

            <div>
              <span>Inserir produtos</span>
              <input type="file" />
              <button className="button">
                Inserir
              </button>
            </div>

            <div>
              <span>Inserir entradas</span>
              <input type="file" />
              <button className="button">
                Inserir
              </button>
            </div>

          </Modal>

        </Content>
      </Container>
      <Footer />
    </>
  )
}
