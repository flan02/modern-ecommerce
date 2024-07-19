/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//? $Enums is a variable that allows you to use all same type enums from Prisma 
import { CaseColor, $Enums } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { AspectRatio } from '../ui/aspect-ratio'


type Props = {
  croppedImageUrl: string
  color: CaseColor // - $Enums.CaseColor
}

const PhonePreview = ({ croppedImageUrl, color }: Props) => {
  // ? Render width of the phone - how large is the phone image is determined on how large is the page width screen size on the user device
  const ref = useRef<HTMLDivElement>(null)

  // ? Rendered dimensions of the "iphone image" dinamically depending on the screen size
  const [renderedDimensions, setRenderedDimensions] = useState<Pick<DOMRect, "width" | "height">>({
    height: 0,
    width: 0,
  })

  const handleResize = () => {
    if (!ref.current) return // guard clause to prevent errors
    const { width, height } = ref.current.getBoundingClientRect()
    setRenderedDimensions({ width, height })
  }

  useEffect(() => {
    handleResize() // ? Fc that renders the dimensions of the iphone image. It keeps track of the width and height of the image (hold same ratio)
    window.addEventListener('resize', handleResize) // ? We want to run this effect when the component mounts indeed when users resize the screen
    return () => window.removeEventListener('resize', handleResize) // ? Unmount the event listener with its function associated.
  }, [ref.current]) // ? We only want to run this effect when the ref.current value changes

  let caseBackgroundColor = 'bg-zinc-950'
  if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
  if (color === 'purple') caseBackgroundColor = 'bg-purple-950'
  if (color === 'green') caseBackgroundColor = 'bg-green-950'

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className='relative'>
      <div
        className='absolute z-20 scale-[1.0352]'
        style={{
          left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}>
        <img
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            'phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',
            caseBackgroundColor
          )}
          src={croppedImageUrl}
          alt='phone case'
        />
      </div>

      <div className='relative h-full w-full z-40'>
        <img
          alt='phone'
          src='/clearphone.png'
          className='pointer-events-none h-full w-full antialiased rounded-md'
        />
      </div>
    </AspectRatio>
  )
}

export default PhonePreview