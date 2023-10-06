import { Prisma, PrismaClient } from "@prisma/client"
import data from "./data.json"
const prisma = new PrismaClient()

const a = async () => {
    for (const tech of data){
        await prisma.
    }
}

a()