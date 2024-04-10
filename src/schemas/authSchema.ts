import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    login: yup
        .string()
        .required('Digite o email'),
    senha: yup
        .string()
        .required('Digite a senha'),
    rememberMe: yup
        .boolean()
});

export const registerSchema = yup.object().shape({
    nome: yup
        .string()
        .required('Digite seu Nome Completo'),
    login: yup
        .string()
        .required('Digite o email'),
    senha: yup
        .string()
        .required('Digite a senha'),
        role: yup
            .string()
            .required('Escolha um tipo de usuário válido'),
    // confirmarSenha: yup
    //     .string()
    //     .required('Digite a senha novamente'),
});
