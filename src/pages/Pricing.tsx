import { useEffect } from 'react'

const Pricing = () => {

  useEffect(() => {
    document.title = 'Pricing'
  }, [])

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">Pricing</h1>
      <p className="mt-6 max-w-4xl text-xl text-gray-500">Choose an affordable plan that's packed with the best features for you and your organization.</p>

      {/* Tiers */}
      <div className="mt-24 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
        <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Free</h3>
            <p className="mt-4 flex items-baseline text-gray-800">
              <span className="text-5xl font-bold tracking-tight">$0</span>
              <span className="ml-1 text-xl font-semibold">/year</span>
            </p>
            <p className="mt-6 text-gray-500">The essentials to provide your best work for clients.</p>

            {/* Feature list */}
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">1 library</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">Up to 100 works per library</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">Basic analytics</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">48-hour support response time</span>
              </li>
            </ul>
          </div>

          <a href="#" className="bg-sky-50 text-sky-700 hover:bg-sky-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">Annual billing</a>
        </div>

        <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Individual</h3>

            <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-sky-500 py-1.5 px-4 text-sm font-semibold text-white">Most popular</p>
            <p className="mt-4 flex items-baseline text-gray-800">
              <span className="text-5xl font-bold tracking-tight">$49</span>
              <span className="ml-1 text-xl font-semibold">/year</span>
            </p>
            <p className="mt-6 text-gray-500">A plan that scales with your rapidly growing business.</p>

            {/* Feature list */}
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">2 libraries</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">Up to 1000 works per library</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">Advanced analytics</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">24-hour support response time</span>
              </li>
            </ul>
          </div>

          <a href="#" className="bg-sky-500 text-white hover:bg-sky-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">Annual billing</a>
        </div>

        <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Organization</h3>
            <p className="mt-4 flex items-baseline text-gray-800">
              <span className="text-5xl font-bold tracking-tight">$99</span>
              <span className="ml-1 text-xl font-semibold">/year</span>
            </p>
            <p className="mt-6 text-gray-500">Dedicated support and infrastructure for your company.</p>

            {/* Feature list */}
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">3 libraries per user</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">Unlimited works per library</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">Advanced analytics</span>
              </li>

              <li className="flex">
                {/* Heroicon name: outline/check */}
                <svg className="h-6 w-6 flex-shrink-0 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="ml-3 text-gray-500">1-hour, dedicated support response time</span>
              </li>
            </ul>
          </div>

          <a href="#" className="bg-sky-50 text-sky-700 hover:bg-sky-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">Annual billing</a>
        </div>
      </div>
    </div>
  )
}

export default Pricing
