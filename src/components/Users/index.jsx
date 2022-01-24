import Modal from "react-modal"
import { UilUsersAlt, UilSetting } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useWithSSRAuth } from "../../utils/withSSRAuth";
import { Header } from "../Header"
import { Footer } from "../Footer"
import { api } from "../../services/api";

import closeImg from "../../assets/Img/close.svg"

import { Container, Content, FormContainer } from "./styles";
import { useNotification } from "../../hooks/useNotification";
import { usePermission } from "../../hooks/usePermission";

Modal.setAppElement("#root")

export function Users() {
  useWithSSRAuth()

  const dispatch = useNotification()

  const navigate = useNavigate()

  const { userCanSeeDev } = usePermission()

  if (!userCanSeeDev) {
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
          message: `Usuário cadastrado!`,
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
              <i><UilUsersAlt className="table__icon" size="16" /></i>
              Usuários
            </h1>
            <p>Cadastro de usuários.</p>
          </section>

          <section className="panel">
            <h1>
              <i className="table__icon"><UilSetting size="16" /></i>
              Opções
            </h1>

            {userCanSeeDev && <button
              onClick={handleOpenNewUserModal}
              type="button"
            >
              <i><UilUsersAlt className="table__icon" size="16" /></i>
              Novo usuário
            </button>}

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