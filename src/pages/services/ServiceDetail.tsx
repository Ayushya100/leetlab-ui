import { useParams, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// Components
import Form from '@/components/Form';

// Services
import serviceConfigurations from '@/services/serviceConfigurations.service';

// Stores
import { useUserStore } from '@/stores/userStore';
import { useServiceStore } from '@/stores/serviceStore';

// Form Header
const formHeaders = [
  {
    label: 'Service',
    key: 'microservice',
    type: 'text',
    readOnly: false,
  },
  {
    label: 'Environment',
    key: 'environment',
    type: 'text',
    readOnly: false,
  },
  {
    label: 'Protocol',
    key: 'protocol',
    type: 'options',
    readOnly: false,
    options: [
      { label: 'HTTP', value: 'HTTP' },
      { label: 'HTTPS', value: 'HTTPS' },
    ],
  },
  {
    label: 'Port',
    key: 'port',
    type: 'text',
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

function ServiceDetailPage() {
  const [headers, setHeaders] = useState(formHeaders);
  const [pageTitle, setPageTitle] = useState('Add');

  // Router
  const { navigate } = useRouter();
  const { id } = useParams({ from: '/setting/service/$id' });

  // Stores
  const serviceDtl = useServiceStore((state) => state.serviceDtl);
  const registerServiceDtl = useServiceStore((state) => state.registerServiceDtl);
  const clearServiceDtl = useServiceStore((state) => state.clearServiceDtl);

  // Scopes
  const { scopes } = useUserStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serviceConfigurations.fetchServiceById(id);
        response.createdDate = response.createdDate.split(' ')[0];
        response.modifiedDate = response.modifiedDate.split(' ')[0];
        registerServiceDtl(response);

        if (id !== 'NEW' && scopes.includes('SERVICE.U')) {
          setPageTitle(`Update | ${response.microservice}`);
          setHeaders(formHeaders);
        } else {
          setPageTitle(`View | ${response.microservice}`);
          setHeaders(formHeaders);
        }
      } catch (err) {
        console.error(`Error fetching service details: ${JSON.stringify(err)}`);
      }
    };

    if (id === 'NEW') {
      setPageTitle('Add');

      const updatedHeaderData = formHeaders.filter((header) => {
        const fieldsToExclude = ['createdDate', 'modifiedDate'];
        return !fieldsToExclude.includes(header.key);
      });
      setHeaders(updatedHeaderData);
    } else {
      fetchData();
    }
  }, [id, scopes, registerServiceDtl]);

  // User Action
  const handleCancelAction = () => {
    clearServiceDtl();
    navigate({ to: '/setting/service' });
  };

  const onServiceUpdateAction = async (action: any) => {
    if (action.type === 'save') {
      if (id !== 'NEW') {
        const updateServiceData = {
          microservice: serviceDtl.microservice,
          environment: serviceDtl.environment,
          protocol: serviceDtl.protocol,
          port: serviceDtl.port,
        };

        const response = await serviceConfigurations.updateServiceById(id, updateServiceData);
        response.createdDate = response.createdDate.split(' ')[0];
        response.modifiedDate = response.modifiedDate.split(' ')[0];
        registerServiceDtl(response);
      } else {
        const newServiceData = {
          microservice: serviceDtl.microservice,
          environment: serviceDtl.environment,
          protocol: serviceDtl.protocol,
          port: serviceDtl.port,
        };

        const response = await serviceConfigurations.registerService(newServiceData);
        navigate({ to: `/setting/service/${response.id}` });
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
            <button className="py-2 px-4 text-sm rounded-sm hover:cursor-pointer active-tab-btn">Details</button>
          </div>
        </div>

        <Form
          tableHeader={'Service Details'}
          tableSummary={''}
          headers={headers}
          data={serviceDtl}
          updateAllowed={scopes.includes('SERVICE.U')}
          onClickAction={onServiceUpdateAction}
          onDataChange={registerServiceDtl}
        />
      </div>
    </div>
  );
}

export default ServiceDetailPage;
