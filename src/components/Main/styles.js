import styled from "styled-components"

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 420px) {
    max-width: 320px;
  }
`

export const Content = styled.div`
  display: grid;
  margin-top: var(--mb-3);
  text-transform: uppercase;
  color: var(--blue);
  font-size: 4rem;
  text-align: center;

  @media (max-width: 420px) {
    font-size: 2rem;
    margin-top: var(--mb-3);
  }
  
  p {
    font-weight: bold;
  }

  span {
    font-size: 1rem;
    font-weight: bold;
    color: var(--text-title);
  }
`