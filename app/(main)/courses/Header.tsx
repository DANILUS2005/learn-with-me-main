import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    title: string
}

export default function Header({title}: Props) {
  return (
    <div className='sticky top-0 bg-white pb-3 lg:pt-[28px] flex items-center justify-between border-b-2 text-neutral-400 mb-5 lg:z-50 lg:mt-[-28px]'>
      <Link href={"/"}>
        <Button>
          <ArrowLeft className='h-5 w-5 stroke-2'/>
        </Button>
      </Link>
      <h1 className='font-bold text-lg'>
        {title}
      </h1>
      <div></div>
    </div>
  )
}