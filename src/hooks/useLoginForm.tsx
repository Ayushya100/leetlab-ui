import authService from '@/services/auth.service';

interface UserForm {
  usernameEmail: string;
  password: string;
}

export function useLoginForm() {
  const submitContact = async (formData: UserForm) => {
    try {
      const res = await authService.login(formData);

      let isEmailVerified = false;
      let userScopes = [];
      const status = res.statusCode;

      if (res.statusCode === 200) {
        const data = res.data;
        const user = data.user;

        isEmailVerified = user.isEmailVerified;
        userScopes = user.scopes;
      }

      return { status, isEmailVerified, userScopes };
    } catch (err) {
      console.error(err);
      return { status: 500, isEmailVerified: false, userScopes: [] };
    }
  };

  return submitContact;
}
