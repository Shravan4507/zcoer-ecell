import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[] | null;
  onChange?: (selected: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value = null,
  onChange,
  placeholder = 'Select option',
  searchable = false,
  multiple = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Position state for viewport boundary awareness
  const [dropUp, setDropUp] = useState(false);
  const [alignRight, setAlignRight] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Viewport Boundary Position Calculation
  const toggleOpen = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      const dropdownHeight = 240; // Max estimated height of dropdown menu
      const dropdownWidth = 240;

      // Check if space below is insufficient (flip up)
      const spaceBelow = viewportHeight - rect.bottom;
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }

      // Check if space on right is insufficient (align right)
      const spaceRight = viewportWidth - rect.left;
      if (spaceRight < dropdownWidth && rect.right > dropdownWidth) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    }
    setIsOpen((prev) => !prev);
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        toggleOpen();
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[focusedIndex].value);
      }
    }
  };

  const isSelected = (optionValue: string) => {
    if (Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleSelect = (optionValue: string) => {
    if (!onChange) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? [...value] : [];
      const updatedValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(updatedValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const renderDisplayValue = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      const selectedLabels = options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label);
      return selectedLabels.join(', ');
    }

    if (!multiple && typeof value === 'string' && value) {
      const selectedOption = options.find((opt) => opt.value === value);
      if (selectedOption) return selectedOption.label;
    }

    return null;
  };

  const displayValue = renderDisplayValue();

  return (
    <div
      ref={containerRef}
      className={`dropdown-container ${className}`.trim()}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={toggleOpen}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={`dropdown-value ${!displayValue ? 'placeholder' : ''}`}>
          {displayValue || placeholder}
        </span>
        <svg
          className="dropdown-arrow-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className={`dropdown-menu ${dropUp ? 'drop-up' : ''} ${alignRight ? 'align-right' : ''}`}
          role="listbox"
        >
          {searchable && (
            <div className="dropdown-search-wrapper">
              <input
                type="text"
                className="dropdown-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="dropdown-no-options">No options found</div>
          ) : (
            <div className="dropdown-options-list">
              {filteredOptions.map((option, index) => {
                const selected = isSelected(option.value);
                const focused = index === focusedIndex;

                return (
                  <div
                    key={option.value}
                    className={`dropdown-option ${selected ? 'selected' : ''} ${
                      focused ? 'focused' : ''
                    }`}
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={selected}
                  >
                    <span>{option.label}</span>
                    {selected && (
                      <svg
                        className="dropdown-check-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
