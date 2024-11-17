import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { Heart, InfinityIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ActiveCourse } from "app/models/Course";



interface UserProgressProps {
  activeCourse: ActiveCourse | null;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
  variant?: 'full' | 'compact';
}

export default function UserProgress({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
  variant = 'full',
}: UserProgressProps) {
  const isCompactView = variant === 'compact';

  if (!activeCourse) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex items-center justify-between gap-x-2 w-full'
    >
      {!isCompactView ? (
        <div className="bg-white rounded-lg shadow-sm p-4 w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-x-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-rose-500 font-bold">{hearts}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Image 
                src="/points/starBronze.png" 
                alt="Очки" 
                width={24} 
                height={24}
              />
              <span className="text-yellow-500 font-bold">{points}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Текущий курс:</h3>
            <div className="flex items-center gap-x-2">
              <Image 
                src={activeCourse.imageSrc} 
                alt={activeCourse.title} 
                width={32} 
                height={32} 
                className="rounded-md"
              />
              <span>{activeCourse.title}</span>
            </div>
            {activeCourse.level && (
              <span className="text-sm text-muted-foreground">
                Level: {activeCourse.level}
              </span>
            )}
          </div>
        </div>
      ) : (
        <Link href="/courses">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant={"ghost"}>
              <Image 
                className='rounded-md border' 
                width={32} 
                height={32} 
                src={activeCourse.imageSrc} 
                alt={activeCourse.title}
              />
            </Button>
          </motion.div>
        </Link>
      )}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className='flex items-center gap-x-2'
      >
        <motion.div whileHover={{ scale: 1.1 }} className='flex items-center gap-x-1'>
          <Heart className='h-5 w-5 text-rose-500' />
          <span className='text-rose-500'>{hearts}</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className='flex items-center gap-x-1'>
          <Image 
            src="/points.svg" 
            height={20} 
            width={20} 
            alt="Points" 
          />
          <span className='text-yellow-500'>{points}</span>
        </motion.div>
        {hasActiveSubscription && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          >
            <InfinityIcon className='h-5 w-5 text-green-500' />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}