import { Header } from "../Header"
import { Footer } from "../Footer"
import { Container, Content } from "./styles";
import { useWithSSRAuth } from "../../utils/withSSRAuth";

export function Goals() {
  useWithSSRAuth()

  return (
    <>
      <Header />
      <Container>
        <Content>
          <section>
            <h1>
              <i className="uil uil-apps table__icon"></i>
              Setores
            </h1>
            <p>Listagem de todas as metas e pedidos.</p>
          </section>

          <section className="panel">
            <h1>
              <i className="uil uil-setting table__icon"></i>
              Opções
            </h1>
            <button>
              <i className="uil uil-trophy table__icon"></i>
              Nova meta
            </button>
          </section>
        </Content>
      </Container>
      <Footer />
    </>
  )
}