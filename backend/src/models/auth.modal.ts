export interface RegisterInput {
    username : string;
    password : string;
    role? : string;
}

export interface LoginInput {
    username : string;
    password :string;
}

export interface LoginResponse {
    username: string;
    role: string;
    token : string
}


export interface PasswordChangeInput extends LoginInput{
    newPassword : string
}

export interface AdminPasswordChangeInput {
    username : string;
    newPassword :string;
}