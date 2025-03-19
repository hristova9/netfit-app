export interface FormDataSignIn {
    email: string;
    password: string;
}

export interface FormDataSignUp extends FormDataSignIn {
    first_name: string;
    last_name: string;
    repassword: string;
}