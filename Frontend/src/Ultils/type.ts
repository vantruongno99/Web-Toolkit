export interface ApplicationInput{
    potentialApplications: string
    explanation: string,
    maturity: string,
    stageOfParticipation: string,
    purposeOfEngagement: string ,
    levelOfEngagement: string,
    scale: string,
    budget: string
    solutionFor: string,
    considerations: string,
    technologyId : number
}

export interface ApplicationInfo extends ApplicationInput {
    id : number
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
