import { useState } from 'react';
import { CreditCardIcon, CashIcon } from '@heroicons/react/outline';

export default function Billing() {
  const [activeTab, setActiveTab] = useState('card');

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Billing & Payments</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Payment Methods</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Add a new payment method or manage existing ones.</p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveTab('card')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'card'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCardIcon className="h-5 w-5 inline-block mr-2" />
                Card
              </button>
              <button
                onClick={() => setActiveTab('bank')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'bank'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CashIcon className="h-5 w-5 inline-block mr-2" />
                Bank Transfer
              </button>
            </div>
            {activeTab === 'card' && (
              <form className="space-y-4">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card number</label>
                  <input type="text" name="card-number" id="card-number" placeholder="1234 5678 9012 3456" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">Expiration date</label>
                    <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                    <input type="text" name="cvc" id="cvc" placeholder="123" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Add Card
                </button>
              </form>
            )}
            {activeTab === 'bank' && (
              <form className="space-y-4">
                <div>
                  <label htmlFor="account-name" className="block text-sm font-medium text-gray-700">Account Name</label>
                  <input type="text" name="account-name" id="account-name" placeholder="John Doe" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">Account Number</label>
                  <input type="text" name="account-number" id="account-number" placeholder="000123456789" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="routing-number" className="block text-sm font-medium text-gray-700">Routing Number</label>
                  <input type="text" name="routing-number" id="routing-number" placeholder="123456789" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Add Bank Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Billing History</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">View your recent transactions and download invoices.</p>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {[
              { id: 1, date: '2023-06-01', amount: '$59.00', status: 'Paid' },
              { id: 2, date: '2023-05-01', amount: '$59.00', status: 'Paid' },
              { id: 3, date: '2023-04-01', amount: '$59.00', status: 'Paid' },
            ].map((transaction) => (
              <li key={transaction.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{transaction.date}</div>
                  <div className="text-sm text-gray-500">{transaction.amount}</div>
                  <div className="text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                      Download
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

