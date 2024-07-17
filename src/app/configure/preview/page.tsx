"use server"
import DesignPreview from "@/components/custom/DesignPreview"
import { db } from "@/db"
import { notFound } from "next/navigation"


type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined // ? [key: string]: string -> It means that the key must be string and the value must be string
  }
}

const PreviewPage = async ({ searchParams }: Props) => {
  const { id } = searchParams
  if (!id || typeof id !== 'string') return notFound()
  const config = await db.configuration.findUnique({
    where: { id }
  })
  if (!config) return notFound()

  return <DesignPreview configuration={config} />

}

export default PreviewPage