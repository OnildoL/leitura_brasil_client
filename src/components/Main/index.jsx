import { Header } from "../Header"
import { Footer } from "../Footer"
import { Container, Content } from "./styles"

export function Main() {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <p>
            <i className="uil uil-book-open"></i>
            leitura brasil
          </p>
          <span>
            Controle interno de metas, pedidos, acertos e notas fiscais.
          </span>
        </Content>
      </Container>
      <Footer />
    </>
  )
}
