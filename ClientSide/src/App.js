


import TopBar from "./components/Topbar/TopBar";
//local storage
import Home from "./pages/home/Home.jsx";
import Register from "./Register/Register.jsx";
import NotFound from "./NotFound.jsx";
import Login from "./login/Login.jsx";
import Single from "./pages/single/Single.jsx";
import Write from "./pages/write/Write.jsx";
import Settings from "./pages/settings/Settings.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  const user = false;
  return (


    <>
       <TopBar />
        <Home />
      {/* <Settings/> */}
       {/* <Login /> */}
       {/* <Register /> */}
     
     
   

<Router>
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route exact path="/posts" element={<Home />} />
  <Route
    exact
    path="/register"
    element={user ? <Home /> : <Register />}
  />
  <Route exact path="/login" element={user ? <Home /> : <Login />} />
  <Route exact path="/post/:id" element={<Single />} />
  <Route exact path="/write" element={user ? <Write /> : <Register />} />
  <Route
    exact
    path="/settings"
    element={user ? <Settings /> : <Register />}
  />
  <Route path="*" element={<NotFound />} />
</Routes>
</Router>

    </>

  );
}

export default App;
