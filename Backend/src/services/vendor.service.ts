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

const getVendorById = async (id: number) => {
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

const getVendorByABN = async (ABN: number) => {
    try {
        const vendor = await prisma.vendor.findFirstOrThrow({
            where: {
                ABN: ABN
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

const assignVendor = async (applicationId: number, vendorId: number, input: { showcase: string }) => {
    try {
        const VendorApplication = await prisma.applicationVendor.create({
            data: {
                vendorId,
                applicationId,
                showcase : input.showcase
            }
        })

        return VendorApplication
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const getApplicationByVendorId = async (vendorId: number) => {
    try {
        const VendorApplication = await prisma.applicationVendor.findMany({
            where: {
                vendorId
            },
            include: {
                Vendor: true,
                Application: true
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
    getVendorById,
    addVendor,
    assignVendor,
    getApplicationByVendorId,
    getVendorByABN
}


