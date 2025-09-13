// src/App.js

import React, { useState } from 'react';
import './App.css';
import Dropdown from './Dropdown';
import AutoGrowTextarea from './AutoGrowTextarea';
import axios from 'axios';
import {
  mltLeadOptions,
  objectiveOptions,
  objectiveSortOrder,
  brandFilters,
  marketingOriginatedRevenueFilters,
  propertyMarketingFilters,
  globalOnlyFilters,
  marketingInfluencedRevenueFilters,
  businessInquiriesFilters,
  budgetAccuracyFilters,
  earnedMediaFilters,
  campaignROIFilters,
  eventSuccessFilters,
  coeUsageFilters,
  peopleSurveyFilters,
} from './Data/formOptions';

const initialFormState = {
  yourName: '',
  yourEmail: '',
  managerEmail: '',
  mltLead: null,
  objective: [],
  objectiveDetails: {}
};

const filterOptionsMap = {
  'brand_awareness': brandFilters,
  'brand_familiarity': brandFilters,
  'marketing_originated_revenue': marketingOriginatedRevenueFilters,
  'property_marketing_revenue': propertyMarketingFilters,
  'marketing_influenced_revenue': marketingInfluencedRevenueFilters,
  'pipeline_contribution': marketingInfluencedRevenueFilters,
  'digital_delivery': globalOnlyFilters,
  'com_conversion_rate': globalOnlyFilters,
  'business_inquiries': businessInquiriesFilters,
  'organic_search': businessInquiriesFilters,
  'earned_media_sov': earnedMediaFilters,
  'newsletter_engagement': globalOnlyFilters,
  'earned_media_quality': earnedMediaFilters,
  'intranet_engagement': earnedMediaFilters,
  'budget_accuracy': budgetAccuracyFilters,
  'campaign_roi': campaignROIFilters,
  'event_success': eventSuccessFilters,
  'coe_usage': coeUsageFilters,
  'people_survey_engagement': peopleSurveyFilters,
};

function App() {
  const [formData, setFormData] = useState(initialFormState);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // All handlers and helpers remain the same
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
  const getPrefix = (objective) => {
    const categoryMap = { 'Brand': 'B', 'Demand': 'D', 'Digital': 'DM', 'Comms': 'C', 'Ops': 'O', 'People': 'P', 'Individual': '' };
    const prefix = categoryMap[objective.category] || '';
    if (prefix === '') { const index = objective.value.slice(-1); return `${index}.`; }
    const categoryItems = formData.objective.filter(o => o.category === objective.category && !o.isHeader);
    const itemIndex = categoryItems.findIndex(o => o.value === objective.value);
    return `${prefix}${itemIndex + 1}.`;
  };
  const totalWeight = formData.objective.reduce((sum, obj) => {
    if (obj.isHeader) return sum;
    const weight = formData.objectiveDetails[obj.value]?.weight;
    return sum + parseFloat(weight || '0');
  }, 0);
  const getFilterOptionsForObjective = (objective) => {
    return filterOptionsMap[objective.value] || [];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation is the same
    const missingFields = [];
    if (!formData.yourName.trim()) missingFields.push("Your Name");
    if (!formData.yourEmail.trim()) missingFields.push("Your Email Address");
    if (!formData.managerEmail.trim()) missingFields.push("Manager's Email Address");
    if (!formData.mltLead) missingFields.push("MLT Lead");
    if (formData.objective.length === 0) missingFields.push("At least one Objective");
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
    if (missingFields.length > 0) {
      alert("Please fill out the following required fields:\n\n" + missingFields.map(field => `- ${field}`).join('\n'));
      return;
    }
    if (totalWeight !== 100) {
      alert("Total weight must be exactly 100% to submit.");
      return;
    }
    setSubmissionStatus('submitting');
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/submit-form`;
    try {
      const response = await axios.post(apiUrl, formData);
      if (response.status === 200) {
        setSubmissionStatus('success');
        setShowSuccessModal(true);
        setFormData(initialFormState);
        setTimeout(() => setSubmissionStatus('idle'), 4000);
      } else { throw new Error(`Server responded with status: ${response.status}`); }
    } catch (error) {
      setSubmissionStatus('error');
      console.error("SUBMISSION FAILED:", error.response ? error.response.data : error.message);
      alert("An error occurred while submitting the form. Please check the console for details.");
      setSubmissionStatus('idle');
    }
  };

  const hasObjectives = formData.objective.length > 0;

  const sortedObjectivesForForm = [...formData.objective].sort((a, b) => {
    const indexA = objectiveSortOrder.indexOf(a.value);
    const indexB = objectiveSortOrder.indexOf(b.value);
    return indexA - indexB;
  });

  const percentageLeft = Math.round(100 - totalWeight);

  return (
    <div>
      <div className="logo-container"> <img src="/Logo/JLL logo negative - RGB.png" alt="Company Logo" /> </div>
      <div className="app-container">
        <header className="app-header"><h1>OKR</h1></header>
        <main className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="yourName" className="required">Your Name</label><input type="text" id="yourName" name="yourName" value={formData.yourName} onChange={handleInputChange} placeholder="Enter your full name" required/></div>
            <div className="form-group"><label htmlFor="yourEmail" className="required">Your Email Address</label><div className="input-with-icon"><svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><input type="email" id="yourEmail" name="yourEmail" value={formData.yourEmail} onChange={handleInputChange} required/></div></div>
            <div className="form-group"><label htmlFor="managerEmail" className="required">Manager's Email Address</label><input type="email" id="managerEmail" name="managerEmail" value={formData.managerEmail} onChange={handleInputChange} required/></div>
            <div className="form-group"><label className="required">MLT Lead</label><Dropdown label="MLT Lead" options={mltLeadOptions} selected={formData.mltLead} onSelectedChange={(option) => handleDropdownChange('mltLead', option)} /></div>
            <div className="form-group"><label className="required">Objective</label><p className="field-description">Select all of the objectives that apply to your OKRs. Details will display below for you to choose the weight and granularity.</p><Dropdown label="Objective" options={objectiveOptions} selected={formData.objective} onSelectedChange={handleObjectiveChange} isMulti /></div>
            
            {hasObjectives && (
              <>
                {/* --- THIS IS THE NEW LOCATION FOR THE GOAL TRACKER --- */}
                <div className="summary-goal-tracker">
                  {totalWeight > 0 && totalWeight < 100 && (<p className="goal-pending">You have <strong>{percentageLeft}%</strong> left to reach 100%.</p>)}
                  {totalWeight === 100 && (<p className="goal-reached">🎉 Goal Reached! Total weight is 100%.</p>)}
                  {totalWeight > 100 && (<p className="weight-warning">Total weight cannot exceed 100%.</p>)}
                </div>
                
                <hr className="form-divider" />
                
                <div className="objective-rows-container">
                  {sortedObjectivesForForm.filter(obj => !obj.isHeader).map(obj => {
                    const prefix = getPrefix(obj);
                    const details = formData.objectiveDetails[obj.value] || {};
                    const isStandardFilterObjective = obj.category !== 'Individual' && obj.value !== 'development_plan';

                    return (
                      <div key={obj.value} className="objective-row">
                        <div className="objective-name"><span className="prefix">{prefix}</span>{obj.label.trim()}</div>
                        <div className="objective-input-group">
                          {isStandardFilterObjective && (<div className="objective-input"><Dropdown label="Filter" options={getFilterOptionsForObjective(obj)} selected={details.filter} onSelectedChange={(option) => handleObjectiveDetailChange(obj.value, 'filter', option)} /></div>)}
                          {obj.category === 'Individual' && (<div className="objective-input"><AutoGrowTextarea value={details.objectiveText} onChange={(e) => handleObjectiveDetailChange(obj.value, 'objectiveText', e.target.value)} placeholder="Define the specific goal" required /></div>)}
                          {obj.value === 'development_plan' && ( <div className="objective-input" /> )}
                          <div className="objective-input">
                            <div className="input-with-unit">
                              <input type="number" value={details.weight} onChange={(e) => handleObjectiveDetailChange(obj.value, 'weight', e.target.value)} placeholder="Weight" required/>
                              <span className="input-unit">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            
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
      {showSuccessModal && ( <div className="modal-overlay"> <div className="modal-content"> <h2>Success!</h2> <p>Your OKR objectives have been submitted successfully.</p> <button className="modal-close-btn" onClick={() => setShowSuccessModal(false)}> Close </button> </div> </div> )}
    </div>
  );
}

export default App;