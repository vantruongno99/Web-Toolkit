import { prisma } from "../../prisma/prismaClient"
import { ApplicationInput } from "../models/application.modal"
import { TechnologyInput } from "../models/technology.modal"
import errorHandler from "../utils/errorHandler"


const getAllApplication = async () => {
    try {
        const applications = await prisma.application.findMany()
        return applications
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const getApplicationByTechId = async (id: number) => {
    try {
        const applications = await prisma.application.findMany({
            where: {
                technologyId: id
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


export default {
    getAllApplication,
    getApplicationByTechId,
    addApplication,
}


