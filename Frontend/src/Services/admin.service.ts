import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { AxiosHandleResponse } from '../Ultils/middleware'
import { domain } from '../Ultils/config'
import { ApplicationVendor, VendorInfo, VendorInput } from '../Ultils/type'

const baseUrl = `${domain}/admin`

const config = {
    headers: { Authorization: `bearer ${Cookies.get('token')}` }, // notice the Bearer before your token
}


const getAllApproval = async (): Promise<ApplicationVendor []| undefined> => {
    try {
        const res = await axios.get(`${baseUrl}/approve`,
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



const ConfirmApprove = async (vendorId: number ,applicationId: number ): Promise<void> => {
    try {
        console.log(`${baseUrl}/approve/${vendorId}/${applicationId}`)
        await axios.put(`${baseUrl}/approve/${vendorId}/${applicationId}`,
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

const adminService = {
    getAllApproval,
    ConfirmApprove
}

export default adminService