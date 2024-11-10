"use client"
import { Button } from 'components/ui/button'
import { SignInButton, SignedOut } from '@clerk/clerk-react'
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs'
import { BirdIcon, Icon,  Loader } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <header className='pb-2 border-b-4 font-bold '>
      <div className=' mx-auto flex items-center justify-between h-full bg-green-400 '>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3 text-lg font-black text-primary-foreground'>
          <Image 
            width={40} 
            height={40} 
            alt='plane' 
            src="/planeYellow1.png"
            style={{ width: 'auto', height: 'auto' }}
          />
          <p>
            Учитесь со мной
          </p>
        </div>

        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground'/>
        </ClerkLoading>
        <div className='p-4'>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton  mode='modal' >
                <Button  variant={"primary"}>Login</Button> {/* Изменить  variant  на  "primary" */}
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
}

