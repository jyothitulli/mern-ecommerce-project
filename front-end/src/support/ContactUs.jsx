import React from 'react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { toast } from 'sonner'

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')?.toString().trim()
    toast.success(`Thanks${name ? `, ${name}` : ''}! We'll get back to you shortly.`)
    form.reset()
  }

  return (
    <div className="container mx-auto px-4 lg:px-2 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="text-gray-600 mt-2">We'd love to hear from you. Please fill out the form below or reach us via the details provided.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <FiMail className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium">Email</h3>
          </div>
          <p className="text-gray-600 text-sm">support@rabbitecom.com</p>
        </div>
        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <FiPhone className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium">Phone</h3>
          </div>
          <p className="text-gray-600 text-sm">+1 (012) 345-6789</p>
        </div>
        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <FiMapPin className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium">Address</h3>
          </div>
          <p className="text-gray-600 text-sm">123 Commerce Ave, Suite 100, San Francisco, CA</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input id="name" name="name" type="text" className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" name="email" type="email" className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700" required />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input id="subject" name="subject" type="text" className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={6} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700" required />
            </div>
            <div>
              <button type="submit" className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors">Send Message</button>
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          <div className="aspect-video w-full bg-gray-100 border rounded-md flex items-center justify-center text-gray-500 text-sm">
            Map placeholder
          </div>
        </div>
      </section>
    </div>
  )
}
