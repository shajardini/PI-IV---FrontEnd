import './header.css'
import {Link} from 'react-router-dom'
import IMAGEM from './logo.png'

function Header(){
    return(
        <header>
            <Link className='logo' to='/'><img src={IMAGEM} alt='logo' /></Link>
            <div className="menu">
                <Link to='/'>Home</Link>
                <Link to='/livros'>Encontre seu livro</Link>
                <Link to='/livros/top10'>Top 10</Link>
            </div>

        </header>
    )
}

export default Header