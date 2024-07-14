import DesignConfigurator from "@/components/custom/DesignConfigurator"
import { db } from "@/db"
import { notFound } from "next/navigation"

interface IServerProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}


const DesignPage = async ({ searchParams }: IServerProps) => {
  const { id } = searchParams
  // make db call
  if (!id || typeof id !== 'string') return notFound()
  const config = await db.configuration.findUnique({
    where: { id }
  })
  if (!config) return notFound()
  const { imageUrl, width, height } = config

  return (
    <DesignConfigurator configId={config.id} imgUrl={imageUrl} imgDimensions={{ width, height }} />
  )
}

export default DesignPage