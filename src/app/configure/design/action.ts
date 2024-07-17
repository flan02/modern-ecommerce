"use server"

import { db } from "@/db"
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client"

export type iphoneCase = {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
}

export async function saveConfig(iphone: iphoneCase) {
  await db.configuration.update({
    where: {
      id: iphone.configId
    },
    data: {
      color: iphone.color,
      finish: iphone.finish,
      material: iphone.material,
      model: iphone.model
    }
  })
}
