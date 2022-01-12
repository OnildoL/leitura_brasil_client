import styled from "styled-components"

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background: var(--blue);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Content = styled.form`
  max-width: 420px;

  background: #FFFFFF;
  padding: 45px;
  border-radius: 0.25rem;

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 3rem;
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