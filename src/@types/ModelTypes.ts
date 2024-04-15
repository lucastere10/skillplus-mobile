interface UsuarioLogadoType{
    usuarioId: number,
    nome: string,
    email: string,
    usuarioTipo: string,
    usuarioStatus: string 
}

interface User {
    usuarioId: number
    nome: string
    nomeSocial?: string
    email: string
    telefone?: string
    dataNascimento: string
    twoFa: boolean
    usuarioStatus: string
    usuarioTipo: string
    dataCadastro: string
}

interface Contato {
    contatoId: number
    contatoNome: string
    contatoUrl: string
    contatoTipo: string
    privado: boolean
}

interface Cartao {
    cartaoId: number
    cartaoNome: string
    cartaoUsuario: string
    cartaoUsuarioTipo: string
    cartaoBackground: string
    cartaoUrl: string
    qrcode: string
    ativo: boolean
}

interface Skill {
    skillId: number
    skillNome: string
    skillDescricao: string
    skillCategoria: string
    skillDificuldade: string
    skillUrl: string
    ativo: boolean
}

interface UserSkill {
    usuarioSkillId: number
    usuarioSkillVersao: string
    usuarioSkillDominio: string
    ativo: boolean
    skill: Skill
}