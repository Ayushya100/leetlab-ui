interface DropdownOption {
  header: string;
  icon?: any;
  action: string;
}

interface DropdownProps {
  dropdownList: Array<DropdownOption>;
  onClickAction: (action: string) => void;
}

export function Dropdown({ dropdownList, onClickAction }: DropdownProps) {
  return (
    <div className="absolute right-0 top-0 mt-10 w-40 card-bg border-color rounded shadow-md z-1">
      <ul className="text-sm secondary-text">
        {dropdownList.map((option: any, index: number) => (
          <button className="px-4 py-2 ternary-btn flex items-center gap-2 w-full" key={index} onClick={() => onClickAction(option.action)}>
            {option.icon} {option.header}
          </button>
        ))}
      </ul>
    </div>
  );
}
