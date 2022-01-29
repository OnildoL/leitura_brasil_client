import { GlobalStyle } from "./styles/global"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Main } from "./components/Main"
import { Goals } from "./components/Goals"
import { Users } from "./components/Users"
import { Table } from "./components/Users/UsersTable"
import { Login } from "./components/Login"
import { Notes } from "./pages/Notes"

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login /> }/>
        <Route path="/main" element={ <Main /> }/>
        <Route path="/goals" element={<Goals />}/>
        <Route 
          path="/notes" 
          element={
            <Notes />
          }
        />
        <Route
          path="/users" 
          element={
            <>
              <Users />
              <Table />
            </>
          }
        />
      </Routes>
      <GlobalStyle />
    </Router>
  )
}