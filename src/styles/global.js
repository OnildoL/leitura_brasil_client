import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #E8E8E8;
    --blue: #062A4A;
    --blue-light: #0b4274;
    --text-title: #29292E;
    --text-sub-title: #A8A8B3;
    --text-body: #969CB3;
    --shape: #FFFFFF;

    --mb-0-25: 0.25rem;
    --mb-0-5: 0.5rem;
    --mb-0-75: 0.75rem;
    --mb-1: 1rem;
    --mb-1-5: 1.5rem;
    --mb-2: 2rem;
    --mb-2-5: 2.5rem;
    --mb-3: 3rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
    overflow-y: overlay;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong { 
    font-weight: 600;
  }

  ul {
    list-style: none;
  }
  
  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;

    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

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
  }

  .react-modal-content-table-goals {
    width: 100%;
    max-height: 550px;
    max-width: 576px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
    
    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

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
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
  
  .table__icon {
    margin-right: var(--mb-0-25);
  }

  .button_icon {
    button {
      border: 0;
      font-size: 1rem;
      margin-right: 10px;
      background: none;

      i {
        color: var(--blue);
      }
    }
  }

  ::-webkit-scrollbar {
    width: 0.6rem;
    background-color: var(--background);
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--text-body);
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--text-sub-title);
  }

  .notification_wrapper {
    position: fixed;
    top: 50px;
    right: 10px;
    width: 300px;
  }

  .notification_item {
    /* box-shadow: 0 1px 10px rgba(0, 0, 0, 0.45); */
    background: var(--shape);
    overflow: hidden;
    margin-bottom: 20px;
    animation: SlideLeft 0.4s;
    animation-fill-mode: forwards;
    width: 300px;

    h2 {
      font-size: 1rem;
      padding: 10px;
    }
  }

  @keyframes SlideLeft {
    0% {
      margin-left: 120%;
    }

    100% {
      margin-left: 0;
    }
  }

  @keyframes SlideRight {
    0% {
      margin-left: 0;
    }

    100% {
      margin-left: 120%;
    }
  }

  .notification_item.exit {
    animation: SlideRight 0.4s;
    animation-fill-mode: forwards;
  }

  .notification_item p {
    margin: 0;
    padding: 15px;
  }

  .notification_item .bar {
    height: 10px;
    background-color: #DD5554;
  }

  .notification_item.success .bar {
    background-color: hsla(0,0%,100%,.7);
  }

  .notification_item.error .bar {
    background-color: hsla(0,0%,100%,.7);
  }

  .notification_item.success {
    color: #FFFFFF;
    background: #57af41;
  }

  .notification_item.error {
    color: #FFFFFF;
    background: #DD5554;
  }
`