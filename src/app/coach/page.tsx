'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function CoachPage() {
  const [question, setQuestion] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/ai/analyze-execution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })
      
      const data = await res.json()
      
      if (data.analysis) {
        setAnalysis(data.analysis)
      } else {
        alert('Erro ao gerar análise')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com IA')
    } finally {
      setLoading(false)
    }
  }

  const suggestions = [
    'Como fazer agachamento corretamente?',
    'Qual a forma correta do supino?',
    'Como ativar melhor o bíceps na rosca direta?',
    'Dicas para melhorar meu leg press',
    'Como evitar lesões no treino de costas?'
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">IA Coach 🤖</h1>
            <p className="text-gray-600">Tire suas dúvidas sobre execução de exercícios</p>
          </div>
        </header>

        <main className="p-6 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faça sua pergunta:
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: Como fazer agachamento corretamente?"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                required
              />
              
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🤔 Pensando...' : '💬 Perguntar à IA'}
              </button>
            </form>

            {/* Sugestões */}
            {!analysis && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Sugestões de perguntas:
                </p>
                <div className="space-y-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuestion(suggestion)}
                      className="block w-full text-left px-4 py-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-sm text-orange-700 transition-colors"
                    >
                      💡 {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Análise */}
          {analysis && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Resposta da IA:</h2>
                <button
                  onClick={() => {
                    setAnalysis('')
                    setQuestion('')
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕ Limpar
                </button>
              </div>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {analysis}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
