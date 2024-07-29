import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-20vh)]'>
      <h1 className='text-muted-foreground text-2xl px-4'>You need to be logged as an <span className='underline font-bold'>admin</span> to get access into Dashboard</h1>
    </div>
  )
}

export default NotFound