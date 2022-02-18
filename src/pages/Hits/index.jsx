import { UilFileCheckAlt, UilSearchAlt } from '@iconscout/react-unicons'
import { useEffect, useState } from 'react'
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { useNotification } from '../../hooks/useNotification'
import { api } from '../../services/api'
import { useWithSSRAuth } from "../../utils/withSSRAuth"
import { Container, Content, TableContent } from "./styles"

export function Hits() {
  useWithSSRAuth()
  const dispatch = useNotification()
  const [providers, setProviders] = useState([])

  useEffect(() => {
    api.get("providers")
      .then(response => {
        setProviders(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro interno ao consultar editoras!",
        })
      })
  }, [])

  return (
    <>
      <Header />
      <Container>
        <Content>
          <section>
            <h1>
              <i><UilFileCheckAlt size="16" /></i>
              Acertos
            </h1>
            <p>Listagem de editoras.</p>
          </section>

          <div>
            <TableContent>
              <thead>
                <tr>
                  <th className="sticky-col first-col">Ações</th>
                  <th className="sticky-col second-col">Editora</th>
                  <th>Acerto</th>
                  <th>Desconto</th>
                  <th>Frete</th>
                  <th>Mapa</th>
                  <th>Marca</th>
                  <th>N° Nerus</th>
                </tr>
              </thead>
              <tbody>
                {
                  providers.map(provider => {
                    return (
                      <tr key={provider.id}>
                        <td className="sticky-col first-col">
                          <button
                              className="button_icon"
                          >
                            {provider.id}<i><UilSearchAlt className="button_icon" size="16" /></i>
                          </button>
                        </td>
                        <td className="sticky-col second-col">{provider.provider.toUpperCase()}</td>
                        <td >{provider.right}</td>
                        <td >{provider.discount}</td>
                        <td >{provider.shipping.toUpperCase()}</td>
                        <td >{provider.map.toUpperCase()}</td>
                        <td >{provider.brand.toUpperCase()}</td>
                        <td >{provider.number_nerus}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </TableContent>
          </div>

        </Content>
      </Container>
      <Footer />
    </>
  )
}
