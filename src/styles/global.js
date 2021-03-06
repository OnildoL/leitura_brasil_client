import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #E8E8E8;
    --blue: #062A4A;
    --blue-light: #0b4274;
    --text-title: #29292E;
    --text-sub-title: #A8A8B3;
    --text-body: #2d2f36;
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
    @media (max-width: 1366px) {
      font-size: 93.75%;
    }
    @media (max-width: 1080px) {
      font-size: 87.5%;
    }

    @media (max-width: 720px) {
      font-size: 81.25%;
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
    max-height: 525px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 420px) {
      max-width: 300px;
    }

    p {
      color: var(--text-sub-title);
      font-size: 1rem;
      margin: 0 0 1rem;
    }

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

    select, input {
      width: 100%;
      margin: 1rem 0 1rem;
      padding: 0.6rem;
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

    .button {
      width: 100%;
      margin: 0 0 1rem;
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
  .react-modal-content-notes-edition {
    width: 100%;
    max-width: 776px;
    max-height: 825px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 420px) {
      max-width: 300px;
    }

    .accessKey {
      width: 100%;
      background: none;
      border: dotted;
      border-width: 2px;
      border-radius: 8px;
    }

    p {
      color: var(--text-sub-title);
      font-size: 1rem;
      margin: 0 0 1rem;
    }

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

    textarea {
      height: 100px;
    }
  
    .RECEBER {
      background-color: #49a649;
      color: #ffffff;
    }
    .NAO-RECEBER {
      background-color: #ae3939;
      color: #ffffff;
    }
    .PENDENTE {
      background-color: #d8ab2e;
      color: #ffffff;
    }

    select, input {
      width: 100%;
      margin: 1rem 0 1rem;
      padding: 0.6rem;
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

    .button {
      width: 100%;
      margin: 0 0 1rem;
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

  .react-modal-content-hits {
    width: 100%;
    font-size: 0.8rem;
    max-width: 1576px;
    max-height: 900px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 2rem 5rem 2rem 5rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 1366px) {
      width: 1120px;
      max-height: 600px;
    }

    @media (min-width: 1440px) {
      width: 1120px;
      max-height: 880px;
    }

    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

      th {
        color: var(--text-body);
        font-weight: 400;
        padding: 1rem 1rem;
        text-align: left;
        line-height: 1.5rem;
        cursor: pointer;

        @media (max-width: 1440px) {
          padding: 0;
        }
      }

      td {
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--text-body);
      }
    }

    .button {
      margin: 1rem 1rem 0 0;
      font-size: 1rem;
      color: #FFFFFF;
      background: var(--blue);
      border: 0;
      padding:0 2rem;
      border-radius: 0.25rem;
      height: 3rem;

      transition: 0.4s;

      &:hover {
        background: var(--blue-light);
      }
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
  }

  .react-modal-content-note {
    width: 100%;
    max-width: 576px;
    max-height: 525px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 1440px) {
      max-height: 525px;
    }

    p {
      color: var(--text-sub-title);
      font-size: 1rem;
      margin: 0 0 1rem;
    }

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

    input {
      width: 100%;
      margin: 1rem 0 1rem;
      padding: 0.6rem;
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
    .progessBar {
      margin: 0 0 0 0.5rem;
      color: var(--blue);
    }
    .button {
      width: 100%;
      margin: 0 0 1rem;
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
  .react-modal-goal-hit-link {
    width: 100%;
    font-size: 0.8rem;
    max-width: 976px;
    max-height: 900px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 1rem 5rem 2rem 5rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 1366px) {
      max-width: 850px;
      max-height: 550px;
    }

    @media (max-width: 1440px) {
      max-width: 850px;
      max-height: 650px;
    }

    h2 {
      margin: 1rem 0 1rem;
    }

    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

      th {
        color: var(--text-body);
        font-weight: 400;
        padding: 1rem;
        text-align: left;
        line-height: 1.5rem;
      }

      td {
        border: 0;
        color: var(--text-body);
      }
    }
    .button {
      width: 100%;
      margin: 0.2rem 0 0.2rem;
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
    .input {
      width: 100%;
      margin: 0.5rem 0;
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
    
    .buttonTrashAlt {
      color: var(--blue);
      background: none;
      border: 0;
      border-radius: 0.25rem;
    }
  }
  .react-modal-goal-hit {
    width: 100%;
    font-size: 0.8rem;
    max-width: 976px;
    max-height: 900px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 1rem 5rem 2rem 5rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 1366px) {
      max-width: 850px;
      max-height: 550px;
    }

    @media (max-width: 1440px) {
      max-width: 850px;
      max-height: 650px;
    }

    h2 {
      margin: 1rem 0 1rem;
    }

    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

      th {
        color: var(--text-body);
        font-weight: 400;
        padding: 1rem;
        text-align: left;
        line-height: 1.5rem;
      }

      td {
        border: 0;
        color: var(--text-body);
      }
    }

    .buttonTrashAlt {
      color: var(--blue);
      background: none;
      border: 0;
      border-radius: 0.25rem;
    }
  }
  .react-modal-goal-note {
    width: 100%;
    max-width: 976px;
    max-height: 900px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 2rem 5rem 2rem 5rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 1440px) {
      max-width: 850px;
      max-height: 550px;
    }

    h2 {
      margin: 1rem 0 1rem;
    }

    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

      th {
        color: var(--text-body);
        font-weight: 400;
        padding: 1rem;
        text-align: left;
        line-height: 1.5rem;
      }

      td {
        border: 0;
        color: var(--text-body);
      }
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

    button {
      color: var(--blue);
      background: none;
      border: 0;
      border-radius: 0.25rem;
    }
  }

  .react-modal-content-goals {
    width: 1120px;
    font-size: 0.8rem;
    max-height: 900px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 2rem 5rem 2rem 5rem;
    position: relative;
    border-radius: 0.24rem;

    @media (max-width: 1366px) {
      width: 1120px;
      max-height: 600px;
    }

    @media (min-width: 1440px) {
      width: 1120px;
      max-height: 880px;
    }

    @media (max-width: 420px) {
      max-width: 300px;
      padding: 2rem 2rem 2rem 2rem;
    }


    table {
      width: 100%;
      border-spacing: 0 0.2rem;

      tbody > tr {
        background: var(--background);
      }

      @media (max-width: 420px) {
        th {
          white-space: nowrap;
        }
      }
      
      th {
        color: var(--text-body);
        font-weight: 400;
        padding: 1rem 1rem;
        text-align: left;
        line-height: 1.5rem;
        cursor: pointer;

        @media (max-width: 1440px) {
          padding: 0;
        }
      }

      td {
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--text-body);
      }
    }
  }

  .react-modal-content-table-goals {
    width: 100%;
    max-width: 576px;
    max-height: 550px;
    overflow-y: scroll;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
    
    @media (max-width: 420px) {
      max-width: 300px;
      padding: 1rem;
    }

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