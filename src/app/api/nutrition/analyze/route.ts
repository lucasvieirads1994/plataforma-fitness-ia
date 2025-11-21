import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { db } from '@/lib/db'
import { analyzeFoodImage } from '@/lib/openai'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }
    
    const payload = await verifyToken(token)
    
    const { imageUrl } = await request.json()
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL da imagem obrigatória' },
        { status: 400 }
      )
    }
    
    // Analisar imagem com IA
    const analysis = await analyzeFoodImage(imageUrl)
    
    // Salvar no banco
    const meal = db.meals.create({
      userId: payload.userId,
      imageUrl,
      calories: analysis.calories,
      protein: analysis.protein,
      carbs: analysis.carbs,
      fat: analysis.fat,
      foods: analysis.foods,
      analysis: analysis.analysis
    })
    
    return NextResponse.json({
      success: true,
      meal
    })
  } catch (error) {
    console.error('Erro ao analisar comida:', error)
    return NextResponse.json(
      { error: 'Erro ao analisar imagem' },
      { status: 500 }
    )
  }
}

