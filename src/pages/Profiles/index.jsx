import { UilUser } from '@iconscout/react-unicons'
import { useContext, useState } from "react"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { AuthContext } from "../../contexts/AuthContext"
import { useNotification } from '../../hooks/useNotification'
import { api } from '../../services/api'
import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { Container, Content } from "./styles"

export function Profiles() {
  useWithSSRAuth()

  const { user } = useContext(AuthContext)
  const dispatch = useNotification()
  const [currentPassword, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("")

  function handleNewPassword(event) {
    event.preventDefault()

    const data = {
      current_password: currentPassword,
      password: password,
    }

    api.put("users/new/password", data)
      .then(response => {
        dispatch({
          type: "success",
          message: `Senha atualizada!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Senha inválida!",
        })
      })

    setPassword("")
    setCurrentPassword("")
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <section>
            <h1>
              <i><UilUser className="table__icon" size="16" /></i>
              Perfil
            </h1>
            <p>Alteração de senha.</p>
          </section>

          <section className="panel">
            <form onSubmit={handleNewPassword}>
              <input 
                type="password"
                value={currentPassword}
                onChange={event => setCurrentPassword(event.target.value)} 
                placeholder="Senha atual" 
                required
              />
              <input 
                type="password" 
                value={password}
                onChange={event => setPassword(event.target.value)} 
                placeholder="Nova senha" 
                required
              />
              <button type="submit">
                Atualizar
              </button>
            </form>
          </section>
        </Content>
      </Container>
      <Footer />
    </>
  )
}
