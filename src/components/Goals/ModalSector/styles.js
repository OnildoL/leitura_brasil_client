import styled from "styled-components"

export const Container = styled.section`

`

export const Content = styled.div`
  .button_export {
    display: flex;
    width: 150px;
    border-radius: 0.25rem;
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
  .button_icon {
    border: 0;
    font-size: 1rem;
    margin-right: 5px;
    background: none;
    
    i {
      color: var(--blue);
    }
  }
`
export const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  div {
    width: auto;
    background: var(--background);
    padding: 1.5rem 1rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    i {
      font-size: 1.5rem;
    }
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