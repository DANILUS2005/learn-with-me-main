import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function StickyWrapper({children}: Props) {
  return (
    <div className='hidden lg:block w-[368px] self-end relative'>
      <div className='sticky top-6 flex flex-col gap-y-4'>
        {children}
      </div>
    </div>
  )
}