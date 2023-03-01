import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Protected from './Components/Protected';
import Home from './Pages/Home';
import Owner from './Pages/Owner';
import Land from './Pages/Land';

function App() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route
         path="/" 
         element={
          !getToken() ?
          <Login />
          :
          <Home />
         }
        />
        <Route path='/owner' element={<Protected Cmp={Owner} />} />
        <Route path='/land' element={<Protected Cmp={Land} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
