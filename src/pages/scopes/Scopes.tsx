import { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';

// Components
import { DataTable } from '@/components/DataTable';
import { PopupMessage } from '@/components/PopupMessage';

// Service
import userScopeService from '@/services/userScopes.service';

// Stores
import { useScopeStore } from '@/stores/scopeStore';
import { useUserStore } from '@/stores/userStore';

// Table Header
const header = [
  {
    label: 'Scope Code',
    key: 'scopeCode',
  },
  {
    label: 'Scope Description',
    key: 'scopeDesc',
  },
];

function ScopesPage() {
  const [actionId, setActionId] = useState('');
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [messagePopupTitle, setMessagePopupTitle] = useState('');
  const [messagePopupMessage, setMessagePopupMessage] = useState('');

  // Router
  const { navigate } = useRouter();

  // Stores
  const scope = useScopeStore((state) => state.scopes);
  const registerUserScopes = useScopeStore((state) => state.registerUserScopes);

  // Scopes
  const { scopes } = useUserStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userScopeService.fetchAllUserScope();
        registerUserScopes(response);
      } catch (err) {
        console.error(`Error fetching user scopes: ${err}`);
      }
    };
    fetchData();
  }, []);

  const onUserAction = (action: any) => {
    if (action.id) {
      setActionId(action.id);
    }

    if (action.type === 'update' || action.type === 'add') {
      navigate({ to: `/setting/scope/${action.id}` });
    } else if (action.type === 'delete') {
      setMessagePopupTitle('Delete User Scope');
      setMessagePopupMessage('Are you sure to delete the user scope?');
      setShowPopupMessage(true);
    }
  };

  const onPopupMessageAction = async (action: any) => {
    if (action.type === 'confirm') {
      try {
        const response = await userScopeService.deleteUserScope(actionId);
        const updatedScopesList = scope.filter((scp) => scp.id !== response.id);
        registerUserScopes(updatedScopesList);
      } catch (err) {
        console.error(`Error deleting user scope: ${err}`);
      }
    }
    setShowPopupMessage(false);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="card h-full p-4 pb-6 rounded-md">
        <DataTable
          title={'User Scopes'}
          headers={header}
          tableData={scope}
          addAllowed={scopes.includes('SCOPE.U')}
          updateAllowed={scopes.includes('SCOPE.U')}
          deleteAllowed={scopes.includes('SCOPE.D')}
          itemsPerPage={10}
          onClickAction={onUserAction}
        />
      </div>

      {showPopupMessage && <PopupMessage title={messagePopupTitle} message={messagePopupMessage} onClickAction={onPopupMessageAction} />}
    </div>
  );
}

export default ScopesPage;
