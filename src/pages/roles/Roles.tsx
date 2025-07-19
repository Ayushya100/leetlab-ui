import { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';

// Components
import { DataTable } from '@/components/DataTable';
import { PopupMessage } from '@/components/PopupMessage';

// Service
import userRoleService from '@/services/userRoles.service';

// Stores
import { useUserStore } from '@/stores/userStore';
import { useRoleStore } from '@/stores/roleStore';

// Table Header
const header = [
  {
    label: 'Role Code',
    key: 'roleCode',
  },
  {
    label: 'Role Description',
    key: 'roleDesc',
  },
  {
    label: 'Active',
    key: 'active',
  },
  {
    label: 'Default',
    key: 'default',
  },
];

function RolesPage() {
  const [actionId, setActionId] = useState('');
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [messagePopupTitle, setMessagePopupTitle] = useState('');
  const [messagePopupMessage, setMessagePopupMessage] = useState('');

  // Router
  const { navigate } = useRouter();

  // Stores
  const roles = useRoleStore((state) => state.roles);
  const registerUserRoles = useRoleStore((state) => state.registerUserRoles);

  // Scopes
  const { scopes } = useUserStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userRoleService.fetchAllUserRole();
        registerUserRoles(response);
      } catch (err) {
        console.error(`Error fetching user roles: ${err}`);
      }
    };
    fetchData();
  }, []);

  // User Action
  const onUserAction = (action: any) => {
    if (action.id) {
      setActionId(action.id);
    }

    if (action.type === 'update' || action.type === 'add') {
      navigate({ to: `/setting/role/${action.id}` });
    } else if (action.type === 'delete') {
      setMessagePopupTitle('Delete User Role');
      setMessagePopupMessage('Are you sure to delete the user role');
      setShowPopupMessage(true);
    }
  };

  const onPopupMessageAction = async (action: any) => {
    if (action.type === 'confirm') {
      try {
        const response = await userRoleService.deleteUserRole(actionId);
        const updatedRolesList = roles.filter((role) => role.id !== response.id);
        registerUserRoles(updatedRolesList);
      } catch (err) {
        console.error(`Error deleteing user role: ${err}`);
      }
    }
    setShowPopupMessage(false);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="card h-full p-4 pb-6 rounded-md">
        <DataTable
          title={'User Roles'}
          headers={header}
          tableData={roles}
          addAllowed={scopes.includes('ROLE.U')}
          updateAllowed={scopes.includes('ROLE.U')}
          deleteAllowed={scopes.includes('ROLE.D')}
          itemsPerPage={10}
          onClickAction={onUserAction}
        />
      </div>

      {showPopupMessage && <PopupMessage title={messagePopupTitle} message={messagePopupMessage} onClickAction={onPopupMessageAction} />}
    </div>
  );
}

export default RolesPage;
