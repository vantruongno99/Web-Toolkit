import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { AxiosHandleResponse } from '../Ultils/middleware'
import { domain } from '../Ultils/config'
import { ApplicationVendor, VendorEdit, VendorInfo, VendorInput } from '../Ultils/type'

const baseUrl = `${domain}/vendor`

const config = {
    headers: { Authorization: `bearer ${Cookies.get('token')}` }, // notice the Bearer before your token
}


const createVendor = async (newVendor: VendorInput): Promise<VendorInfo | undefined> => {
    try {
        const res = await axios.post(`${baseUrl}`, newVendor,
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}


const getAllVendor = async (): Promise<VendorInfo[] | undefined> => {
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

const getVendor = async (id: number): Promise<VendorInfo | undefined> => {
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

const getVendorByABN = async (ABN: number): Promise<VendorInfo | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}/ABN/${ABN}`,
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

const getVendorInfo = async (name: string, option?: any) => {
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

const getAllVendorApplication = async (id: number): Promise<ApplicationVendor[] | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}/${id}/application`,
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


const applicationRequest = async (applicationId: number, vendorId: number, input: { showcase: string }): Promise<ApplicationVendor[] | undefined> => {
    try {
        const res = await axios.post(`${baseUrl}/${vendorId}/apply/${applicationId}`, input,
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

const editVendor = async ( id: number ,data: VendorEdit): Promise<void> => {
    try {
        await axios.put(`${baseUrl}/${id}`, data,
            config
        )

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

const deleteVendor = async ( id: number ): Promise<void> => {
    try {
        await axios.delete(`${baseUrl}/${id}`, 
            config
        )

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


const vendorService = {
    getAllVendor,
    getVendor,
    createVendor,
    getVendorInfo,
    getAllVendorApplication,
    applicationRequest,
    getVendorByABN,
    editVendor,
    deleteVendor
}

export default vendorService