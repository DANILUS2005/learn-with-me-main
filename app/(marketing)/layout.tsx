import React from 'react'
import Header from './header'
import Footer from './footer'

export default function MarketingLayout({children}: {
    children:React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col '>
      <Header></Header>
<main className='  flex-1 flex flex-col justify-center items-center'>
{children}
</main>

<Footer></Footer>

    </div>
  )
}
