import styled from "styled-components"

export const Sectors = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (max-width: 420px) {
    max-width: 300px;
  }

  div {
    height: 24rem;
    background: var(--shape);
    padding: 2rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

    @media (max-width: 1440px) {
      max-width: 440px;
    }

    @media (max-width: 420px) {
      max-width: 300px;
    }

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
      margin: 1rem 0 0;
      font-size: 1rem;
      text-transform: uppercase;
    }
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 2rem;
    border-radius: 0.25rem;

    border: 1px solid #D7D7D7;
    background: #E7E9EE;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
    & + select {
      margin-top: 1rem;
    }
  }
`

export const Summary = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;

  font-size: 0.7rem;
  text-align: left;
  /* background: var(--background); */
  
  section {
    background: var(--background);
    
  }
`