import styled from "styled-components"

export const Container = styled.section`
  max-width: 1120px;
  margin: 0 auto;
`

export const Content = styled.div`
  margin-top: 4rem;

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
      background: var(--shape);
      color: var(--text-body);

      &:first-child {
        color: var(--text-title)
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