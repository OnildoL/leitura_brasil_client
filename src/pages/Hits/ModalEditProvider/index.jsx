import { useContext, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"
import { AuthContext } from "../../../contexts/AuthContext"
import { useNotification } from "../../../hooks/useNotification"
import { api } from "../../../services/api"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"
import { Container, FormContainer } from "./styles"

export function ModalEditProvider({ isOpen, onRequestClose, provider, selectStore }) {
  useWithSSRAuth()
  
  const dispatch = useNotification()

  const { user } = useContext(AuthContext)

  // Edita editora com informações por loja
  const [activated, setActivated] = useState("")
  const [discount, setDiscount] = useState("")
  const [map, setMap] = useState("")
  const [brand, setBrand] = useState("")
  const [shipping, setShipping] = useState("")

  // Edita editora com informações por loja
  function handleEditionProviderInfo(event) {
    event.preventDefault()

    if (selectStore && selectStore !== user.store) {
      dispatch({
        type: "error",
        message: "Apenas usuários dessa loja podem alterar os dados!",
      })
      return
    }

    const data = {
      activated: !activated ? provider.activated : activated,
      discount: !discount ? provider.discount : discount, 
      map: !map ? provider.map : map.toUpperCase(), 
      brand: !brand ? provider.brand : brand.toUpperCase(),
      shipping: !shipping ? provider.shipping : shipping.toUpperCase(), 
      providers_id: provider.id, 
      store: user.store
    }
    
    
    api.put("providers", data)
      .then(response => {
        setActivated("")
        setDiscount("")
        setMap("")
        setBrand("")
        setShipping("")

        onRequestClose()
        
        dispatch({
          type: "success",
          message: `Edição feita com sucesso!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Falha na edição!`,
        })
      })
  }

  return (
    <>
      <Container>
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-goal-hit"
        >
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>

          <FormContainer onSubmit={handleEditionProviderInfo}>
            <h2>Edição editora</h2>

            <input 
              type="text"
              maxLength={30}
              onChange={event => setDiscount(event.target.value)}
              placeholder="Desconto"
            />

            <input 
              type="text"
              maxLength={15}
              onChange={event => setMap(event.target.value)}
              placeholder="Mapa"
            />
            
            <input 
              type="text"
              maxLength={15}
              onChange={event => setBrand(event.target.value)}
              placeholder="Marca"
              disabled
            />

            <input 
              type="text"
              maxLength={15}
              onChange={event => setShipping(event.target.value)}
              placeholder="Frete"
            />

            <select onChange={event => setActivated(event.target.value)}>
              <option value="">-- Ativar ou Desativar --</option>
              <option value="yes">Ativar</option>
              <option value="no">Desativar</option>
            </select>

            <button type="submit">
              Atualizar
            </button>
          </FormContainer>

        </Modal>
      </Container>
    </>
  )
}