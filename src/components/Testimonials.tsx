import React from 'react'

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Depoimentos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">"Mudou minha vida!"</p>
            <p className="font-semibold">João Silva</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">"Incrível a IA postural!"</p>
            <p className="font-semibold">Maria Santos</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">"Scanner nutricional perfeito!"</p>
            <p className="font-semibold">Pedro Costa</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials