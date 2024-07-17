/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> { // ? Inherits all HTMLDivElement props
  // I don't need declare className, because is inherited from HTMLAttributes<HTMLDivElement>
  imgSrc: string
  dark?: boolean
}

const Phone = ({ className, imgSrc, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn("relative pointer-events-none z-50 overflow-hidden", className)}
      {...props}
    >
      <img
        src={dark
          ? '/phone-template-dark-edges.png'
          : '/phone-template-white-edges.png'}
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />
      <div className="absolute -z-10 inset-0">
        <img
          src={imgSrc}
          alt="overlaying phone image"
          className='object-cover min-w-full min-h-full'
        />
      </div>
    </div>
  )
}

export default Phone