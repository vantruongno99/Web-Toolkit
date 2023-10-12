

export interface TechnologyForm {
    technology: string,
    description: string
}

export interface Technology extends TechnologyForm {
    potential: Application[]
}

export interface Application {
    potentialApplications: string,
    explanation: string,
    maturity: string,
    stageOfParticipation: string,
    purposeOfEngagement: string,
    levelOfEngagement: string,
    scale: string,
    budget: string,
    solutionFor: string,
    considerations: string
}

export interface LandingData {
    title : string,
    image? : any,
    description : string,
    link : string
}