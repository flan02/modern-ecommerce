/* eslint-disable @next/next/no-img-element */
'use client'
import React, { HTMLAttributes, useRef } from "react"
import MaxWidthWrapper from "../reutilizable/MaxWidthWrapper"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import Phone from "./Phone"
import FadeBorder from "../reutilizable/FadeBorder"


type Review = {
  reviews: string[]
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  className?: string
}

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg"
]

function splitArray<T>(array: Array<T>, columns: any) {
  const result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    const index = i % columns
    if (!result[index]) result[index] = []
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }: Review) {
  const columnRef = useRef<HTMLDivElement | null>(null)
  const [columnHeight, setColumnHeight] = React.useState(0)
  const duration = `${columnHeight * msPerPixel}ms`

  // ? This useEffect handles the resize of the column when the window is resized
  React.useEffect(() => {
    if (!columnRef.current) return
    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })
    resizeObserver.observe(columnRef.current) // ? Observes the column

    return () => {
      resizeObserver.disconnect() // ? Disconnects the observer - cleanup
    }
  }, [])

  return (
    <div
      ref={columnRef} // ? Ref to the column that is being observed
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          imgSrc={imgSrc}
          className={reviewClassName?.(reviewIndex % reviews.length)} />
      ))}
    </div>)
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAY = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"]
  const animationDelay = POSSIBLE_ANIMATION_DELAY[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAY.length)]
  return (
    <div {...props} className={cn("animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5", className)} style={{ animationDelay }}>
      <Phone imgSrc={imgSrc} />
    </div>
  )
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })
  const columns = splitArray(PHONES, 3)
  const firstColumn = columns[0]
  const secondColumn = columns[1]
  const thirdColumn = splitArray(columns[2], 2) // ? Split the third column into 2 columns [][]

  return (<div
    ref={containerRef}
    className="grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh]">
    {
      isInView
        ? <>
          <ReviewColumn
            reviews={[...firstColumn, ...thirdColumn.flat(), ...secondColumn]}
            reviewClassName={(reviewIndex: number) =>
              cn({
                "md:hidden": reviewIndex >= firstColumn.length + thirdColumn[0].length,
                "lg:hidden": reviewIndex >= firstColumn.length
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            className="hidden md:block"
            reviews={[...secondColumn, ...thirdColumn[1]]}
            reviewClassName={(reviewIndex: number) => reviewIndex >= secondColumn.length ? "lg:hidden" : ""}
            msPerPixel={15}
          />
          <ReviewColumn
            className="hidden md:block"
            reviews={thirdColumn.flat()}
            reviewClassName={(reviewIndex: number) => reviewIndex >= secondColumn.length ? "lg:hidden" : ""}
            msPerPixel={10}
          />
        </>
        : null
    }
    <FadeBorder className="top-0 bg-gradient-to-b" />
    <FadeBorder className="bottom-0 bg-gradient-to-t" />

  </div>)
}

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        src="/what-people-are-buying.png" alt=""
        className="absolute select-none hidden xl:block -left-32 top-1/3" aria-hidden="true" />

      <ReviewGrid />
    </MaxWidthWrapper>
  )
}

export default Reviews