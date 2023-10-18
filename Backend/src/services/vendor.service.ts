import { prisma } from "../../prisma/prismaClient"
import { VendorInput } from "../models/vendor.model"
import errorHandler from "../utils/errorHandler"


const getAllVendor = async () => {
    try {
        const technologies = await prisma.vendor.findMany({
            include: {
                Application: {
                    select: {
                        Application: true
                    }
                }
            }
        })
        return technologies
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const getAllVendorById = async (id: number) => {
    try {
        const vendor = await prisma.vendor.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                Application: {
                    select: {
                        Application: true
                    }
                }
            }
        })
        return vendor
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const addVendor = async (data: VendorInput) => {
    try {
        const newVendor = await prisma.vendor.create({
            data: data
        })

        return newVendor
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const assignVendor = async (vendorId: number, applicationId: number) => {
    try {
        const VendorApplication = await prisma.applicationVendor.create({
            data: {
                vendorId,
                applicationId
            }
        })

        return VendorApplication
    }
    catch (e: any) {
        errorHandler(e)
    }
}


export default {
    getAllVendor,
    getAllVendorById,
    addVendor,
    assignVendor
}


