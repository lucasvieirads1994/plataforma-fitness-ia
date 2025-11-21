'use client'

import Link from 'next/link'
import { Activity, Camera, Trophy, TrendingUp, MessageSquare, Gamepad2 } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Activity,
      title: 'Treino com IA de Postura',
      description: 'Correção em tempo real da sua técnica, detecção de articulações e cálculo de ângulos para treinos perfeitos.'
    },
    {
      icon: Camera,
      title: 'Scanner Nutricional Inteligente',
      description: 'Tire foto do seu prato e receba análise completa de calorias, macronutrientes e sugestões de melhoria.'
    },
    {
      icon: Trophy,
      title: 'Desafios e Gamificação',
      description: 'Participe de desafios de 7, 21 ou 30 dias com ranking, medalhas e recompensas exclusivas.'
    },
    {
      icon: TrendingUp,
      title: 'Evolução Completa',
      description: 'Acompanhe seu progresso com gráficos de peso, medidas, fotos e análise técnica da IA.'
    },
    {
      icon: MessageSquare,
      title: 'IA Coach 24/7',
      description: 'Seu treinador pessoal inteligente para correções, sugestões nutricionais e planejamento semanal.'
    },
    {
      icon: Gamepad2,
      title: 'Sistema de Pontuação',
      description: 'Ganhe XP por treinos, refeições saudáveis e conquistas. Suba de nível e desbloqueie conteúdos.'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Funcionalidades Revolucionárias
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnologia de ponta combinada com gamificação para resultados reais e duradouros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/signup" className="btn-primary">
            Experimentar Agora
          </Link>
        </div>
      </div>
    </section>
  )
}