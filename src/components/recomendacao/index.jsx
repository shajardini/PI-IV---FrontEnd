import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './recomendacao.css'

const RecomendacoesLivros = () => {
  const [livrosRecomendados, setLivrosRecomendados] = useState([]);

  useEffect(() => {
    const fetchLivrosRecomendados = async () => {
      try {
        const response = await axios.get('https://backrecomendacaopi.herokuapp.com/recomendacoes');
        setLivrosRecomendados(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLivrosRecomendados();
  }, []);

  return (
    <div className='container-recomendacao'>
      <h2>Recomendações de Livros mais curtidos</h2>
      <div className='container-livro'>
      {livrosRecomendados.map((livro) => (
        <div className="caixa-livro" key={livro.id}>
          <h3>{livro.titulo}</h3>
          <p>Autor: {livro.autor}</p>
          <p>Série: {livro.serie || 'Indefinido'}</p>
          <p>Tema: {livro.tema || 'Indefinido'}</p>
          <p>Faixa Etária: {livro.faixa_etaria}</p>
          <p>Quantidade em estoque: {livro.quantidade || 0}</p>
          <p>Curtidas: {livro.curtidas}</p>
          <img src={livro.img_url} alt={livro.titulo} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default RecomendacoesLivros;
