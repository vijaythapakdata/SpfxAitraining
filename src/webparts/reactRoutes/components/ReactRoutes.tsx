import * as React from 'react';
// import styles from './ReactRoutes.module.scss';
import type { IReactRoutesProps } from './IReactRoutesProps';
import { HashRouter,Route,Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import FormPage from './FormPage';
const ReactRoutes:React.FC<IReactRoutesProps>=(props)=>{

  return(
    <>
    <HashRouter>
      <Routes>
      <Route
      path='/' element={<Home/>}
      />

    <Route
      path='/form' element={<FormPage/>}
      />
        <Route
      path='/about' element={<About/>}
      />
      </Routes>
    </HashRouter>
    </>
  )
}
export default ReactRoutes;
