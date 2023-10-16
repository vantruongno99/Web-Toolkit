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

export interface Application extends ApplicationInput {
    id : number
}