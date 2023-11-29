const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messageLogs');
let data;

socket.on('message', msg => {
    data = msg;
});

socket.on('messageLogs', msgs => {
    renderizar(msgs);
});

const renderizar = (msgs) => {
    let messages = '';

    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`;
    });

    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
}

Swal.fire({
    title: 'Bienvenido al chat!!',
    input: 'email',
    text: 'Ingresa tu e-mail',
    inputValidator: (value) => {
        if (!value)
            return 'Necesitas ingresar un e-mail para continuar';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value))
            return 'Ingresa un e-mail válido';

        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if (result.isConfirmed) {
        user = result.value;
        renderizar(data);
    }
});

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            const message = chatBox.value;
            socket.emit('message', { user, message });
            chatBox.value = '';
        }
    }
});

socket.on('newUser', () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Nuevo Usuario conectado",
        showConfirmButton: false,
        timer: 5000
    });
});

