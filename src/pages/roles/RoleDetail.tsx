import { useParams, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// Components
import Form from '@/components/Form';
import { DataTable } from '@/components/DataTable';
import { PopupTable } from '@/components/PopupTable';

// Stores
import { useUserStore } from '@/stores/userStore';
import { useRoleStore } from '@/stores/roleStore';

// Services
import userRoleService from '@/services/userRoles.service';
import { PopupMessage } from '@/components/PopupMessage';

// Table Header
const tableHeaders = [
  {
    label: 'Role Code',
    key: 'roleCode',
    type: 'text',
    readOnly: true,
  },
  {
    label: 'Role Description',
    key: 'roleDesc',
    type: 'text',
    readOnly: false,
  },
  {
    label: 'Active Role',
    key: 'active',
    type: 'checkbox',
    readOnly: false,
  },
  {
    label: 'Default Role',
    key: 'default',
    type: 'checkbox',
    readOnly: false,
  },
  {
    label: 'Created Date',
    key: 'createdDate',
    type: 'text',
    readOnly: true,
  },
  {
    label: 'Last Modified Date',
    key: 'modifiedDate',
    type: 'text',
    readOnly: true,
  },
];

const scopeHeader = [
  {
    label: 'Scope Code',
    key: 'scopeCode',
  },
  {
    label: 'Scope Description',
    key: 'scopeDesc',
  },
];

function RoleDetailPage() {
  const [pageTitle, setPageTitle] = useState('Add');
  const [activeTab, setActiveTab] = useState('detail');
  const [messagePopupTitle, setMessagePopupTitle] = useState('');
  const [messagePopupMessage, setMessagePopupMessage] = useState('');

  const [scopesFetched, setScopesFetched] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedUnassignedIds, setSelectedUnassignedIds] = useState<Array<string>>([]);
  const [selectedActionIds, setSelectedActionIds] = useState<any>([]);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMessage, setShowPopupMessage] = useState(false);

  // Router
  const { navigate } = useRouter();
  const { id } = useParams({ from: '/setting/role/$id' });

  // Stores
  const roleDtl = useRoleStore((state) => state.roleDtl);
  const registerUserRoleDtl = useRoleStore((state) => state.registerUserRoleDtl);
  const clearUserRoleDtl = useRoleStore((state) => state.clearUserRoleDtl);
  const roleScopes = useRoleStore((state) => state.roleScopes);
  const registerUserRoleScope = useRoleStore((state) => state.registerUserRoleScope);
  const clearUserRoleScope = useRoleStore((state) => state.clearUserRoleScope);
  const unassignedScopes = useRoleStore((state) => state.unassignedScopes);
  const registerUnassignedScopes = useRoleStore((state) => state.registerUnassignedScopes);
  const clearUnassignedScopes = useRoleStore((state) => state.clearUnassignedScopes);

  // Scopes
  const { scopes } = useUserStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userRoleService.fetchUserRoleById(id);
        response.createdDate = response.createdDate.split(' ')[0];
        response.modifiedDate = response.modifiedDate.split(' ')[0];
        registerUserRoleDtl(response);

        if (id !== 'NEW' && scopes.includes('ROLE.U')) {
          setPageTitle(`Update | ${response.roleDesc}`);
        } else {
          setPageTitle(`View | ${response.roleDesc}`);
          tableHeaders.map((header) => (header.readOnly = true));
        }
      } catch (err) {
        console.error(`Error fetching user role details: ${err}`);
      }
    };

    if (id === 'NEW') {
      setPageTitle('Add');
    } else {
      fetchData();
    }
  }, [id, scopes, registerUserRoleDtl]);

  // User Action
  const handleCancelAction = () => {
    clearUserRoleDtl();
    clearUserRoleScope();
    clearUnassignedScopes();
    navigate({ to: '/setting/role' });
  };

  // Scope Action
  const onScopeAction = (action: any) => {
    if (action.type === 'add') {
      const fetchData = async () => {
        const response = await userRoleService.fetchUserUnassignedScopes(id);
        registerUnassignedScopes(response);
        setShowPopup(true);
      };
      fetchData();
    } else if (action.type === 'multi-delete' || action.type === 'delete') {
      setSelectedActionIds(action.type === 'multi-delete' ? selectedIds : [action.id]);
      setSelectedIds([]);

      setMessagePopupTitle(action.type === 'multi-delete' ? 'Delete Scopes' : 'Delete Scope');
      setMessagePopupMessage(action.type === 'multi-delete' ? 'Are you sure to delete the assigned scopes?' : 'Are you sure to delete the assigned scope');
      setShowPopupMessage(true);
    }
  };

  // Update User Scopes Action
  const updateUserAssignedScopes = async (scopesArr: Array<string>) => {
    try {
      const response = await userRoleService.updateUserAssignedScopes(id, scopesArr);
      registerUserRoleScope(response.scopes);
      setSelectedIds([]);
      setSelectedActionIds([]);
    } catch (err) {
      console.error(`Error updating user scopes: ${err}`);
    }
  };

  const onPopupScopeAction = async (action: any) => {
    if (action.type === 'add') {
      const existingScopesId = roleScopes.length > 0 ? roleScopes.map((scope) => scope.id) : [];
      setSelectedActionIds([...existingScopesId, ...selectedUnassignedIds]);
      setSelectedUnassignedIds([]);

      await updateUserAssignedScopes([...existingScopesId, ...selectedUnassignedIds]);
    }
    setSelectedUnassignedIds([]);
    setShowPopup(false);
  };

  const onPopupMessageAction = async (action: any) => {
    if (action.type === 'confirm') {
      const newScopesId = roleScopes.filter((scope) => !selectedActionIds.includes(scope.id)).map((scope) => scope.id);
      await updateUserAssignedScopes(newScopesId);
    }
    setShowPopupMessage(false);
  };

  const onRoleUpdateAction = async (action: any) => {
    if (action.type === 'save') {
      if (id !== 'NEW') {
        const updateRoleData = {
          roleDesc: roleDtl.roleDesc,
          active: roleDtl.active,
          default: roleDtl.default,
        };

        const response = await userRoleService.updateUserRole(id, updateRoleData);
        response.createdDate = response.createdDate.split(' ')[0];
        response.modifiedDate = response.modifiedDate.split(' ')[0];
        registerUserRoleDtl(response);
      } else {
        const newRoleData = {
          roleCode: roleDtl.roleCode,
          roleDesc: roleDtl.roleDesc,
          active: roleDtl.active || false,
          default: roleDtl.default || false,
        };

        const response = await userRoleService.registerUserRole(newRoleData);
        navigate({ to: `/setting/role/${response.id}` });
      }
    }
  };

  // User Scopes API Function
  const fetchRoleScopes = async () => {
    try {
      const response = (await userRoleService.fetchUserAssignedScopes(id)) || [];
      registerUserRoleScope(response);
      setScopesFetched(true);
    } catch (err) {
      console.error(`Error fetching user scope details: ${err}`);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="h-full rounded-md p-6 w-full">
        <div className="flex justify-between">
          <p className="text-xl font-semibold primary-text">{pageTitle}</p>
          <button className="secondary-btn text-sm py-[6px] px-4 rounded-md" onClick={handleCancelAction}>
            Cancel
          </button>
        </div>

        <div className="mt-4 border-b border-color">
          <div className="flex gap-1 ml-2 mb-2 font-semibold">
            <button
              className={`py-2 px-4 text-sm rounded-sm hover:cursor-pointer ${activeTab === 'detail' ? 'active-tab-btn' : 'secondary-text'}`}
              onClick={() => setActiveTab('detail')}
            >
              Details
            </button>
            {id !== 'NEW' && scopes.includes('SCOPE.V') && (
              <button
                className={`py-2 px-4 text-sm rounded-sm hover:cursor-pointer ${activeTab === 'scopes-list' ? 'active-tab-btn' : 'secondary-text'}`}
                onClick={() => {
                  setActiveTab('scopes-list');
                  if (!scopesFetched && id !== 'NEW') {
                    fetchRoleScopes();
                  }
                }}
              >
                Scopes Assigned
              </button>
            )}
          </div>
        </div>

        {activeTab === 'detail' && (
          <Form
            tableHeader={'Role Details'}
            tableSummary={'A summary that defines the purpose and responsibilities of the role.'}
            headers={tableHeaders}
            data={roleDtl}
            updateAllowed={scopes.includes('ROLE.U')}
            onClickAction={onRoleUpdateAction}
            onDataChange={registerUserRoleDtl}
          />
        )}
        {activeTab === 'scopes-list' && (
          <div className="mt-4">
            <DataTable
              title={'Assigned Scopes'}
              titleSize={'text-medium'}
              headers={scopeHeader}
              tableData={roleScopes}
              addAllowed={scopes.includes('SCOPE.U')}
              deleteAllowed={scopes.includes('SCOPE.D')}
              multiDeleteAllowed={scopes.includes('SCOPE.D')}
              selectable={true}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onClickAction={onScopeAction}
            />
          </div>
        )}
      </div>

      {showPopup && (
        <PopupTable
          title={'Add Scopes'}
          headers={scopeHeader}
          tableData={unassignedScopes}
          addAllowed={scopes.includes('SCOPE.U')}
          selectable={true}
          cancelAllowed={true}
          selectedIds={selectedUnassignedIds}
          onSelectionChange={setSelectedUnassignedIds}
          onClickAction={onPopupScopeAction}
        />
      )}

      {showPopupMessage && <PopupMessage title={messagePopupTitle} message={messagePopupMessage} onClickAction={onPopupMessageAction} />}
    </div>
  );
}

export default RoleDetailPage;
