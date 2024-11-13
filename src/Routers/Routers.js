import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../components/Home/Home'
import Movies from './../components/Movies/Movies';

const myRouter = createBrowserRouter([
    {path: '/', element: <Layout /> , children:[
        {path: '/' , element : <Home/>},
        {path: '/movies' , element : <Movies/>},
    ]}
])

export default myRouter