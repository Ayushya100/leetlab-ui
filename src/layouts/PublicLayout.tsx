import { Outlet } from '@tanstack/react-router';

export default function () {
  return (
    <div>
      <header>Public Navigations</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
