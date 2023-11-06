import { Prisma, PrismaClient } from "@prisma/client"
import technologyService from "./src/services/technology.service"
import vendorService from "./src/services/vendor.service"
import dataService from "./src/services/data.service"
const prisma = new PrismaClient()

const b = async () => {
  try {
    await prisma.vendor.deleteMany()
  }
  catch (e) {
    console.log(e)
  }
}






const a = async () => {
  try {

    await dataService.budgetDelete("Testy")
  }
  catch (e) {
    console.log(e)
  }

}

a()