import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { AxiosHandleResponse } from '../Ultils/middleware'
import { domain } from '../Ultils/config'
import {  ApplicationInfo, ApplicationInput } from '../Ultils/type'

const baseUrl = `${domain}/app`

const config = {
    headers: { Authorization: `bearer ${Cookies.get('token')}` }, // notice the Bearer before your token
}


const createApplication = async (newApplication: ApplicationInput): Promise<ApplicationInfo | undefined> => {
    try {
        const res = await axios.post(`${baseUrl}`, newApplication,
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


const getAllApplication = async (): Promise<ApplicationInfo[] | undefined> => {
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

const getApplication = async (id: number): Promise<ApplicationInfo | undefined> => {
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

const getApplicationInfo = async (name: string, option?: any) => {
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

const editApplication = async (data: ApplicationInput, id: number): Promise<ApplicationInfo | undefined> => {
    try {
        const res = await axios.put(`${baseUrl}/${id}`, data,
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

const editApplicationImage = async (imageUrl: string, id: number): Promise<ApplicationInfo | undefined> => {
    try {
        const res = await axios.put(`${baseUrl}/${id}/image`, {imageUrl},
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

const deleteApplication = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${baseUrl}/${id}`,
            config
        )

    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const applicationService = {
    getAllApplication,
    getApplication,
    createApplication,
    getApplicationInfo,
    editApplication,
    deleteApplication,
    editApplicationImage
}

export default applicationService