import { prisma } from "../../prisma/prismaClient"
import { TechnologyInput } from "../models/technology.modal"
import errorHandler from "../utils/errorHandler"


const getAllTechnology = async () => {
    try {
        const technologies = await prisma.technology.findMany({
            include: {
                Application: true
            }
        })
        return technologies
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const getAllTechnologyById = async (id : number) => {
    try {
        const technology = await prisma.technology.findFirstOrThrow({
            where: {
                id : id 
            }
        })
        return technology
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const addTechnology = async (data: TechnologyInput) => {
    try {
        const newTechnology = await prisma.technology.create({
            data: data
        })

        return newTechnology
    }
    catch (e: any) {
        errorHandler(e)
    }
}


export default {
    getAllTechnology,
    getAllTechnologyById,
    addTechnology,
  }
  

