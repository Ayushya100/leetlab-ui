import { Bell, Check, Code, CreditCard, File, Folder, Home, KeyRound, LayoutDashboard, Menu, Package, Palette, Search, Settings, Trash, User, Users } from 'lucide-react';
import { useState } from 'react';

// Sidebar Item (Reusable)
function SidebarItem({ navItems, onClick, selectedMenu }: any) {
  return (
    <div>
      {navItems.map((item: any) => (
        <div
          key={item.label}
          className={`flex items-center justify-between p-2 text-sm rounded cursor-pointer  ${item.action === selectedMenu ? 'sidenav-dark-bg font-medium primary-text' : 'ternary-btn'}`}
          onClick={() => onClick(item.action)}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.label}</span>
          </div>
          {item.badge && <span className="bg-blue-600 primary-text text-xs px-2 py-0 5 rounded-full">{item.badge}</span>}
        </div>
      ))}
    </div>
  );
}

function SettingsPage() {
  const [transparentSidebar, setTransparentSidebar] = useState(true);
  const [sidebarFeature, setSidebarFeature] = useState('Recent projects');
  const [tableView, setTableView] = useState('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('appearance');

  const navItems = [
    { label: 'My details', action: 'home', icon: <User size={18} /> },
    { label: 'Profile', action: 'profile', icon: <LayoutDashboard size={18} /> },
    { label: 'Password', action: 'password', icon: <KeyRound size={18} /> },
    { label: 'Appearance', action: 'appearance', icon: <Palette size={18} />, active: true },
    { label: 'Team', action: 'team', icon: <Users size={18} /> },
    { label: 'Billing', action: 'billing', icon: <CreditCard size={18} />, badge: 12 },
    { label: 'Applications', action: 'applications', icon: <Package size={18} /> },
    { label: 'API', action: 'api', icon: <Code size={18} /> },
  ];

  // Closes mobile sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-[99.5%] card-bg primary-text">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'fixed z-50 inset-y-0 left-0 w-64' : 'hidden'} md:flex h-full flex-col main-bg primary-text border-r border-color`}>
        <div className="p-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-lg font-semibold">Leetlab</h2>
        </div>

        <div className="px-4 mb-4">
          <input type="text" placeholder="search" className="w-full px-3 py-2 rounded-md border-1 border-color card-bg primary-text focus:outline-none" />
        </div>

        <nav className="flex-1 px-2 space-y-1 overflow-auto rounded-b-md">
          <SidebarItem navItems={navItems} onClick={(selectedItem: string) => setSelectedMenu(selectedItem)} selectedMenu={selectedMenu} />
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeSidebar}></div>}

      {/* Main Content area */}

      {/* Appearence Section */}
      {selectedMenu === 'appearance' && (
        <main className="flex-1 h-full card-bg overflow-auto text-sm">
          <div className="max-w-[95%] mx-auto py-6 primary-text">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h1 className="text-2xl font-semibold mb-1">Settings</h1>
                <p className="secondary-text mb-3">Change how Leetcode looks and feels in your browser.</p>
              </div>
              <button className="md:hidden p-2" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="w-6 h-6 secondary-text" />
              </button>
            </div>

            <div className="border-t border-color">
              {/* COMPONENT: Transparent Sidebar Toggle */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/3">
                  <label className="font-medium block">Transparent sidebar</label>
                  <p className="secondary-text text-sm block mb-2">Make the desktop sidebar transparent.</p>
                </div>
                <label className="relative inline-flex basis-2/3 items center cursor-pointer">
                  <input type="checkbox" checked={transparentSidebar} onChange={() => setTransparentSidebar(!transparentSidebar)} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </section>
            </div>

            <div className="border-t border-color">
              {/* COMPONENT: Sidebar Feature Dropdown */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/3">
                  <label className="font-medium block">Sidebar feature</label>
                  <p className="secondary-text text-sm block mb-2">What shows in the desktop sidebar.</p>
                </div>
                <select
                  value={sidebarFeature}
                  onChange={(e) => setSidebarFeature(e.target.value)}
                  className="border-1 basis-2/3 border-color card-bg secondary-text p-2 rounded w-full max-w-xs"
                >
                  {['Recent projects', 'Favorites', 'Team activity'].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </section>
            </div>

            <div className="border-t border-color">
              {/* COMPONENT: Table View Selector */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/3">
                  <label className="font-medium block">Table view</label>
                  <p className="secondary-text text-sm block mb-2">How are tables displayed in the app.</p>
                </div>
                <div className="flex basis-2/3 gap-4 flex-wrap">
                  {['default', 'compact'].map((view) => (
                    <button
                      key={view}
                      onClick={() => setTableView(view)}
                      className={`relative p-3 border rounded-md w-40 text-sm capitalize text-left transition cursor-pointer ${
                        tableView === view ? 'border-blue-500 border-2 sidenav-dark-bg' : 'border-gray-600'
                      }`}
                    >
                      {tableView === view && (
                        <span className="absolute top-[-5px] right-[-5px] bg-blue-600 text-white rounded-full p-1">
                          <Check className="w-3 h-3 rounded-full" strokeWidth={3} />
                        </span>
                      )}
                      {view}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="border-t border-color">
              {/* COMPONENT: Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button className="secondary-btn text-sm py-[6px] px-4 rounded-md">Cancel</button>
                <button className="primary-btn text-sm py-[6px] px-4 rounded-md">Save changes</button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* My Details */}
      {selectedMenu === 'home' && (
        <main className="flex-1 h-full card-bg overflow-auto text-sm">
          <div className="max-w-[95%] mx-auto py-6 primary-text">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h1 className="text-2xl font-semibold mb-1">Sophie Chamberlain</h1>
                <p className="secondary-text mb-3">Manage your details and personal preferences here.</p>
              </div>
              <button className="md:hidden p-2" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="w-6 h-6 secondary-text" />
              </button>
            </div>

            {/* Basics Menu */}
            <label className="font-medium text-lg block mb-2">Basics</label>

            <div className="border-t border-color">
              {/* Avatar */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/4">
                  <label className="font-medium block">Photo</label>
                </div>
                <label className="relative inline-flex basis-2/4 items center cursor-pointer">
                  <img src="https://i.pravatar.cc/100?img=3" alt="avatar" className="h-10 w-10 rounded-full mt-1" />
                </label>
                <label className="flex justify-end basis-1/4">
                  <button className="secondary-btn text-sm py-[6px] px-4 rounded-md">Edit</button>
                </label>
              </section>
            </div>

            <div className="border-t border-color">
              {/* Name */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/4">
                  <label className="font-medium block">Name</label>
                </div>
                <label className="relative inline-flex basis-2/4 items center cursor-pointer">
                  <p className="font-medium">Sophie Chamberlain</p>
                </label>
                <label className="flex justify-end basis-1/4">
                  <button className="secondary-btn text-sm py-[6px] px-4 rounded-md">Edit</button>
                </label>
              </section>
            </div>

            <div className="border-t border-color">
              {/* Email */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/4">
                  <label className="font-medium block">Eamil address</label>
                </div>
                <label className="relative inline-flex basis-2/4 items center cursor-pointer">
                  <p className="font-medium">hi@sophiechamberlain.co</p>
                </label>
                <label className="flex justify-end basis-1/4">
                  <button className="secondary-btn text-sm py-[6px] px-4 rounded-md">Edit</button>
                </label>
              </section>
            </div>

            {/* Preferences Menu */}
            <div className="border-t border-color">
              <label className="font-medium text-lg block my-4">Preferences</label>
            </div>

            <div className="border-t border-color">
              {/* Languages */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/4">
                  <label className="font-medium block">Language</label>
                </div>
                <select
                  value={sidebarFeature}
                  onChange={(e) => setSidebarFeature(e.target.value)}
                  className="border-1 basis-2/3 border-color card-bg secondary-text p-2 rounded w-full max-w-[160px]"
                >
                  {['English', 'Hind'].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </section>
            </div>

            <div className="border-t border-color">
              {/* Date */}
              <section className="mb-6 mt-3 flex flex-row items-center">
                <div className="items-center basis-1/4">
                  <label className="font-medium block">Date Format</label>
                </div>
                <select
                  value={sidebarFeature}
                  onChange={(e) => setSidebarFeature(e.target.value)}
                  className="border-1 basis-2/3 border-color card-bg secondary-text p-2 rounded w-full max-w-[160px]"
                >
                  {['DD/MM/YYYY', 'MM/DD/YYYY'].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </section>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default SettingsPage;
