import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { signToken } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Validação
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }
    
    // Buscar usuário
    const user = db.users.findByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }
    
    // Verificar senha (em produção usar bcrypt.compare)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }
    
    // Gerar token
    const token = await signToken({
      userId: user.id,
      email: user.email
    })
    
    // Retornar resposta com cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email
      }
    })
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    })
    
    return response
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    )
  }
}

