import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title } from 'chart.js';
import axios from 'axios';
import './grafico.css'

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

const Grafico = ({ options }) => {
  const canvasRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/livros'); // Substitua 'URL_DA_API_DE_LIVROS' pela URL real da sua API
        const data = response.data;

        // Ordena os dados em ordem decrescente com base no número de curtidas
        const sortedData = data.sort((a, b) => b.curtidas - a.curtidas);

        // Seleciona apenas os 10 primeiros registros após a ordenação
        const top10Data = sortedData.slice(0, 10);

        const chartData = {
          labels: top10Data.map(item => item.titulo),
          datasets: [{
            label: 'Curtidas',
            data: top10Data.map(item => item.curtidas),
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          }]
        };

        if (chartInstance.current) {
          // If the chart instance already exists, update the chart data
          chartInstance.current.data.datasets = chartData.datasets;
          chartInstance.current.data.labels = chartData.labels;
          chartInstance.current.update();
        } else {
          // If the chart instance doesn't exist, create a new chart
          chartInstance.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: chartData,
            options: options
          });
        }
      } catch (error) {
        console.error('Failed to fetch data from API:', error);
      }
    };

    fetchData();

    return () => {
      // Clean up the chart when the component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [options]);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        // Atualiza as dimensões do gráfico com base no tamanho da janela
        const canvas = canvasRef.current;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return(
  <div className="area-grafico">
    <hr/>
    <h2>Livros mais Curtidos</h2>
  <canvas ref={canvasRef} style={{ width: '100%', height: '70%' }} />
  </div>)
};

export default Grafico;
