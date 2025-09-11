import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css'; // We will update this file next

const Dropdown = ({ label, options, selected, onSelectedChange, isMulti = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (!isMulti) {
      // --- Single-select logic ---
      onSelectedChange(option);
      setIsOpen(false);
    } else {
      // --- Multi-select logic ---
      let newSelected;
      if (selected.some(item => item.value === option.value)) {
        // If already selected, remove it
        newSelected = selected.filter(item => item.value !== option.value);
      } else {
        // If not selected, add it
        newSelected = [...selected, option];
      }
      onSelectedChange(newSelected);
    }
  };

  // --- Renders the header content ---
  const renderHeader = () => {
    if (isMulti) {
      if (selected.length === 0) {
        return `Select ${label}...`;
      }
      return (
        <div className="dropdown-header-tags">
          {selected.map(option => (
            <div key={option.value} className="tag-item">
              {option.label}
              <span
                className="tag-remove"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents dropdown from opening/closing
                  handleOptionClick(option);
                }}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      );
    }
    // For single-select
    return selected ? selected.label : `Select ${label}`;
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {renderHeader()}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            {options.map((option) => {
              const isSelected = isMulti
                ? selected.some(item => item.value === option.value)
                : selected?.value === option.value;
              return (
                <li
                  key={option.value}
                  className={`dropdown-list-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;