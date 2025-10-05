import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 lg:px-2 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">About Rabbit</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Rabbit is a modern e-commerce brand committed to delivering quality apparel with a seamless
          shopping experience. We blend thoughtful design, premium fabrics, and responsible practices
          to help you look and feel your best.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            To make elevated everyday wear accessible—combining comfort, style, and sustainability.
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">What We Value</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2"><IoMdCheckmarkCircleOutline className="mt-0.5 text-green-600"/>Quality craftsmanship</li>
            <li className="flex items-start gap-2"><IoMdCheckmarkCircleOutline className="mt-0.5 text-green-600"/>Fair pricing</li>
            <li className="flex items-start gap-2"><IoMdCheckmarkCircleOutline className="mt-0.5 text-green-600"/>Ethical sourcing</li>
          </ul>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
          <p className="text-gray-600 text-sm">
            We continually improve materials and manufacturing to reduce our footprint without
            compromising on durability and comfort.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Stat label="Years in Business" value="5+"/>
        <Stat label="Products Shipped" value="250k+"/>
        <Stat label="Happy Customers" value="120k+"/>
        <Stat label="Avg. Rating" value="4.8/5"/>
      </section>

      <section className="border rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold">Have questions?</h2>
          <p className="text-gray-600 mt-1">We're here to help—reach out and we'll get back to you shortly.</p>
        </div>
        <div>
          <Link to="/contact" className="inline-block bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="text-center border rounded-lg p-6">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
    </div>
  )
}