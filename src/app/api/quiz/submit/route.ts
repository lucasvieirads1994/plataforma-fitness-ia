import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { db } from '@/lib/db'

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
    const data = await request.json()
    
    // Validação
    if (!data.name || !data.age || !data.weight || !data.height || !data.gender || !data.goal || !data.activityLevel) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }
    
    // Criar/atualizar perfil
    const existingProfile = db.profiles.findByUserId(payload.userId)
    
    if (existingProfile) {
      db.profiles.update(payload.userId, {
        name: data.name,
        age: data.age,
        weight: data.weight,
        height: data.height,
        gender: data.gender,
        goal: data.goal,
        activityLevel: data.activityLevel,
        dietaryRestrictions: data.dietaryRestrictions || []
      })
    } else {
      db.profiles.create({
        userId: payload.userId,
        name: data.name,
        age: data.age,
        weight: data.weight,
        height: data.height,
        gender: data.gender,
        goal: data.goal,
        activityLevel: data.activityLevel,
        dietaryRestrictions: data.dietaryRestrictions || []
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar quiz:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar dados' },
      { status: 500 }
    )
  }
}

