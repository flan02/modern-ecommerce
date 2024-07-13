import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  className?: string
}

const FadeBorder = ({ className }: Props) => {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 h-32 from-slate-100", className)} />
  )
}

export default FadeBorder