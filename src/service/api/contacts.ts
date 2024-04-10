import api from "./api";

export const registerContact = async (data: ContactForm) => {
    try {
        await api.post('/contatos', {
            contatoNome: data.contatoNome,
            contatoUrl: data.contatoUrl,
            contatoTipo: data.contatoTipo,
            privado: data.privado
        });
        return true;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}

export const fetchUserContacts = async () => {
    try {
        const response = await api.get(`/contatos/usuario`);
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

export const fetchContactsByUserId = async (usuarioId: number, size?: number) => {
    try {
        const response = await api.get(`/contatos/usuario/${usuarioId}/publico?size=${size}`);
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

export const activateContact = async (id: number) => {
    try {
        const response = await api.patch(`/contatos/privado/${id}`);
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

export const deleteContact = async (id: number) => {
    try {
        const response = await api.delete(`/contatos/${id}`);

        if (response.status === 204) {
            return { data: 'Contato deletado com sucesso', error: null };
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

