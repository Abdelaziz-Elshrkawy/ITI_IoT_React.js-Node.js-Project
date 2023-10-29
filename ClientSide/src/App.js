
import TopBar from "./components/Topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./login/Login";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Register from './Register/Register'


import Settings from "./pages/settings/Settings";



function App() {
  return (
    <>
       <TopBar />
       <Home />
       <Settings/>
       <Login />
       <Register />
     
     
    </>
  );
}

export default App;
