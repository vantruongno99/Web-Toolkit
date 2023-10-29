import { Prisma, PrismaClient } from "@prisma/client"
import data from "./data.json"
import technologyService from "./src/services/technology.service"
import vendorService from "./src/services/vendor.service"
const prisma = new PrismaClient()

const a = async () => {
    for (const tech of data) {
        if (tech.technology == "Virtual Reality (VR)") {
            const apps = tech.potential.map(a => ({
                ...a,
                technologyId: 1
            }))


            await prisma.application.createMany({
                data:
                    apps
            }
            )



        }
    }
}

const b = async () => {
    try {
      await prisma.vendor.deleteMany()
    }
    catch (e) {
        console.log(e)
    }
}

b()