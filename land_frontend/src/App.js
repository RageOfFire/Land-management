import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import List from './Pages/List';
import Home from './Pages/Home';
// import Search from './Pages/Search';

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
        <Route path='/owner' element={<List />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
