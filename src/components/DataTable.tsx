import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

interface DataTableHeaders {
  label: string;
  key: string;
}

interface DataTableProps {
  title: string;
  headers: Array<DataTableHeaders>;
  tableData: any;
  addAllowed?: boolean;
  updateAllowed?: boolean;
  deleteAllowed?: boolean;
  multiDeleteAllowed?: boolean;
  onClickAction: (action: any) => void;
  titleSize?: string;
  itemsPerPage?: number;
  selectable?: boolean;
  selectedIds?: Array<string>;
  onSelectionChange?: (selected: any) => void;
  cancelOperation?: boolean;
}

export function DataTable({
  title,
  headers,
  tableData = [],
  addAllowed,
  updateAllowed,
  deleteAllowed,
  multiDeleteAllowed,
  onClickAction,
  titleSize = '',
  itemsPerPage = 10,
  selectable = false,
  selectedIds = [],
  onSelectionChange = () => {},
  cancelOperation,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const newTotalPages = Math.max(Math.ceil(tableData.length / itemsPerPage), 1);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [tableData.length, itemsPerPage]);

  // Total Pages & Per Page Data
  const columnWidth = `${100 / headers.length}%`;

  let totalPages = 1;
  let startIndex = 0;
  let endIndex = 0;
  let currentData = [];

  if (tableData.length > 0) {
    totalPages = Math.ceil(tableData.length / itemsPerPage);
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
    currentData = tableData.slice(startIndex, endIndex);
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Handle Checkbox click operation - selectedIds
  const handleCheckboxChange = (id: string) => {
    const updatedIds = selectedIds.includes(id) ? selectedIds.filter((existingId: string) => existingId !== id) : [...selectedIds, id];
    onSelectionChange(updatedIds);
  };

  const handleMultiSelect = () => {
    const currentPageIds = tableData.map((rec: any) => rec.id);
    const allSelected = currentPageIds.every((id: string) => selectedIds.includes(id));
    if (allSelected) {
      onSelectionChange(selectedIds.filter((id) => !currentPageIds.includes(id)));
    } else {
      onSelectionChange([...new Set([...selectedIds, ...currentPageIds])]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 px-2">
        <p className={`font-semibold primary-text ${titleSize !== '' ? titleSize : 'text-xl'}`}>{title}</p>
        <div className="flex gap-2">
          {addAllowed && (
            <div className="text-sm py-[6px] px-4 rounded-md primary-btn" onClick={() => onClickAction({ type: 'add', id: 'NEW' })}>
              Add
            </div>
          )}
          {multiDeleteAllowed && (
            <div
              className={`flex items-center justify-center w-12 rounded-md ${selectedIds.length === 0 ? 'disabled-btn' : 'secondary-btn'}`}
              title="Delete"
              onClick={() => {
                if (selectedIds.length > 0) {
                  onClickAction({ type: 'multi-delete' });
                }
              }}
            >
              <Trash2 size={18} />
            </div>
          )}
          {cancelOperation && (
            <div className="text-sm py-[6px] px-4 rounded-md secondary-btn" onClick={() => onClickAction({ type: 'cancel' })}>
              Cancel
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded h-full">
        <table className="min-w-full text-sm h-full text-left">
          <thead className="sticky top-0 z-0 table-header-bg border-color border-b">
            <tr>
              {selectable && tableData.length > 0 && (
                <th className="p-3">
                  <input type="checkbox" className="cursor-pointer" checked={tableData.every((item: any) => selectedIds.includes(item.id))} onChange={() => handleMultiSelect()} />
                </th>
              )}
              {headers.map((header, index) => (
                <th key={index} className="p-3 font-medium secondary-text" style={{ width: columnWidth }}>
                  {header.label}
                </th>
              ))}
              {deleteAllowed ? <th className="" style={{ width: '30px' }}></th> : null}
            </tr>
          </thead>
          <tbody className="divide-y">
            {tableData.length > 0 &&
              currentData.map((data: any) => (
                <tr key={data.id} className="table-row-bg border-b-1 border-color">
                  {selectable && (
                    <td className="p-3">
                      <input type="checkbox" className="cursor-pointer" checked={selectedIds.includes(data.id)} onChange={() => handleCheckboxChange(data.id)} />
                    </td>
                  )}
                  {headers.map((header, idx) => (
                    <td key={idx} className="p-3 text-sm table-data-text" style={{ width: columnWidth }}>
                      {idx === 0 && updateAllowed ? (
                        <span className="link text-sm font-semibold hover:cursor-pointer" onClick={() => onClickAction({ type: 'update', id: data.id })}>
                          {data[header.key]}
                        </span>
                      ) : typeof data[header.key] === 'boolean' ? (
                        <input type="checkbox" checked={data[header.key]} readOnly className="w-4 h-4 text-purple-600" />
                      ) : (
                        data[header.key]
                      )}
                    </td>
                  ))}
                  {deleteAllowed ? (
                    <td className="">
                      <button className="ternary-btn hover:cursor-pointer p-2" onClick={() => onClickAction({ type: 'delete', id: data.id })}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
          </tbody>
        </table>

        {tableData.length === 0 && (
          <div className="flex justify-center mt-4">
            <div className="text-sm secondary-text">No Records Available</div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4 items-center">
          <div className="text-sm secondary-text">
            Total Records: <span className="font-semibold">{tableData.length}</span>
          </div>
          <div className="flex justify-between items-center space-x-2">
            {totalPages > 1 && (
              <button className={`p-[10px] flex items-center rounded ${currentPage === 1 ? 'hover:cursor-not-allowed' : 'ternary-btn'}`} onClick={handlePrevPage}>
                <ChevronLeft size={18} />
              </button>
            )}
            <span className="text-sm secondary-text">
              Page {currentPage} of {totalPages}
            </span>
            {totalPages > 1 && (
              <span className="text-sm secondary-text">
                : {startIndex + 1} - {endIndex}
              </span>
            )}
            {totalPages > 1 && (
              <button className={`p-[10px] flex items-center rounded ${currentPage === totalPages ? 'hover:cursor-not-allowed' : 'ternary-btn'}`} onClick={handleNextPage}>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
