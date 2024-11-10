import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SideBarItem from './SideBarItem'
import { Button } from './ui/button'
import { ClerkLoaded, ClerkLoading, SignOutButton, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'

type Props=
{
    className?:string
}
export default function Sidebar({
    className
}:Props) {
  
  return (
    <div className={cn('flex flex-col px-4 left-0 top-0 border-r-2 h-full lg:w-[256px] lg:fixed', className)}>
<Link href="/">
<div className='pt-8 pl-4 pb-7 flex items-center gap-x-3 text-lg font-black text-primary-foreground'>

<Image 
  width={40} 
  height={40} 
  alt='plane' 
  src="/planeYellow1.png"
  style={{ width: 'auto', height: 'auto' }}
/>
<p className='text-green-400'>
Учись со мной
</p>
</div>
</Link>
<div>
<SideBarItem label="Learn" iconSrc="/icons/learn.png" href="/learn"/>
<SideBarItem label="Leader Board" iconSrc="/icons/leaderboard.png" href="/leaderboard"/>
<SideBarItem label="Quests" iconSrc="/icons/crest.png" href="/quests"/>
<SideBarItem label="Shop" iconSrc="/icons/shop.png" href="/shop"/>

</div>
<div className='p-4 mt-[100%]'>
    <ClerkLoading>
        <Loader className='h-5 w-5 text-muted-foreground animate-spin'/>
        
    </ClerkLoading>
    <ClerkLoaded>
        <UserButton afterSignOutUrl='/'/>
    </ClerkLoaded>
</div>
    </div>
  )
}
