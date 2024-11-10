"use client"
import { courses, userProgress } from '@/db/schema'
import React, { useTransition } from 'react'
import Card from './Card'
import { useRouter } from 'next/navigation'
import { upsertUserProgress } from '@/actions/user-progress'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

type Props ={
    courses: typeof courses.$inferSelect[],
    activeCourseId?:typeof userProgress.$inferSelect.activeCourseId
}

function List({courses, activeCourseId}:Props) {
  const router = useRouter();
  const [pending, startTransition]= useTransition();
  
  const onClick=(id:number)=>{
    if (pending)return;
    if(id===activeCourseId)
      {
         return router.push('/learn')
      }
      startTransition(()=>{
        upsertUserProgress(id).catch(()=>{
          toast.error("Something went wrong!")
        });
      })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'
    >
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
        >
          <Card
            id={course.id}
            title={course.title}
            imgSrc={course.imageSrc}
            onClick={() => onClick(course.id)}
            disabled={pending}
            active={course.id === activeCourseId}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default List