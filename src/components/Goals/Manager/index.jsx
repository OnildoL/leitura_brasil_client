import { UilSearchAlt } from '@iconscout/react-unicons'
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { api } from "../../../services/api"
import { ModalSector } from "../ModalSector";
import { Sectors } from "./styles";

export function Manager({ store, store_name }) {
  const [inputYear, setInputYear] = useState("")
  const [consolidated, setConsolidated] = useState([])

  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false)
  const [toSector, setToSector] = useState("")
  const [sectors, setSectors] = useState([])

  function handleOpenSectorModal() {
    setIsSectorModalOpen(true)
  }

  function handleCloseSectorModal() {
    setIsSectorModalOpen(false)
  }

  function handleSectorFiltering(sector) {
    setToSector(sector)
    
    api.get("goals")
    .then(response => {
      let yearsSet = new Set()
      let years = []

      const allGoalsPerYear = response.data
      
      for (const goalData of allGoalsPerYear) {
        if (
          !yearsSet.has(goalData.year) && 
          goalData.sector === sector && 
          store === goalData.store
        ) {
          yearsSet.add(goalData.year)
          years.push({
            id: goalData.id,
            year: goalData.year,
            store: goalData.store,
            sector: goalData.sector
            })
        }
      }

      setSectors(years)

      handleOpenSectorModal()
    })
    .catch(error => console.log(error))
  }

  function filtersConsolidatedBySector(consolidated) {
    const totalsBySectors = []
    const sectors = ["livraria", "hq", "papelaria", "presentes", "informatica", "volta as aulas"]
    
    for (const sector of sectors) {
      const totalBySector = []
      const result = consolidated.data.filter(data => data.sector === sector)

      const { goal } = result.reduce((accumulator, { goal }) => {
        accumulator.goal = accumulator.goal + Number(goal) || Number(goal)
        return accumulator
      }, {})

      for (const goal_month of result) {
        const { request } = goal_month.requests.reduce((accumulator, { request_value }) => {
        accumulator.request = accumulator.request + Number(request_value) || Number(request_value)
        return accumulator
        }, {})

        const { note } = goal_month.notes.reduce((accumulator, { note_value }) => {
        accumulator.note = accumulator.note + Number(note_value) || Number(note_value)
        return accumulator
        }, {})

        totalBySector.push({
          sector: sector,
          month: goal_month.month,
          request: request ?? 0,
          input: note ?? 0
        })
      }

      const totalResultBySector = totalBySector.reduce((accumulator, { request, input }) => {
        accumulator.sector = sector
        accumulator.request = accumulator.request + request || request
        accumulator.input = accumulator.input + input || input

        return accumulator
      }, {})

      totalsBySectors.push({
        id: v4(),
        goal,
        ...totalResultBySector
      })
    }

    setConsolidated(totalsBySectors)
  }

  useEffect(() => {
    if (inputYear.length === 4) {
      api.get(`/goals/consolidated/${inputYear}/${store}`)
        .then(response => {
           filtersConsolidatedBySector(response)
        })
        .catch(error => console.log(error))
    }
  }, [inputYear])

  useEffect(() => {
    api.get(`/goals/consolidated/${new Date().getFullYear()}/${store}`)
      .then(response => {
          filtersConsolidatedBySector(response)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <Sectors>
      <div>
        <h3>{store_name}</h3>
        <table>
          <thead>
            <tr>
              <th>Setor</th>
              <th>Meta</th>
              <th>Pedido</th>
              <th>Entrada</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              consolidated.map(sector => {
                return (
                  <tr key={sector.id}>
                    <td>{sector.sector?.toUpperCase()}</td>
                    <td>
                      {
                        new Intl.NumberFormat('pt-BR', {
                          minimumFractionDigits: 0, 
                          maximumFractionDigits: 0, 
                          style: 'currency',
                          currency: 'BRL'
                        }).format(sector.goal ?? 0)
                      }  
                    </td>
                    <td>
                      {
                        new Intl.NumberFormat('pt-BR', {
                          minimumFractionDigits: 0, 
                          maximumFractionDigits: 0, 
                          style: 'currency',
                          currency: 'BRL'
                        }).format(sector.request ?? 0)
                      }  
                    </td>
                    <td>
                      {
                        new Intl.NumberFormat('pt-BR', {
                          minimumFractionDigits: 0, 
                          maximumFractionDigits: 0, 
                          style: 'currency',
                          currency: 'BRL'
                        }).format(sector.input ?? 0)
                      }  
                    </td>
                    <td>
                      <button
                        onClick={() => handleSectorFiltering(sector.sector)}
                        type="button"
                      >
                        <i><UilSearchAlt size="16"/></i>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <h3>Escolher ano</h3>
        <input 
          type="text" 
          placeholder="Escolher ano"
          maxLength={4}
          onChange={event => setInputYear(event.target.value)}
        />
      </div>

      <ModalSector 
        isOpen={isSectorModalOpen} 
        onRequestClose={handleCloseSectorModal}
        sector={toSector}
        sectors={sectors}
      />
    </Sectors>
  )
}
