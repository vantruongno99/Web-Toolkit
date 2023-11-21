import { Prisma, PrismaClient } from "@prisma/client"
import technologyService from "./src/services/technology.service"
import vendorService from "./src/services/vendor.service"
import dataService from "./src/services/data.service"
import userService from "./src/services/user.service"
const prisma = new PrismaClient()


const a = async () => {
  try {
    const b = await vendorService.getAllVendor()
    console.log(b)
  }
  catch (e) {
    console.log(e)
  }

}

a()