import './App.css';
import { useState, useEffect } from 'react'
import { Route, Routes,useLocation } from 'react-router-dom';
import {Form, Home, Landing} from './views'
import Detail from './views/detail/Detail'
import Nav from './components/nav/Nav';


function App() {


  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <img className="loading" src="https://i.gifer.com/origin/76/76dfca2a58c4dff5c9827b527132bda8.gif" alt="Loading..." />
      ) : (
        <div>
          {pathname !== "/" && pathname!== "/create" && <Nav />}
          <Routes>
          <Route exact path='/' element={<Landing/>}> </Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path="/detail/:id" element={<Detail/>}></Route>
          <Route path='/create' element={<Form/>}></Route>
          </Routes>
        </div>
      )}

    </div>
  );
}

export default App;
