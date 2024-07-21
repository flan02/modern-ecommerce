'use client'
import { cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "../ui/aspect-ratio"
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import ResizeHandleComponent from "./ResizeHandleComponent"
import { ScrollArea } from "../ui/scroll-area"
import { RadioGroup } from "@headlessui/react"
import React from "react"
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator"
import { Label } from "../ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react"
import { BASE_PRICE } from "@/config/products"
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "../ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import { iphoneCase } from "@/app/configure/design/action"
import { saveConfig as _saveConfig } from "@/app/configure/design/action"
import { useRouter } from "next/navigation"

type Dimension = {
  width: number
  height: number
}

type Coord = {
  x: number
  y: number
}

type Props = {
  configId: string
  imgUrl: string
  imgDimensions: Dimension
  //imgDimensions: Pick<Dimension, 'width' | 'height'> 
}


interface IiphoneCase {
  // ? [number] tells us that we only want to use the index of the array or object
  color: (typeof COLORS)[number]
  model: (typeof MODELS.options)[number]
  material: (typeof MATERIALS.options)[number]
  finish: (typeof FINISHES.options)[number]
}

function base64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })

}

const DesignConfigurator = ({ configId, imgUrl, imgDimensions }: Props) => {
  const { toast } = useToast()
  const router = useRouter()

  // ? This is the mutation hook that we use to save the model that users have chosen
  const { mutate, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (iphone: iphoneCase) => {
      await Promise.all([saveConfig(), _saveConfig(iphone)]) // TODO this two fc will be executed when I called the mutate function
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`)
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again',
        variant: 'destructive'
      })
    }
  })



  const standardOpts: IiphoneCase = {
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  }
  const [options, setOptions] = React.useState<IiphoneCase>(standardOpts)
  const [renderedDimension, setRenderedDimension] = React.useState<Dimension>({
    width: imgDimensions.width / 4,
    height: imgDimensions.height / 4
  })
  const [renderedPosition, setRenderedPosition] = React.useState<Coord>({ x: 150, y: 205 })
  const phoneCaseRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { startUpload } = useUploadThing('imageUploader') // $ This hook is provided by the uploadthing library

  async function saveConfig() {
    // if (!phoneCaseRef.current) return -> This is a guard clause, it will return if the phoneCaseRef.current is null. But isn't ideal in this case
    try {
      const { left: caseLeft, top: caseTop, width, height }: DOMRect = phoneCaseRef.current!.getBoundingClientRect(); // ? getBoundingClientRect() returns the size of the element and its position relative to the viewport
      const { left: divLeft, top: divTop }: Omit<DOMRect, 'width' | 'height'> = containerRef.current!.getBoundingClientRect(); // ? getBoundingClientRect() returns the size of the element and its position relative to the viewport
      //const { top: divTop, left: divLeft }: Pick<DOMRect, 'left' | 'top'> = containerRef.current!.getBoundingClientRect(); // ? Another way to do it using Pick instead Omit.

      const leftOffSet = caseLeft - divLeft // * This is the offset of the phone case from the left of the container
      const topOffSet = caseTop - divTop // * This is the offset of the phone case from the top of the container
      const currentX = renderedPosition.x - leftOffSet // * This is the current x position of the image 
      const currentY = renderedPosition.y - topOffSet // * This is the current y position of the image
      const canvas: HTMLCanvasElement = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      // TODO step1: draw the user image on the canvas
      const userImage = new Image()
      userImage.crossOrigin = 'anonymous'
      userImage.src = imgUrl
      await new Promise((resolve) => (userImage.onload = resolve))
      ctx?.drawImage(
        userImage,
        currentX,
        currentY,
        renderedDimension.width,
        renderedDimension.height
      )
      // ? we need to exporting the canvas to a base64 image (as string)
      const base64 = canvas.toDataURL()
      // console.log(base64);
      const base64Data = base64.split(',')[1] // $ [0] : data/image.format, [1] : base64 string
      // ? before sending the image to the server, we need to convert it to a blob image
      const blob = base64ToBlob(base64Data, 'image/png')
      const croppedImageName = `${configId}-cropped.png`
      const file = new File([blob], croppedImageName, { type: 'image/png' })

      await startUpload([file], { configId }) // ? We may send an array of files to the server  [file, file2, file3, ...fileN]

      // TODO step2: crop it
    } catch (error) {
      //console.error(error)
      toast({
        title: 'Something went wrong',
        description: 'An error occurred while saving the configuration',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] mb-4 overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          { /* This is the actual container for the phone case */}
          <AspectRatio
            ratio={896 / 1831} className="pointer-events-none relative w-full z-50 aspect-[896/1831]"
            ref={phoneCaseRef}
          >
            <NextImage fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="phone Image" src="/phone-template.png" className="z-50 select-none pointer-events-none" />
          </AspectRatio>
          { /* *************************************** */}

          <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
          <div className={cn("absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]", `bg-${options.color.tw}`)} /> {/* it changes the phone case in real time depending on what color we choose.  */}
        </div>
        <Rnd
          default={{ x: 150, y: 205, height: imgDimensions.height / 4, width: imgDimensions.width / 4 }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomLeft: <ResizeHandleComponent />,
            bottomRight: <ResizeHandleComponent />,
            topLeft: <ResizeHandleComponent />,
            topRight: <ResizeHandleComponent />,
          }}
          className="absolute z-20 border-[3px] border-primary"
          onResizeStop={(_, __, ref: HTMLElement, ___, { x, y }: Coord) => {
            setRenderedDimension({
              width: parseInt(ref.style.width.slice(0, -2)), // ? slice(0, -2) removes the px from the string
              height: parseInt(ref.style.height.slice(0, -2))
            })
            setRenderedPosition({ x, y })
          }}
          onDragStop={(_, data: Coord) => {
            const { x, y } = data
            setRenderedPosition({ x, y }) // ? {x,y} is the data that we get from the onDragStop event
          }}
        >
          <div className="relative size-full">
            <NextImage src={imgUrl} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill alt="your image" className="pointer-events-none" />
          </div>
        </Rnd>
      </div>
      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div aria-hidden="true" className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none" />
          <div className="px-8 pb-12 pt-8 ">
            <h2 className="tracking-tight font-bold text-3xl">Customize your case</h2>
            <div className="w-full h-px bg-zinc-200 my-6" />
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">

                <RadioGroup value={options.color} onChange={(val) => {
                  setOptions((prev) => ({
                    ...prev,
                    color: val
                  }))
                }}
                >
                  <Label >
                    Color: {options.color.label}
                    <div className="mt-3 flex items-center space-x-3">
                      {COLORS.map((color) => (
                        <RadioGroup.Option
                          key={color.label}
                          value={color}
                          className={({ active, checked }) => cn("relative -m-0.5 p-0.5 flex items-center justify-center rounded-full cursor-pointer active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: active || checked
                            }
                          )}
                        >
                          <span className={cn(`bg-${color.tw}`, "size-8 rounded-full border border-black border-opacity-10")} />
                        </RadioGroup.Option>))}
                    </div>
                  </Label>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                  <Label className="">Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between">
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          className={cn("flex text-sm gap-1 items-center p-1.5 cursor-default ",
                            {
                              "bg-zinc-100": model.label === options.model.label
                            }
                          )}
                          key={model.label}
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              model
                            }))
                          }}
                        >
                          <Check className={cn("mr-2 size-4",
                            model.label === options.model.label
                              ? "opacity-100"
                              : "opacity-0"
                          )} />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {
                  [MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(value) => {
                        setOptions((prev) => ({
                          ...prev, // ? spread operator to copy the previous state
                          // [name] is a dynamic key, it will be either material or finish
                          [name]: value // ? set the new value
                        }))
                      }}
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="mt-3 space-y-4">
                        {
                          selectableOptions.map((option) => (
                            <RadioGroup.Option
                              key={option.value} value={option}
                              className={({ active, checked }) => cn("relative sm:flex sm:justify-between block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm active:ring-0 ring-0 outline-none focus:ring-0 focus:outline-none border-2 border-zinc-200", {
                                "border-primary": active || checked
                              })}
                            >
                              <span className="flex items-center">
                                <span className="flex flex-col text-sm">
                                  <RadioGroup.Label as="span" className="font-medium text-gray-900">
                                    {option.label}
                                  </RadioGroup.Label>
                                  {
                                    option.desc
                                      ? (
                                        <RadioGroup.Description as="span" className="text-gray-500">
                                          <span className="block sm:inline">
                                            {option.desc}
                                          </span>
                                        </RadioGroup.Description>
                                      )
                                      : null
                                  }
                                </span>
                              </span>
                              <RadioGroup.Description as="span" className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                                <span className="font-medium text-gray-900">
                                  {formatPrice(option.price / 100)}
                                </span>
                              </RadioGroup.Description>
                            </RadioGroup.Option>
                          ))}
                      </div>
                    </RadioGroup>
                  ))
                }
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="size-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
              </p>
              <Button size="sm" className="w-full"
                onClick={() => mutate({
                  color: options.color.value,
                  finish: options.finish.value,
                  material: options.material.value,
                  model: options.model.value,
                  configId
                })}
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
              >
                Continue
                <ArrowRight className="size-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default DesignConfigurator