/* eslint-disable jsx-a11y/alt-text */
"use client"

import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useTransition } from "react"
import Dropzone, { FileRejection } from "react-dropzone"


type Props = {}

const ConfigurePage = (props: Props) => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
  const [isPending, startTransition] = useTransition() // ? [boolean, callback]
  const router = useRouter()

  type UploadProgressValue = number // ? This fc will control the value of the progress bar is a number between 0 and 100
  const [uploadProgress, setUploadProgress] = React.useState<UploadProgressValue>()
  const updateUploadProgress = (value: UploadProgressValue) => {
    if (value < 0) {
      setUploadProgress(0);
    } else if (value > 100) {
      setUploadProgress(100);
    } else {
      setUploadProgress(value);
    }
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        // This loading state occurs while the user is being redirected to the next page
        router.push(`/configure/design?id=${configId}`) // ? Redirect to a dynamic route [/configure/design/${configId}]
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p) // Updating the progress bar while file is being uploaded
    }
  })

  const onDropAccepted = (acceptedFiles: File[]) => { // * Interface from Javascript
    //console.log("Image Accepted");
    startUpload(acceptedFiles, { configId: undefined }) // ? 2nd param I defined it as optional that's why I used UNDEFINED
    setIsDragOver(false) // ? This will remove the drag over effect. Because the image is successfully accepted.
  }
  const onDropRejected = (rejectedFiles: FileRejection[]) => { // * Interface provided by react-dropzone
    const [file] = rejectedFiles
    setIsDragOver(false) // ? Dragging animation should be done
    toast({
      title: `${file.file.type} is not supported`,
      description: "Please choose a PNG, JPEG, or JPG image",
      variant: "destructive"
    })
  }
  return (
    <div className={cn("relative size-full flex-1 my-16 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center", {
      "ring-blue-900/25 bg-blue-900/10": isDragOver
    })}>
      <div className="relative flex flex-col flex-1 items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"]
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col flex-1 items-center justify-center size-full">
              <input {...getInputProps()} />
              {
                isDragOver
                  ? <MousePointerSquareDashed className="size-6 text-zinc-500 mb-2" />
                  : isUploading || isPending
                    ? <Loader2 className="animate-spin size-6 text-zinc-500 mb-2" />
                    : <Image className="size-6 text-zinc-500 mb-2" />
              }
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {
                  isUploading
                    ? <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                      <Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-gray-300" />
                    </div>
                    : isPending
                      ? <div className="flex flex-col items-center">
                        <p>Redirecting, please wait...</p>
                      </div>
                      : isDragOver
                        ? <p><span className="font-semibold">Drop File</span> to upload</p>
                        : <p><span className="font-semibold">Click to upload</span> or drag and drop</p>
                }
              </div>
              {
                isPending
                  ? null
                  : <p className="text-xs text-zinc-500">PNG, JPEG, JPG</p>
              }
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default ConfigurePage