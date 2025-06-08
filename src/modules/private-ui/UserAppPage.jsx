import { Outlet } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import './UserAppPage.css';
import { useUserStore } from '../../store/userStore';

export function UserAppComponent() {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const sidenavRef = useRef();
  const { scopes } = useUserStore.getState();

  // User Actions
  const userActionOptions = [
    {
      header: 'Problems',
      icon: 'fa-book',
    },
    {
      header: 'Popular Lists',
      icon: 'fa-list',
    },
  ];

  const AdminActionOptions = [];

  if (scopes.includes('SHEET.V')) {
    AdminActionOptions.push({
      header: 'Sheets',
      icon: 'fa-file-alt',
      'sub-actions': [
        {
          header: 'Register Sheets',
          icon: 'fa-file-code',
          link: '/',
        },
      ],
    });
  }

  if (scopes.includes('SHEETTYPE.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Manage Sheet Types',
      icon: 'fa-list-alt',
      link: '/',
    });
  }

  if (scopes.includes('SHEETTAG.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Manage Sheet Tags',
      icon: 'fa-tags',
      link: '/',
    });
  }

  if (scopes.includes('SHEETLANG.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Manage Languages',
      icon: 'fa-code',
      link: '/',
    });
  }

  if (scopes.includes('PLAYLIST.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Register Popular Lists',
      icon: 'fa-list',
      link: '/',
    });
  }

  if (scopes.includes('ROLE.V')) {
    AdminActionOptions.push({
      header: 'Configurations',
      icon: 'fa-tools',
      'sub-actions': [
        {
          header: 'Manage User Roles',
          icon: 'fa-user-shield',
          link: '/',
        },
      ],
    });
  }

  if (scopes.includes('SCOPE.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage User Scopes',
      icon: 'fa-lock-open',
      link: '/',
    });
  }

  if (scopes.includes('SERVICE.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage Services',
      icon: 'fa-gears',
      link: '/',
    });
  }

  if (scopes.includes('ROUTE.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage Routes',
      icon: 'fa-route',
      link: '/',
    });
  }

  if (scopes.includes('SETUP.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage Setups',
      icon: 'fa-screwdriver-wrench',
      link: '/',
    });
  }

  const isAdminPanelAccessable = AdminActionOptions[1]['sub-actions'].length > 0;

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="h-screen flex flex-col page-bg text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center shadow-lg h-12 px-4 py-2 md:px-8">
        <div className="font-bold text-xl ml-2 md:ml-4">Leetlab</div>
        <div className="hidden md:flex gap-4 mr-2 md:mr-4">
          <p className="px-1 py-2 hover:cursor-pointer">Problems</p>
          <p className="px-1 py-2 hover:cursor-pointer">Interview Prep</p>
        </div>
        <div className="md:hidden">
          <Menu onClick={() => setSideNavOpen(true)} className="w-6 h-6" />
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidenav */}
        <aside
          ref={sidenavRef}
          className={`sidenav-bg shadow-lg fixed z-40 md:static h-full transition-transform duration-300 md:w-[17%] w-64 p-4 flex-shrink-0 flex flex-col justify-between
                        ${isSideNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          <div>
            {/* Section 1 */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="box-border size-26 rounded-full p-4 bg-amber-200"></div>
              <div className="text-lg font-semibold">@Ayushya</div>
              <div className="flex gap-3">
                <button className="btn rounded-sm hover:cursor-pointer">
                  <i className="fas fa-cog text-gray-400 text-xl items-center p-2"></i>
                </button>
                <button className="btn rounded-sm hover:cursor-pointer">
                  <i className="fas fa-edit text-gray-400 text-xl items-center p-2"></i>
                </button>
                <button className="btn rounded-sm hover:cursor-pointer">
                  <i className="fas fa-sign-out-alt text-gray-400 text-xl items-center p-2"></i>
                </button>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col gap-2 mb-6 overflow-y-auto">
              {userActionOptions.map((action, index) => (
                <button key={index} className="btn p-[4px] rounded flex items-center hover:cursor-pointer">
                  <i className={`fas ${action.icon} text-gray-400 text-md items-center pl-2`}></i>
                  <p className="padding-left-10">{action.header}</p>
                </button>
              ))}
            </div>
            <hr className="border-t border-gray-400" />

            {/* Section 3 */}
            {isAdminPanelAccessable && (
              <div className="flex flex-col gap-2 my-6 overflow-y-auto">
                {AdminActionOptions.map((action, index) => (
                  <div key={index}>
                    <button className="w-full btn p-[4px] rounded flex items-center hover:cursor-pointer" onClick={() => toggleSection(index)}>
                      <i className={`fas ${action.icon} text-gray-400 text-md items-center pl-2`}></i>
                      <p className="padding-left-10">{action.header}</p>
                    </button>
                    {openSection === index && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {action['sub-actions'].map((subAction, subInd) => (
                          <button key={subInd} className="p-1 text-left flex items-center hover:cursor-pointer">
                            <i className={`fas ${subAction.icon} text-gray-400 text-sm items-center`}></i>
                            <p className="padding-left-10">{subAction.header}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navbar buttons for small screen */}
          <div className="md:hidden flex gap-2 justify-center mt-4">
            <p className="px-4 py-2">Problems</p>
            <p className="px-4 py-2">Interview Prep</p>
          </div>
        </aside>

        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
}
