import api from "./api";

export const registerUserSkill = async (data: UserSkillForm) => {
    try {
        await api.post('/usuarioskills', {
            skillNome: data.skillNome,
            usuarioSkillVersao: data.usuarioSkillVersao,
            usuarioSkillDominio: data.usuarioSkillDominio,
            ativo: data.ativo
        });
        return true;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}

export const editUserSkill = async (id:number, data: UserSkillForm) => {
    try {
        await api.put(`/usuarioskills/${id}`, {
            skillNome: data.skillNome,
            usuarioSkillVersao: data.usuarioSkillVersao,
            usuarioSkillDominio: data.usuarioSkillDominio,
            ativo: data.ativo
        });
        return true;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}

export const fetchUserSkillsOfLoggedUser = async () => {
    try {
        const response = await api.get(`/usuarioskills/usuario`);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.error('Error fetching data:', err.response.data);
            return { data: null, error: err.response.data };
        } else {
            console.error('Error:', err.message);
            return { data: null, error: err.message };
        }
    }
}

export const fetchUserSkillsByUserId = async (id:number) => {
    try {
        const response = await api.get(`/usuarioskills/usuario/${id}/publico`);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.error('Error fetching data:', err.response.data);
            return { data: null, error: err.response.data };
        } else {
            console.error('Error:', err.message);
            return { data: null, error: err.message };
        }
    }
}

export const activateUserSkill = async (id: number) => {
    try {
        const response = await api.patch(`/usuarioskills/ativar/${id}`);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.error('Error fetching data:', err.response.data);
            return { data: null, error: err.response.data };
        } else {
            console.error('Error:', err.message);
            return { data: null, error: err.message };
        }
    }
}

export const deleteUserSkill = async (id: number) => {
    try {
        const response = await api.delete(`/usuarioskills/${id}`);

        if (response.status === 204) {
            return { data: 'Skill deletada com sucesso', error: null };
        }
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.error('Error fetching data:', err.response.data);
            return { data: null, error: err.response.data };
        } else {
            console.error('Error:', err.message);
            return { data: null, error: err.message };
        }
    }
}

