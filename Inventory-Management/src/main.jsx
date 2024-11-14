import React, { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
// import Navbar from './assets/Frontend/Navbar';
// import Body from './assets/Frontend/Body';
// import AdminLogin from './assets/Frontend/AdminLogin';
// import AdminDashboard from './assets/Frontend/AdminDashboard';


ReactDOM.createRoot(document.getElementById('root')).render(
<StrictMode>
    <App />
</StrictMode>
);


// const router=createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//     <Navbar/>
//     <Body/>
//     <Navbar/>
//     {/* <Route path='/' element={}/> */}
//     <Route path='/admin-login' element={<AdminLogin/>}/>
//     <Route path='/admin-dashbioard' element={<AdminDashboard/>}/>
//     </Route>
//   )
// )
