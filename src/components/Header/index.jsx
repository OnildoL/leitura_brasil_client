import { UilApps } from '@iconscout/react-unicons'
import { UilBookOpen } from "@iconscout/react-unicons"
import { Container, Content } from "./styles"
import { Link } from "react-router-dom"
import { AuthContext, signOut } from "../../contexts/AuthContext"
import { useContext } from "react"
import { usePermission } from "../../hooks/usePermission"
import { useWithSSRAuth } from '../../utils/withSSRAuth'

export function Header() {
  useWithSSRAuth()
  const { user } = useContext(AuthContext)

  const { userCanSeeDev } = usePermission()

  function logOut() {
    signOut()
  }
  
  return (
    <Container>
      <Content>
          <div className="panel_logo_user">
            <Link to="/main">
                <div className="logo">
                  <i className="table__icon"><UilBookOpen size="20" /></i>
                  leitura
                </div>
            </Link>
            <div className="user">
              {`Usuário: ${user?.name}`}
            </div>
          </div>
        <nav>
          <ul>

            { userCanSeeDev && <li>
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
                {/* <Link to="/devolutions">
                  devoluções
                </Link> */}
              </ul>
            </li>

            <li>
              cpd
              <ul>
                <Link to="/notes">
                  notas e produtos
                </Link>
                {/* <Link to="/missings">
                  faltantes e divergências
                </Link>
                <Link to="/reports">
                  controle de relatórios
                </Link> */}
              </ul>
            </li>

            <li>
              <i><UilApps size="13" /></i>
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
