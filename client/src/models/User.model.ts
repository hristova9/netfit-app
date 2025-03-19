export interface User {
    user_id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    age?: number;
    avatar?: string;
    cover?: string;
    user_description?: string;
}

export interface UserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repassword: string;
}

export interface UserLogin {
    email: string;
    password: string;
}