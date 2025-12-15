// Agency status mapping - used to determine if contact button should be shown
// This is a fallback for agencies that don't have status in the context
export const agencyStatusMap: Record<string, string> = {
  "ICliniq": "in-network",
  "FutureBee AI": "in-network",
  "Macgence": "in-network",
  "Encord": "in-network",
  "C8C": "In Pipeline",
  "DataSeeds": "in-network",
  "DataSeeds/Zedge": "in-network",
  "Pulse.AI": "in-network",
  "Premier": "in-progress",
  "LXT": "in-progress",
  "Columbus Lang": "in-network",
  "Monisa Enterprise": "in-network",
  "Data Ocean": "in-progress",
  "Health Verity": "in-progress",
  "Wow": "in-progress",
  "Truveta": "in-progress",
  "Flatiron Health": "in-progress",
  "Exact Data": "in-progress",
  "Protege": "in-progress",
  "Segmed": "in-progress",
  "iMerit": "in-progress",
  "IMerit": "in-progress",
  "Prolific": "in-progress",
  "Collinear": "in-progress",
  "Sermo": "in-progress",
  "Book Your Data": "in-progress",
  "Carbon Arc": "in-progress",
  "TriNex": "in-progress",
  "IQVIA": "in-progress",
  "Roamler": "in-progress",
  "Zyte": "in-progress",
};

// Helper to get status from context first, then fallback to map
export const getAgencyStatusFromContext = (agencyName: string, agencyStatus?: string): string => {
  if (agencyStatus) {
    return agencyStatus;
  }
  return getAgencyStatus(agencyName);
};

export const getAgencyStatus = (agencyName: string): string => {
  return agencyStatusMap[agencyName] || "in-progress";
};

export const isInNetwork = (agencyName: string): boolean => {
  return getAgencyStatus(agencyName) === "in-network";
};



