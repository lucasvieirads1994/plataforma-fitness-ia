import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { db } from '@/lib/db'

export async function GET() {
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
    const workouts = db.workouts.findByUserId(payload.userId)
    
    return NextResponse.json({
      workouts
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar treinos' },
      { status: 500 }
    )
  }
}

