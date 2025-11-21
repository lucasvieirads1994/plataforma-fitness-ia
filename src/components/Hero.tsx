'use client'

import Link from 'next/link'
import { Play, Camera, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-coral)] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Treinos Inteligentes com IA
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Correção de postura em tempo real, scanner nutricional por foto e IA coach personalizado.
            Transforme seu corpo com tecnologia avançada.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/auth/register" className="bg-[var(--secondary-teal)] text-[var(--primary-blue)] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
              Começar 7 Dias Grátis
            </Link>
            <button className="bg-white text-[var(--primary-blue)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Play size={20} />
              Ver Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="flex flex-col items-center">
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold mb-2">IA de Postura</h3>
              <p>Correção em tempo real durante seus treinos</p>
            </div>
            <div className="flex flex-col items-center">
              <Camera className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scanner Nutricional</h3>
              <p>Análise completa de suas refeições por foto</p>
            </div>
            <div className="flex flex-col items-center">
              <Play className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold mb-2">IA Coach</h3>
              <p>Orientação personalizada 24/7</p>
            </div>
          </div>

          {/* Seção de Vídeos */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Veja a Tecnologia em Ação</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  IA de Postura em Tempo Real
                </h3>
                <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
                    <p className="text-sm">Vídeo demonstrativo da correção postural</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Scanner Nutricional Inteligente
                </h3>
                <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-70" />
                    <p className="text-sm">Vídeo demonstrativo do scanner de alimentos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}