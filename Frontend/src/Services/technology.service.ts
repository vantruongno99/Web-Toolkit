import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { AxiosHandleResponse } from '../Ultils/middleware'
import { domain } from '../Ultils/config'
import {  TechnologyInfo, TechnologyInput } from '../Ultils/type'

const baseUrl = `${domain}/api/tech`

const config = {
    headers: { Authorization: `bearer ${Cookies.get('token')}` }, // notice the Bearer before your token
}


const createTechnology = async (newTechnology: TechnologyInput): Promise<TechnologyInfo | undefined> => {
    try {
        const res = await axios.post(`${baseUrl}`, newTechnology,
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log(error)
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}


const getAllTechnology = async (): Promise<TechnologyInfo[] | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}`,
            config
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

const getTechnology = async (id: number): Promise<TechnologyInfo | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}/${id}`,
            config
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

const getTechnologyInfo = async (name: string, option?: any) => {
    try {
        const objString = '?' + new URLSearchParams(option).toString();
        const res = await axios.get(`${baseUrl}/${name}/info${objString}`,
            config
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

const TechnologyService = {
    getAllTechnology,
    getTechnology,
    createTechnology,
    getTechnologyInfo
}

export default TechnologyService