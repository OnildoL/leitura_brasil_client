import { Sectors } from "./styles";

export function Manager() {
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
            <tr>
              <td>Livraria</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>
                <i className="uil uil-search-alt"></i>
              </td>
            </tr>
            <tr>
              <td>HQ</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>
                <i className="uil uil-search-alt"></i>
              </td>
            </tr>
            <tr>
              <td>Papelaria</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>
                <i className="uil uil-search-alt"></i>
              </td>
            </tr>
            <tr>
              <td>Presentes</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>
                <i className="uil uil-search-alt"></i>
              </td>
            </tr>
            <tr>
              <td>Informatica</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>
                <i className="uil uil-search-alt"></i>
              </td>
            </tr>
            <tr>
              <td>Volta as aulas</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>R$ 100.000</td>
              <td>
                <i className="uil uil-search-alt"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Sectors>
  )
}
