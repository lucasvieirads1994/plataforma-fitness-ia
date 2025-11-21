import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateWorkoutPlan(profile: {
  goal: string
  activityLevel: string
  age: number
  weight: number
  height: number
  gender: string
}) {
  const goalMap: Record<string, string> = {
    lose_weight: 'perder peso e queimar gordura',
    gain_muscle: 'ganhar massa muscular e hipertrofia',
    maintain: 'manter o peso e a forma física',
    improve_fitness: 'melhorar o condicionamento físico'
  }

  const prompt = `Você é um personal trainer expert. Crie um plano de treino DETALHADO para uma pessoa com as seguintes características:

- Objetivo: ${goalMap[profile.goal] || profile.goal}
- Nível de atividade: ${profile.activityLevel}
- Idade: ${profile.age} anos
- Peso: ${profile.weight}kg
- Altura: ${profile.height}cm
- Gênero: ${profile.gender}

Crie um treino com 5-7 exercícios. Para cada exercício, retorne EXATAMENTE no formato JSON abaixo:

{
  "title": "Treino Personalizado - [Tipo]",
  "description": "Breve descrição do treino",
  "exercises": [
    {
      "name": "Nome do exercício",
      "sets": 3,
      "reps": "10-12",
      "rest": "60s",
      "instructions": "Instruções detalhadas de execução",
      "youtubeSearch": "nome do exercício em português para busca"
    }
  ]
}

IMPORTANTE: 
- Retorne APENAS o JSON, sem texto adicional
- Use exercícios apropriados para o nível e objetivo
- Inclua exercícios compostos e isolados
- Dê instruções claras de execução`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  })

  const content = completion.choices[0].message.content || '{}'
  
  try {
    // Extrair JSON do conteúdo
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    return JSON.parse(content)
  } catch (error) {
    console.error('Erro ao parsear resposta da IA:', error)
    throw new Error('Erro ao gerar treino')
  }
}

export async function searchYoutubeVideos(exerciseName: string) {
  const prompt = `Você precisa ajudar a encontrar vídeos no YouTube sobre o exercício: "${exerciseName}"

Retorne EXATAMENTE 3 termos de busca em português brasileiro que seriam ideais para encontrar vídeos tutoriais deste exercício no YouTube.

Formato de resposta (JSON):
{
  "searches": ["termo 1", "termo 2", "termo 3"]
}

IMPORTANTE: Retorne APENAS o JSON, sem texto adicional.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5
  })

  const content = completion.choices[0].message.content || '{}'
  
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0])
      return result.searches || []
    }
    return []
  } catch (error) {
    // Fallback
    return [`${exerciseName} como fazer`, `${exerciseName} tutorial`, `${exerciseName} execução correta`]
  }
}

export async function analyzeExecution(userInput: string) {
  const prompt = `Você é um personal trainer expert. Um aluno está pedindo ajuda com a execução de um exercício:

"${userInput}"

Forneça uma análise DETALHADA e útil sobre:
1. Como executar corretamente o exercício mencionado
2. Erros comuns a evitar
3. Dicas para melhor ativação muscular
4. Segurança e precauções

Seja específico, claro e motivador. Use emojis para deixar mais amigável.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  })

  return completion.choices[0].message.content || 'Não foi possível gerar análise.'
}

export async function analyzeFoodImage(imageUrl: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Analise esta imagem de comida e retorne EXATAMENTE no formato JSON:

{
  "foods": ["alimento 1", "alimento 2", ...],
  "calories": número estimado de calorias totais,
  "protein": gramas de proteína,
  "carbs": gramas de carboidratos,
  "fat": gramas de gordura,
  "analysis": "Análise nutricional detalhada e sugestões"
}

Seja preciso nas estimativas. RETORNE APENAS O JSON.`
          },
          {
            type: 'image_url',
            image_url: {
              url: imageUrl
            }
          }
        ]
      }
    ],
    max_tokens: 500
  })

  const content = completion.choices[0].message.content || '{}'
  
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    return JSON.parse(content)
  } catch (error) {
    console.error('Erro ao analisar imagem:', error)
    throw new Error('Erro ao analisar imagem de comida')
  }
}

