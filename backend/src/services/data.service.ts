import { prisma } from "../../prisma/prismaClient"
import { ApplicationInput } from "../models/application.modal"
import { TechnologyInput } from "../models/technology.modal"
import errorHandler from "../utils/errorHandler"

BigInt.prototype.toJSON = function () {
  return String(this)
}

declare global {
  interface BigInt {
    toJSON(): string
  }
}



const getAll = async () => {
  try {
    const purpose = await prisma.purpose.findMany()
    const participation = await prisma.participation.findMany()
    const engagement = await prisma.engagement.findMany()
    const scale = await prisma.scale.findMany()
    const budget = await prisma.budget.findMany()
    const solution = await prisma.solution.findMany()

    return ({
      purpose: purpose.map(a => a.name),
      participation: participation.map(a => a.name),
      engagement: engagement.map(a => a.name),
      scale: scale.map(a => a.name),
      budget: budget.map(a => a.name),
      solution: solution.map(a => a.name)

    })

  }
  catch (e: any) {
    errorHandler(e)
  }
}

const purposeDelete = async (input: string) => {
  try {
    await prisma.purpose.delete({
      where: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const participationDelete = async (input: string) => {
  try {
    await prisma.participation.delete({
      where: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const engagementDelete = async (input: string) => {
  try {
    await prisma.engagement.delete({
      where: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const scaleDelete = async (input: string) => {
  try {
    await prisma.scale.delete({
      where: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const solutionDelete = async (input: string) => {
  try {
    await prisma.solution.delete({
      where: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const budgetDelete = async (input: string) => {
  try {
    await prisma.budget.delete({
      where: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}


const purposeAdd = async (input: string) => {
  try {
    await prisma.purpose.create({
      data: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const   budgetAdd = async (input: string) => {
  try {
    await prisma.budget.create({
      data: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const participationAdd = async (input: string) => {
  try {
    await prisma.participation.create({
      data: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const engagementAdd = async (input: string) => {
  try {
    await prisma.engagement.create({
      data: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const scaleAdd = async (input: string) => {
  try {
    await prisma.scale.create({
      data: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}

const solutionAdd = async (input: string) => {
  try {
    await prisma.solution.create({
      data: {
        name: input
      }
    })
  }
  catch (e: any) {
    errorHandler(e)
  }
}



export default {
  getAll, purposeDelete, participationDelete, engagementDelete,
  scaleDelete,
  solutionDelete,
  purposeAdd,
  participationAdd,
  engagementAdd,
  scaleAdd,
  solutionAdd,
  budgetAdd,
  budgetDelete
}


