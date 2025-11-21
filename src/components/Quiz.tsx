'use client'

import { useState } from 'react'

interface QuizProps {
  onComplete: (data: any) => void
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions = [
    {
      question: 'Qual é seu objetivo principal?',
      options: [
        { value: 'lose_weight', label: 'Perder peso' },
        { value: 'gain_muscle', label: 'Ganhar massa muscular' },
        { value: 'maintain', label: 'Manter forma' },
        { value: 'improve_fitness', label: 'Melhorar condicionamento' },
        { value: 'increase_strength', label: 'Aumentar força' },
        { value: 'improve_health', label: 'Melhorar saúde geral' },
      ],
      key: 'goal',
    },
    {
      question: 'Qual é seu nível de experiência com exercícios?',
      options: [
        { value: 'beginner', label: 'Iniciante (pouca ou nenhuma experiência)' },
        { value: 'intermediate', label: 'Intermediário (treino regular há alguns meses)' },
        { value: 'advanced', label: 'Avançado (treino intenso há anos)' },
      ],
      key: 'experience',
    },
    {
      question: 'Com que frequência você treina atualmente?',
      options: [
        { value: 'never', label: 'Nunca' },
        { value: '1-2_times_week', label: '1-2 vezes por semana' },
        { value: '3-4_times_week', label: '3-4 vezes por semana' },
        { value: '5+_times_week', label: '5+ vezes por semana' },
      ],
      key: 'frequency',
    },
    {
      question: 'Qual é sua idade?',
      type: 'number',
      key: 'age',
      min: 13,
      max: 100,
    },
    {
      question: 'Qual é seu gênero?',
      options: [
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Feminino' },
        { value: 'other', label: 'Outro' },
        { value: 'prefer_not_say', label: 'Prefiro não dizer' },
      ],
      key: 'gender',
    },
    {
      question: 'Qual é sua altura em cm?',
      type: 'number',
      key: 'height',
      min: 100,
      max: 250,
    },
    {
      question: 'Qual é seu peso atual em kg?',
      type: 'number',
      key: 'weight',
      min: 30,
      max: 300,
    },
    {
      question: 'Você tem alguma restrição alimentar?',
      options: [
        { value: 'none', label: 'Nenhuma' },
        { value: 'vegetarian', label: 'Vegetariano' },
        { value: 'vegan', label: 'Vegano' },
        { value: 'gluten_free', label: 'Sem glúten' },
        { value: 'dairy_free', label: 'Sem lactose' },
        { value: 'other', label: 'Outras' },
      ],
      key: 'dietary_restrictions',
    },
    {
      question: 'Quantas refeições você faz por dia normalmente?',
      options: [
        { value: '1-2', label: '1-2 refeições' },
        { value: '3', label: '3 refeições' },
        { value: '4-5', label: '4-5 refeições' },
        { value: '6+', label: '6+ refeições' },
      ],
      key: 'meals_per_day',
    },
  ]

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value })
  }

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // Converter strings para números onde necessário
      const processedData = {
        ...answers,
        age: parseInt(answers.age || '0'),
        height: parseInt(answers.height || '0'),
        weight: parseInt(answers.weight || '0'),
      }
      onComplete(processedData)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const currentQuestion = questions[step]

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Pergunta {step + 1} de {questions.length}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>

      {currentQuestion.options ? (
        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.key, option.value)}
              className={`w-full text-left p-3 rounded-md border ${
                answers[currentQuestion.key] === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <input
          type={currentQuestion.type}
          min={currentQuestion.min}
          max={currentQuestion.max}
          value={answers[currentQuestion.key] || ''}
          onChange={(e) => handleAnswer(currentQuestion.key, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite aqui..."
        />
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={nextStep}
          disabled={!answers[currentQuestion.key] || answers[currentQuestion.key].trim() === ''}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {step === questions.length - 1 ? 'Finalizar' : 'Próximo'}
        </button>
      </div>
    </div>
  )
}