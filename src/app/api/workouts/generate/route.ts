import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { db } from '@/lib/db'
import { generateWorkoutPlan, searchYoutubeVideos } from '@/lib/openai'

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
    const profile = db.profiles.findByUserId(payload.userId)
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Perfil não encontrado. Complete o quiz primeiro.' },
        { status: 404 }
      )
    }
    
    // Gerar treino com IA
    const workoutPlan = await generateWorkoutPlan({
      goal: profile.goal,
      activityLevel: profile.activityLevel,
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
      gender: profile.gender
    })
    
    // Para cada exercício, buscar vídeos
    const exercisesWithVideos = await Promise.all(
      workoutPlan.exercises.map(async (exercise: any) => {
        const searchTerms = await searchYoutubeVideos(exercise.youtubeSearch || exercise.name)
        return {
          ...exercise,
          videoSearchTerms: searchTerms
        }
      })
    )
    
    // Salvar no "banco"
    const workout = db.workouts.create({
      userId: payload.userId,
      title: workoutPlan.title,
      description: workoutPlan.description,
      exercises: exercisesWithVideos
    })
    
    return NextResponse.json({
      success: true,
      workout
    })
  } catch (error) {
    console.error('Erro ao gerar treino:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar treino' },
      { status: 500 }
    )
  }
}

