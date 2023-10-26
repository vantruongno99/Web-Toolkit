import { Application } from "./application.modal"

export interface VendorInput {
    name : string,
    ABN : number
    email : string,
    link : string
}

export interface VendorInfo extends VendorInput {
    Applications? : {
        Application : Application
    }[]
}