import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../components/Home/Home'
import Movies from './../components/Movies/Movies';
import Series from '../components/Series/Series';
import Details from '../components/Details/Details';

const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            {
                path: '/movies/:type?', // movies path
                element: <Movies />
            },
            {
                path: '/tv/:type?', // series path
                element: <Series />
            },
            {
                path: '/details/:type/:id', //  differentiate between movies and tv series
                element: <Details />
            },
            {
                path: '/trailer/:id/videos', // Trailer path
                element: <Details />
            },
        ]
    },
], { future: { v7_skipActionErrorRevalidation: true, v7_startTransition: true } });


export default myRouter