// socketService.ts
import io from 'socket.io-client';
const socket = io('ws://192.168.1.5:8878?room=a', { forceNew: true });

export const emitMessage = async () => {
    const message = {
        type: 'CLIENT',
        message: 'mensagem do mobile',
        room: 'a',
    };
    socket.emit('send_message', message);
};

export const emitCredentials = async (nome: string, email: string) => {
    const credentials = {
        room: 'a',
        email: email,
        nome: nome,
    };
    socket.emit('send_credentials', credentials)
}

socket.on('send_credentials', (data: any) => {
    console.log('teste send credentials', data);
});

socket.on('get_credentials', (data: any) => {
    console.log('teste get credentials', data);
});

socket.on('send_message', (data: any) => {
    console.log('teste send message', data);
});

socket.on('get_message', (data) => {
    console.log('teste get message', data);
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('error', (error) => {
    console.error('Error with socket connection:', error);
});
