import { api } from "../../../services/api"
import { useEffect, useState } from "react"
import { Container, Content } from "./styles"

export function Table() {
  const [users, setUsers] = useState([])

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
                          timeStyle: "short" 
                        }).format(new Date(user.created_at))
                      }
                    </td>
                    <td>
                      {
                        new Intl.DateTimeFormat('pt-BR', { 
                          dateStyle: "short", 
                          timeStyle: "short" 
                        }).format(new Date(user.updated_at))
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Content>
    </Container>
  )
}