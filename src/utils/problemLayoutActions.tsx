import { FileCode, FileText, HelpCircle, Languages, Layers, List, LogOut, Route, Settings, Settings2, ShieldCheck, Sliders, Tags, User, UserCog, Wrench } from 'lucide-react';

export function getProblemsLayoutActions(scopes: Array<string> = []) {
  // Dropdown Actions
  const UserDropdownOptions = [
    {
      header: 'My profile',
      icon: <User size={18} />,
      action: '/profile',
    },
    {
      header: 'How to Use',
      icon: <HelpCircle size={18} />,
      action: '/usage',
    },
    {
      header: 'Sign out',
      icon: <LogOut size={18} />,
      action: '/sign-out',
    },
  ];

  // User Profile Actions
  const UserProfileActionOptions = [
    {
      header: 'Settings',
      icon: <Settings size={18} />,
      action: '/settings',
    },
    {
      header: 'Edit profile',
      icon: <UserCog size={18} />,
      action: '/edit-profile',
    },
    {
      header: 'Sign out',
      icon: <LogOut size={18} />,
      action: '/signout',
    },
  ];

  // User Actions
  const UserActionOptions = [
    {
      header: 'Problems',
      icon: <FileCode size={18} />,
      action: '/problems',
    },
    {
      header: 'Popular Lists',
      icon: <List size={18} />,
      action: '/problems/list',
    },
  ];

  // Admin Actions
  const AdminActionOptions = [];

  if (scopes.includes('SHEET.V')) {
    AdminActionOptions.push({
      header: 'Sheets',
      icon: <FileText size={18} />,
      'sub-actions': [
        {
          header: 'Register Sheets',
          icon: <FileCode size={18} />,
          action: 'sheets',
        },
      ],
    });
  }

  if (scopes.includes('SHEETTYPE.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Manage Sheet Types',
      icon: <Layers size={18} />,
      action: 'sheet-type',
    });
  }

  if (scopes.includes('SHEETTAG.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Manage Sheet Tags',
      icon: <Tags size={18} />,
      action: 'sheet-tag',
    });
  }

  if (scopes.includes('SHEETLANG.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Manage Languages',
      icon: <Languages size={18} />,
      action: 'sheet-language',
    });
  }

  if (scopes.includes('PLAYLIST.V')) {
    AdminActionOptions[0]['sub-actions'].push({
      header: 'Register Popular Lists',
      icon: <List size={18} />,
      action: 'lists',
    });
  }

  if (scopes.includes('ROLE.V')) {
    AdminActionOptions.push({
      header: 'Configurations',
      icon: <Wrench size={18} />,
      'sub-actions': [
        {
          header: 'Manage User Roles',
          icon: <UserCog size={18} />,
          action: '/setting/role',
        },
      ],
    });
  }

  if (scopes.includes('SCOPE.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage User Scopes',
      icon: <ShieldCheck size={18} />,
      action: '/setting/scope',
    });
  }

  if (scopes.includes('SERVICE.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage Services',
      icon: <Settings2 size={18} />,
      action: '/setting/service',
    });
  }

  if (scopes.includes('ROUTE.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage Routes',
      icon: <Route size={18} />,
      action: 'routes',
    });
  }

  if (scopes.includes('SETUP.V')) {
    AdminActionOptions[1]['sub-actions'].push({
      header: 'Manage Setups',
      icon: <Sliders size={18} />,
      action: 'setup',
    });
  }

  return {
    UserDropdownOptions,
    UserProfileActionOptions,
    UserActionOptions,
    AdminActionOptions,
  };
}
