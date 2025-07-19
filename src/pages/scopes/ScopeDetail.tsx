import { useEffect, useState } from "react";
import { useParams, useRouter } from "@tanstack/react-router";

// Stores
import { useUserStore } from "@/stores/userStore";
import { useScopeStore } from "@/stores/scopeStore";

// Components
import Form from "@/components/Form";

// Services
import userScopeService from "@/services/userScopes.service";

// Form Header
const formHeaders = [
    {
        label: 'Scope Code',
        key: 'scopeCode',
        type: 'text',
        readOnly: true
    },
    {
        label: 'Scope Description',
        key: 'scopeDesc',
        type: 'text',
        readOnly: false
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
]

function ScopeDetailPage() {
    const [headers, setHeaders] = useState(formHeaders);
    const [pageTitle, setPageTitle] = useState('Add');

    // Router
    const { navigate } = useRouter();
    const { id } = useParams({ from: '/setting/scope/$id' });

    // Stores
    const scopeDtl = useScopeStore((state) => state.scopeDtl);
    const registerUserScopeDtl = useScopeStore((state) => state.registerUserScopeDtl);
    const clearUserScopeDtl = useScopeStore((state) => state.clearUserScopeDtl);

    // Scopes
    const { scopes } = useUserStore.getState();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await userScopeService.fetchUserScopeById(id);
                response.createdDate = response.createdDate.split(' ')[0];
                response.modifiedDate = response.modifiedDate.split(' ')[0];
                registerUserScopeDtl(response);

                if (id !== 'NEW' && scopes.includes('SCOPE.U')) {
                    setPageTitle(`Update | ${response.scopeDesc}`);
                    setHeaders(formHeaders.map((header) => {
                        header.readOnly = header.key === 'scopeCode' ? true : header.readOnly;
                        return header;
                    }));
                } else {
                    setPageTitle(`View | ${response.scopeDesc}`);
                    setHeaders(formHeaders.map((header) => {
                        header.readOnly = true;
                        return header;
                    }));
                }
            } catch (err) {
                console.error(`Error fetching user scope details: ${err}`);
            }
        };

        if (id === 'NEW') {
            setPageTitle('Add');

            const updatedHeaderData = formHeaders.map((header) => {
                header.readOnly = header.key === 'scopeCode' ? false : header.readOnly;
                return header;
            }).filter((header) => {
                const fieldsToExclude = ['createdDate', 'modifiedDate'];
                return !fieldsToExclude.includes(header.key);
            });
            setHeaders(updatedHeaderData);
        } else {
            fetchData();
        }
    }, [id, scopes, registerUserScopeDtl]);

    // User Action
    const handleCancelAction = () => {
        clearUserScopeDtl();
        navigate({ to: '/setting/scope' });
    }

    const onScopeUpdateAction = async(action: any) => {
        if (action.type === 'save') {
            if (id !== 'NEW') {
                const updateScopeData = {
                    scopeDesc: scopeDtl.scopeDesc
                };
                
                const response = await userScopeService.updateUserScopeById(id, updateScopeData);
                response.createdDate = response.createdDate.split(' ')[0];
                response.modifiedDate = response.modifiedDate.split(' ')[0];
                registerUserScopeDtl(response);
            } else {
                const newScopeData = {
                    scopeCode: scopeDtl.scopeCode,
                    scopeDesc: scopeDtl.scopeDesc
                };
                
                const response = await userScopeService.registerUserScope(newScopeData);
                navigate({ to: `/setting/scope/${response.id}` });
            }
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
                            className='py-2 px-4 text-sm rounded-sm hover:cursor-pointer active-tab-btn'
                        >
                            Details
                        </button>
                    </div>
                </div>

                <Form 
                    tableHeader={'Scope Details'}
                    tableSummary={'A scope that defines the permissions and access levels granted to a standard user within the system.'}
                    headers={headers}
                    data={scopeDtl}
                    updateAllowed={scopes.includes('SCOPE.U')}
                    onClickAction={onScopeUpdateAction}
                    onDataChange={registerUserScopeDtl}
                />
            </div>
        </div>
    );
}

export default ScopeDetailPage;
