import styled from "styled-components"

export const Container = styled.section`
  select, input {
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

export const TableContent = styled.table`
  width: 1120px;
  margin-bottom: 4rem;
  border-spacing: 0 0.2rem;

  @media (max-width: 1440px) {
    max-width: 900px;
  }
  
  tbody > tr {
    background: var(--shape);
    /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15); */
  }

  th {
    margin: 0 2rem 0 2rem;
    padding: 0 2rem 0 2rem;
    color: var(--text-body);
    white-space: nowrap;
    font-weight: 400;
    text-align: left;
    line-height: 1.5rem;
  }

  td {
    font-size: 0.8em;
    padding: 0 1rem 0;
  }
  .button_icon {
    border: 0;
    font-size: 1rem;
    margin-right: 5px;
    background: none;
    
    i {
      color: var(--blue);
    }
  }
  .ok {
    color: #33CC95;
    font-weight: 600;
  }
  .duvida {
    color: #CC3333;
    font-weight: 600;
  }
`