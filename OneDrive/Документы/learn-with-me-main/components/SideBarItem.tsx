"use client"
import ButtonsPage from '@/app/buttons/page'
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
type Props={
    label:string,
    iconSrc:string,
    href:string
}
export default function SideBarItem({
    label, iconSrc, href
}:Props) {
 const pathname = usePathname();
 
  return (
    <Button asChild className='justify-start h-[52px] w-full' variant={pathname===href?"sidebarOutline":"sidebar"}>
<Link href={href}>
<Image 
  width={32} 
  height={32} 
  alt='label' 
  src={iconSrc}
  style={{ width: 'auto', height: 'auto' }}
/> 
  <span className='ml-4'> {label}</span>
</Link>
    </Button>
  )
}
