import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './form.css';

function BuscaForm() {
  const [formValues, setFormValues] = useState({
    opcao1: '',
    opcao2: '',
    opcao3: '',
    opcao4: '',
    opcao5: '',
  });

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);

    try {
      const response = await fetch('http://localhost:5000/livros', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredBooks = data.filter((livro) => {
          if (formValues.opcao1 === 'valor3') {
            // Retorna todos os livros se "Todas as Idades" for selecionado
            return true;
          } else {
            // Filtra os livros pela faixa etária selecionada
            return livro.faixa_etaria === parseInt(formValues.opcao1);
          }
        });
        setFilteredBooks(filteredBooks);
      } else {
        console.error('Erro ao realizar a busca');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API', error);
    }
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:5000/autores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAuthors(data);
        } else {
          console.error('Erro ao obter a lista de autores');
        }
      } catch (error) {
        console.error('Erro ao conectar com a API', error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="container">
      <h1>Encontre seu livro</h1>
      <p>Primeiro, diga-nos o que procura:</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="opcao1">
          <Form.Label>Idade:</Form.Label>
          <Form.Control
            as="select"
            name="opcao1"
            value={formValues.opcao1}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Selecione...</option>
            <option value="valor3">0</option>
            <option value="valor1">1</option>
            <option value="valor2">2</option>
            <option value="valor3">3</option>
            <option value="valor3">Todas as Idades</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="opcao2">
          <Form.Label>Autor:</Form.Label>
          <Form.Control
            as="select"
            name="opcao2"
            value={formValues.opcao2}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Selecione...</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Restante do código do formulário */}
        <Button variant="primary" type="submit" className="button">
          Buscar
        </Button>
      </Form>

      <div id="livros">
        {filteredBooks.map((livro) => (
          <div key={livro.id}>
            <h3>{livro.titulo}</h3>
            <p>Autor: {livro.autor}</p>
            {/* Exiba as demais informações do livro */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscaForm;
