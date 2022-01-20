import styled from "styled-components"

export const Sectors = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  div {
    height: 15rem;
    background: var(--shape);
    padding: 2rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

      th {
        color: var(--text-body);
        font-weight: 400;
        font-size: 0.7rem;
        text-align: left;
        line-height: 1.5rem;
      }

      td {
        font-size: 0.7rem;
        color: var(--text-body);
      }
    }

    h3 {
      font-size: 1rem;
      text-transform: uppercase;
    }
  }
`