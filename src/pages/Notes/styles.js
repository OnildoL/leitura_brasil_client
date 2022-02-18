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
    .search {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 1rem 0 1rem;
    
      button {
        width: 100%;
        margin: 1rem 0 0;
        height: 2rem;
        font-size: 1rem;
        color: #FFFFFF;
        background: var(--blue);
        border: 0;
        border-radius: 0.25rem;

        transition: 0.4s;

        &:hover {
          background: var(--blue-light);
        }
      }

      select, input {
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
        & + select {
          margin-top: 1rem;
        }
      }
  }

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
  }

  .panel {
    border-radius: 0.25rem;
    padding: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    background: #FFFFFF;
  }
  .button_icon {
    border: 0;
    font-size: 1rem;
    margin-right: 5px;
    background: none;
    
    i {
      color: var(--blue);
    }
  }
  .defaul_field {
    width: 200px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  div {
    max-height: 500px;
    overflow-x: scroll;
    margin: 2rem 0 2rem;
  }

  .sticky-col {
    position: sticky;
    position: -webkit-sticky;
    background: var(--shape);
  }

  .first-col {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    left: 0px;
  }

  .second-col {
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    left: 100px;
  }

`

export const TableContent = styled.table`
  width: 1120px;

  border-spacing: 0 0.2rem;

  @media (max-width: 1440px) {
    max-width: 900px;
  }
  
  tbody > tr {
    background: var(--shape);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }

  th {
    margin: 0 2rem 0 2rem;
    padding: 0 2rem 0 2rem;
    color: var(--text-body);
    font-weight: 400;
    text-align: left;
    line-height: 1.5rem;
  }

  td {
    white-space: nowrap;
    font-size: 0.8em;
    padding: 0 1rem 0;
    color: var(--text-body);
  }
`

export const Pagination = styled.span`
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;

  button {
    font-size: 1rem;
    color: #FFFFFF;
    background: var(--blue);
    border: 0;
    padding:0 2rem;
    margin: 0 5px;
    border-radius: 0.25rem;
    height: 3rem;

    transition: 0.3s;

    &:hover {
      background: var(--blue-light);
    }
  }
`