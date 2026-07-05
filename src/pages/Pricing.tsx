import { useEffect } from 'react'

const CheckIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Everything you need to catalog your first ensemble.',
    features: ['1 library', 'Up to 100 works', 'Basic search', 'Community support'],
    cta: 'Start for free',
    highlighted: false,
  },
  {
    name: 'Individual',
    price: '$99',
    description: 'For directors with multiple ensembles and growing collections.',
    features: ['2 libraries', 'Up to 1,000 works each', 'Advanced search', 'Priority email support'],
    cta: 'Get Individual',
    highlighted: true,
  },
  {
    name: 'Organization',
    price: '$249',
    description: 'For schools and organizations with several directors on staff.',
    features: ['3 libraries per user', 'Unlimited works', 'Full colleague network', 'Dedicated support'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const Pricing = () => {
  useEffect(() => {
    document.title = 'Pricing — Songsemble'
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Pricing</h1>
      <p className="page-subtitle">
        Simple annual plans for individuals and organizations.
      </p>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              tier.highlighted
                ? 'border-brand-500 bg-white shadow-elevated ring-1 ring-brand-500'
                : 'border-slate-200 bg-white shadow-soft'
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Most popular
              </span>
            )}
            <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
            <p className="mt-4 flex items-baseline text-slate-900">
              <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
              <span className="ml-1 text-lg font-medium text-slate-500">/year</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{tier.description}</p>
            <ul className="mt-8 flex-1 space-y-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 w-full ${tier.highlighted ? 'btn-primary py-3' : 'btn-secondary py-3'}`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
