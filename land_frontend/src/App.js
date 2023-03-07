import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Protected from './Components/Protected';
import Home from './Pages/Home';
import Owner from './Pages/Owner';
import Land from './Pages/Land';
import Transaction from './Pages/Transaction';
import Status from './Pages/Status';
import Asset from './Pages/Asset';
import Contract from './Pages/Contract';
import Cost from './Pages/Cost';
import ModStatus from './Pages/ModStatus';

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
        <Route path='/transaction' element={<Protected Cmp={Transaction} />} />
        <Route path='/status' element={<Protected Cmp={Status} />} />
        <Route path='/asset' element={<Protected Cmp={Asset} />} />
        <Route path='/contract' element={<Protected Cmp={Contract} />} />
        <Route path='/cost' element={<Protected Cmp={Cost} />} />
        <Route path='/modstatus' element={<Protected Cmp={ModStatus} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
