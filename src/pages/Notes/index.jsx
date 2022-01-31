import Modal from "react-modal";
import closeImg from "../../assets/Img/close.svg"
import { UilClipboardNotes, UilSearchAlt  } from "@iconscout/react-unicons"
import { useEffect, useRef, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useWithSSRAuth } from '../../utils/withSSRAuth';
import { Container, Content } from "./styles"
import { api } from "../../services/api";
import { useNotification } from "../../hooks/useNotification";
import { Note } from "./Note";
import { usePermission } from "../../hooks/usePermission";

export function Notes() {
  useWithSSRAuth()

  const { userCanSeeDev } = usePermission()
  const dispatch = useNotification()
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState({})
  const [optionsModalOpen, setOptionsModalOpen] = useState(false)
  const [noteModalOpen, setNoteModalOpen] = useState(false)
  const [fileNotes, setFileNotes] = useState("")
  const el = useRef()

  function handleChange(e) {
    const file = e.target.files[0]
    setFileNotes(file)
  }

  function handleOpenOptions() {
    setOptionsModalOpen(true)
  }

  function handleCloseOptions() {
    setOptionsModalOpen(false)
  }

  function handleOpenNote(access_key) {
    // Fazer em breve!
    setNote(access_key)

    setNoteModalOpen(true)
  }

  function handleCloseNote() {
    setNoteModalOpen(false)
  }

  function handleInsertNotes(event) {
    event.preventDefault()
    
    const formData = new FormData()
    formData.append("file", fileNotes)
    
    api.post("notes", formData)
      .then(response => {
        dispatch({
          type: "success",
          message: `Notas inseridas!`,
        })
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: error.response.data.message,
        })
      })

    setFileNotes("")
    handleCloseOptions()
  }

  useEffect(() => {
    api.get("notes")
      .then(response => setNotes(response.data))
      .catch(error => {
        dispatch({
          type: "error",
          message: error.response.data.message,
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
              <i><UilClipboardNotes className="table__icon" size="16" /></i>
              Notas
            </h1>
            <p>Listagem de notas fiscais e produtos.</p>
          </section>

          <section className="panel">
            <button
              onClick={handleOpenOptions}
              type="button"
            >
              <i><UilClipboardNotes className="table__icon" size="16" /></i>
              Opções
            </button>
          </section>

          {userCanSeeDev && <div className="search panel">
            <input type="text" placeholder="Pesquisar" /> 
            <select>
              <option value="">-- Escolher coluna --</option>
              <option value="1">Número</option>
              <option value="3">Fornecedor</option>
              <option value="5">Etiqueta</option>
              <option value="6">Chegou</option>
              <option value="7">Entrada</option>
            </select>
            <button
            >
              Pesquisar
            </button>
          </div>}

          <div>
            <table>
              <thead>
                <tr>
                  <th>Valor total</th>
                  <th>Número</th>
                  <th>Emissão</th>
                  <th>Fornecedor</th>
                  {/* <th>Receber</th> */}
                  <th>Etiqueta</th>
                  <th>Chegou</th>
                  <th>Entrada</th>
                  <th>Frete</th>
                  {userCanSeeDev && <th>Ações</th>}
                </tr>
              </thead>
              <tbody>
                {
                  notes.map(note => {
                    return (
                      <tr key={note.id}>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(note.value ?? 0)
                          }  
                        </td>
                        <td>{note.nf}</td>
                        <td>
                          {
                            new Intl.DateTimeFormat('pt-BR', { 
                              dateStyle: "short", 
                            }).format(new Date(note.issue))
                          }
                        </td>
                        <td className="defaul_field">{note.provider}</td>
                        {/* <td>Sim</td> */}
                        <td>{note.hangtag}</td>
                        <td>{note.arrival}</td>
                        <td>{note.input}</td>
                        <td>{note.situation}</td>
                        {userCanSeeDev && <td>
                          <button
                            onClick={() => handleOpenNote(note.access_key)}
                            className="button_icon"
                          >
                            <i><UilSearchAlt className="table__icon" size="16" /></i>
                          </button>
                        </td>}
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        
          <Modal
            isOpen={optionsModalOpen}
            onRequestClose={handleCloseOptions}
            overlayClassName="react-modal-overlay"
            className="react-modal-content-note"
          >
            <button 
              type="button" 
              onClick={handleCloseOptions} 
              className="react-modal-close"
            >
              <img src={closeImg} alt="Fechar modal" />
            </button>

            <h2>Opções de notas</h2>
            <p>Formato suportado: .xlsx</p>

            <form onSubmit={handleInsertNotes}>
              <span>Inserir notas</span>
              <input type="file" ref={el} onChange={handleChange} required/>
              <button type="submit" className="button">
                Inserir
              </button>
            </form>

            {/* <div>
              <span>Inserir produtos</span>
              <input type="file" />
              <button className="button">
                Inserir
              </button>
            </div>

            <div>
              <span>Inserir entradas</span>
              <input type="file" />
              <button className="button">
                Inserir
              </button>
            </div> */}

          </Modal>

          <Note 
            isOpen={noteModalOpen}
            onRequestClose={handleCloseNote}
            note={note}
          />

        </Content>
      </Container>
      <Footer />
    </>
  )
}
