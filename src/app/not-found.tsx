import { LockIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center h-[calc(100vh-20vh)]'>
      <LockIcon className='lg:mb-0 mb-8 size-12' />
      <h1 className='text-muted-foreground text-2xl px-4'>You need to be logged as an <span className='underline font-bold'>admin</span> to get access into Dashboard</h1>
    </div>
  )
}

export default NotFound