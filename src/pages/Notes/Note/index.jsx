import { useCallback, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../../assets/Img/close.svg"
import { useNotification } from "../../../hooks/useNotification"
import { dateMask, initialDateMask } from "../../../utils/masks"
import { useWithSSRAuth } from "../../../utils/withSSRAuth"
import { FormContainer } from "./styles"
import { api } from "../../../services/api";

export function Note({ isOpen, onRequestClose, note }) {
  useWithSSRAuth()

  const dispatch = useNotification()

  const handleKeyUpDateMask = useCallback((e) => {
    dateMask(e)
  }, [])

  const [input, setInput] = useState("")
  const [arrival, setArrival] = useState("")
  const [receive, setReceive] = useState("")
  const [hangtag, setHangtag] = useState("")
  const [comments, setComments] = useState("")

  function handleUpdateNote(event) {
    event.preventDefault()

    const date = new Intl.DateTimeFormat("pt-BR").format(new Date())
    const new_comments = `${note.comment ?? "-"}\n${date}: ${comments}`

    const update = {
      access_key: note.access_key,
      input: !input ? note.input : input === "0" ? "" : initialDateMask(input),
      arrival: !arrival ? note.arrival : arrival === "0" ? "" : initialDateMask(arrival),
      receive: !receive ? note.receive : receive.toUpperCase(),
      hangtag: !hangtag ? note.hangtag : hangtag,
      comment: !comments ? note.comment : new_comments,
    }

    api.put("notes", update)
      .then(response => {
        setInput("")
        setArrival("")

        onRequestClose()

        dispatch({
          type: "success",
          message: `Nota atualizado com sucesso!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: `Erro interno ao tentar atualizar nota!`,
        })
      })
  }

  function copyAccessKey() {
    navigator.clipboard.writeText(note.access_key)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-notes-edition"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <h2>Nota fiscal: {note.nf}</h2>
        <p>{note.provider}</p>

        <button
          className="accessKey" onClick={copyAccessKey}
          title="Clique para copiar"
        >
          <p>{note.access_key}</p>
        </button>

        <FormContainer onSubmit={handleUpdateNote}>
          <div className="display">
            <div>
              <div>Entrada da nota fiscal</div>

              <input
                type="text"
                onKeyUp={handleKeyUpDateMask}
                maxLength={10}
                onChange={event => setInput(event.target.value)}
                placeholder={note.input?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1") ?? "Data da entrada"}
              />
            </div>

            <div>
              <div>Mercadoria chegou?</div>

              <input
                type="text"
                onKeyUp={handleKeyUpDateMask}
                maxLength={10}
                onChange={event => setArrival(event.target.value)}
                placeholder={note.arrival?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1") ?? "Data de recebimento"}
              />
            </div>

            <div>
              <div 
                className={note.receive}
              >
                {note.receive?.toUpperCase() ?? "-"}
              </div>

              <select onChange={event => setReceive(event.target.value)}>
                <option value="">-- Escolher situa????o --</option>
                <option value="receber">Receber</option>
                <option value="nao-receber">N??o receber</option>
                <option value="pendente">Nota pendente</option>
              </select>
            </div>

            <div>
              <div 
                className={note.hangtag?.replace(".", "").replace(/\s/g, "-")}
              >
                {note.hangtag ?? "-"}
              </div>

              <select onChange={event => setHangtag(event.target.value)}>
                <option value="">-- Escolher etiqueta --</option>
                <optgroup label="LIVRARIA">
                  <option value="LIVROS COMPRAS">COMPRA</option>
                  <option value="LIVROS - CONSIG">CONSIGNA????O</option>
                  <option value="LIVROS - ACERTO">ACERTO</option>
                  <option value="TROCA DE NOTA">TROCA DE NOTA</option>
                  <option value="REAJUSTE PRE??O">AJUSTE DE PRE??O</option>
                  <option value="LIVROS DIDATICO">DIDATICO</option>
                </optgroup>
                <optgroup label="PAPELARIA">
                  <option value="PRESENTES">PRESENTE</option>
                  <option value="PAPELARIA">PAPELARIA</option>
                  <option value="BOMBONIERE">BOMBONIERE</option>
                </optgroup>
                <optgroup label="INFORM??TICA">
                  <option value="MUSICA">M??SICA</option>
                  <option value="GAMES">GAMES</option>
                  <option value="INFORMATICA">INFORM??TICA</option>
                  <option value="QUADRINHOS">QUADRINHOS</option>
                </optgroup>
                <optgroup label="OUTROS">
                  <option value="BONIFICADO">BONIFICA????O</option>
                  <option value="USO E CONSUMO">CONSUMO</option>
                  <option value="SERVI??OS">SERVI??O</option>
                  <option value="VENDAS ONLINE">VENDAS ONLINE</option>
                  <option value="DEVOLU????O">DEVOLU????O</option>
                  <option value="RECUSADO">RECUSADA</option>
                  <option value="CANCELADA">CANCELADA</option>
                  <option value="DEVOLSIMBOLICA">SIMBOLICA</option>
                  <option value="ACOMPANHAMENTO">ACOMPANHAMENTO</option>
                  <option value="OUTROS">OUTROS</option>
                </optgroup>
              </select>
            </div>

          </div>

          <textarea
            type="text"
            onChange={event => setComments(event.target.value)}
            placeholder={note.comment ?? "Campo para observa????es..."}
          />

          <button type="submit">
            Atualizar
          </button>
        </FormContainer>

      </Modal>
    </>
  )
}