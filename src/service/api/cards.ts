import api from "./api";

export const registerCard = async (data: CartaoForm) => {
    try {
        await api.post('/cartoes', {
            cartaoNome: data.cartaoNome,
            cartaoUsuario: data.cartaoUsuario,
            cartaoBackground: data.cartaoBackground,
            cartaoUrl: data.cartaoUrl,
            ativo: data.ativo
        });
        return true;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}

export const activateCard = async (id:number) => {
    try {
        const response = await api.patch(`/cartoes/ativar/${id}`);
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

export const fetchUserCards = async () => {
    try {
        const response = await api.get(`/cartoes/usuario`);
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

export const deleteCard = async (id:number) => {
    try {
        const response = await api.delete(`/cartoes/${id}`);
        
        if (response.status === 204) {
            return { data: 'Cartão deletado com sucesso', error: null };
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

export const updateCard = async (cartaoId: number, data: CartaoEditForm): Promise<boolean> => {
    try {
        const response = await api.put(`/cartoes/${cartaoId}`, {
            cartaoNome: data.cartaoNome,
            cartaoUsuario: data.cartaoUsuario,
            cartaoUrl: data.cartaoUrl,
        })
        return response.data;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}
export const updateBackgroundCard = async (cartaoId: number, data: CartaoEditBackgroundForm): Promise<boolean> => {
    try {
        await api.put(`/cartoes/${cartaoId}`, {
            cartaoBackground: data.cartaoBackground,
        })
        return true;
    } catch (error: any) {
        console.error(error);
        alert(error.response.data.userMessage);
        return false;
    }
}