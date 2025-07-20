import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// Components
import { DataTable } from '@/components/DataTable';
import { PopupMessage } from '@/components/PopupMessage';

// Services
import serviceConfigurations from '@/services/serviceConfigurations.service';

// Stores
import { useServiceStore } from '@/stores/serviceStore';
import { useUserStore } from '@/stores/userStore';

// Table Header
const header = [
  {
    label: 'Service',
    key: 'microservice',
  },
  {
    label: 'Environment',
    key: 'environment',
  },
  {
    label: 'Protocol',
    key: 'protocol',
  },
  {
    label: 'Port',
    key: 'port',
  },
];

function ServicesPage() {
  const [actionId, setActionId] = useState('');
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [messagePopupTitle, setMessagePopupTitle] = useState('');
  const [messagePopupMessage, setMessagePopupMessage] = useState('');

  // Router
  const { navigate } = useRouter();

  // Stores
  const services = useServiceStore((state) => state.services);
  const registerServices = useServiceStore((state) => state.registerServices);

  // Scopes
  const { scopes } = useUserStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serviceConfigurations.fetchAllServices();
        registerServices(response);
      } catch (err) {
        console.error(`Error fetching services: ${err}`);
      }
    };
    fetchData();
  }, []);

  // User Actions
  const onUserAction = (action: any) => {
    if (action.id) {
      setActionId(action.id);
    }

    if (action.type === 'update' || action.type === 'add') {
      navigate({ to: `/setting/service/${action.id}` });
    } else if (action.type === 'delete') {
      setShowPopupMessage(true);
      setMessagePopupTitle('Delete Service Configuration');
      setMessagePopupMessage('Are you sure to delete the service configuration');
    }
  };

  const onPopupMessageAction = async (action: any) => {
    if (action.type === 'confirm') {
      try {
        const response = await serviceConfigurations.deleteServiceById(actionId);
        const updatedServiceList = services.filter((service) => service.id !== response.id);
        registerServices(updatedServiceList);
      } catch (err) {
        console.error(`Error deleting service configuration: ${JSON.stringify(err)}`);
      }
    }
    setShowPopupMessage(false);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="card h-full p-4 pb-6 rounded-md">
        <DataTable
          title={'Services'}
          headers={header}
          tableData={services}
          addAllowed={scopes.includes('SERVICE.U')}
          updateAllowed={scopes.includes('SERVICE.U')}
          deleteAllowed={scopes.includes('SERVICE.D')}
          itemsPerPage={10}
          onClickAction={onUserAction}
        />
      </div>

      {showPopupMessage && <PopupMessage title={messagePopupTitle} message={messagePopupMessage} onClickAction={onPopupMessageAction} />}
    </div>
  );
}

export default ServicesPage;
