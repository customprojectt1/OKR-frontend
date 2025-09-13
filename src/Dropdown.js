import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

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
      onSelectedChange(option);
      setIsOpen(false);
    } else {
      let newSelected;
      if (selected.some(item => item.value === option.value)) {
        newSelected = selected.filter(item => item.value !== option.value);
      } else {
        newSelected = [...selected, option];
      }
      onSelectedChange(newSelected);
    }
  };

  // NEW: Handler for the "Clear All" button
  const handleClearAll = (e) => {
    e.stopPropagation(); // Prevent the dropdown from opening/closing
    onSelectedChange([]); // Set the selection to an empty array
  };

  const renderHeader = () => {
    if (isMulti) {
      if (selected.length === 0) {
        return `Select ${label}...`;
      }
      return (
        <div className="dropdown-header-tags">
          {selected.map(option => (
            <div key={option.value} className="tag-item">
              {option.label.trim()}
              <span className="tag-remove" onClick={(e) => { e.stopPropagation(); handleOptionClick(option); }}>
                &times;
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selected ? selected.label : `Select ${label}`;
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {renderHeader()}
        <div className="dropdown-controls">
          {isMulti && selected.length > 0 && (
            <span className="clear-all" onClick={handleClearAll}>&times;</span>
          )}
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            {options.map((option) => {
              const isSelected = isMulti ? selected.some(item => item.value === option.value) : selected?.value === option.value;
              return (
                <li key={option.value} className={`dropdown-list-item ${isSelected ? 'selected' : ''} ${option.isHeader ? 'is-header' : ''}`} onClick={() => !option.isHeader && handleOptionClick(option)}>
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