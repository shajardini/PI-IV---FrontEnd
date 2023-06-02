import React, { useEffect, useState } from 'react';
import './faixa.css'

function LivrosCurtidosPorFaixaEtaria() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch('https://backrecomendacaopi.herokuapp.com/livros/curtidas_por_faixa_etaria')
      .then(response => response.json())
      .then(data => setLivros(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='livro-por-faixa'>
      <hr className='hr'/>
      <h2>Livros mais curtidos por faixa etária</h2>
      {Object.entries(livros).map(([faixaEtaria, livros]) => (
        <div key={faixaEtaria} className='div-faixa'>
          <hr className='hr'/>
          <h3> Faixa etária:  {faixaEtaria} anos</h3>
          <div className='container-livro'>
            {livros.map(livro => (
              <div className='caixa-livro' key={livro.id}>
                <h3>Título: {livro.titulo}</h3>
                <p>Autor: {livro.autor}</p>
                <p>Série: {livro.serie}</p>
                <p>Tema: {livro.tema}</p>
                <p>Quantidade: {livro.quantidade}</p>
                <p>Avaliação: {livro.avaliacao}</p>
               <img src={livro.img_url} alt={livro.titulo} />
               <hr className='hr'/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LivrosCurtidosPorFaixaEtaria;
