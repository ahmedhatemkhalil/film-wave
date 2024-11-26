import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../components/Home/Home'
import Movies from './../components/Movies/Movies';
import Series from '../components/Series/Series';
import Details from '../components/Details/Details';
import ErrorPage from '../components/ErrorPage/ErrorPage';

const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            {
                path: 'movies/:type?', 
                element: <Movies /> ,
            
                
            },
            {
                path: 'tv/:type?', 
                element: <Series />
            },
            {
                path: 'details/:type/:id', 
                element: <Details />
            },
            {
                path: 'trailer/:id/videos', 
                element: <Details />
            },
            {
                path: '*', 
                element: <ErrorPage /> 
            },
        ]
    },
], { future: { v7_skipActionErrorRevalidation: true, v7_startTransition: true } });


export default myRouter