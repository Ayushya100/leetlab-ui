/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useRouter } from '@tanstack/react-router';
import { Menu } from 'lucide-react';

// Utils
import { getProblemsLayoutActions } from '@/utils/problemLayoutActions';

// Components
import { Dropdown } from '@/components/Dropdown';
import { Toast } from '@/components/Toast';
import { Loader } from '@/components/Loader';

// Stores
import { useUserStore } from '@/stores/userStore';
import { useToastStore } from '@/stores/toastStore';
import { useLoadingStore } from '@/stores/loaderStore';

export default function () {
  const avatarRef = useRef<HTMLDivElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [selectedHeader, setSelectedHeader] = useState('');
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  // Stores
  const { isOpen, message, resStatus, type, hideToast } = useToastStore();
  const isLoading = useLoadingStore((state) => state.isLoading);

  // Page Route
  const location = useLocation();
  const pathName = location.pathname;

  const { scopes } = useUserStore.getState();
  const { UserDropdownOptions, UserProfileActionOptions, UserActionOptions, AdminActionOptions } = getProblemsLayoutActions(scopes);

  const { navigate } = useRouter();

  // Constants
  const theme = 'white-theme';
  const userAvatar = 'https://randomuser.me/api/portraits/women/4.jpg';
  const userName = '@Caitlyn';
  const accountName = 'Caitlyn King';

  const isAdminPanelAccessable = AdminActionOptions[1]['sub-actions'].length > 0;

  // Use effect function to close the popup on menu open
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSection = (section: any) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Set Page Headers
  const formatHeader = (...headers: Array<string>) => {
    return headers.filter(Boolean).join(' > ');
  };

  const getDynamicHeader = (validatePathName: string) => {
    let headerText = '';

    // Search UserProfileActionOptions
    for (const action of UserProfileActionOptions) {
      if (action.action === validatePathName) {
        headerText = action.header;
        break;
      }
    }

    // Search UserActionOptions if not found
    if (!headerText) {
      for (const action of UserActionOptions) {
        if (action.action === validatePathName) {
          headerText = action.header;
          break;
        }
      }
    }

    // Search AdminActionOptions sub-actions
    if (!headerText) {
      for (const admin of AdminActionOptions) {
        const sub = admin['sub-actions']?.find((subAction) => subAction.action === validatePathName);
        if (sub) {
          headerText = formatHeader(admin.header, sub.header);
          break;
        }
      }
    }

    return headerText;
  };

  useEffect(() => {
    let cleanPath = pathName.split('?')[0];
    const pathSegment = cleanPath.split('/');

    let headerText = '';
    let isHeaderFound = false;

    while (pathSegment.length > 0 && !isHeaderFound) {
      cleanPath = pathSegment.join('/');
      pathSegment.pop();
      headerText = getDynamicHeader(cleanPath);

      if (headerText.length > 0) {
        isHeaderFound = true;
      }
    }

    setSelectedHeader(headerText);
  }, [pathName, UserProfileActionOptions, UserActionOptions, AdminActionOptions]);

  // Mobile View sidenav to be generated later
  // Closes mobile sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`${theme}`}>
      <div className={`flex h-screen main-bg primary-text`}>
        {isLoading && <Loader />}

        {/* Toast Notification */}
        {isOpen && <Toast message={message} resStatus={resStatus} type={type} onClose={hideToast} />}

        {/* Sidenav */}
        <aside className={`${isSidebarOpen ? 'fixed z-50 inset-y-0 left-0 w-58 border-r border-color' : 'hidden'} md:flex h-full flex-col main-bg primary-text`}>
          <div className="w-58 p-4 flex flex-col justify-between">
            <div>
              <h1 className="text-xl font-bold mb-6">Leetlab</h1>
              {/* Section 1 */}
              <div className="mt-6 space-y-1">
                <div className="p-3 flex items-center space-x-3">
                  <img src={userAvatar} alt={accountName} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-medium">{accountName}</div>
                    <div className="text-xs text-gray-500">{userName}</div>
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  {UserProfileActionOptions.map((action, index) => (
                    <button
                      key={index}
                      className="secondary-btn rounded-sm hover:cursor-pointer p-2"
                      onClick={() => {
                        navigate({ to: action.action });
                      }}
                    >
                      {action.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 2 */}
              <div className="mt-6 border-t border-color pt-4">
                <div className="text-sm ternary-btn-text space-y-1">
                  {UserActionOptions.map((action, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center p-2 ternary-btn rounded"
                      onClick={() => {
                        navigate({ to: action.action });
                      }}
                    >
                      {action.icon}
                      <p className="pl-2">{action.header}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              {isAdminPanelAccessable && (
                <div className="mt-6 border-t border-color pt-4">
                  <h2 className="text-xs secondary-text uppercase mb-2">Management</h2>
                  <div className="space-y-1 text-sm ternary-btn-text">
                    {AdminActionOptions.map((action, index) => (
                      <div key={index}>
                        <button
                          className="flex w-full items-center p-2 ternary-btn rounded"
                          onClick={() => {
                            toggleSection(index);
                          }}
                        >
                          {action.icon}
                          <p className="pl-2">{action.header}</p>
                        </button>
                        {openSection === index && (
                          <div className="mt-1 pl-2 flex flex-col gap-1 sidenav-dark-bg">
                            {action['sub-actions'].map((subAction, subInd) => (
                              <button
                                key={subInd}
                                className="flex w-full items-center p-2 ternary-btn rounded"
                                onClick={() => {
                                  navigate({ to: subAction.action });
                                  toggleSection(index);
                                }}
                              >
                                {subAction.icon}
                                <p className="pl-2">{subAction.header}</p>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && <div className="fixed inset-0 bg-opacity-500 z-40 md:hidden" onClick={closeSidebar}></div>}

        <div className="flex-1 flex flex-col m-2 rounded-md card-bg card-shadow">
          {/* Topbar */}
          <div className="md:hidden w-[99%] flex justify-between px-2 py-2 border-b border-color">
            <h1 className="text-xl font-bold flex items-center">Leetlab</h1>
            <button className="md:hidden py-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6 secondary-text" />
            </button>
          </div>
          <div className="flex rounded-md">
            <div className="w-full flex justify-center">
              <div className="w-[99%] flex items-center justify-between p-3 border-b border-color">
                <div className="secondary-text text-sm">{selectedHeader}</div>
                <div className="flex items-center space-x-4">
                  <div className="relative flex items-center" ref={avatarRef}>
                    <img src={userAvatar} alt={accountName} className="w-8 h-8 rounded-full cursor-pointer" onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} />

                    {avatarMenuOpen && (
                      <Dropdown
                        dropdownList={UserDropdownOptions}
                        onClickAction={() => {
                          console.log('Testing');
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="h-full overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
