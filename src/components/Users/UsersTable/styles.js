import styled from "styled-components"

export const Container = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  
  @media (max-width: 1440px) {
    max-width: 900px;
  }
`

export const Content = styled.div`
  margin-bottom: 2rem;
  
  table {
    width: 100%;
    border-spacing: 0 0.2rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
      @media (max-width: 1440px) {
        padding: 0;
      }
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      color: var(--text-body);

      @media (max-width: 1440px) {
        padding: 0;
      }
      &:first-child {
        color: var(--text-title)
      }
    }
  }

  .panel {
    background: var(--shape);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }
  
  .panel:hover {
    background: var(--blue);

    td {
      color: #FFFFFF;
    }

    i {
      color: #FFFFFF;
    }
  }

  .button_icon_users {
    button {
      border: 0;
      font-size: 1rem;
      margin-right: 10px;
      background: none; 
    }

    i {
      color: var(--blue);
    }
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