import Modal from "react-modal"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useWithSSRAuth } from "../../utils/withSSRAuth";
import { Header } from "../Header"
import { Footer } from "../Footer"
import { api } from "../../services/api";

import closeImg from "../../assets/Img/close.svg"

import { Container, Content, FormContainer } from "./styles";
import { useCan } from "../../hooks/useCan";
import { useNotification } from "../../hooks/useNotification";

Modal.setAppElement("#root")

export function Users() {
  useWithSSRAuth()

  const dispatch = useNotification()

  const navigate = useNavigate()
  const userCanSeeUsers = useCan({
    roles: ["developer", "manager"]
  })

  if (!userCanSeeUsers) {
    navigate("/main")
  }

  const [user, setUser] = useState(0)
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [store, setStore] = useState("")

  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)

  function handleOpenNewUserModal() {
    setIsNewUserModalOpen(true)
  }

  function handleCloseNewUserModal() {
    setIsNewUserModalOpen(false)
  }

  async function handleCreateNewUser(event) {
    event.preventDefault()

    const data = {
      user,
      password,
      name,
      role,
      store
    }

    api.post("users", data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Usuário cadastrado com sucesso!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: error.response.data.message,
        })
      })
    
    setUser(0)
    setPassword("")
    setName("")
    setRole("")
    setStore("")

    handleCloseNewUserModal()
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <section>
            <h1>
              <i className="uil uil-users-alt table__icon"></i>
              Usuários
            </h1>
            <p>Área para administradores e gerentes.</p>
          </section>

          <section className="panel">
            <h1>
              <i className="uil uil-setting table__icon"></i>
              Opções
            </h1>
            <button
              onClick={handleOpenNewUserModal}
              type="button"
            >
              <i className="uil uil-user table__icon"></i>
              Novo usuário
            </button>

            <Modal
              isOpen={isNewUserModalOpen}
              onRequestClose={handleCloseNewUserModal}
              overlayClassName="react-modal-overlay"
              className="react-modal-content"
            >
              <button 
                type="button" 
                onClick={handleCloseNewUserModal} 
                className="react-modal-close"
              >
                <img src={closeImg} alt="Fechar modal" />
              </button>

              <FormContainer onSubmit={handleCreateNewUser}>
                <h2>Cadastrar usuário</h2>

                <input
                  type="number"
                  placeholder="Usuário"
                  value={user}
                  onChange={event => setUser(Number(event.target.value))}
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                />

                <input
                  placeholder="Nome" 
                  value={name}
                  onChange={event => setName(event.target.value)}
                  required
                />

                <select value={role} onChange={event => setRole(event.target.value)} required>
                  <option value="">-- Escolher Função --</option>
                  <option value="administrator">Administrador</option>
                  <option value="manager">Gerente</option>
                  <option value="coordinator">Coordenador</option>
                  <option value="cpd">Cpd</option>
                  <option value="assistant">Assistente</option>
                </select>

                <select value={store} onChange={event => setStore(event.target.value)} required>
                  <option value="">-- Escolher Loja --</option>
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
          </section>
        </Content>
      </Container>
      <Footer />
    </>
  )
}