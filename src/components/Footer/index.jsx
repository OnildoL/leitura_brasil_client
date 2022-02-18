import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { Container, Content } from "./styles"

export function Footer() {
  useWithSSRAuth()
  
  return (
    <Container>
      <Content>
        <p>
          &#169; Leitura Brasil | Created by Onildo Gonçalves. All right reserved
          <i className="uil uil-shield-check"></i>
        </p>
      </Content>
    </Container>
  )
}
