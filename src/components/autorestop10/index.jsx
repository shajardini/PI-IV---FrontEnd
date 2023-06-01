import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './autores.css';

const AutoresCurtidos = () => {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/autores-curtidos')
      .then(response => response.json())
      .then(data => {
        // Realiza a agregação dos autores iguais
        const autoresAgregados = {};
        data.forEach(autor => {
          if (autoresAgregados[autor.autor]) {
            autoresAgregados[autor.autor] += autor.curtidas;
          } else {
            autoresAgregados[autor.autor] = autor.curtidas;
          }
        });

        // Converte o objeto de agregação em um array
        const autoresAgregadosArray = Object.keys(autoresAgregados).map(autor => ({
          autor,
          curtidas: autoresAgregados[autor]
        }));

        // Ordena os autores pelo número de curtidas em ordem decrescente
        const autoresOrdenados = autoresAgregadosArray.sort((a, b) => b.curtidas - a.curtidas);

        setAutores(autoresOrdenados.slice(0, 5)); // Mostrar apenas os 5 primeiros autores
      })
      .catch(error => {
        console.error('Erro ao obter os autores mais curtidos:', error);
      });
  }, []);

  const labels = autores.map(autor => autor.autor);
  const data = autores.map(autor => autor.curtidas);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Curtidas',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        max: 10, // Define o valor máximo do eixo Y para 100
      },
    },
  };

  return (
    <div className='area-grafico' style={{ height: '300px', width: '80%' }}>
      <hr />
      <h2>Autores Mais Curtidos</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AutoresCurtidos;
