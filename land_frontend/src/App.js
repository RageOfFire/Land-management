import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";
import Update from "./Pages/Update";
import Login from "./Pages/Login";
import List from './Pages/List';
// import Search from './Pages/Search';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/add" element={<Add />}/>
        <Route path="/update/:id" element={<Update />}/>
        {/* <Route path="/search/" element={<Search /> */}
        <Route
         path="/" 
         element={
          localStorage.getItem('user-info') ?
          <List />
          :
          <Login />
         }
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
