import Modal from "react-modal"
import { UilPen } from '@iconscout/react-unicons'
import { api } from "../../../services/api"
import { useEffect, useState } from "react"

import closeImg from "../../../assets/Img/close.svg"

import { Container, Content, FormContainer } from "./styles"
import { useNotification } from "../../../hooks/useNotification"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"

export function Table() {
  useWithSSRAuth()
  const [users, setUsers] = useState([])
  const dispatch = useNotification()

  const [isOpenModalUserEdition, setIsOpenModalUserEdition] = useState(false)

  function handleOpenUserEditionModal() {
    setIsOpenModalUserEdition(true)
  }

  function handleCloseUserEditionModal() {
    setIsOpenModalUserEdition(false)
  }

  const [activated, setActivated] = useState("")
  const [permission, setPermission] = useState("")

  const [userData, setUserData] = useState({})

  function handleUserSelect(user) {
    api.get(`users/edition/${user}`)
      .then(response => {
        setUserData(response.data)

        handleOpenUserEditionModal()
      })
      .catch(error => console.log(error))
  }

  function handleUserEditing(event) {
    event.preventDefault()

    const permissionUser = `${userData.permission},${permission}`

    const data = {
      activated: !activated || activated === "true" ? true : false,
      permission: !userData.permission ? permission : permissionUser
    }

    const permissionAlreadyExists = userData.permission && userData.permission.includes(permission)

    if (permissionAlreadyExists) {
      return dispatch({
        type: "error",
        message: "Permissão já cadastrada!",
      })
    }

    api.put(`users/${userData.id}`, data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Usuário atualizado!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro ao tentar atualizar informações do usuário!",
        })
      })
    
    setActivated("")
    setPermission("")

    handleCloseUserEditionModal()
  }

  useEffect(() => {
    api.get("users")
      .then(response => setUsers(response.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <Container>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Nome</th>
              <th>Ativo</th>
              <th>Loja</th>
              <th>Criado</th>
              <th>Atualizado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return (
                  <tr key={user.id} className="panel">
                    <td>{user.user}</td>
                    <td>{user.name}</td>
                    <td>{user.activated ? "Sim" : "Não"}</td>
                    <td>{user.store}</td>
                    <td>
                      {
                        new Intl.DateTimeFormat('pt-BR', { 
                          dateStyle: "short", 
                        }).format(new Date(user.created_at))
                      }
                    </td>
                    <td>
                      {
                        new Intl.DateTimeFormat('pt-BR', { 
                          dateStyle: "short", 
                        }).format(new Date(user.updated_at))
                      }
                    </td>
                    <td className="button_icon_users">
                      <button
                      onClick={() => handleUserSelect(user.user)}
                        type="button"
                      >
                        <i><UilPen size="16"/></i>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <Modal
              isOpen={isOpenModalUserEdition}
              onRequestClose={handleCloseUserEditionModal}
              overlayClassName="react-modal-overlay"
              className="react-modal-content"
            >
              <button 
                type="button" 
                onClick={handleCloseUserEditionModal} 
                className="react-modal-close"
              >
                <img src={closeImg} alt="Fechar modal" />
              </button>

              <FormContainer onSubmit={handleUserEditing}>
                <h2>Edição de usuário</h2>

                <select value={activated} onChange={event => setActivated(event.target.value)}>
                  <option value="">-- Usuário ativo --</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
                
                <select value={permission} onChange={event => setPermission(event.target.value)} required>
                  <option value="">-- Escolher permissões --</option>
                  <option value="users.find">Listagem de usuários</option>
                  <option value="users.create">Cadastro de usuários</option>
                </select>

                <button type="submit">
                  Atualizar
                </button>
              </FormContainer>
            </Modal>
      </Content>
    </Container>
  )
}