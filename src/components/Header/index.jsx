import { Container, Content } from "./styles"
import { Link } from "react-router-dom"

export function Header() {
  return (
    <Container>
      <Content>
        <Link to="/main">
          <div className="logo">
            <i className="uil uil-book-open table__icon"></i>
            leitura
          </div>
        </Link>
        <nav>
          <ul>

            <li>
              admin
              <ul>
                <Link to="/users">
                  usuários
                </Link>
              </ul>
            </li>

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
                <li>
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
