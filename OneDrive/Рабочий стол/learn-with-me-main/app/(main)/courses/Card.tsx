
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  id: number;
  title: string;
  imgSrc: string;
  description?: string;
  level?: string;
  onClick: (id: number) => void;
  disabled: boolean;
  active: boolean;
}

export default function Card({
  id,
  title,
  imgSrc,
  description,
  level,
  disabled,
  active,
  onClick
}: Props) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]", 
        disabled && "pointer-events-none opacity-50"
      )} 
      onClick={() => onClick(id)}
    >
      <div className='min-h-[24px] w-full flex items-center justify-end'>
        {active && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='rounded-md bg-green-600 flex items-center justify-center p-1.5'
          >
            <Check className='text-white stroke-[4] h-4 w-4'/>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center"
      >
        <Image 
          alt='flag' 
          src={imgSrc} 
          width={93.33} 
          height={70}
          style={{ width: 'auto', height: 'auto' }}
          className='rounded-lg drop-shadow-md'
        />
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          {title}
        </motion.h3>

        {description && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            {description}
          </p>
        )}
        
        {level && (
          <span className="text-xs text-muted-foreground mt-1">
            {level}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}