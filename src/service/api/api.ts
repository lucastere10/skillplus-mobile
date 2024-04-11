import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const api = axios.create({
  baseURL: "http://10.0.2.2:8080/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchUserData = async () => {
  try {
    const response = await api.get(`/auth/user`);
    return { data: response.data, error: null };
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching user:', err.response.status
      );
      return { data: null, error: err.response.status };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
};

export const fetchUserById = async (id:number) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return { data: response.data, error: null };
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching user:', err.response.status
      );
      return { data: null, error: err.response.status };
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
};

export const fetchUserPicture = async (email: string) => {
  try {
    const response = await api.get(`/usuarios/foto/${email}`, { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching data:', err.response.data);
      const placeholder = `https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png`
      return placeholder;
    } else {
      console.error('Error:', err.message);
      return { data: null, error: err.message };
    }
  }
}

export const fetchUserPictureTeste = async (email: string) => {
  return api.get(`/usuarios/foto/${email}`, {
    responseType: 'arraybuffer' // to handle binary data
  })
    .then((response) => {
      let status = response.status;

      if (status == 200) {
        let base64Str = Buffer.from(response.data, 'binary').toString('base64');
        return `data:image/jpeg;base64,${base64Str}`;
      }
      else if (status == 400) {
        const placeholder = `https://robohash.org/ds${email}?set=set4`
        return placeholder;
      }
      else {
        throw new Error(`Unexpected status code: ${status}`);
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        const placeholder = `https://robohash.org/ds${email}?set=set4`
        return placeholder;
      } else {
        console.error(error);
      }
    });
}


export const uploadPicture = async (data: any): Promise<boolean> => {
  try {
      const formData = new FormData();
      formData.append('arquivo', data.arquivo);
      formData.append('descricao', data.descricao);

      await api.put('/usuarios/foto/upload', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      alert('imagem alterada com sucesso!');
      return true;
  } catch (error: any) {
      console.error(error.response);
      alert(error.response.data.detail);
      return false;
  }
};

export const fetchUsers = async (search: string, page: number, size: number) => {
  try {
    const response = await api.get(`/usuarios`, {
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

export default api;
