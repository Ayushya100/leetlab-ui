import { apiClient } from "../utils/apiClient";

export function useLoginForm() {
    const accountsAPI = 'accounts-svc/api/v1.0';

    const submitContact = async(formData) => {
        try {
            const res = await apiClient(`${accountsAPI}/login`, {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            let isEmailVerified = false;
            let userScopes = [];
            const status = res.statusCode;

            if (res.statusCode === 200) {
                const data = res.data;
                const user = data.user;
    
                isEmailVerified = user.isEmailVerified;
                userScopes = user.scopes;
    
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
            }

            return {status, isEmailVerified, userScopes};
        } catch (err) {
            console.error(err);
        }
    }

    return submitContact;
}
