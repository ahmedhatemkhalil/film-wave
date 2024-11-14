import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../components/Home/Home'
import Movies from './../components/Movies/Movies';
import Series from '../components/Series/Series';

const myRouter = createBrowserRouter([
    {path: '/', element: <Layout /> , children:[
        {path: '/' , element : <Home/>},
        {path: '/movies' , element : <Movies/>},
        {path: '/tv-shows' , element : <Series/>},
    ]}
])

export default myRouter