import { Prisma, PrismaClient } from "@prisma/client"
import data from "./data.json"
import technologyService from "./src/services/technology.service"
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
    const a = await technologyService.getAllTechnology()
    console.log(a)
}

b()