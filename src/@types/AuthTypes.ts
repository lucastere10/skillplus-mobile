interface LoginResponse {
    token: string;
}

interface LoginRequest {
    login: string;
    senha: string;
};

interface RegisterRequest {
    nome: string;
    login: string;
    senha: string;
    role: string;
}


interface GoogleRegisterRequest {
    nome: string;
    login: string;
}