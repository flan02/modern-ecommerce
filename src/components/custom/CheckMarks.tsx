import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import CheckElement from '../reutilizable/CheckElements'


const CheckMarks = () => {
  return (
    <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
      <CheckElement text="High-quality silicone material" />
      <CheckElement text="Sratch- and fingerprint resistant coating" />
      <CheckElement text="Wireless charging compatible" />
      <CheckElement text="5 year print warrantly" />

      <div className="flex justify-center ">
        <Link href="/configure/upload" className={buttonVariants({
          size: "lg",
          className: "mx-auto mt-8"
        })}>
          Create your case now <ArrowRight className="size-4 ml-1.5" /> {/* size-4 = h-4 w-4 */}
        </Link>
      </div>
    </ul>
  )
}

export default CheckMarks