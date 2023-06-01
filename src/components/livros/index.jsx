import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { FaHeart, FaThumbsDown } from "react-icons/fa";
import "./livros.css";
import Pagination from "../paginacao/Pagination";

export default function TabelaLivros() {
  const [livros, setLivros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(20);

  useEffect(() => {
    async function loadLivros() {
      const response = await api.get("livros");
      setLivros(response.data);
    }
    loadLivros();
  }, []);

  async function curtirLivro(id) {
    try {
      await api.put(`livros/curtir/${id}`);
      setLivros((livros) =>
        livros.map((livro) =>
          livro.id === id
            ? { ...livro, curtidas: livro.curtidas + 1 }
            : livro
        )
      );
    } catch (error) {
      console.log("Erro ao curtir o livro:", error);
    }
  }

  async function descurtirLivro(id) {
    try {
      await api.put(`livros/descurtir/${id}`);
      setLivros((livros) =>
        livros.map((livro) =>
          livro.id === id
            ? { ...livro, curtidas: livro.curtidas - 1 }
            : livro
        )
      );
    } catch (error) {
      console.log("Erro ao descurtir o livro:", error);
    }
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = livros.slice(indexOfFirstBook, indexOfLastBook);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container-livro">
      {currentBooks.map((livro) => (
        <div key={livro.id} className="caixa-livro">
          <h3>{livro.titulo}</h3>
          <img src={livro.img_url} alt={livro.titulo} />
          <p>Autor: {livro.autor}</p>
          <p>Série: {livro.serie}</p>
          <p>Tema: {livro.tema }</p>
          <p>Faixa Etária: {livro.faixa_etaria}</p>
          <p>Quantidade: {livro.quantidade}</p>

          <div className="icone-curtir">
            <button onClick={() => curtirLivro(livro.id)}>
              <FaHeart color="red" size={24} />
              {livro.curtidas}
            </button>
            <button onClick={() => descurtirLivro(livro.id)}>
              <FaThumbsDown color="blue" size={24} />
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(livros.length / booksPerPage)}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
}
