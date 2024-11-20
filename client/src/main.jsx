
import { createRoot } from 'react-dom/client'
import './index.css'
import DoctorContextProvider from './components/DoctorContext.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LayOut from './components/LayOut.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Detail from './pages/Detail.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Appointment from './pages/myAppointment.jsx';
import About from './pages/About.jsx';
import CheckOut from './pages/CheckOut.jsx';
import OrderPage from './pages/OrderPage.jsx';
import BlogDetail from './components/Blog/BlogDetail.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LayOut />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category', element: <Category /> },
      { path: 'detail/:id', element: <Detail /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'my-appointments', element: <Appointment /> },
      { path: 'about', element: <About /> },
      { path: 'check-out', element: <CheckOut /> },
      { path: 'order-page/:userId', element: <OrderPage /> },
      {path:'blogDetail/:id',element:<BlogDetail/>}
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <DoctorContextProvider>
    <RouterProvider router={router} />
  </DoctorContextProvider>

)