import { cn } from "@/lib/utils"
import { Icons } from "@/components/custom/Icons"


type Props = {
  firstPhrase: string
  secondPhrase?: string
  underlinedPhrase?: string
  className?: string
}

const H2underline = ({ firstPhrase, secondPhrase, underlinedPhrase, className }: Props) => {
  return (
    <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900"> {firstPhrase}
      <span className={cn("relative pl-2 mr-1", className)}> {underlinedPhrase}
        <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-[#7C3AED]" />
      </span>  {secondPhrase} </h2>
  )
}

export default H2underline