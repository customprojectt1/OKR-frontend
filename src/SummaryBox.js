// src/SummaryBox.js
import React from 'react';
import './SummaryBox.css'; // We will create this file next

const SummaryBox = ({ selectedObjectives, objectiveDetails }) => {
  // If no objectives are selected, don't render anything.
  if (selectedObjectives.length === 0) {
    return null;
  }
  
  // Calculate the total weight
  const totalWeight = selectedObjectives.reduce((sum, obj) => {
    const weight = objectiveDetails[obj.value]?.weight || 0;
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
          {selectedObjectives.map(obj => {
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