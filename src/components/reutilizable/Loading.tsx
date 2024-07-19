import { Loader2 } from 'lucide-react'


type Props = {
  className?: string
  status: string
  response: string
}

const Loading = (props: Props) => {
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">{props.status}</h3>
        <p>{props.response}</p>
      </div>
    </div>
  )
}

export default Loading