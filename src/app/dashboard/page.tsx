'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

interface UserData {
  user: {
    id: string
    email: string
  }
  profile?: {
    name: string
    goal: string
    age: number
    weight: number
    height: number
  }
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (!res.ok) {
        router.push('/auth/login')
        return
      }
      const data = await res.json()
      
      if (!data.profile) {
        // Redirecionar para quiz
        router.push('/quiz')
        return
      }
      
      setUserData(data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  const goalLabels: Record<string, string> = {
    lose_weight: '🔥 Perder Peso',
    gain_muscle: '💪 Ganhar Massa',
    maintain: '⚖️ Manter Forma',
    improve_fitness: '🏃 Melhorar Fitness'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!userData) return null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Olá, {userData.profile?.name}! 👋
            </h1>
            <p className="text-gray-600">
              {goalLabels[userData.profile?.goal || '']}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-gray-600 text-sm mb-1">Peso Atual</div>
              <div className="text-3xl font-bold text-gray-900">
                {userData.profile?.weight}kg
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-gray-600 text-sm mb-1">Altura</div>
              <div className="text-3xl font-bold text-gray-900">
                {userData.profile?.height}cm
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-gray-600 text-sm mb-1">Idade</div>
              <div className="text-3xl font-bold text-gray-900">
                {userData.profile?.age} anos
              </div>
            </div>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <div className="text-5xl mb-4">💪</div>
              <h2 className="text-2xl font-bold mb-2">Treinos Personalizados</h2>
              <p className="text-blue-100 mb-4">
                IA gera treinos baseados no seu perfil e objetivo
              </p>
              <div className="text-sm bg-white/20 rounded-lg p-3">
                ✨ Geração automática com GPT-4<br/>
                📹 Links para vídeos do YouTube<br/>
                📊 Séries, reps e descanso detalhados
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg p-8 text-white">
              <div className="text-5xl mb-4">🥗</div>
              <h2 className="text-2xl font-bold mb-2">Scanner Nutricional</h2>
              <p className="text-green-100 mb-4">
                Analise suas refeições com IA Vision
              </p>
              <div className="text-sm bg-white/20 rounded-lg p-3">
                📸 Upload de foto da comida<br/>
                🔍 Identificação automática de alimentos<br/>
                📈 Calorias e macros estimados
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-8 text-white">
              <div className="text-5xl mb-4">🤖</div>
              <h2 className="text-2xl font-bold mb-2">IA Coach Pessoal</h2>
              <p className="text-orange-100 mb-4">
                Tire dúvidas sobre execução de exercícios
              </p>
              <div className="text-sm bg-white/20 rounded-lg p-3">
                💬 Chat com GPT-4<br/>
                🎯 Análise de técnica<br/>
                ⚠️ Dicas de segurança
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-8 text-white">
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-2xl font-bold mb-2">Progresso</h2>
              <p className="text-purple-100 mb-4">
                Acompanhe sua evolução
              </p>
              <div className="text-sm bg-white/20 rounded-lg p-3">
                📸 Fotos de evolução (em breve)<br/>
                📏 Medidas corporais (em breve)<br/>
                📈 Gráficos de progresso (em breve)
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Dica do Dia
            </h3>
            <p className="text-blue-800">
              Mantenha-se hidratado! Beba pelo menos 2 litros de água por dia para melhor performance nos treinos e recuperação muscular.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
