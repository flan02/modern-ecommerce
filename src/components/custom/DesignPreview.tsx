'use client'
import React from 'react'
import Confetti from 'react-dom-confetti'
import Phone from './Phone'
import { Configuration } from '@prisma/client'
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/option-validator'
import { cn, formatPrice } from '@/lib/utils'
import { ArrowRight, Check } from 'lucide-react'
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { Button } from '../ui/button'

type Props = {
  configuration: Configuration
}

const DesignPreview = ({ configuration }: Props) => {
  const [showConfetti, setShowConfetti] = React.useState(false)
  const { color, model, finish, material } = configuration
  const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw
  const { label, value } = MODELS.options.find(({ value }) => value === model)!

  let totalPrice = BASE_PRICE
  if (finish === FINISHES.options[0].value) totalPrice += PRODUCT_PRICES.finish.smooth
  if (finish === FINISHES.options[1].value) totalPrice += PRODUCT_PRICES.finish.textured
  if (material === MATERIALS.options[0].value) totalPrice += PRODUCT_PRICES.material.silicone
  if (material === MATERIALS.options[1].value) totalPrice += PRODUCT_PRICES.material.polycarbonate
  if (material === MATERIALS.options[2].value) totalPrice += PRODUCT_PRICES.material.leather

  React.useEffect(() => setShowConfetti(true), [])
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
        <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
      </div>
      <div className="grid grid-cols-1 px-16 sm:px-0 text-sm sm:grid-cols-2 lg:grid-cols-12 md:gap-x-8 lg:gap-x-12 mt-20 mb-8">
        <div className="md:col-span-4 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(`bg-${tw}`)}
            imgSrc={configuration.croppedImageUrl!} />
        </div>
        <div className="mt-2 md:col-span-9 md:row-end-1">
          <h3 className='pl-4 md:pl-0 text-center sm:text-start text-2xl mt-8 sm:mt-0 sm:text-3xl font-bold tracking-tight text-gray-900'>Your {label} case</h3>
          <div className="mt-3 w-full flex justify-center md:justify-start items-center gap-1.5 text-base pl-4 md:pl-0">
            <Check className="size-4 text-green-500" />
            <span className=''>In stock and ready to ship</span>
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10 gap-y-8 border-b border-gray-200 py-8">
            <div>
              <p className='font-black text-zinc-950'>Highlights</p>
              <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made form recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className='font-black text-zinc-950'>Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className='mt-8 '>
            <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
              <div className="flow-root text-sm">
                <div className='flex items-center justify-between py-1 mt-2'>
                  <p className='text-gray-600'>Base price</p>
                  <p className='font-medium text-gray-900'>
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {
                  finish === FINISHES.options[0].value || finish === FINISHES.options[1].value
                    ? <div className='flex items-center justify-between py-1 mt-2'>
                      <p className='text-gray-600'>{`Finish ${finish}`}</p>
                      <p className='font-medium text-gray-900'>
                        {formatPrice(finish === FINISHES.options[0].value
                          ? (PRODUCT_PRICES.finish.smooth / 100)
                          : (PRODUCT_PRICES.finish.textured / 100)
                        )}
                      </p>
                    </div>
                    : null
                }
                {
                  material === MATERIALS.options[0].value || material === MATERIALS.options[1].value || material === MATERIALS.options[2].value
                    ? <div className='flex items-center justify-between py-1 mt-2'>
                      <p className='text-gray-600'>{`Soft ${material} material`}</p>
                      <p className='font-medium text-gray-900'>
                        {formatPrice(material === MATERIALS.options[0].value
                          ? (PRODUCT_PRICES.material.silicone / 100)
                          : material === MATERIALS.options[1].value
                            ? (PRODUCT_PRICES.material.polycarbonate / 100)
                            : (PRODUCT_PRICES.material.leather / 100)
                        )}
                      </p>
                    </div>
                    : null
                }
                <div className="my-2 h-px bg-gray-200" />
                <div className="flex items-center justify-between py-2">
                  <p className='font-semibold text-gray-900'>Order total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end pb-12">
              <Button className='px-4 sm:px-6 lg:px-8'>Check out <ArrowRight className='size-4 ml-1.5 inline' /> </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview