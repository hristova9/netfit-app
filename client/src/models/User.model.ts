export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    avatar?: string;
    cover?: string;
    description?: string;
}

export interface UserEdit {
    firstName: string;
    lastName: string;
    description: string;
}

export interface Trainer extends User {
    skills?: string[];
    raiting?: number;
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
