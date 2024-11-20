import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../components/Home/Home'
import Movies from './../components/Movies/Movies';
import Series from '../components/Series/Series';
import Details from '../components/Details/Details';

const myRouter = createBrowserRouter([
    {
        path: '/', element: <Layout />, children: [
            { path: '/', element: <Home /> },
            {
                path: '/movies', element: <Movies />,
            },
            { path: '/movies/:type', element: <Movies /> },

            { path: '/tv', element: <Series /> },
            { path: '/tv/:type', element: <Series /> },
            { path: '/series-details/:id', element: <Details /> },
            { path: '/movies-details/:id', element: <Details /> },
            // { path: '/series-details/:type/:id', element: <Details /> },
        ]

    },

], { future: { v7_skipActionErrorRevalidation: true, v7_startTransition: true, } })


export default myRouter