import { prisma } from "../../prisma/prismaClient"
import { ApplicationInput } from "../models/application.modal"
import { TechnologyInput } from "../models/technology.modal"
import errorHandler from "../utils/errorHandler"


declare global {
    interface BigInt {
      toJSON(): string
    }
  }

BigInt.prototype.toJSON = function () {
    return String(this)
}


const getAllApplication = async () => {
    try {
        const applications = await prisma.application.findMany({
            include: {
                Vendor:
                {
                    select: {
                        Vendor: true
                    }
                }
            }
        })
        return applications
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const getApplicationById = async (id: number) => {
    try {
        const applications = await prisma.application.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                Vendor:
                {
                    include: {
                        Vendor: true
                    }
                }
            }

        })
        return applications
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const addApplication = async (data: ApplicationInput) => {
    try {
        const newAppliction = await prisma.application.create({
            data: data
        })

        return newAppliction
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const deleteApplication = async (id: number) => {
    try {
        await prisma.application.delete({
            where: {
                id: id
            },
        })
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const editApplication = async (data: ApplicationInput, id: number) => {
    try {
        const newAppliction = await prisma.application.update({
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
    getAllApplication,
    getApplicationById,
    addApplication,
    deleteApplication,
    editApplication
}


