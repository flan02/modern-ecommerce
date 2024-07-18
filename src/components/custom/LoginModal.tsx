import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import StarPurple from "./StarPurple"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { buttonVariants } from "../ui/button"

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> // (isOpen: boolean) => void
}

const LoginModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-[99]" aria-describedby="undefined">
        <DialogHeader >
          <div className="flex relative mx-auto size-max-w-prose mb-2">
            <p className="text-lg">star<span className="text-purple-500">purple</span></p>
            <StarPurple className="size-5 ml-1 mt-1" />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900" >
            Log in to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-900"> Your configuration was saved! </span>
            <br />
            Please login or create an account to complete your purchase
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <LoginLink className={buttonVariants({
            variant: "outline",
            className: "hover:border hover:border-purple-500",
          })}
          >
            Login
          </LoginLink>
          <RegisterLink className={buttonVariants({
            variant: "default",
            className: "",
          })}>
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal