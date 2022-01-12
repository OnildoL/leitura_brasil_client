import { Container, Content } from "./styles"
import { Link } from "react-router-dom"
import { useCan } from "../../hooks/useCan"
import { AuthContext, signOut } from "../../contexts/AuthContext"
import { useContext } from "react"

export function Header() {
  const { user } = useContext(AuthContext)
  const userCanSeeAdmin = useCan({
    roles: ["developer"]
  })

  function logOut() {
    signOut()
  }

  return (
    <Container>
      <Content>
          <div className="panel_logo_user">
            <Link to="/main">
                <div className="logo">
                  <i className="uil uil-book-open table__icon"></i>
                  leitura
                </div>
            </Link>
            <div className="user">
              {`Usuário: ${user.name} - Loja: ${user.store}`} 
              <select name="" id="">
                <option value="">Leitura Manaíra</option>
              </select>
            </div>
          </div>
        <nav>
          <ul>

            { userCanSeeAdmin && <li>
              admin
              <ul>
                <Link to="/users">
                  usuários
                </Link>
              </ul>
            </li> }

            <li>
              gerência
              <ul>
                <Link to="/goals">
                  metas de compra e pedidos
                </Link>
                <Link to="/hits">
                  acertos
                </Link>
              </ul>
            </li>

            <li>
              cpd
              <ul>
                <Link to="/notes">
                  notas e produtos
                </Link>
                <Link to="/missings">
                  faltantes
                </Link>
                <Link to="/divergences">
                  divergências
                </Link>
                <Link to="/reports">
                  controle de relatórios
                </Link>
              </ul>
            </li>

            <li>
              livraria
              <ul>
                <Link to="/devolutions">
                  devoluções
                </Link>
              </ul>
            </li>

            <li>
              configurações
              <ul>
                <Link to="/profiles">
                  perfil
                </Link>
                <li onClick={logOut}>
                  sair
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      </Content>
    </Container>
  )
}
