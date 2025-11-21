'use client'

import { useState, useEffect, useRef } from 'react'
import Sidebar from '@/components/Sidebar'

interface Meal {
  id: string
  imageUrl: string
  calories: number
  protein: number
  carbs: number
  fat: number
  foods: string[]
  analysis: string
  createdAt: string
}

export default function NutritionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [analyzing, setAnalyzing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<Meal | null>(null)
  const [history, setHistory] = useState<Meal[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/nutrition/history')
      const data = await res.json()
      setHistory(data.meals || [])
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      alert('Selecione uma imagem primeiro!')
      return
    }

    setUploading(true)

    try {
      // 1. Upload da imagem
      const formData = new FormData()
      formData.append('file', file)

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const uploadData = await uploadRes.json()

      if (!uploadData.success) {
        alert('Erro ao fazer upload da imagem')
        return
      }

      setUploading(false)
      setAnalyzing(true)

      // 2. Analisar com IA
      const analyzeRes = await fetch('/api/nutrition/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadData.imageUrl })
      })

      const analyzeData = await analyzeRes.json()

      if (analyzeData.success) {
        setCurrentAnalysis(analyzeData.meal)
        setFile(null)
        setPreview('')
        fetchHistory()
      } else {
        alert('Erro ao analisar imagem: ' + (analyzeData.error || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao processar imagem')
    } finally {
      setUploading(false)
      setAnalyzing(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Scanner Nutricional 🥗</h1>
                <p className="text-gray-600">Analise suas refeições com IA</p>
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200"
              >
                {showHistory ? '📸 Novo Scan' : '📊 Histórico'}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          {!showHistory ? (
            <>
              {/* Upload Form */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {preview ? 'Imagem Selecionada' : 'Selecione uma Foto da Comida'}
                </h2>

                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setFile(null)
                          setPreview('')
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                      >
                        ✕ Remover
                      </button>
                      <button
                        onClick={handleAnalyze}
                        disabled={uploading || analyzing}
                        className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 disabled:opacity-50"
                      >
                        {uploading ? '📤 Enviando...' : analyzing ? '🔍 Analisando...' : '✨ Analisar com IA'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 hover:bg-green-50 cursor-pointer transition-all"
                    >
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Clique para selecionar uma foto
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG ou JPEG até 10MB
                      </p>
                    </label>
                  </div>
                )}
              </div>

              {/* Current Analysis */}
              {currentAnalysis && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">✅ Análise Concluída!</h2>
                  
                  <img
                    src={currentAnalysis.imageUrl}
                    alt="Comida analisada"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />

                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-700">
                        {currentAnalysis.calories}
                      </div>
                      <div className="text-sm text-red-600">Calorias</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700">
                        {currentAnalysis.protein}g
                      </div>
                      <div className="text-sm text-blue-600">Proteína</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-700">
                        {currentAnalysis.carbs}g
                      </div>
                      <div className="text-sm text-yellow-600">Carboidratos</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-700">
                        {currentAnalysis.fat}g
                      </div>
                      <div className="text-sm text-purple-600">Gorduras</div>
                    </div>
                  </div>

                  {/* Foods */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Alimentos identificados:</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentAnalysis.foods.map((food, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Análise detalhada:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{currentAnalysis.analysis}</p>
                  </div>

                  <button
                    onClick={() => setCurrentAnalysis(null)}
                    className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Analisar outra refeição
                  </button>
                </div>
              )}
            </>
          ) : (
            /* History */
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Histórico de Refeições</h2>
              
              {history.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-gray-600">Nenhuma refeição analisada ainda</p>
                </div>
              ) : (
                history.map((meal) => (
                  <div key={meal.id} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex gap-4">
                      <img
                        src={meal.imageUrl}
                        alt="Refeição"
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>🔥 {meal.calories} kcal</span>
                          <span>🥩 {meal.protein}g P</span>
                          <span>🍞 {meal.carbs}g C</span>
                          <span>🥑 {meal.fat}g G</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {meal.foods.map((food, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
