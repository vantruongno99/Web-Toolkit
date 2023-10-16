import { Application } from "./application.modal";

export interface TechnologyInput {
    technology: string;
    description: string
}

export interface technology extends TechnologyInput {
    id: number,
    potentialApplications: Application
}



