import styled from "styled-components"

export const Container = styled.main`
  
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

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
      margin-top: 20px;
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