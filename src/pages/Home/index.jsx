import './home.css'
import TabelaLivros from '../../components/livros'

export default function Home(){
  return(
    <main className='main-home'>
      <h1>Livros da nossa biblioteca</h1>
      <TabelaLivros/>
    </main>
  )
}
