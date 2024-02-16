import { prisma } from "./prisma/prismaClient";

const a = async () => {
    const r = await prisma.participation.findMany(
        
    )

    console.log(r)
}

a()