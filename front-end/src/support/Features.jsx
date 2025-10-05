import React from 'react'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { FiTruck, FiRefreshCcw, FiLock, FiStar, FiHeadphones } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Features() {
  const features = [
    { icon: <FiTruck className="h-6 w-6" />, title: 'Fast & Free Shipping', desc: 'Free shipping on orders over $49 with tracked delivery.' },
    { icon: <FiRefreshCcw className="h-6 w-6" />, title: 'Easy Returns', desc: '30-day hassle-free returns with instant store credit.' },
    { icon: <FiLock className="h-6 w-6" />, title: 'Secure Checkout', desc: 'Encrypted payments with PCI-DSS compliant processors.' },
    { icon: <IoShieldCheckmarkOutline className="h-6 w-6" />, title: 'Quality Guaranteed', desc: 'Premium materials and rigorous QA on every item.' },
    { icon: <FiStar className="h-6 w-6" />, title: 'Top-rated Products', desc: 'Thousands of 5-star reviews from happy customers.' },
    { icon: <FiHeadphones className="h-6 w-6" />, title: 'Priority Support', desc: 'Dedicated support team ready to help 7 days a week.' }
  ]

  return (
    <div className="container mx-auto px-4 lg:px-2 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Features</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          We obsess over the details so you get the best shopping experience—from the moment you land on our store
          to the day your order arrives (and beyond).
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((f, idx) => (
          <div key={idx} className="border rounded-lg p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-gray-800">
              <span className="p-2 rounded-md bg-gray-100">{f.icon}</span>
              <h3 className="font-semibold text-lg">{f.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="border rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold">Ready to explore more?</h2>
          <p className="text-gray-600 mt-1">Check out what our community is asking or reach out directly.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/faqs" className="inline-block bg-white border px-5 py-2 rounded-md hover:bg-gray-50 transition-colors">View FAQs</Link>
          <Link to="/contact" className="inline-block bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}
