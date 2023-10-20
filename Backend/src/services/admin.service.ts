import { prisma } from "../../prisma/prismaClient"
import { ApplicationInput } from "../models/application.modal"
import { TechnologyInput } from "../models/technology.modal"
import errorHandler from "../utils/errorHandler"


const approve = async (vendorId: number, applicationId: number) => {
    try {
        await prisma.applicationVendor.update({
            where: {
                vendorId_applicationId: {
                    vendorId,
                    applicationId
                }

            },
            data: {
                approved: true
            }
        })
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const getAll = async () => {
    try {
        const data = await prisma.applicationVendor.findMany({
            include : {
                Vendor :true,
                Application : true
            }
        })
        return data
    }
    catch (e: any) {
        errorHandler(e)
    }
}



export default {
    approve,
    getAll
}


