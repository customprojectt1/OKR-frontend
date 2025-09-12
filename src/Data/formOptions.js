// --- MLT Lead Options ---
export const mltLeadOptions = [
  { value: 'christian_beaudoin', label: 'Christian Beaudoin' },
  { value: 'ricardo_souza', label: 'Ricardo Souza' },
  { value: 'mencia_barreiros', label: 'Mencia Barreiros' },
  { value: 'laura_vallis', label: 'Laura Vallis' },
  { value: 'suzanne_johnson', label: 'Suzanne Johnson' },
  { value: 'tanya_earley', label: 'Tanya Earley' },
  { value: 'kathy_lopez', label: 'Kathy Lopez' },
  { value: 'adrian_detomas', label: 'Adrian DeTomas' },
  { value: 'siddharth_taparia', label: 'Siddharth Taparia' },
];

// --- Unique Filter Option Lists based on your Smartsheet columns ---

// (B1.Brand Awareness-Filters), (B2.Brand Familiarity-Filters)
export const brandFilters = [
  { value: 'global', label: 'Global' }, { value: 'us', label: 'US' }, { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'UK' }, { value: 'france', label: 'France' }, { value: 'germany', label: 'Germany' },
  { value: 'mena', label: 'MENA' }, { value: 'anz', label: 'ANZ' }, { value: 'greater_china', label: 'Greater China' },
  { value: 'japan', label: 'Japan' }, { value: 'india', label: 'India' },
];

// (D1.1.Marketing Originated Revenue-Filters)
export const marketingOriginatedRevenueFilters = [
  { value: 'global', label: 'Global' }, { value: 'cm', label: 'CM' }, { value: 'la', label: 'LA' },
  { value: 'wd_rems', label: 'WD/REMs' }, { value: 'us', label: 'US' }, { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'UK' }, { value: 'france', label: 'France' }, { value: 'germany', label: 'Germany' },
  { value: 'mena', label: 'MENA' }, { value: 'anz', label: 'ANZ' }, { value: 'greater_china', label: 'Greater China' },
  { value: 'japan', label: 'Japan' }, { value: 'india', label: 'India' },
];

// (D1.2.Marketing Originated Revenue-PM-Filters)
export const propertyMarketingFilters = [
  { value: 'global', label: 'Global' }, { value: 'france', label: 'France' }, { value: 'germany', label: 'Germany' },
  { value: 'portugal', label: 'Portugal' }, { value: 'sea', label: 'SEA' }, { value: 'spain', label: 'Spain' },
  { value: 'uk', label: 'UK' }, { value: 'us', label: 'US' },
];

// (DM1, DM2, C2) - A simple "Global" only list
export const globalOnlyFilters = [
  { value: 'global', label: 'Global' },
];

// (D2.Marketing Influenced Revenue-Filters), (D3.Pipeline Contribution-Filters)
export const marketingInfluencedRevenueFilters = [
  { value: 'global', label: 'Global' }, { value: 'cm', label: 'CM' }, { value: 'la', label: 'LA' },
  { value: 'wd_rems', label: 'WD/REMs' }, { value: 'us', label: 'US' }, { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'UK' }, { value: 'france', label: 'France' }, { value: 'germany', label: 'Germany' },
  { value: 'mena', label: 'MENA' }, { value: 'anz', label: 'ANZ' }, { value: 'china', label: 'China' },
  { value: 'japan', label: 'Japan' }, { value: 'india', label: 'India' },
];

// (DM3.Business Inquiries-Filters), (DM4.Organic Search-Filters)
export const businessInquiriesFilters = [
  { value: 'global', label: 'Global' }, { value: 'amer', label: 'AMER' }, { value: 'emea', label: 'EMEA' },
  { value: 'apac', label: 'APAC' }, { value: 'us', label: 'US' }, { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'UK' }, { value: 'france', label: 'France' }, { value: 'germany', label: 'Germany' },
  { value: 'mena', label: 'MENA' }, { value: 'anz', label: 'ANZ' }, { value: 'greater_china', label: 'Greater China' },
  { value: 'japan', label: 'Japan' }, { value: 'india', label: 'India' },
];

// (O1.Budget and Forecast Accuracy- Filters)
export const budgetAccuracyFilters = [
  { value: 'total_mie', label: 'Total MIE' }, { value: 'global_regional_cm', label: 'Global & Regional - CM' },
  { value: 'global_regional_wd', label: 'Global & Regional - WD' }, { value: 'global_regional_ma', label: 'Global & Regional - MA' },
  { value: 'global_jllt', label: 'Global - JLLT' }, { value: 'global_digital', label: 'Global - Digital' },
  { value: 'global_brand', label: 'Global - Brand' }, { value: 'global_comms', label: 'Global - Comms' },
  { value: 'global_exec', label: 'Global - Exec' }, { value: 'us_leasing_only', label: 'US - Leasing only' },
  { value: 'canada', label: 'Canada' }, { value: 'brazil', label: 'Brazil' }, { value: 'mexico', label: 'Mexico' },
  { value: 'greater_latam', label: 'Greater LATAM' }, { value: 'uk', label: 'UK' }, { value: 'germany', label: 'Germany' },
  { value: 'france', label: 'France' }, { value: 'spain', label: 'Spain' }, { value: 'mena', label: 'MENA' },
  { value: 'netherlands', label: 'Netherlands' }, { value: 'bellux', label: 'Bellux' }, { value: 'sweden', label: 'Sweden' },
  { value: 'poland', label: 'Poland' }, { value: 'ireland', label: 'Ireland' }, { value: 'italy', label: 'Italy' },
  { value: 'portugal', label: 'Portugal' }, { value: 'switzerland', label: 'Switzerland' }, { value: 'africa', label: 'Africa' },
  { value: 'finland', label: 'Finland' }, { value: 'australia', label: 'Australia' }, { value: 'new_zealand', label: 'New Zealand' },
  { value: 'greater_china', label: 'Greater China' }, { value: 'hong_kong', label: 'Hong Kong' }, { value: 'india', label: 'India' },
  { value: 'japan', label: 'Japan' }, { value: 'korea', label: 'Korea' }, { value: 'sea_singapore', label: 'SEA-Singapore' },
  { value: 'sea_philippines', label: 'SEA-Philippines' }, { value: 'sea_indonesia', label: 'SEA-Indonesia' },
  { value: 'sea_vietnam', label: 'SEA-Vietnam' }, { value: 'sea_thailand', label: 'SEA-Thailand' },
  { value: 'sea_malaysia', label: 'SEA-Malaysia' },
];

// (C1, C3, C4)
export const earnedMediaFilters = [
  { value: 'global', label: 'Global' }, { value: 'apac', label: 'APAC' },
  { value: 'emea', label: 'EMEA' }, { value: 'amer', label: 'AMER' },
];

// (O2.Campaign ROI-Filters)
export const campaignROIFilters = [
  { value: 'global', label: 'Global' }, { value: 'cm', label: 'CM' },
  { value: 'la', label: 'LA' }, { value: 'wd_rems', label: 'WD/REMs' },
];

// (O3.Event Success-Filters)
export const eventSuccessFilters = budgetAccuracyFilters.filter(o => o.value !== 'total_mie'); // Same as budget, just without "Total MIE"

// (O4.Marketing Services COE Usage-Filters)
export const coeUsageFilters = [
  { value: 'global_cm', label: 'Global - CM' }, { value: 'global_la', label: 'Global - LA' },
  { value: 'global_wd_rems', label: 'Global - WD/REMs' }, { value: 'global_digital', label: 'Global - Digital' },
  { value: 'global_brand', label: 'Global - Brand' }, { value: 'global_comms', label: 'Global - Comms' },
  { value: 'us', label: 'US' }, { value: 'canada', label: 'Canada' }, { value: 'brazil', label: 'Brazil' },
  { value: 'mexico', label: 'Mexico' }, { value: 'greater_latam', label: 'Greater LATAM' }, { value: 'uk', label: 'UK' },
  { value: 'germany', label: 'Germany' }, { value: 'france', label: 'France' }, { value: 'spain', label: 'Spain' },
  { value: 'mena', label: 'MENA' }, { value: 'netherlands', label: 'Netherlands' }, { value: 'bellux', label: 'Bellux' },
  { value: 'sweden', label: 'Sweden' }, { value: 'poland', label: 'Poland' }, { value: 'ireland', label: 'Ireland' },
  { value: 'italy', label: 'Italy' }, { value: 'portugal', label: 'Portugal' }, { value: 'switzerland', label: 'Switzerland' },
  { value: 'africa', label: 'Africa' }, { value: 'finland', label: 'Finland' }, { value: 'australia', label: 'Australia' },
  { value: 'new_zealand', label: 'New Zealand' }, { value: 'greater_china', label: 'Greater China' },
  { value: 'hong_kong', label: 'Hong Kong' }, { value: 'india', label: 'India' }, { value: 'japan', label: 'Japan' },
  { value: 'korea', label: 'Korea' }, { value: 'sea_singapore', label: 'SEA-Singapore' }, { value: 'sea_philippines', label: 'SEA-Philippines' },
  { value: 'sea_indonesia', label: 'SEA-Indonesia' }, { value: 'sea_vietnam', label: 'SEA-Vietnam' },
  { value: 'sea_thailand', label: 'SEA-Thailand' }, { value: 'sea_malaysia', label: 'SEA-Malaysia' },
];

// (P1.People Survey Engagement-Filters)
export const peopleSurveyFilters = [
  { value: 'global', label: 'Global' }, { value: 'i_have_my_own', label: 'I have my own' },
  { value: 'align_to_mlt_lead', label: 'I will align to my MLT lead' },
];

export const objectiveSortOrder = [
  'brand_awareness',
  'brand_familiarity',
  'marketing_originated_revenue',
  'property_marketing_revenue',
  'marketing_influenced_revenue',
  'pipeline_contribution',
  'digital_delivery',
  'com_conversion_rate',
  'business_inquiries',
  'organic_search',
  'earned_media_sov',
  'newsletter_engagement',
  'earned_media_quality',
  'intranet_engagement',
  'budget_accuracy',
  'campaign_roi',
  'event_success',
  'coe_usage',
  'people_survey_engagement',
  'development_plan',
  'individual_goal_1',
  'individual_goal_2',
  'individual_goal_3',
];

// --- The main objectiveOptions list ---
export const objectiveOptions = [
  { value: 'brand_header', label: '----BRAND----', category: 'Brand', isHeader: true },
  { value: 'brand_awareness', label: 'Brand Awareness', category: 'Brand' },
  { value: 'brand_familiarity', label: 'Brand Familiarity', category: 'Brand' },
  { value: 'demand_header', label: '----DEMAND----', category: 'Demand', isHeader: true },
  { value: 'marketing_originated_revenue', label: 'Marketing Originated Revenue', category: 'Demand' },
  { value: 'property_marketing_revenue', label: 'Marketing Originated Revenue - Property Marketing', category: 'Demand' },
  { value: 'marketing_influenced_revenue', label: 'Marketing Influenced Revenue', category: 'Demand' },
  { value: 'pipeline_contribution', label: 'Pipeline Contribution', category: 'Demand' },
  { value: 'digital_header', label: '----DIGITAL----', category: 'Digital', isHeader: true },
  { value: 'digital_delivery', label: 'Digital Delivery .com', category: 'Digital' },
  { value: 'com_conversion_rate', label: '.com Conversion Rate', category: 'Digital' },
  { value: 'business_inquiries', label: 'Business Inquiries', category: 'Digital' },
  { value: 'organic_search', label: 'Organic Search', category: 'Digital' },
  { value: 'comms_header', label: '----COMMS----', category: 'Comms', isHeader: true },
  { value: 'earned_media_sov', label: 'Earned Media / Share of Voice (Four key areas)', category: 'Comms' },
  { value: 'newsletter_engagement', label: 'Connected Newsletter Engagement', category: 'Comms' },
  { value: 'earned_media_quality', label: 'Earned Media Quality / Sentiment', category: 'Comms' },
  { value: 'intranet_engagement', label: 'Connect Intranet Engagement', category: 'Comms' },
  { value: 'ops_header', label: '----OPS----', category: 'Ops', isHeader: true },
  { value: 'budget_accuracy', label: 'Budget and Forecast Accuracy', category: 'Ops' },
  { value: 'campaign_roi', label: 'Campaign ROI', category: 'Ops' },
  { value: 'event_success', label: 'Event Success', category: 'Ops' },
  { value: 'coe_usage', label: 'Marketing Services COE Usage', category: 'Ops' },
  { value: 'people_header', label: '----PEOPLE----', category: 'People', isHeader: true },
  { value: 'people_survey_engagement', label: 'People Survey Engagement', category: 'People' },
  { value: 'development_plan', label: 'Development Plan', category: 'People' },
  { value: 'individual_header', label: '----INDIVIDUAL----', category: 'Individual', isHeader: true },
  { value: 'individual_goal_1', label: 'Individual goal 1', category: 'Individual' },
  { value: 'individual_goal_2', label: 'Individual goal 2', category: 'Individual' },
  { value: 'individual_goal_3', label: 'Individual goal 3', category: 'Individual' },
];

// we Add more if we want then