export interface ApplicationInput {
    purposeOfEngagement: string;
    technologyId: number;
    potentialApplications: string;
    explanation: string;
    maturity: string;
    stageOfParticipation: string;
    levelOfEngagement: string;
    scale: string;
    budget: string;
    solutionFor: string;
    considerations: string;
}


export interface ApplicationInfo extends ApplicationInput {
    id: number,
    Vendor? : ApplicationVendor[]
}

export interface TechnologyInput {
    technology: string;
    description: string
}

export interface TechnologyInfo extends TechnologyInput {
    Application: ApplicationInfo[];
    id: number,
    potentialApplications: ApplicationInfo[]
}

export interface VendorInput {
    name: string,
    ABN: number,
    email : string,
    link: string
}

export interface VendorInfo extends VendorInput {
    id: number,
    Application?: { Application: ApplicationInfo }[]
}

export interface ApplicationVendor {
    approved: String;
    Application: ApplicationInfo,
    Vendor: VendorInfo,
    applicationId : number,
    vendorId : number ,
    showcase: string
}

export interface LandingData {
    title: string,
    image?: any,
    description: string,
    link: string
}

