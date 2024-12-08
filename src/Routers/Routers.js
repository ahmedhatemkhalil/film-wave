import Layout from '../Layout/Layout'
import Home from '../components/Home/Home'
import Details from '../components/Details/Details';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Movies from './../components/MediaList/Movies/Movies';
import Series from '../components/MediaList/Series/Series';

const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home />, errorElement: <ErrorPage /> },

            {
                path: '/movies', children: [
                    { index: true, element: <Navigate to='/movies/popular' /> },
                    { path: ':type', element: <Movies /> }
                ]
            },
            {
                path: '/tv', children: [
                    { index: true, element: <Navigate to='/tv/popular' /> },
                    { path: ':type', element: <Series /> }
                ]
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
],);


export default myRouter