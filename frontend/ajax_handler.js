"use strict";

async function loadUsers(url) {
    let headers = {};
    let token = localStorage.getItem('token');
    if (token) headers['x-auth'] = token;

    let response = await fetch(url, { headers });
    if (response.status != 200) {
        return [];
    }
    let users = await response.json();
    return users;
}

function storeUser(url, user, onSuccess, onError) {
    let headers = { 'Content-Type': 'application/json' };
    let token = localStorage.getItem('token');
    if (token) headers['x-auth'] = token;

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    })
        .then(async response => {
            const message = await response.text();
            if (!response.ok) {
                throw new Error(`${response.status}: ${message}`);
            }
            onSuccess(message);
        })
        .catch(onError);
}

function putUser(url, user, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    if (token) xhr.setRequestHeader('x-auth', token);

    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.onerror = () => onError('No se pudo conectar con el servidor');
    xhr.send(JSON.stringify(user));
}

function deleteUser(url, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    let token = localStorage.getItem('token');
    if (token) xhr.setRequestHeader('x-auth', token);

    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.onerror = () => onError('No se pudo conectar con el servidor');
    xhr.send();
}

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}
