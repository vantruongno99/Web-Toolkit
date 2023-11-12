import { Prisma, PrismaClient } from "@prisma/client"
import technologyService from "./src/services/technology.service"
import vendorService from "./src/services/vendor.service"
import dataService from "./src/services/data.service"
import userService from "./src/services/user.service"
const prisma = new PrismaClient()


const a = async () => {
  try {

    await userService.createUser({
        username : "admin",
        password : "12345678",
        role : "admin"
      
    })
  }
  catch (e) {
    console.log(e)
  }

}

a()