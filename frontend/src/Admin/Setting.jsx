import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Account Settings</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your account preferences and settings.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">John Doe</span>
                <span className="ml-4 flex-shrink-0">
                  <button type="button" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">johndoe@example.com</span>
                <span className="ml-4 flex-shrink-0">
                  <button type="button" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Password</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">••••••••</span>
                <span className="ml-4 flex-shrink-0">
                  <button type="button" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Email notifications</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Switch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                  className={classNames(
                    emailNotifications ? 'bg-orange-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={classNames(
                      emailNotifications ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  >
                    <span
                      className={classNames(
                        emailNotifications ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        emailNotifications ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-orange-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Push notifications</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Switch
                  checked={pushNotifications}
                  onChange={setPushNotifications}
                  className={classNames(
                    pushNotifications ? 'bg-orange-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={classNames(
                      pushNotifications ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  >
                    <span
                      className={classNames(
                        pushNotifications ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        pushNotifications ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-orange-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
