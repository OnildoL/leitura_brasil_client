import styled from "styled-components"

export const Container = styled.header`
  width: 100%;
  top: 0;
  left: 0;
  background: var(--blue);
  position: fixed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1440px) {
    max-width: 900px;
  }

  ul {
    display: flex;

    li {
      padding: 10px 15px;
      text-transform: uppercase;
      color: #FFFFFF;
      cursor: pointer;

      &:hover {
        background: var(--shape);
        color: var(--blue);
      }

      &:hover ul {
        display: block;
        position: absolute;
      }
    }

    ul {
      display: none;
      position: absolute;
      margin-top: 0.58rem;
      width: 300px;
      background-color: var(--blue);
      border-radius: 0 0 0.3rem 0.3rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);

      a {
        display: flex;
        padding: 10px 15px;
        text-transform: uppercase;
        color: #FFFFFF;
        cursor: pointer;

        &:hover {
          background: var(--shape);
          color: var(--blue);
        }
      }
    }
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .panel_logo_user {
    display: flex;
    align-items: center;
  }

  .user {
    margin-left: 3rem;
    color: #FFFFFF;
    select {
      margin-left: 1rem;
    }
  }
`