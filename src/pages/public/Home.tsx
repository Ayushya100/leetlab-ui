import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useLoginForm } from '@/hooks/useLoginForm';
import { useUserStore } from '@/stores/userStore';

function HomePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usernameEmail: '', password: '' });
  const submitContact = useLoginForm();
  const userStore = useUserStore.getState();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { isEmailVerified, userScopes } = await submitContact(form);

    userStore.registerUserLogin(isEmailVerified);
    userStore.addUserScope(userScopes);

    const userLoginSuccessfull = isEmailVerified;
    if (userLoginSuccessfull) {
      navigate({ to: '/problems' });
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen">
      <nav className="shadow-md px-4 py-3 h-12 flex justify-center">
        <div className="w-11/12 mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Leetlab
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex gap-4">
                <p className="rounded-md px-3 py-2 text-sm font-medium">Home</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex items-center justify-center bg-gray-100">
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Login</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email/Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="usernameEmail"
                      value={form.usernameEmail}
                      type="text"
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      value={form.password}
                      type="password"
                      onChange={handleChange}
                      autoComplete="password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
