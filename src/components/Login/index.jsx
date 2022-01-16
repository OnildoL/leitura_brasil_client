import { useContext, useState } from "react"
import  { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import logoImg from "../../assets/Img/logo_leitura.png"
import { Container, Content } from "./styles"
import { useTheTokenIfItExists } from "../../utils/withSSRAuth"

export function Login() {
  useTheTokenIfItExists()

  let navigate = useNavigate()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      user,
      password
    }

    const response = await signIn(data)
    if (response) {
      navigate("/main")
    }
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit}>
        <img src={logoImg} alt="Logo" />
        <input 
          type="text" 
          placeholder="Usuário"
          value={user} 
          onChange={event => setUser(event.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Senha"
          value={password} 
          onChange={event => setPassword(event.target.value)} 
          required
        />
        <button type="submit">Entrar</button>
      </Content>
    </Container>
  )
}