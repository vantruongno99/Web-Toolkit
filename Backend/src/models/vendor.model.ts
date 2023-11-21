import { Application } from "./application.modal"

export interface VendorInput {
    name : string,
    ABN : number
    email : string,
    link : string,
    phone : string,
}

export interface VendorInfo extends VendorInput {
    Applications? : {
        Application : Application
    }[]
}

export interface WebResponse {
    Abn: number,
    AbnStatus: string,
    AbnStatusEffectiveFrom: string,
    Acn?: string,
    AddressDate: string,
    AddressPostcode: number,
    AddressState: string,
    BusinessName: string[],
    EntityName: string,
    EntityTypeCode: string,
    EntityTypeName: string,
    Gst: string,
    Message?: string
}


export interface VendorEdit {
    email : string,
    link : string,
    phone : string,
}

export interface VendorEdit {
    phone : string,
    link : string,
    email : string
}