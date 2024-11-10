// app/(main)/learn/page.tsx
"use client"

import React from 'react'
import Header from './Header'
import UserProgress from '@/components/UserProgress'
import { useRouter } from 'next/navigation'
import LessonContent from './LessonContent';
import { motion } from 'framer-motion'
import { fetchUserProgress } from '@/app/actions/user-progress'
import type { UserProgressType } from '@/db/queries'

export default function Learn() {
  const router = useRouter()
  const [userProgress, setUserProgress] = React.useState<UserProgressType | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadProgress = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const progress = await fetchUserProgress()
        
        if (!progress || !progress.activeCourse) {
          console.log("Нет активного курса, перенаправление...")
          router.push('/courses')
          return
        }
        
        setUserProgress(progress)
      } catch (error) {
        console.error("Ошибка при загрузке прогресса:", error)
        setError("Не удалось загрузить данные урока")
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [router])

  if (isLoading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => router.push('/courses')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Вернуться к курсам
          </button>
        </div>
      </div>
    )
  }

  if (!userProgress || !userProgress.activeCourse) {
    return null 
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4"
    >
      <Header title={userProgress.activeCourse.title} />
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:w-3/4"
        >
          <LessonContent courseId={userProgress.activeCourse.id} />
        </motion.div>
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:w-1/4"
        >
          <UserProgress 
            activeCourse={userProgress.activeCourse} // Убедитесь, что userProgress определен
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={userProgress.hasActiveSubscription}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}