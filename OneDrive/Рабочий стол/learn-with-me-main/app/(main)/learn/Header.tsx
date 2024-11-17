import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='sticky top-0 bg-white pb-3 lg:pt-[28px] flex items-center justify-between border-b-2 text-neutral-400 mb-5 z-50'
    >
      <Link href={"/courses"}>
        <motion.div
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="sm">
            <ArrowLeft className='h-5 w-5 stroke-2 mr-2' />
            Назад к курсам
          </Button>
        </motion.div>
      </Link>
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='font-bold text-lg text-green-600'
      >
        {title}
      </motion.h1>
      <div className="w-10"></div>
    </motion.div>
  )
}