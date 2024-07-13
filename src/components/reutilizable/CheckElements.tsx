import { Check } from "lucide-react"

type Props = {
  text: string
}

const CheckElement = ({ text }: Props) => {
  return (
    <li className="w-fit">
      <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
      {text}
    </li>
  )
}

export default CheckElement