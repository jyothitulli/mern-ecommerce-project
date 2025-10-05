import React, { useState } from 'react';

const faqsData = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy from the date of purchase. Items must be unused and in original packaging.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes 5-7 business days within the country. International shipping may take longer.",
  },
  {
    question: "Do you offer exchanges?",
    answer: "Yes, exchanges are possible within 30 days of purchase. Contact our support team to initiate an exchange.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking number via email.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 lg:px-2 py-10">
      <h1 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
          >
            <div onClick={() => toggleFaq(index)} className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
