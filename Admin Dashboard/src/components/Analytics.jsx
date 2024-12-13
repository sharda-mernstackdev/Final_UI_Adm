import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Revenue',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales and Revenue Analytics',
      },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold">$54,763</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold">3.67%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold">$249</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer Lifetime Value</p>
              <p className="text-2xl font-bold">$1,249</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Selling Cars</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Tesla Model 3</span>
              <span className="font-semibold">243 units</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Ford Mustang Mach-E</span>
              <span className="font-semibold">198 units</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Chevrolet Bolt EV</span>
              <span className="font-semibold">176 units</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Nissan Leaf</span>
              <span className="font-semibold">154 units</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sales and Revenue Trends</h2>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}

