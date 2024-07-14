'use client'
import { cn } from "@/lib/utils"
import { AspectRatio } from "../ui/aspect-ratio"
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'

type Props = {
  configId: string
  imgUrl: string
  imgDimensions: {
    width: number
    height: number
  }
}

const DesignConfigurator = ({ configId, imgUrl, imgDimensions }: Props) => {

  return (
    <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio ratio={896 / 1831} className="pointer-events-none relative w-full z-50 aspect-[896/1831]">
            <NextImage fill alt="phone Image" src="/phone-template.png" className="z-50 select-none pointer-events-none" />
          </AspectRatio>
          <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
          <div className={cn("absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]", `bg-zinc-950`)} />
        </div>
        <Rnd default={{ x: 150, y: 205, height: imgDimensions.height / 4, width: imgDimensions.width / 4 }} >
          <div className="relative size-full">
            <NextImage src={imgUrl} fill alt="your image" className="pointer-events-none" />
          </div>
        </Rnd>
      </div>
    </div>
  )
}

export default DesignConfigurator