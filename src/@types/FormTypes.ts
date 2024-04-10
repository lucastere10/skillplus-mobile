interface UploadPictureForm {
    arquivo: FileList;
    descricao: string;
}

interface UpdateUserForm {
    nome: string;
    nomeSocial?: string;
    telefone?: string | null;
    dataNascimento: string;
}

interface ContactForm {
    contatoNome: string
    contatoUrl: string
    contatoTipo: string
    privado: boolean
}

interface CartaoForm {
    cartaoNome: string
    cartaoUsuario: string
    cartaoBackground: string
    cartaoUrl: string
    ativo: boolean
}


interface CartaoEditForm {
    cartaoNome: string
    cartaoUsuario: string
    cartaoUrl: string
}

interface CartaoEditBackgroundForm {
    cartaoBackground?: string
}

interface UserSkillForm {
    skillNome: string
    usuarioSkillDominio: string
    usuarioSkillVersao?: string
    ativo: boolean
}

interface SkillForm {
    skillNome: string
    skillDescricao: string
    skillCategoria: string
    skillDificuldade: string
    skillUrl?: string
    ativo: boolean
}