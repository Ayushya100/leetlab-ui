import { DataTable } from './DataTable';

interface DataTableHeaders {
  label: string;
  key: string;
}

interface PopupTableProps {
  title: string;
  headers: Array<DataTableHeaders>;
  tableData: any;
  addAllowed: boolean;
  cancelAllowed: boolean;
  onClickAction?: any;
  selectable?: boolean;
  selectedIds: any;
  onSelectionChange?: (selected: any) => void;
}

export function PopupTable({ title, headers, tableData, addAllowed, cancelAllowed, onClickAction, selectable, selectedIds = [], onSelectionChange = () => {} }: PopupTableProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300">
      <div className="popup rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0 p-6 w-150 animate-slide-message-in">
        <DataTable
          title={title}
          headers={headers}
          tableData={tableData}
          titleSize={'text-medium'}
          addAllowed={addAllowed}
          selectable={selectable}
          selectedIds={selectedIds}
          onSelectionChange={onSelectionChange}
          onClickAction={onClickAction}
          cancelOperation={cancelAllowed}
        />
      </div>
    </div>
  );
}
