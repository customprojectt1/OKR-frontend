// src/SummaryBox.js

import React from 'react';
import './SummaryBox.css';
import { objectiveSortOrder } from './Data/formOptions';

const SummaryBox = ({ selectedObjectives, objectiveDetails }) => {
  if (selectedObjectives.length === 0) {
    return null;
  }
  
  const sortedObjectives = [...selectedObjectives].sort((a, b) => {
    const indexA = objectiveSortOrder.indexOf(a.value);
    const indexB = objectiveSortOrder.indexOf(b.value);
    return indexA - indexB;
  });

  const totalWeight = selectedObjectives.reduce((sum, obj) => {
    const weight = objectiveDetails[obj.value]?.weight || '0';
    return sum + parseFloat(weight);
  }, 0);

  const percentageLeft = Math.round(100 - totalWeight);

  return (
    <div className="summary-box">
      <h2>Summary</h2>

      <div className="summary-goal-tracker">
        {totalWeight > 0 && totalWeight < 100 && (
          <p className="goal-pending">
            You have <strong>{percentageLeft}%</strong> left to reach 100%.
          </p>
        )}
        {totalWeight === 100 && (
          <p className="goal-reached">
            🎉 Goal Reached! Total weight is 100%.
          </p>
        )}
        {/* --- MOVED: The weight-warning is now here --- */}
        {totalWeight > 100 && (
          <p className="weight-warning">
            Total weight cannot exceed 100%.
          </p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Objective</th>
            <th>Filters / Details</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
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
            {/* The class here still works perfectly to make the number red */}
            <td className={totalWeight > 100 ? 'weight-over' : ''}>
              {totalWeight}%
            </td>
          </tr>
        </tfoot>
      </table>

      {/* --- REMOVED: The old warning message location is now empty --- */}
    </div>
  );
};

export default SummaryBox;