import Modal from "react-modal"
import { useState } from "react"

import closeImg from "../../../assets/Img/close.svg"
import totalImg from "../../../assets/Img/total.svg"

import { Container, Content, Summary } from "./styles"

export function ModalSector({ isOpen, onRequestClose, sector, sectors }) {
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)

  function handleOpenGoalsModal() {
    setIsGoalsModalOpen(true)
  }

  function handleCloseGoalsModal() {
    setIsGoalsModalOpen(false)
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

        <h2>{sector.toUpperCase()}</h2>

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
              sectors.map(sector => {
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
                        <i className="uil uil-search-alt"></i>
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
            <h2>Metas livraria</h2>

            <table>
              <thead>
                <tr>
                  <th>Referência</th>
                  <th>Mês</th>
                  <th>Meta</th>
                  <th>Pedido</th>
                  <th>Entrada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2022</td>
                  <td>FEV</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                    <button>
                      <i class="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>MAR</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>ABR</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>MAI</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>JUN</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>JUL</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>AGO</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>SET</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>OUT</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>NOV</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>DEZ</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2023</td>
                  <td>JAN</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td>R$ 0</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <Summary>
              <div>
                <header>
                  <p>Total metas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total pedidos</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total entradas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
            </Summary>

            <h2>Consolidado do ano</h2>

            <table>
              <thead>
                <tr>
                  <th>Referência</th>
                  <th>Mês</th>
                  <th>Meta</th>
                  <th>Pedido</th>
                  <th>Entrada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>2022</th>
                  <th>FEV</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                </tr>
                <tr>
                  <th>2022</th>
                  <th>MAR</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                </tr>
                <tr>
                  <th>2022</th>
                  <th>ABR</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                  <th>R$ 278.000,00</th>
                </tr>
              </tbody>
            </table>

            <Summary>
              <div>
                <header>
                  <p>Total metas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total pedidos</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
              <div>
                <header>
                  <p>Total entradas</p>
                  <i class="uil uil-usd-circle"></i>
                </header>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(1000000)}
                </strong>
              </div>
            </Summary>

            <h2>Pedidos livraria</h2>

            <table>
              <thead>
                <tr>
                  <th>Referência</th>
                  <th>Fornecedor</th>
                  <th>Mês</th>
                  <th>Valor Pedido</th>
                  <th>Valor Nota</th>
                  <th>Número</th>
                  <th>Emissão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2022</td>
                  <td>SBS</td>
                  <td>FEV</td>
                  <td>R$ 1.500,00</td>
                  <td>R$ 1.500,00</td>
                  <td>123978</td>
                  <td>18/01/2022</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                    <button>
                      <i class="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>SBS</td>
                  <td>FEV</td>
                  <td>R$ 1.500,00</td>
                  <td>R$ 1.500,00</td>
                  <td>123978</td>
                  <td>18/01/2022</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                    <button>
                      <i class="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>SBS</td>
                  <td>FEV</td>
                  <td>R$ 1.500,00</td>
                  <td>R$ 1.500,00</td>
                  <td>123978</td>
                  <td>18/01/2022</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                    <button>
                      <i class="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>SBS</td>
                  <td>FEV</td>
                  <td>R$ 1.500,00</td>
                  <td>R$ 1.500,00</td>
                  <td>123978</td>
                  <td>18/01/2022</td>
                  <td className="button_icon">
                    <button>
                      <i class="uil uil-pen"></i>
                    </button>
                    <button>
                      <i class="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Content>
        </Container>

      </Modal>
    </>
  )
}