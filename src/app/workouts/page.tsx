'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  instructions: string
  videoSearchTerms?: string[]
}

interface Workout {
  id: string
  title: string
  description: string
  exercises: Exercise[]
  createdAt: string
}

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    try {
      const res = await fetch('/api/workouts/list')
      const data = await res.json()
      setWorkouts(data.workouts || [])
    } catch (error) {
      console.error('Erro ao buscar treinos:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateWorkout = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/workouts/generate', {
        method: 'POST'
      })
      const data = await res.json()
      
      if (data.success) {
        await fetchWorkouts()
        alert('✅ Treino gerado com sucesso!')
      } else {
        alert('❌ Erro ao gerar treino: ' + (data.error || ''))
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('❌ Erro ao gerar treino')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seus Treinos 💪</h1>
                <p className="text-gray-600">Treinos personalizados gerados com IA</p>
              </div>
              <button
                onClick={generateWorkout}
                disabled={generating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 shadow-lg"
              >
                {generating ? '⏳ Gerando...' : '✨ Gerar Novo Treino'}
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando treinos...</p>
            </div>
          ) : workouts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-6xl mb-4">🏋️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum treino ainda
              </h2>
              <p className="text-gray-600 mb-6">
                Clique no botão acima para gerar seu primeiro treino personalizado!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {workouts.map((workout) => (
                <div key={workout.id} className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {workout.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{workout.description}</p>

                  <div className="space-y-4">
                    {workout.exercises.map((exercise, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-blue-50 transition-colors rounded-r-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {idx + 1}. {exercise.name}
                            </h3>
                            <div className="text-sm text-gray-600 mt-1 space-x-4">
                              <span>📊 {exercise.sets} séries</span>
                              <span>🔁 {exercise.reps} repetições</span>
                              <span>⏱️ {exercise.rest} descanso</span>
                            </div>
                            <p className="text-gray-700 mt-2 text-sm">
                              {exercise.instructions}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedExercise(exercise)}
                            className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 flex-shrink-0"
                          >
                            📺 Ver Vídeos
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal de Vídeos */}
          {selectedExercise && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedExercise(null)}
            >
              <div
                className="bg-white rounded-xl p-6 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">{selectedExercise.name}</h3>
                <p className="text-gray-600 mb-4">
                  Busque por estes termos no YouTube:
                </p>
                <div className="space-y-2">
                  {selectedExercise.videoSearchTerms?.map((term, idx) => (
                    <a
                      key={idx}
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(term)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg p-3 text-red-700 font-semibold transition-colors"
                    >
                      🔍 "{term}" →
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
