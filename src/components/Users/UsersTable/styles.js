import styled from "styled-components"

export const Container = styled.section`
  max-width: 1120px;
  margin: 0 auto;
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
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      color: var(--text-body);

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