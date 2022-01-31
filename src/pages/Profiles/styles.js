import styled from "styled-components"

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  margin-top: 3.5rem;

  @media (max-width: 1440px) {
    max-width: 900px;
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
      width: 100%;
      margin: 1rem 0 0 0;
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
    }
  }

  .panel {
    border-radius: 0.25rem;
    padding: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    background: #FFFFFF;
  }
`