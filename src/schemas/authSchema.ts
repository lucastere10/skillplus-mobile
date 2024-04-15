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
    confirmarSenha: yup
        .string()
        .oneOf([yup.ref('senha')], "Senhas não coincidem")
        .required('Digite a senha novamente'),
});

export const contactSchema = yup.object().shape({
    contatoNome: yup
        .string()
        .required('Digite o nome do contato'),
    contatoUrl: yup
        .string()
        .required('Digite a url'),
    contatoTipo: yup
        .string()
        .required('Escolha um tipo'),
    privado: yup
        .boolean()
        .required()
});

export const cartaoSchema = yup.object().shape({
    cartaoUsuario: yup
        .string()
        .required('Digite o nome do usuário'),
    cartaoNome: yup
        .string()
        .required('Digite o nome do cartão'),
    cartaoUrl: yup
        .string()
        .required('Digite a URL do cartão'),
    cartaoBackground: yup
        .string()
        .matches(/\.(jpeg|jpg|png)$/, 'Precisa ser um formato de imagem válido (jpeg, jpg, png)')
        .required('escolha um background para o seu cartão'),
    ativo: yup
        .boolean()
        .required()
});

export const editCartaoSchema = yup.object().shape({
    cartaoUsuario: yup
        .string()
        .required('Digite o nome do usuário'),
    cartaoNome: yup
        .string()
        .required('Digite o nome do cartão'),
    cartaoUrl: yup
        .string()
        .required('Digite a URL do cartão'),
});

export const userSkillSchema = yup.object().shape({
    skillNome: yup
        .string()
        .required('Escolha uma skill'),
    usuarioSkillDominio: yup
        .string()
        .required('Defina o domínio sobre a skill'),
    usuarioSkillVersao: yup
        .string(),
    ativo: yup
        .boolean()
        .required()
});

const PHONE_NO_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;
const DATE_FORMAT = /^(\d{2})\/(\d{2})\/(\d{4})$/;
export const updateUserSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    nomeSocial: yup.string(),
    telefone: yup.string().notRequired().matches(PHONE_NO_REGEX, 'Favor seguir o formato "(11) 99999-9999"'),
    dataNascimento: yup
        .string()
        .required('Data de Nascimento é obrigatória')
        .matches(DATE_FORMAT, 'Data de Nascimento deve estar no formato DD/MM/YYYY'),
});


const SUPPORTED_FORMATS: { [key: string]: string[] } = { image: ['jpg', 'png', 'jpeg'] };
const MAX_FILE_SIZE = 1048576; //3mb
const fileSelected = (value: FileList) => value && value.length > 0;
export const uploadPictureSchema = yup.object().shape({
    arquivo: yup.object().shape({
        uri: yup.string().required('Favor Adicionar uma foto'),
        type: yup.string().required().test("is-valid-type", "Formato não suportado",
            value => SUPPORTED_FORMATS.image.includes(value.split('/')[1])),
        size: yup.number().required().test("is-valid-size", "A imagem pode ter no máximo 1MB",
            value => value <= MAX_FILE_SIZE),
    }),
    descricao: yup.string().required('Descrição é obrigatória'),
});
