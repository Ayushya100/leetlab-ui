interface FormProps {
  tableHeader: string;
  tableSummary: string;
  headers: any;
  data: any;
  updateAllowed: boolean;
  onClickAction?: any;
  onDataChange: (updatedData: any) => void;
}

export default function Form({ tableHeader, tableSummary, headers, data = {}, updateAllowed, onClickAction, onDataChange }: FormProps) {
  return (
    <div>
      <form className="flex justify-center py-6 px-1">
        <div className="flex flex-wrap md:w-[70%]">
          <div className="text-lg font-semibold w-full primary-text">{tableHeader}</div>
          <div className="text-sm w-full secondary-text">{tableSummary}</div>
          <div className="border-b border-color mt-6 w-full"></div>
          {headers.map((field: any, fieldIdx: number) => (
            <div key={fieldIdx} className="w-full flex flex-row gap-2 p-4 border-b border-color items-center">
              <label className="text-smfont-medium secondary-text pl-1 basis-1/3">{field.label}</label>

              {/* Plain Text Field */}
              {field.readOnly && <div>{data[field.key]}</div>}

              {/* Input Text Field */}
              {field.type === 'text' && !field.readOnly && (
                <input
                  type="text"
                  value={data[field.key] ?? ''}
                  readOnly={field.readOnly}
                  className={`p-2 text-sm w-full primary-text basis-2/3 focus:outline-none rounded-md ${field.readOnly ? '' : 'form-text-field'}`}
                  onChange={(e) => {
                    const newData = { ...data, [field.key]: e.target.value };
                    onDataChange(newData);
                  }}
                />
              )}

              {/* Checkbox Field */}
              {field.type === 'checkbox' && (
                <label className="relative inline-flex items-center cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    checked={data[field.key]}
                    disabled={field.readOnly}
                    className="sr-only peer focus:outline-none focus:ring-0"
                    onChange={(e) => {
                      const newData = { ...data, [field.key]: e.target.checked };
                      onDataChange(newData);
                    }}
                  />
                  <div
                    className={`w-9 h-5 bg-gray-300 rounded-full relative transition-colors
                      peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-transparent
                      peer-checked:bg-blue-600
                      peer-disabled:bg-gray-200 peer-disabled:cursor-not-allowed
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform
                      peer-checked:after:translate-x-4
                      peer-disabled:after:bg-gray-100`}
                  ></div>
                </label>
              )}

              {/* Dropdown Field */}
              {field.type === 'options' && !field.readOnly && (
                <select
                  value={data[field.key] ?? ''}
                  onChange={(e) => {
                    const newData = { ...data, [field.key]: e.target.value };
                    onDataChange(newData);
                  }}
                  className="p-2 text-sm w-full primary-text basis-2/3 focus:outline-none rounded-md form-text-field"
                >
                  <option value="" disabled>
                    -- select an option --
                  </option>
                  {field.options?.map((option: any, idx: number) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <div className="flex justify-end w-full">
            <div className="flex items-center gap-4 mt-2">
              {updateAllowed ? (
                <div className="primary-btn text-sm py-[6px] px-4 rounded-md" onClick={() => onClickAction({ type: 'save' })}>
                  Save
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
