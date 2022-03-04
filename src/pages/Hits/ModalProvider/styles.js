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

export const FormContainer = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  div {
    margin: 0.5rem 0;
    span {
      font-weight: 600;
    }
  }

  textarea {
    width: 100%;
    border: 1px solid #D7D7D7;
    padding: 16px;
    font-size: 17px;
    font-family: 'Poppins', sans-serif;
    color: #29292e;
    border-radius: 0.25rem;
    background: #E7E9EE;
    resize: vertical;
    min-height: 100px;
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