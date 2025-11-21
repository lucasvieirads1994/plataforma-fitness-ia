'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    activityLevel: '',
    dietaryRestrictions: [] as string[]
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const questions = [
    {
      question: 'Qual é o seu nome?',
      type: 'text',
      field: 'name',
      placeholder: 'Digite seu nome'
    },
    {
      question: 'Qual é a sua idade?',
      type: 'number',
      field: 'age',
      placeholder: 'Ex: 25'
    },
    {
      question: 'Qual é o seu peso atual? (kg)',
      type: 'number',
      field: 'weight',
      placeholder: 'Ex: 70'
    },
    {
      question: 'Qual é a sua altura? (cm)',
      type: 'number',
      field: 'height',
      placeholder: 'Ex: 170'
    },
    {
      question: 'Qual é o seu gênero?',
      type: 'select',
      field: 'gender',
      options: [
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Feminino' },
        { value: 'other', label: 'Outro' }
      ]
    },
    {
      question: 'Qual é o seu objetivo principal?',
      type: 'select',
      field: 'goal',
      options: [
        { value: 'lose_weight', label: '🔥 Perder peso / Emagrecer' },
        { value: 'gain_muscle', label: '💪 Ganhar massa muscular / Hipertrofia' },
        { value: 'maintain', label: '⚖️ Manter peso e forma' },
        { value: 'improve_fitness', label: '🏃 Melhorar condicionamento físico' }
      ]
    },
    {
      question: 'Qual é o seu nível de atividade física?',
      type: 'select',
      field: 'activityLevel',
      options: [
        { value: 'sedentary', label: '🛋️ Sedentário (pouco ou nenhum exercício)' },
        { value: 'light', label: '🚶 Leve (1-2x por semana)' },
        { value: 'moderate', label: '🏃 Moderado (3-4x por semana)' },
        { value: 'active', label: '💪 Ativo (5-6x por semana)' },
        { value: 'very_active', label: '🔥 Muito ativo (treino diário intenso)' }
      ]
    },
    {
      question: 'Possui alguma restrição alimentar?',
      type: 'multiselect',
      field: 'dietaryRestrictions',
      options: [
        { value: 'none', label: 'Nenhuma' },
        { value: 'vegetarian', label: 'Vegetariano' },
        { value: 'vegan', label: 'Vegano' },
        { value: 'gluten_free', label: 'Sem glúten' },
        { value: 'lactose_free', label: 'Sem lactose' },
        { value: 'diabetes', label: 'Diabetes' }
      ]
    }
  ]

  const currentQuestion = questions[step]

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // Submit final
      setLoading(true)
      try {
        const res = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            age: parseInt(formData.age),
            weight: parseFloat(formData.weight),
            height: parseInt(formData.height)
          })
        })

        if (res.ok) {
          router.push('/dashboard')
          router.refresh()
        } else {
          alert('Erro ao salvar dados. Tente novamente.')
        }
      } catch (err) {
        alert('Erro de conexão.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const isFieldValid = () => {
    const value = formData[currentQuestion.field as keyof typeof formData]
    if (currentQuestion.type === 'multiselect') {
      return true // sempre válido
    }
    return value && value.toString().trim() !== ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pergunta {step + 1} de {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>

        {/* Input */}
        {currentQuestion.type === 'text' || currentQuestion.type === 'number' ? (
          <input
            type={currentQuestion.type}
            value={formData[currentQuestion.field as keyof typeof formData] as string}
            onChange={(e) => setFormData({ ...formData, [currentQuestion.field]: e.target.value })}
            placeholder={currentQuestion.placeholder}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
        ) : currentQuestion.type === 'select' ? (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData({ ...formData, [currentQuestion.field]: option.value })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData[currentQuestion.field as keyof typeof formData] === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                <span className="text-lg">{option.label}</span>
              </button>
            ))}
          </div>
        ) : currentQuestion.type === 'multiselect' ? (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => {
              const restrictions = formData.dietaryRestrictions
              const isSelected = restrictions.includes(option.value)
              
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    if (option.value === 'none') {
                      setFormData({ ...formData, dietaryRestrictions: ['none'] })
                    } else {
                      const filtered = restrictions.filter(r => r !== 'none')
                      if (isSelected) {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: filtered.filter(r => r !== option.value)
                        })
                      } else {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: [...filtered, option.value]
                        })
                      }
                    }
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                >
                  <span className="text-lg">{option.label}</span>
                  {isSelected && <span className="ml-2">✓</span>}
                </button>
              )
            })}
          </div>
        ) : null}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
            >
              ← Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isFieldValid() || loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Salvando...' : step === questions.length - 1 ? 'Finalizar 🎉' : 'Próxima →'}
          </button>
        </div>
      </div>
    </div>
  )
}

