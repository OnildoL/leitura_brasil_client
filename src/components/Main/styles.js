import styled from "styled-components"

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
`

export const Content = styled.div`
  display: grid;
  margin-top: var(--mb-3);
  text-transform: uppercase;
  color: var(--blue);
  font-size: 4rem;
  text-align: center;

  p {
    font-weight: bold;
  }

  span {
    font-size: 1rem;
    font-weight: bold;
    color: var(--text-title);
  }
`