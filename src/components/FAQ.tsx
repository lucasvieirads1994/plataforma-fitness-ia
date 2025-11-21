'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Como funciona a IA de postura?',
      answer: 'Durante o treino, a câmera do seu dispositivo captura movimentos em tempo real. Nossa IA analisa articulações, calcula ângulos e detecta erros como coluna torta ou joelhos passando a linha, fornecendo feedback imediato.'
    },
    {
      question: 'O scanner nutricional é preciso?',
      answer: 'Usamos visão computacional avançada para identificar alimentos e estimar porções. A precisão é alta para itens comuns, mas recomendamos usar como guia complementar a um nutricionista.'
    },
    {
      question: 'Preciso de equipamento especial?',
      answer: 'Não! Tudo funciona no seu celular ou computador com câmera. Para treinos, você pode usar pesos caseiros ou apenas o peso corporal.'
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim! Oferecemos garantia de 30 dias e você pode cancelar quando quiser. Se não estiver satisfeito nos primeiros 7 dias grátis, não cobramos nada.'
    },
    {
      question: 'A plataforma funciona offline?',
      answer: 'Algumas funcionalidades básicas funcionam offline, mas a IA postural e scanner nutricional requerem conexão com internet para processamento em nuvem.'
    },
    {
      question: 'É seguro compartilhar dados pessoais?',
      answer: 'Sim, utilizamos criptografia de ponta e não compartilhamos seus dados com terceiros. Todas as informações são armazenadas de forma segura.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre nossa plataforma.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}