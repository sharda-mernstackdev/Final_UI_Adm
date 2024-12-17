import { useState } from 'react';
import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/solid';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const stats = [
  { name: 'Total Revenue', stat: '45,231.89', previousStat: '40,000.00', change: '12.5%', changeType: 'increase' },
  { name: 'Cars Sold', stat: '2,345', previousStat: '2,100', change: '11.7%', changeType: 'increase' },
  { name: 'Active Users', stat: '12,345', previousStat: '11,000', change: '12.2%', changeType: 'increase' },
  { name: 'Sales Today', stat: '12', previousStat: '10', change: '20%', changeType: 'increase' },
];

export default function Dashboard() {
  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenue',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                  <FiArrowUp className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.stat}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold {
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.changeType === 'increase' ? (
                          <FiArrowUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                        ) : (
                          <FiArrowDown className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                        )}
                        <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
            <div className="mt-5">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Monthly Sales and Revenue',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
