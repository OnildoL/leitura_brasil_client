import styled from "styled-components"

export const Container = styled.section`

`

export const Content = styled.div`
  
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