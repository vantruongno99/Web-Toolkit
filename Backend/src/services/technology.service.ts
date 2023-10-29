import { prisma } from "../../prisma/prismaClient"
import { TechnologyInput } from "../models/technology.modal"
import errorHandler from "../utils/errorHandler"

BigInt.prototype.toJSON = function () {
    return String(this)
}


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

const getTechnology = async (id : number) => {
    try {
        const technology = await prisma.technology.findFirstOrThrow({
            where: {
                id : id 
            },
            include:{
                Application : true
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


const deleteTechnology= async (id: number) => {
    try {
        await prisma.technology.delete({
            where: {
                id: id
            },
        })
    }
    catch (e: any) {
        errorHandler(e)
    }
}

const editTechnology= async (data: TechnologyInput, id: number) => {
    try {
        const newAppliction = await prisma.technology.update({
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
    getAllTechnology,
    getTechnology,
    addTechnology,
    deleteTechnology,
    editTechnology
  }
  

