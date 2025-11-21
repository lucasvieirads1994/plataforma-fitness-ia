'use client'

import { UserPlus, Play, Camera, Trophy } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Cadastre-se',
      description: 'Crie sua conta gratuita e responda nosso quiz interativo para personalizar seu perfil.'
    },
    {
      icon: Play,
      title: 'Faça seu Primeiro Treino',
      description: 'Experimente a IA postural corrigindo sua técnica em tempo real durante exercícios.'
    },
    {
      icon: Camera,
      title: 'Escanée sua Refeição',
      description: 'Tire uma foto do seu prato e receba análise nutricional completa e sugestões.'
    },
    {
      icon: Trophy,
      title: 'Entre em um Desafio',
      description: 'Participe de desafios gamificados, ganhe pontos e conquiste medalhas.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Em apenas 3 passos simples, transforme sua rotina de fitness com IA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary transform -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}