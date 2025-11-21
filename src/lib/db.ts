// Sistema simples de "banco de dados" em memória para desenvolvimento
// Em produção, substituir por Supabase ou banco real

export interface User {
  id: string
  email: string
  password: string // hash em produção
  createdAt: Date
}

export interface UserProfile {
  userId: string
  name: string
  age: number
  weight: number // kg
  height: number // cm
  gender: 'male' | 'female' | 'other'
  goal: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_fitness'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  dietaryRestrictions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Workout {
  id: string
  userId: string
  title: string
  description: string
  exercises: Exercise[]
  createdAt: Date
}

export interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  videoUrl?: string
  instructions: string
}

export interface MealAnalysis {
  id: string
  userId: string
  imageUrl: string
  calories: number
  protein: number
  carbs: number
  fat: number
  foods: string[]
  analysis: string
  createdAt: Date
}

// Storage in-memory
const users: User[] = []
const profiles: UserProfile[] = []
const workouts: Workout[] = []
const meals: MealAnalysis[] = []

// User functions
export const db = {
  users: {
    create: (email: string, password: string): User => {
      const user: User = {
        id: crypto.randomUUID(),
        email,
        password, // Em produção usar bcrypt
        createdAt: new Date()
      }
      users.push(user)
      return user
    },
    findByEmail: (email: string): User | undefined => {
      return users.find(u => u.email === email)
    },
    findById: (id: string): User | undefined => {
      return users.find(u => u.id === id)
    }
  },
  
  profiles: {
    create: (data: Omit<UserProfile, 'createdAt' | 'updatedAt'>): UserProfile => {
      const profile: UserProfile = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      profiles.push(profile)
      return profile
    },
    findByUserId: (userId: string): UserProfile | undefined => {
      return profiles.find(p => p.userId === userId)
    },
    update: (userId: string, data: Partial<UserProfile>): UserProfile | null => {
      const index = profiles.findIndex(p => p.userId === userId)
      if (index === -1) return null
      
      profiles[index] = {
        ...profiles[index],
        ...data,
        updatedAt: new Date()
      }
      return profiles[index]
    }
  },
  
  workouts: {
    create: (data: Omit<Workout, 'id' | 'createdAt'>): Workout => {
      const workout: Workout = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date()
      }
      workouts.push(workout)
      return workout
    },
    findByUserId: (userId: string): Workout[] => {
      return workouts.filter(w => w.userId === userId)
    }
  },
  
  meals: {
    create: (data: Omit<MealAnalysis, 'id' | 'createdAt'>): MealAnalysis => {
      const meal: MealAnalysis = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date()
      }
      meals.push(meal)
      return meal
    },
    findByUserId: (userId: string): MealAnalysis[] => {
      return meals.filter(m => m.userId === userId)
    }
  }
}

