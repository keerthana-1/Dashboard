'use client'; // This directive ensures that the component runs on the client side

import { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';
import styles from './page.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

interface CandleStickData {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartData {
  labels: string[];
  data: number[];
}

async function fetchCandleStickData(): Promise<CandleStickData[]> {
  const res = await fetch('http://127.0.0.1:8000/api/candlestick-data/');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}

async function fetchLineChartData(): Promise<ChartData> {
  const res = await fetch('http://127.0.0.1:8000/api/line-chart-data/');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function fetchBarChartData(): Promise<ChartData> {
  const res = await fetch('http://127.0.0.1:8000/api/bar-chart-data/');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function fetchPieChartData(): Promise<ChartData> {
  const res = await fetch('http://127.0.0.1:8000/api/pie-chart-data/');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


function Page() {
  const [candlestickdata, setCandlestickdata] = useState<CandleStickData[] | null>(null);
  const [linechartdata, setLinechartdata] = useState<ChartData | null>(null);
  const [barchartdata, setBarchartdata] = useState<ChartData | null>(null);
  const [piechartdata, setPiechartdata] = useState<ChartData | null>(null);
  const [loading,setLoading]=useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const csData = await fetchCandleStickData();
        setCandlestickdata(csData);
        const lcData = await fetchLineChartData();
        setLinechartdata(lcData);
        const bcData = await fetchBarChartData();
        setBarchartdata(bcData);
        const pcData = await fetchPieChartData();
        setPiechartdata(pcData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Failed to load data.")
      }
      finally{
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  const candleStickChartData = {
    labels: candlestickdata?.map(item => item.x) || [],
    datasets: [
      {
        label: 'Open',
        data: candlestickdata?.map(item => item.open) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Close',
        data: candlestickdata?.map(item => item.close) || [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };

  const lineChartData = {
    labels: linechartdata?.labels || [],
    datasets: [
      {
        label: 'Line Chart Data',
        data: linechartdata?.data || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true 
      }
    ]
  };

  const barChartData = {
    labels: barchartdata?.labels || [],
    datasets: [
      {
        label: 'Bar Chart Data',
        data: barchartdata?.data || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const pieChartData = {
    labels: piechartdata?.labels || [],
    datasets: [
      {
        label: 'Pie Chart Data',
        data: piechartdata?.data || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };


  if(loading) return <p className={styles.loading}>Loading...</p>

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
   
    <div className={styles.container} >
       <h1 className={styles.title}>Dashboard</h1>
       <div className={styles.chartGrid}>
        <div className={styles.chartContainer}>
              <h2 className={styles.chartTitle}>Line Chart</h2>
              {linechartdata && <Line data={lineChartData} />}
          </div>
          <div className={styles.chartContainer}>
              <h2 className={styles.chartTitle}>Bar Chart</h2>
              {barchartdata && <Bar data={barChartData} />}
          </div>
          <div className={styles.chartContainer}>
            <h2 className={styles.chartTitle}>Pie Chart</h2>
            {piechartdata && <Pie data={pieChartData} />}
          </div>
          <div className={styles.chartContainer}>
            <h2 className={styles.chartTitle}>Candlestick Chart</h2>
            {candlestickdata && <Line data={candleStickChartData} />}
          </div>
      </div>
   </div>
  );
}

export default Page;