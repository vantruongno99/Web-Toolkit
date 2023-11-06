import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { AxiosHandleResponse } from '../Ultils/middleware'
import { domain } from '../Ultils/config'
import { Data, TechnologyInfo, TechnologyInput } from '../Ultils/type'

const baseUrl = `${domain}/data`


const getAll = async (): Promise<Data | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}`,
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}


const createPurpose = async (input: string) => {
    try {
        const res = await axios.post(`${baseUrl}/purpose`,
            { name: input }
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const createParticipation = async (input: string) => {
    try {
        const res = await axios.post(`${baseUrl}/participation`,
            { name: input }
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const createEngagement = async (input: string) => {
    try {
        const res = await axios.post(`${baseUrl}/engagement`,
            { name: input }
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const createScale = async (input: string) => {
    try {
        const res = await axios.post(`${baseUrl}/scale`, { name: input }

        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const createSolution = async (input: string) => {
    try {
        const res = await axios.post(`${baseUrl}/solution`, { name: input }

        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const createBudget = async (input: string) => {
    try {
        const res = await axios.post(`${baseUrl}/budget`, { name: input }

        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}


const deletePurpose = async (input: string) => {
    try {
        const res = await axios.delete(`${baseUrl}/purpose/${input}`,
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const deleteParticipation = async (input: string) => {
    try {
        const res = await axios.delete(`${baseUrl}/participation/${input}`,
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const deleteEngagement = async (input: string) => {
    try {
        const res = await axios.delete(`${baseUrl}/engagement/${input}`,
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const deleteScale = async (input: string) => {
    try {
        const res = await axios.delete(`${baseUrl}/scale/${input}`,
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const deletesolution = async (input: string) => {
    try {
        const res = await axios.delete(`${baseUrl}/solution/${input}`,
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}
const deleteBudget = async (input: string) => {
    try {
        const res = await axios.delete(`${baseUrl}/budget/${input}`,
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}





const dataService = {
    getAll,
    createPurpose,
    createParticipation,
    createEngagement,
    createScale,
    createSolution,
    createBudget,
    deletePurpose,
    deleteParticipation,
    deleteEngagement,
    deleteScale,
    deletesolution,
    deleteBudget
}

export default dataService