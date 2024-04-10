import api from "./api";

export const registerSkill = async (data: SkillForm) => {
    try {
        await api.post(`/skills`, {
            skillNome: data.skillNome,
            skillDescricao: data.skillDescricao,
            skillCategoria: data.skillCategoria,
            skillDificuldade: data.skillDificuldade,
            skillUrl: data.skillUrl,
            ativo: data.ativo
        });
        return true;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}

export const editSkill = async (id: number, data: SkillForm) => {
    try {
        await api.put(`/skills/${id}`, {
            skillNome: data.skillNome,
            skillDescricao: data.skillDescricao,
            skillCategoria: data.skillCategoria,
            skillDificuldade: data.skillDificuldade,
            skillUrl: data.skillUrl,
            ativo: data.ativo
        });
        return true;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}

export const fetchSkills = async (search: string, page: number, size: number) => {
    try {
        const response = await api.get(`/skills`, {
            params: {
                search,
                page,
                size
            }
        });
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


export const fetchSkillById = async (id: number) => {
    try {
        const response = await api.get(`/skills/${id}`);
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

export const fetchSkillsPublic = async (search: string, page: number, size: number) => {
    try {
        const response = await api.get(`/skills/publico`, {
            params: {
                search,
                page,
                size
            }
        });
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

export const activateSkill = async (id: number) => {
    try {
        const response = await api.patch(`/skills/ativar/${id}`);
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

export const deleteSkill = async (id: number) => {
    try {
        const response = await api.delete(`/skills/${id}`);

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
