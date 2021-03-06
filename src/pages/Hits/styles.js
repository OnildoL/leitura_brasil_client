import styled from "styled-components"

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  margin-top: 3.5rem;

  @media (max-width: 1440px) {
    max-width: 1000px;
  }

  @media (max-width: 420px) {
    max-width: 300px;
  }

  select {
    width: 100%;
    padding: 0 1.5rem;
    height: 2rem;
    border-radius: 0.25rem;

    border: 1px solid #D7D7D7;
    background: var(--shape);

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

export const Content = styled.div`
  section {
    margin-top: 20px;

    h1 {
      font-size: 1.2rem;
    }

    p {
      color: var(--text-sub-title);
      font-size: 1rem;
    }

    button {
      font-size: 1rem;
      color: #FFFFFF;
      background: var(--blue);
      border: 0;
      padding:0 2rem;
      border-radius: 0.25rem;
      height: 3rem;

      transition: 0.3s;

      &:hover {
        background: var(--blue-light);
      }
    }
  }

  div {
    max-height: 500px;
    margin: 2rem 0 2rem;

    input {
      margin: 0rem 0.5rem;
    }
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
  .button {
      margin: 20px 5px 0;
      font-size: 1rem;
      color: #FFFFFF;
      background: var(--blue);
      border: 0;
      padding:0 2rem;
      border-radius: 0.25rem;
      height: 3rem;

      transition: 0.4s;

      &:hover {
        background: var(--blue-light);
      }
    }
  .panel {
    border-radius: 0.25rem;
    padding: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    background: #FFFFFF;

    @media (max-width: 420px) {
      button {
        width: 100%;
      }
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

  .ok {
    color: #33CC95;
    font-weight: 600;
  }
  .duvida {
    color: #CC3333;
    font-weight: 600;
  }
`