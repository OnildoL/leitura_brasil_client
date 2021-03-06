import { GlobalStyle } from "./styles/global"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Main } from "./components/Main"
import { Goals } from "./components/Goals"
import { Users } from "./components/Users"
import { Table } from "./components/Users/UsersTable"
import { Login } from "./components/Login"
import { Notes } from "./pages/Notes"
import { Profiles } from "./pages/Profiles"
import { Hits } from "./pages/Hits"
import { HistoricalHits } from "./pages/HistoricalHits"

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
          path="/profiles" 
          element={
            <Profiles />
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
        <Route 
          path="/historical-hits"
          element={
          <HistoricalHits />
        }
        />
        <Route
          path="/hits" 
          element={
            <>
              <Hits />
            </>
          }
        />
      </Routes>
      <GlobalStyle />
    </Router>
  )
}