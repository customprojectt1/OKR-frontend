// src/App.js

import React, { useState } from 'react';
import './App.css';
import SummaryBox from './SummaryBox';
import Dropdown from './Dropdown';
import { mltLeadOptions, objectiveOptions, countryOptions } from './Data/formOptions';

const initialFormState = {
  yourName: '',
  yourEmail: '',
  managerEmail: '',
  mltLead: null,
  objective: [],
  objectiveDetails: {}
};

function App() {
  const [formData, setFormData] = useState(initialFormState);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- Handlers remain the same ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleDropdownChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption }));
  };
  const handleObjectiveChange = (selectedObjectives) => {
    const newDetails = {};
    selectedObjectives.forEach(obj => {
      newDetails[obj.value] = formData.objectiveDetails[obj.value] || { filter: null, weight: '', objectiveText: '' };
    });
    setFormData(prev => ({ ...prev, objective: selectedObjectives, objectiveDetails: newDetails }));
  };
  const handleObjectiveDetailChange = (objectiveValue, fieldName, value) => {
    setFormData(prev => ({ ...prev, objectiveDetails: { ...prev.objectiveDetails, [objectiveValue]: { ...prev.objectiveDetails[objectiveValue], [fieldName]: value } } }));
  };

  // --- Helpers remain the same ---
  const getPrefix = (objective) => {
    const categoryMap = { 'Brand': 'B', 'Demand': 'D', 'Digital': 'DM', 'Comms': 'C', 'Ops': 'O', 'People': 'P', 'Individual': '' };
    const prefix = categoryMap[objective.category] || '';
    if (prefix === '') {
        const index = objective.value.slice(-1);
        return `${index}.`;
    }
    const categoryItems = formData.objective.filter(o => o.category === objective.category && !o.isHeader);
    const itemIndex = categoryItems.findIndex(o => o.value === objective.value);
    return `${prefix}${itemIndex + 1}.`;
  };
  const totalWeight = formData.objective.reduce((sum, obj) => {
    if (obj.isHeader) return sum;
    const weight = formData.objectiveDetails[obj.value]?.weight;
    return sum + parseFloat(weight || '0');
  }, 0);

  // --- UPDATED: handleSubmit function with comprehensive validation ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    // --- NEW VALIDATION LOGIC ---
    const missingFields = [];
    
    // 1. Check static fields
    if (!formData.yourName.trim()) missingFields.push("Your Name");
    if (!formData.yourEmail.trim()) missingFields.push("Your Email Address");
    if (!formData.managerEmail.trim()) missingFields.push("Manager's Email Address");
    if (!formData.mltLead) missingFields.push("MLT Lead");
    if (formData.objective.length === 0) missingFields.push("At least one Objective");

    // 2. Check dynamic fields for each selected objective
    formData.objective.forEach(obj => {
      if (obj.isHeader) return;
      const details = formData.objectiveDetails[obj.value] || {};
      const prefix = getPrefix(obj) + " " + obj.label.trim();

      if (obj.category === 'Individual') {
        if (!details.objectiveText || !details.objectiveText.trim()) missingFields.push(`${prefix} - Objective`);
        if (!details.weight) missingFields.push(`${prefix} - Weight (%)`);
      } else if (obj.value === 'development_plan') {
        if (!details.weight) missingFields.push(`${prefix} - Weight (%)`);
      } else {
        if (!details.filter) missingFields.push(`${prefix} - Filters`);
        if (!details.weight) missingFields.push(`${prefix} - Weight (%)`);
      }
    });
    
    // 3. If there are missing fields, show an alert and stop
    if (missingFields.length > 0) {
      const errorMessage = "Please fill out the following required fields:\n\n" + missingFields.map(field => `- ${field}`).join('\n');
      alert(errorMessage);
      return;
    }

    // 4. Check total weight (this now runs only if all fields are filled)
    if (totalWeight !== 100) {
      alert("Total weight must be exactly 100% to submit.");
      return;
    }

    // --- End of new validation logic ---

    setSubmissionStatus('submitting');
    try {
      const response = await fetch('http://localhost:8080/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Server responded with an error.');
      }
      setSubmissionStatus('success');
      setShowSuccessModal(true);
      setFormData(initialFormState);
      setTimeout(() => setSubmissionStatus('idle'), 4000);
    } catch (error) {
      setSubmissionStatus('error');
      console.error("SUBMISSION FAILED:", error);
      alert("An error occurred while submitting the form. Please try again.");
      setSubmissionStatus('idle');
    }
  };

  const hasObjectives = formData.objective.length > 0;

  return (
    <div>
      {/* The rest of the JSX is exactly the same as before */}
      <div className="logo-container">
        <img src="/Logo/JLL logo negative - RGB.png" alt="Company Logo" />
      </div>
      <div className={hasObjectives ? "page-layout" : ""}>
        <div className={hasObjectives ? "form-wrapper app-container" : "app-container"}>
          <header className="app-header"><h1>OKR</h1></header>
          <main className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label htmlFor="yourName" className="required">Your Name</label><input type="text" id="yourName" name="yourName" value={formData.yourName} onChange={handleInputChange} placeholder="Enter your full name" required/></div>
              <div className="form-group"><label htmlFor="yourEmail" className="required">Your Email Address</label><input type="email" id="yourEmail" name="yourEmail" value={formData.yourEmail} onChange={handleInputChange} placeholder="e.g., name@company.com" required/></div>
              <div className="form-group"><label htmlFor="managerEmail" className="required">Manager's Email Address</label><input type="email" id="managerEmail" name="managerEmail" value={formData.managerEmail} onChange={handleInputChange} placeholder="e.g., manager@company.com" required/></div>
              <div className="form-group"><label className="required">MLT Lead</label><Dropdown label="MLT Lead" options={mltLeadOptions} selected={formData.mltLead} onSelectedChange={(option) => handleDropdownChange('mltLead', option)} /></div>
              <div className="form-group"><label className="required">Objective</label><p className="field-description">Select all of the objectives that apply to your OKRs. Details will display below for you to choose the weight and granularity.</p><Dropdown label="Objective" options={objectiveOptions} selected={formData.objective} onSelectedChange={handleObjectiveChange} isMulti /></div>
              {formData.objective.filter(obj => !obj.isHeader).map(obj => { const prefix = getPrefix(obj); const details = formData.objectiveDetails[obj.value] || {}; return ( <div key={obj.value} className="form-group conditional-group">{obj.category === 'Individual' && (<div className="inline-fields-container"><div className="field-item"><label htmlFor={`objectiveText-${obj.value}`} className="required">{prefix} {obj.label.trim()} - Objective</label><input type="text" id={`objectiveText-${obj.value}`} value={details.objectiveText} onChange={(e) => handleObjectiveDetailChange(obj.value, 'objectiveText', e.target.value)} placeholder="Define the specific goal" required/></div><div className="field-item"><label htmlFor={`weight-${obj.value}`} className="required">{prefix} {obj.label.trim()} - Weight (%)</label><input type="number" id={`weight-${obj.value}`} value={details.weight} onChange={(e) => handleObjectiveDetailChange(obj.value, 'weight', e.target.value)} placeholder="e.g., 20" required/></div></div>)}{obj.value === 'development_plan' && (<div className="field-item"><label htmlFor={`weight-${obj.value}`} className="required">{prefix} {obj.label.trim()} - Weight (%)</label><input type="number" id={`weight-${obj.value}`} value={details.weight} onChange={(e) => handleObjectiveDetailChange(obj.value, 'weight', e.target.value)} placeholder="e.g., 10" required/></div>)}{obj.category !== 'Individual' && obj.value !== 'development_plan' && (<div className="inline-fields-container"><div className="field-item"><label className="required">{prefix} {obj.label.trim()} - Filters</label><Dropdown label="Country" options={countryOptions} selected={details.filter} onSelectedChange={(option) => handleObjectiveDetailChange(obj.value, 'filter', option)} /></div><div className="field-item"><label htmlFor={`weight-${obj.value}`} className="required">{prefix} {obj.label.trim()} - Weight (%)</label><input type="number" id={`weight-${obj.value}`} value={details.weight} onChange={(e) => handleObjectiveDetailChange(obj.value, 'weight', e.target.value)} placeholder="e.g., 20" required/></div></div>)}</div> );})}
              <div className="submit-container">
                <p className="submit-description">A copy of your responses will be automatically sent to you and your manager when you submit.</p>
                <div className="submit-feedback-container">
                  <button type="submit" className="submit-btn" disabled={submissionStatus === 'submitting'}>
                    {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                  </button>
                  {submissionStatus === 'success' && <div className="success-checkmark"></div>}
                </div>
                {hasObjectives && totalWeight !== 100 && ( <p className="weight-helper-text">Total weight must be 100% to submit. Current: {totalWeight}%</p> )}
              </div>
            </form>
          </main>
        </div>
        {hasObjectives && ( <div className="summary-wrapper"> <SummaryBox selectedObjectives={formData.objective.filter(obj => !obj.isHeader)} objectiveDetails={formData.objectiveDetails} /> </div> )}
      </div>
      {showSuccessModal && ( <div className="modal-overlay"> <div className="modal-content"> <h2>Success!</h2> <p>Your OKR objectives have been submitted successfully.</p> <button className="modal-close-btn" onClick={() => setShowSuccessModal(false)}> Close </button> </div> </div> )}
    </div>
  );
}

export default App;