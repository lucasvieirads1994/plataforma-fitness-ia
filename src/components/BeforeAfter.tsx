'use client'

import { ArrowRight } from 'lucide-react'

export default function BeforeAfter() {
  const transformations = [
    {
      before: 'Peso: 85kg | Gordura: 25%',
      after: 'Peso: 75kg | Gordura: 18%',
      name: 'Carlos M.',
      duration: '3 meses'
    },
    {
      before: 'Sem definição | Técnica ruim',
      after: 'Abdômen definido | Postura correta',
      name: 'Ana P.',
      duration: '2 meses'
    },
    {
      before: 'Refeições desbalanceadas',
      after: 'Nutrição otimizada | Energia constante',
      name: 'Roberto L.',
      duration: '1 mês'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resultados Reais de Usuários
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Veja as transformações alcançadas com nossa plataforma de IA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {transformations.map((transform, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mb-4">
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-2">
                  ANTES: {transform.before}
                </div>
                <ArrowRight className="w-6 h-6 mx-auto text-primary mb-2" />
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
                  DEPOIS: {transform.after}
                </div>
              </div>
              <p className="font-semibold text-gray-900">{transform.name}</p>
              <p className="text-sm text-gray-600">em {transform.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}