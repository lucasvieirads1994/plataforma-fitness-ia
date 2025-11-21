import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { analyzeExecution } from '@/lib/openai'

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
    
    await verifyToken(token)
    
    const { question } = await request.json()
    
    if (!question) {
      return NextResponse.json(
        { error: 'Pergunta obrigatória' },
        { status: 400 }
      )
    }
    
    const analysis = await analyzeExecution(question)
    
    return NextResponse.json({
      analysis
    })
  } catch (error) {
    console.error('Erro na análise:', error)
    return NextResponse.json(
      { error: 'Erro ao analisar execução' },
      { status: 500 }
    )
  }
}

