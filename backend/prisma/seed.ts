import { PrismaClient } from '@prisma/client'
import userService from '../src/services/user.service';
const prisma = new PrismaClient()
async function main() {

    try {
        const user = await userService.createUser({
            username: "admin",
            password: "12345678",
            role: "admin",
        });
        console.log(user)
    }
    catch (e: any) {
        console.log(e)
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })