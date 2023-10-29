import TopBar from "./Topbar/TopBar";
import Home from './pages/home'
import Settings from "./pages/settings/Settings";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <TopBar />
      <switch>
        <Route path="/">
          <Home />
        </Route>
      </switch>
    </Router>
  );
}

export default App;
