import { useContext, useEffect, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"
import { AuthContext } from "../../../contexts/AuthContext"
import { useNotification } from "../../../hooks/useNotification"
import { usePermission } from "../../../hooks/usePermission"
import { api } from "../../../services/api"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"
import { Container, FormContainer } from "./styles"

export function ModalProvider({ isOpen, onRequestClose, }) {
  useWithSSRAuth()

  const dispatch = useNotification()

  const { user } = useContext(AuthContext)
  const { userCanSeeDev } = usePermission()

  const [providersIds, setProvidersIds] = useState([])

  // Cadastrar editora
  const [provider, setProvider] = useState("")
  const [numberNerus, setNumberNerus] = useState("")

  // Cadastrar editora com informações por loja
  const [discount, setDiscount] = useState("")
  const [map, setMap] = useState("")
  const [brand, setBrand] = useState("")
  const [shipping, setShipping] = useState("")
  const [providerName, setProviderName] = useState("")
  const [selectStore, setSelectStore] = useState("")

  // Cadastrar editora
  function handleCreateNewProvider(event) {
    event.preventDefault()

    const data = {
      provider: provider.toUpperCase(), 
      number_nerus: numberNerus 
    }

    api.post("providers", data)
      .then(response => {
        setProvider("")
        setNumberNerus("")
        
        dispatch({
          type: "success",
          message: `Editora cadastrada com sucesso!`,
        })
    
        api.get("providers/names/ids")
        .then(response => {
          setProvidersIds(response.data)
        })
        .catch(error => {
          dispatch({
            type: "error",
            message: `Erro interno ao tentar consultar editoras!`,
          })
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar cadastrar a editora!`,
        })
      })
  }

  // Cadastrar editora com informações por loja
  function handleCreateNewProviderInfo(event) {
    event.preventDefault()
    
    const data = {
      activated: "yes",
      discount, 
      map, 
      brand,
      shipping, 
      providers_id: Number(providerName), 
      store: !selectStore ? user.store :  selectStore
    }

    api.post("providers/info", data)
      .then(response => {
        setDiscount("")
        setMap("")
        setBrand("")
        setShipping("")
        setProviderName("")
        setSelectStore("")
        
        dispatch({
          type: "success",
          message: `Editora cadastrada com sucesso!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Já existe editora cadastrada!`,
        })
      })
  }

  useEffect(() => {
    api.get("providers/names/ids")
      .then(response => {
        setProvidersIds(response.data)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar consultar editoras!`,
        })
      })
  }, [])

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

          {userCanSeeDev && <FormContainer onSubmit={handleCreateNewProvider}>
            <h2>Nova editora</h2>

            <input 
              type="text"
              maxLength={30}
              onChange={event => setProvider(event.target.value)}
              placeholder="Nome editora"
              required
            />

            <input 
              type="text"
              maxLength={15}
              onChange={event => setNumberNerus(event.target.value)}
              placeholder="Número interno nerus"
              required
            />

            <button type="submit">
              Cadastrar
            </button>
          </FormContainer>}

          <FormContainer onSubmit={handleCreateNewProviderInfo}>
            <h2>Informações editora</h2>

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
            />

            <input 
              type="text"
              maxLength={15}
              onChange={event => setShipping(event.target.value)}
              placeholder="Frete"
            />

            <select onChange={event => setProviderName(event.target.value)} required>
              <option value="">-- Escolher editora --</option>
              {
                providersIds.map(provider => {
                  return (
                    <option key={provider.id} value={provider.id}>{provider.provider}</option>
                  )
                })
              }
            </select>

            {userCanSeeDev && <select onChange={event => setSelectStore(event.target.value)}>
              <option value="">-- Escolher Loja --</option>
              <option value="31">Leitura Manaíra</option>
              <option value="69">Leitura Mangabeira</option>
              <option value="04">Leitura Tacaruna</option>
              <option value="109">Leitura Riomar</option>
              <option value="98">Leitura Recife</option>
              <option value="108">Leitura Caruaru</option>
              <option value="76">Leitura Campina Grande</option>
            </select>}

            <button type="submit">
              Cadastrar
            </button>
          </FormContainer>

        </Modal>
      </Container>
    </>
  )
}