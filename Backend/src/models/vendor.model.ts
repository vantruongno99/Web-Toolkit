import { Application } from "./application.modal"

export interface VendorInput {
    name : string,
    ABN : number
}

export interface VendorInfo extends VendorInput {
    Applications? : {
        Application : Application
    }[]
}