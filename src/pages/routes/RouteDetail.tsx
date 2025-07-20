import { useParams, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// Components
import Form from '@/components/Form';

// Services
import routesService from '@/services/routesConfigurations.service';

// Stores
import { useUserStore } from '@/stores/userStore';
import { useRouteStore } from '@/stores/routeStore';
import serviceConfigurations from '@/services/serviceConfigurations.service';

// Form Header
const formHeaders = [
  {
    label: 'Path',
    key: 'path',
    type: 'text',
    readOnly: false,
  },
  {
    label: 'Method',
    key: 'method',
    type: 'options',
    readOnly: false,
    options: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' },
    ],
  },
  {
    label: 'Validations',
    key: 'validations',
    type: 'text',
    readOnly: false,
  },
  {
    label: 'Metadata',
    key: 'metadata',
    type: 'text',
    readOnly: false,
  },
  {
    label: 'Service',
    key: 'service',
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

function RouteDetailPage() {
  const [headers, setHeaders] = useState(formHeaders);
  const [pageTitle, setPageTitle] = useState('Add');

  // Router
  const { navigate } = useRouter();
  const { id } = useParams({ from: '/setting/route/$id' });

  // Stores
  const routeDtl = useRouteStore((state) => state.routeDtl);
  const registerRouteDtl = useRouteStore((state) => state.registerRouteDtl);
  const clearRouteDtl = useRouteStore((state) => state.clearRouteDtl);
  const services = useRouteStore((state) => state.services);
  const registerServices = useRouteStore((state) => state.registerServices);
  const clearServices = useRouteStore((state) => state.clearServices);

  // Scopes
  const { scopes } = useUserStore.getState();

  const formatResponseData = (response: any) => {
    const formattedResponse: any = {
      id: '',
      path: '',
      method: '',
      validations: '',
      metadata: '',
      service: '',
      createdDate: '',
      modifiedDate: '',
    };

    for (const resKey in response) {
      if (resKey === 'validations') {
        formattedResponse[resKey] = response[resKey].join(', ');
      } else if (resKey === 'metadata') {
        formattedResponse[resKey] = JSON.stringify(response[resKey]);
      } else if (resKey === 'service') {
        formattedResponse[resKey] = response[resKey].microservice;
      } else {
        formattedResponse[resKey] = response[resKey];
      }
    }
    return formattedResponse;
  };

  useEffect(() => {
    const formatHeaders = (serviceInfo: any) => {
      const serviceArr = serviceInfo.map((svc: any) => {
        return { label: svc.microservice, value: svc.microservice };
      });
      formHeaders
        .filter((header: any) => header.key === 'service')
        .map((header: any) => {
          header.type = 'options';
          header.options = serviceArr;
        });
      return formHeaders;
    };

    const fetchServiceData = async () => {
      try {
        const response = await serviceConfigurations.fetchAllServices();
        registerServices(response);
        return response;
      } catch (err) {
        console.error(`Error fetching services: ${JSON.stringify(err)}`);
      }
    };

    const fetchData = async () => {
      try {
        const serviceInfo = await fetchServiceData();
        const response = await routesService.fetchRouteById(id);
        response.createdDate = response.createdDate.split(' ')[0];
        response.modifiedDate = response.modifiedDate.split(' ')[0];
        registerRouteDtl(formatResponseData(response));

        if (id !== 'NEW' && scopes.includes('ROUTE.U')) {
          setPageTitle(`Update | ${response.path}`);
          setHeaders(formatHeaders(serviceInfo));
        } else {
          setPageTitle(`View | ${response.path}`);
          setHeaders(
            formHeaders.map((header) => {
              header.readOnly = true;
              if (header.key === 'service') {
                header.type = 'test';
              }
              return header;
            })
          );
        }
      } catch (err) {
        console.error(`Error fetching route details: ${JSON.stringify(err)}`);
      }
    };

    const formatPageMetadata = async () => {
      if (id === 'NEW') {
        const serviceInfo = await fetchServiceData();
        const updatedHeaderData = formatHeaders(serviceInfo).filter((header) => {
          const fieldsToExclude = ['createdDate', 'modifiedDate'];
          return !fieldsToExclude.includes(header.key);
        });
        setHeaders(updatedHeaderData);
        setPageTitle('Add');
      } else {
        fetchData();
      }
    };
    formatPageMetadata();
  }, [id, scopes, registerRouteDtl]);

  // User Actions
  const handleCancelAction = () => {
    clearRouteDtl();
    clearServices();
    navigate({ to: '/setting/route' });
  };

  const onRouteUpdateAction = async (action: any) => {
    if (action.type === 'save') {
      if (id !== 'NEW') {
        const updateRouteData = {
          path: routeDtl.path,
          method: routeDtl.method,
          validations: routeDtl.validations.split(', '),
          metadata: JSON.parse(routeDtl.metadata),
          svcId: services.filter((svc) => svc.microservice === routeDtl.service).map((svc) => svc.id)[0],
        };

        const response = await routesService.updateRouteById(id, updateRouteData);
        response.createdDate = response.createdDate.split(' ')[0];
        response.modifiedDate = response.modifiedDate.split(' ')[0];
        registerRouteDtl(formatResponseData(response));
      } else {
        const newRouteData = {
          path: routeDtl.path,
          method: routeDtl.method,
          validations: routeDtl.validations.split(', '),
          metadata: JSON.parse(routeDtl.metadata),
          svcId: services.filter((svc) => svc.microservice === routeDtl.service).map((svc) => svc.id)[0],
        };

        const response = await routesService.registerRoute(newRouteData);
        navigate({ to: `/setting/route/${response.id}` });
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
          tableHeader={'Route Configuration'}
          tableSummary={'Defines the path, method, service details, validations, and metadata for handling requests.'}
          headers={headers}
          data={routeDtl}
          updateAllowed={scopes.includes('ROUTE.U')}
          onClickAction={onRouteUpdateAction}
          onDataChange={registerRouteDtl}
        />
      </div>
    </div>
  );
}

export default RouteDetailPage;
