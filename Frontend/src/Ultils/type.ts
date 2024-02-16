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
    imageUrl?: string;
}


export interface ApplicationInfo extends ApplicationInput {
    id: number,
    Vendor?: ApplicationVendor[]
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
    phone: string,
    ABN: number,
    email: string,
    link: string
}

export interface VendorInfo extends VendorInput {
    id: number,
    name: string
    Application?: { Application: ApplicationInfo }[]
}

export interface ApplicationVendor {
    approved: String;
    Application: ApplicationInfo,
    Vendor: VendorInfo,
    applicationId: number,
    vendorId: number,
    showcase: string
}

export interface LandingData {
    title: string,
    image?: any,
    description: string,
    link: string
}


export interface DataForm {
    purpose: string[],
    participation: string[],
    engagement: string[],
    scale: string[],
    budget: string[],
    solution: string[]
}

export interface Data {
    purpose:
    {
        id: number,
        name: string
    }[],
    participation: {
        id: number,
        name: string
    }[],
    engagement: {
        id: number,
        name: string
    }[],
    scale: {
        id: number,
        name: string
    }[],
    budget: {
        id: number,
        name: string
    }[],
    solution: {
        id: number,
        name: string
    }[]
}





export interface LoginDetail {
    username: string,
    password: string
}

export interface AdminResetPasswordInput {
    username : string
    newPassword: string
}

export interface VendorEdit {
    phone: string,
    link: string,
    email: string
}