import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Container, Content } from "./styles"

export function Login() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      user,
      password
    }

    await signIn(data)
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Usuário"
          value={user} 
          onChange={event => setUser(event.target.value)} 
        />
        <input 
          type="password"
          placeholder="Senha"
          value={password} 
          onChange={event => setPassword(event.target.value)} 
        />
        <button type="submit">Entrar</button>
      </Content>
    </Container>
  )
}