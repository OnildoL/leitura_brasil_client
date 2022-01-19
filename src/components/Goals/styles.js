import styled from "styled-components"

export const Container = styled.main`
  margin-top: 3.5rem;
`

export const FormContainer = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  select, input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
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

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--blue);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: 0.3s;

    &:hover {
      background: var(--blue-light);
    }
  }
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  section {
    margin-top: 20px;

    h1 {
      font-size: 1.2rem;
    }

    select {
      width: 100%;
      padding: 0 1.5rem;
      margin-top: 1rem;
      height: 2rem;
      border-radius: 0.25rem;

      border: 1px solid #D7D7D7;
      background: #E7E9EE;

      font-weight: 400;
      font-size: 1rem;

      &::placeholder {
        color: var(--text-body);
      }
    }

    p {
      color: var(--text-sub-title);
      font-size: 1rem;
    }

    button {
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
  }

  .panel {
    border-radius: 0.25rem;
    padding: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    background: #FFFFFF;
  }

  .table__icon {
    margin-right: var(--mb-0-25);
    font-size: 1rem;
  }
`

export const Sectors = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  div {
    height: 12rem;
    background: var(--shape);
    padding: 2rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

    h3 {
      font-size: 1rem;
      text-transform: uppercase;
    }
  }
`