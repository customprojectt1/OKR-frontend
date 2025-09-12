// src/SummaryBox.js

import React from 'react';
import './SummaryBox.css';
// NEW: Import the master sort order
import { objectiveSortOrder } from './Data/formOptions';

const SummaryBox = ({ selectedObjectives, objectiveDetails }) => {
  if (selectedObjectives.length === 0) {
    return null;
  }
  
  // --- THIS IS THE KEY CHANGE ---
  // Create a sorted version of the selected objectives
  const sortedObjectives = [...selectedObjectives].sort((a, b) => {
    // Find the index (position) of each objective in our master sort order list
    const indexA = objectiveSortOrder.indexOf(a.value);
    const indexB = objectiveSortOrder.indexOf(b.value);
    
    // The sort function returns a negative, zero, or positive value
    return indexA - indexB;
  });

  const totalWeight = selectedObjectives.reduce((sum, obj) => {
    const weight = objectiveDetails[obj.value]?.weight || '0';
    return sum + parseFloat(weight);
  }, 0);

  return (
    <div className="summary-box">
      <h2>Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Objective</th>
            <th>Filters / Details</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {/* We now map over the NEW sortedObjectives array instead of the original one */}
          {sortedObjectives.map(obj => {
            const details = objectiveDetails[obj.value] || {};
            let detailContent = details.filter?.label || 'N/A';
            if (obj.category === 'Individual') {
              detailContent = details.objectiveText || '-';
            } else if (obj.value === 'development_plan') {
              detailContent = 'N/A';
            }

            return (
              <tr key={obj.value}>
                <td>{obj.label.trim()}</td>
                <td className="detail-content">{detailContent}</td>
                <td>{details.weight ? `${details.weight}%` : '-'}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total Weight</td>
            <td className={totalWeight > 100 ? 'weight-over' : ''}>
              {totalWeight}%
            </td>
          </tr>
        </tfoot>
      </table>
       {totalWeight > 100 && (
        <p className="weight-warning">Total weight cannot exceed 100%.</p>
      )}
    </div>
  );
};

export default SummaryBox;