import MobileHeader from '@/components/MobileHeader';
import Sidebar from '@/components/sidebar';
import React from 'react'

export default function LearnLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {
  return (
   <>
   <MobileHeader/>
   <Sidebar className='hidden lg:block'/>
   <main className='lg:pl-[256px]  h-full pt-[50px] lg:pt-0'>
<div style={{
    height:"100vh"
}} className='vh-100 mx-auto max-w-[1056px]'>
{children}
</div>
   </main>
   </>
  )
}
