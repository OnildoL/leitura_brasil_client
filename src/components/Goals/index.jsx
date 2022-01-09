import { Container, Content } from "./styles";

export function Goals() {
  return (
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
  )
}