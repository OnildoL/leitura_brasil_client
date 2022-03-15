import Modal from "react-modal";
import closeImg from "../../assets/Img/close.svg"
import { UilClipboardNotes, UilSearchAlt  } from "@iconscout/react-unicons"
import { useEffect, useRef, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useWithSSRAuth } from '../../utils/withSSRAuth';
import { Container, Content, Pagination, TableContent } from "./styles"
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
  const [valueSearch, setValueSearch] = useState("")
  const [columnSearch, setColumnSearch] = useState("")
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

  function handleOpenNote(note) {
    setNote(note)

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
          message: "Arquivo ou formato inválido ou número máximo de linhas ultrapassado!",
        })
      })

    setFileNotes("")
    handleCloseOptions()
  }

  function handleSearch() {
    const filter = notes.filter(note => note[columnSearch] === valueSearch)
    
    setNotes(filter)
  }
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)

  function nextPageNotes(pageNumber) {
    setPage(pageNumber)
    
    api.get(`notes?page=${pageNumber}`)
    .then(response => {
      setNotes(response.data.notes)
    })
    .catch(error => {
      dispatch({
        type: "error",
        message: "Erro interno ao consultar notas!",
      })
    })
  }

  useEffect(() => {
    api.get("notes")
      .then(response => {
        setTotalPages(parseInt(response.data.count))
        setNotes(response.data.notes)
      })
      .catch(error => {
        dispatch({
          type: "error",
          message: "Erro interno ao consultar notas!",
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

          {/* {userCanSeeDev && <section className="search panel">
            <input 
              type="text" 
              placeholder="Pesquisar"
              onChange={event => setValueSearch(event.target.value)} 
            /> 

            <select onChange={event => setColumnSearch(event.target.value)} >
              <option value="">-- Escolher coluna --</option>
              <option value="nf">Número</option>
              <option value="provider">Fornecedor</option>
              <option value="hangtag">Etiqueta</option>
              <option value="arrival">Chegou</option>
              <option value="input">Entrada</option>
            </select>

            <button
              onClick={() => handleSearch()}
            >
              Pesquisar
            </button>
          </section>} */}

          <div>
            <TableContent>
              <thead>
                <tr>
                  <th className="sticky-col first-col">Ações</th>
                  <th className="sticky-col second-col">Número</th>
                  <th>Valor total</th>
                  <th>Emissão</th>
                  <th>Fornecedor</th>
                  <th>Receber</th>
                  <th>Etiqueta</th>
                  <th>Frete</th>
                  <th>Chegou</th>
                  <th>Entrada</th>
                </tr>
              </thead>
              <tbody>
                {
                  notes.map(note => {
                    return (
                      <tr key={note.id}>
                        <td className="sticky-col first-col">
                          <button
                            onClick={() => handleOpenNote(note)}
                            className="button_icon"
                          >
                            <i><UilSearchAlt className="table__icon" size="16" /></i>
                          </button>
                        </td>
                        <td className="sticky-col second-col">{note.nf}</td>
                        <td>
                          {
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(note.value ?? 0)
                          }  
                        </td>
                        <td>
                          {
                            new Intl.DateTimeFormat('pt-BR', { 
                              dateStyle: "short", 
                            }).format(new Date(note.issue))
                          }
                        </td>
                        <td className="defaul_field">{note.provider}</td>
                        <td>{note.receive}</td>
                        <td>{note.hangtag}</td>
                        <td>{note.situation}</td>
                        <td>{note.arrival?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")}</td>
                        <td>{note.input?.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </TableContent>
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
            <p>Formato suportado: .xlsx | Máximo de linhas: 900</p>

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

        <Pagination>
            <div>
              Mostrando <strong>{`${(page * 15 - 15) + 1}`}</strong> - <strong>{`${page * 15 >= totalPages ? totalPages : page * 15}`}</strong> de <strong>{`${totalPages}`}</strong> notas totais
              { page === 1
              ?             
              <button
                onClick={() => nextPageNotes(page - 1)}
                disabled
              >
                Anterior
              </button>
              :
                <button
                  onClick={() => nextPageNotes(page - 1)}
                >
                  Anterior
                </button>
              }
              { page * 15 >= totalPages
              ?             
              <button
                onClick={() => nextPageNotes(page + 1)}
                disabled
              >
                Próxima
              </button>
              :
                <button
                  onClick={() => nextPageNotes(page + 1)}
                >
                  Próxima
                </button>
              }
            </div>
        </Pagination>

      </Container>
      <Footer />
    </>
  )
}
