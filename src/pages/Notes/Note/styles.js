import styled from "styled-components"

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
`

export const Content = styled.div`

`

export const FormContainer = styled.form`
  .display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  textarea {
    width: 100%;
    border: 1px solid #D7D7D7;
    padding: 12px;
    font-size: 17px;
    font-family: 'Poppins', sans-serif;
    color: #29292e;
    border-radius: 0.25rem;
    background: #E7E9EE;
    resize: vertical;
    height: 50px;
  }

  select, input {
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

  .CONSIGNACAO, .LIVROS---CONSIG {
    background-color: #5fa649;
    color: #ffffff;
  }

  .ACERTO, .LIVROS---ACERTO {
    background-color: #7349a6;
    color: #ffffff;
  }

  .INFORMATICA {
    background-color: #496ea6;
    color: #ffffff;
  }

  .MUSICA, .GAMES {
    background-color: #49a6a4;
    color: #ffffff;
  }
  
  
  .LIVROS-DIDATICO, .LIVROS-COMPRAS {
    background-color: #49a67e;
    color: #ffffff;
  }
  
  .PAPELARIA {
    background-color: #a6497c;
    color: #ffffff;
  }

  .PRESENTES, .BOMBONIERE {
    background-color: #a65949;
    color: #ffffff;
  }

  .RECUSADO, .CANCELADA {
    background-color: #a64949;
    color: #ffffff;
  }
  
  .BONIFICADO {
    background-color: #a68649;
    color: #ffffff;
  }

  .DEVOLUÇÃO {
    background-color: #a64960;
    color: #ffffff;
  }
  
  .VENDAS-ONLINE {
    background-color: #a64960;
    color: #ffffff;
  }

  .SERVIÇOS {
    background-color: #a68649;
    color: #ffffff;
  }

  .USO-E-CONSUMO, .ACOMPANHAMENTO, .DEVOLSIMBOLICA, .OUTROS {
    background-color: #a67149;
    color: #ffffff;
  }

  .QUADRINHOS {
    background-color: #49a1a6;
    color: #ffffff;
  }

  .TROCA-DE-NOTA, .REAJUSTE-PREÇO {
    background-color: #d8cf2e;
    color: #ffffff;
  }

`