import { UilBookOpen } from '@iconscout/react-unicons'

import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { Header } from "../Header"
import { Footer } from "../Footer"
import { Container, Content } from "./styles"

export function Main() {
  useWithSSRAuth()

  return (
    <>
      <Header />
      <Container>
        <Content>
          <p>
            <i><UilBookOpen size="50" /></i>
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
