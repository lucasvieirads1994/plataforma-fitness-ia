import React from 'react'
import { Check, Star } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Mensal',
      price: 'R$ 29,90',
      period: '/mês',
      popular: false,
      features: [
        'Treinos IA básicos',
        'Scanner nutricional limitado (5/dia)',
        'IA Coach básico',
        'Desafios simples',
        'Relatórios básicos'
      ],
      limitations: [
        'Treinos avançados bloqueados',
        'IA postural limitada',
        'Evolução avançada bloqueada'
      ]
    },
    {
      name: 'Anual',
      price: 'R$ 299,90',
      period: '/ano',
      popular: true,
      features: [
        'Tudo do Mensal',
        'Treinos avançados desbloqueados',
        'Scanner ilimitado',
        'IA Coach completo',
        'Desafios completos',
        'Evolução avançada',
        'Suporte prioritário'
      ],
      discount: 'Economize R$ 59,80'
    },
    {
      name: 'Vitalício',
      price: 'R$ 999,90',
      period: 'único',
      popular: false,
      features: [
        'Acesso vitalício',
        'Todas as funcionalidades',
        'Atualizações gratuitas',
        'Suporte premium',
        'Conteúdo exclusivo'
      ],
      earlyBird: 'Early Adopter'
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece grátis por 7 dias e transforme sua rotina fitness.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white p-8 rounded-lg shadow-lg ${plan.popular ? 'border-2 border-primary scale-105' : ''}`}>
              {plan.popular && (
                <div className="bg-primary text-white text-center py-1 rounded-t-lg -mt-8 mb-4">
                  <Star className="w-4 h-4 inline mr-1" />
                  MAIS POPULAR
                </div>
              )}
              {plan.earlyBird && (
                <div className="bg-coral text-white text-center py-1 rounded-t-lg -mt-8 mb-4">
                  {plan.earlyBird}
                </div>
              )}
              <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
                {plan.discount && (
                  <p className="text-green-600 font-semibold mt-1">{plan.discount}</p>
                )}
              </div>
              <ul className="mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.limitations && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Limitações:</p>
                  <ul>
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="text-sm text-red-500 mb-1">• {limitation}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button className={`w-full py-3 rounded-lg font-semibold ${plan.popular ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                {plan.name === 'Mensal' ? 'Começar 7 Dias Grátis' : 'Assinar Agora'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-green-600">Garantia de 30 dias:</span> Não ficou satisfeito? Devolvemos seu dinheiro.
          </p>
          <p className="text-sm text-gray-500">
            Todos os planos incluem 7 dias grátis. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing