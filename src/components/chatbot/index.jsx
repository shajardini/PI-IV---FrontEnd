import React, { useState, useEffect } from 'react';
import './chatbot.css';

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [consultaSelecionada, setConsultaSelecionada] = useState('');
  const [autores, setAutores] = useState([]);
  const [temas, setTemas] = useState([]);
  const [series, setSeries] = useState([]);
  const [faixasEtarias, setFaixasEtarias] = useState([]);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await fetch('http://localhost:5000/livros/autor');
        const data = await response.json();
        setAutores(data);
      } catch (error) {
        console.log('Erro ao buscar autores:', error);
      }
    };

    const fetchTemas = async () => {
      try {
        const response = await fetch('http://localhost:5000/livros/temas');
        const data = await response.json();
        setTemas(data);
      } catch (error) {
        console.log('Erro ao buscar temas:', error);
      }
    };

    const fetchSeries = async () => {
      try {
        const response = await fetch('http://localhost:5000/livros/series');
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.log('Erro ao buscar séries:', error);
      }
    };

    const fetchFaixasEtarias = async () => {
      try {
        const response = await fetch('http://localhost:5000/livros/faixa_etaria');
        const data = await response.json();
        setFaixasEtarias(data);
      } catch (error) {
        console.log('Erro ao buscar faixas etárias:', error);
        setFaixasEtarias(['Não definido']);
      }
    };

    fetchAutores();
    fetchTemas();
    fetchSeries();
    fetchFaixasEtarias();
  }, []);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleConsultaChange = (event) => {
    setConsultaSelecionada(event.target.value);
    setUserInput('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let searchData = [];

      if (consultaSelecionada === 'idade' && userInput) {
        const response = await fetch(`http://localhost:5000/livros/faixa_etaria/${userInput}`);
        searchData = await response.json();
      } else if (consultaSelecionada === 'autor') {
        const response = await fetch(`http://localhost:5000/livros/autor/${userInput}`);
        searchData = await response.json();
      } else if (consultaSelecionada === 'tema' && userInput) {
        const response = await fetch(`http://localhost:5000/livros/temas/${userInput}`);
        searchData = await response.json();
      } else if (consultaSelecionada === 'serie') {
        const response = await fetch(`http://localhost:5000/livros/series/${userInput}`);
        searchData = await response.json();
      } else if (consultaSelecionada === 'top10') {
        const response = await fetch(`http://localhost:5000/livros/mais_curtidos?tema=${userInput}`);
        searchData = await response.json();
      }

      setSearchResult(searchData);
    } catch (error) {
      console.log('Erro ao pesquisar livros:', error);
    }
  };

  return (
    <div className="container-livro-chat">
      <h2>O que você procura?</h2>
      <form onSubmit={handleSubmit}>
        <p>Escolha abaixo como você quer encontrar seu livro:</p>
        <label>
          <input
            type="radio"
            value="idade"
            checked={consultaSelecionada === 'idade'}
            onChange={handleConsultaChange}
          />
          Por idade
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="autor"
            checked={consultaSelecionada === 'autor'}
            onChange={handleConsultaChange}
          />
          Por autor
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="tema"
            checked={consultaSelecionada === 'tema'}
            onChange={handleConsultaChange}
          />
          Por tema
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="serie"
            checked={consultaSelecionada === 'serie'}
            onChange={handleConsultaChange}
          />
          Por série
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="top10"
            checked={consultaSelecionada === 'top10'}
            onChange={handleConsultaChange}
          />
          Top 10 por tema
        </label>
        <br />
        {consultaSelecionada === 'idade' && (
          <div>
            <label>
              Pesquisar livros por idade:
              <select value={userInput} onChange={handleChange}>
                <option value="">Selecione</option>
                {faixasEtarias.map((faixaEtaria) => (
                  <option key={faixaEtaria || 'sem_idade'} value={faixaEtaria || 'sem_idade'}>
                    {faixaEtaria || 'Não definido'}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {consultaSelecionada === 'autor' && (
          <div>
            <label>
              Escolha um autor:
              <select value={userInput} onChange={handleChange}>
                <option value="">Selecione</option>
                {autores.map((autor) => (
                  <option key={autor} value={autor}>
                    {autor}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {consultaSelecionada === 'tema' && (
          <div>
            <label>
              Escolha um tema:
              <select value={userInput} onChange={handleChange}>
                <option value="">Selecione</option>
                {temas.map((tema) => (
                  <option key={tema} value={tema}>
                    {tema}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {consultaSelecionada === 'serie' && (
          <div>
            <label>
              Escolha uma série:
              <select value={userInput} onChange={handleChange}>
                <option value="">Selecione</option>
                {series.map((serie) => (
                  <option key={serie} value={serie}>
                    {serie}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {consultaSelecionada === 'top10' && (
          <div>
            <label>
              Escolha um tema:
              <select value={userInput} onChange={handleChange}>
                <option value="">Selecione</option>
                {temas.map((tema) => (
                  <option key={tema} value={tema}>
                    {tema}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <br />
        <button type="submit" className="button-pesquisa">Pesquisar</button>
      </form>

      <h3>Resultado da pesquisa:</h3>
      <div className="corpo">
        <ul>
          {searchResult.map((livro) => (
            <li className="caixa-livro" key={livro.id}>
              <img src={livro.img_url} alt={livro.titulo} />
              <p>{livro.titulo}</p>
              <p>Autor: {livro.autor}</p>
              <p>Quantidade em estoque: {livro.quantidade || 0}</p>
            </li>
          ))}
        </ul>
        <p>Quantidade de livros: {searchResult.length}</p>
      </div>
    </div>
  );
}

export default Chatbot;
