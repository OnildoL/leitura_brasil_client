import { useEffect, useState } from "react";
import { api } from "../../../services/api"
import { Sectors } from "./styles";
// import { useNotification } from "../../../hooks/useNotification";

export function Manager() {
  const [inputYear, setInputYear] = useState("")
  const [consolidated, setConsolidated] = useState([])

  function filtersConsolidatedBySector(consolidated) {
    const sectors = ["livraria", "hq", "papelaria", "presentes", "informatica", "volta as aulas"]
    const fields = ["goal", "request", "input"]

    for (const sector of sectors) {
      const result = consolidated.data.filter(data => data.sector === sector)

      const totalSectorResult = result.reduce((accumulator, { goal, sector }) => {
        accumulator[sector] = accumulator[sector] + Number(goal) || Number(goal)

        return accumulator
      }, {})

      console.log(totalSectorResult)
    }
  }

  useEffect(() => {
    if (inputYear.length === 4) {
      api.get(`/goals/consolidated/${inputYear}`)
        .then(response => {
          filtersConsolidatedBySector(response)
        })
        .catch(error => console.log(error))
    }
  }, [inputYear])

  return (
    <Sectors>
      <div>
        <h3>leitura manaíra</h3>
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

            
            }
          </tbody>
        </table>
        <h3>Escolher ano</h3>
        <input 
        type="text" 
        placeholder="Escolher ano"
        onChange={event => setInputYear(event.target.value)}
        />
      </div>
    </Sectors>
  )
}
