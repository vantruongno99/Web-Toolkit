import { prisma } from "../../prisma/prismaClient"
import { VendorEdit, VendorInput, WebResponse } from "../models/vendor.model"
import errorHandler from "../utils/errorHandler"
import axios, { AxiosError } from "axios"

declare global {
    interface BigInt {
        toJSON(): string
    }
}

BigInt.prototype.toJSON = function () {
    return String(this)
}

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

const getABNDetail = async (ABN: number): Promise<string | undefined> => {
    try {

        const res = await axios.get(`https://abr.business.gov.au/json/AbnDetails.aspx?abn=${ABN}&callback=return&guid=965f1f18-d8b2-43cf-bbd2-3f883b733e17`)
        return res.data

    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw Error(error.response?.data.error)
        } else {
            console.log(error)

        }
    }
}

const ABNverify = (object: WebResponse): WebResponse => {
    try {
        if (object.Message === "Search text is not a valid ABN or ACN" || object.Message === "The GUID entered is not recognised as a Registered Party") {
            throw Error
        }
        return object
    }
    catch (e) {
        throw ({ name: 'ValidationError', message: { ABN: ["ABN is not valid"] } });
    }
}



const addVendor = async (data: VendorInput) => {
    try {
        const a: string | undefined = await getABNDetail(data.ABN)

        if (!a) {
            throw ({ name: 'ValidationError', message: { ABN: ["ABN serivce failed"] } });
        }

        const b = Function(a)

        const c = ABNverify(b())

        const newVendor = await prisma.vendor.create({
            data: {
                ...data,
                name: c.EntityName
            }
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
                showcase: input.showcase
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

const editVendor = async (id: number, data: VendorEdit) => {
    try {
        const newAppliction = await prisma.vendor.update({
            where: {
                id
            },
            data: data
        })

        return newAppliction
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
    getVendorByABN,
    editVendor
}


