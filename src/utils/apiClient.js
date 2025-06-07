export async function apiClient(url, options = {}) {
    const protocol = import.meta.env.VITE_PROTOCOL;
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_GATEWAY_PORT;
    const globalApi = `${protocol}://${host}:${port}/${url}`;
    
    const token = localStorage.getItem('accessToken');

    const defaultHeaders = {
        accept: 'application/json',
        'Content-Type': 'application/json'
    };

    const apiOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    }

    if (token) {
        apiOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${globalApi}`, apiOptions);
    const data = await response.json();
    console.log(data);
    return data;
}
