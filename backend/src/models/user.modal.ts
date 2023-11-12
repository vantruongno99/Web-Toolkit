export interface User extends UserProfile{
    hashedPassword: string;
}

export interface UserProfile {
    id: number;
    username: string;
    role : string;
}


