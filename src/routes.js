import { BrowserRouter, Routes, Route }  from "react-router-dom";
import Home from "./pages/Home";
import Header from './components/header'
import Livros from './pages/Livros'
import Footer from "./components/Footer";
import Top10 from "./pages/top10";

export default function RouteApp(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/livros" element={<Livros/>}/>
            <Route path="/livros/top10" element={<Top10/>}/>
        </Routes>
        
        <Footer/>
        </BrowserRouter>
    )
}