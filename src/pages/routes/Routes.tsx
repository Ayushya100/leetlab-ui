import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// Components
import { DataTable } from '@/components/DataTable';
import { PopupMessage } from '@/components/PopupMessage';

// Services
import routesService from '@/services/routesConfigurations.service';

// Stores
import { useUserStore } from '@/stores/userStore';
import { useRouteStore } from '@/stores/routeStore';

// Table Header
const header = [
  {
    label: 'Path',
    key: 'path',
  },
  {
    label: 'Method',
    key: 'method',
  },
  {
    label: 'Service',
    key: 'service',
  },
];

function RoutesPage() {
  const [actionId, setActionId] = useState('');
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [messagePopupTitle, setMessagePopupTitle] = useState('');
  const [messagePopupMessage, setMessagePopupMessage] = useState('');

  // Router
  const { navigate } = useRouter();

  // Stores
  const routes = useRouteStore((state) => state.routes);
  const registerRoutes = useRouteStore((state) => state.registerRoutes);

  // Scopes
  const { scopes } = useUserStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await routesService.fetchAllRoutes();
        response.map((res: any) => (res.service = res.service.microservice));
        registerRoutes(response);
      } catch (err) {
        console.error(`Error fetching routes: ${JSON.stringify(err)}`);
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
      navigate({ to: `/setting/route/${action.id}` });
    } else if (action.type === 'delete') {
      setMessagePopupTitle('Delete Route Configuration');
      setMessagePopupMessage('Are you sure to delete the route configurations?');
      setShowPopupMessage(true);
    }
  };

  const onPopupMessageAction = async (action: any) => {
    if (action.type === 'confirm') {
      try {
        const response = await routesService.deleteRoute(actionId);
        const updatedRoutesList = routes.filter((route: any) => route.id !== response.id);
        registerRoutes(updatedRoutesList);
      } catch (err) {
        console.error(`Error deleting route configuration: ${JSON.stringify(err)}`);
      }
    }
    setShowPopupMessage(false);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="card h-full p-4 pb-6 rounded-md">
        <DataTable
          title={'Routes'}
          headers={header}
          tableData={routes}
          addAllowed={scopes.includes('ROUTE.U')}
          updateAllowed={scopes.includes('ROUTE.U')}
          deleteAllowed={scopes.includes('ROUTE.D')}
          itemsPerPage={10}
          onClickAction={onUserAction}
        />
      </div>

      {showPopupMessage && <PopupMessage title={messagePopupTitle} message={messagePopupMessage} onClickAction={onPopupMessageAction} />}
    </div>
  );
}

export default RoutesPage;
