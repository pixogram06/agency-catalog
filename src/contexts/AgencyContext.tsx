import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AgencyData {
  id: string;
  name: string;
  initials: string;
  status: string;
  description: string;
  tags: string[];
  website?: string;
  samples?: boolean;
  synthetic?: boolean;
  ots?: boolean;
  poc?: { name: string; email: string }[];
  industry?: string;
  useCase?: string[];
  service?: string[];
  modality?: string[];
  location?: string;
  otsDataList?: string[];
}

interface AgencyContextType {
  agencies: AgencyData[];
  updateAgency: (id: string, updates: Partial<AgencyData>) => void;
  addAgency: (agency: Omit<AgencyData, "id">) => void;
  deleteAgency: (id: string) => void;
  getAgencyByName: (name: string) => AgencyData | undefined;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

const initialAgencies: AgencyData[] = [
  {
    id: "1",
    name: "ICliniq",
    initials: "I",
    status: "in-network",
    description: "Healthcare Data Collection & Annotation",
    tags: ["medical images collection/annotation", "patient queries collection/annotation", "diagnostic report collection/annotation", "video annotation"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "2",
    name: "FutureBee AI",
    initials: "FA",
    status: "in-network",
    description: "Data Collection And Annotation Services Across Multiple Domains",
    tags: ["healthcare", "automotive", "retail", "finance", "agriculture", "crowd-as-a-service", "custom data collection"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "3",
    name: "Macgence",
    initials: "M",
    status: "in-network",
    description: "Data Licensing, Collection And Annotation Services Across Multiple Domains",
    tags: ["conversation ai", "computer vision", "genai", "adas", "audio datasets licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "4",
    name: "Encord",
    initials: "E",
    status: "in-network",
    description: "Multimodal Data Engine for Annotation & Curation",
    tags: ["tooling partner", "230+ language", "partner network", "dicom annotation"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "5",
    name: "C8C",
    initials: "C",
    status: "In Pipeline",
    description: "Custom Voice Datasets Collection",
    tags: ["cinematic expressive voice & video", "speech data collection in studio", "conversational video", "scripted content", "human simulations", "human transcription & translation"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "6",
    name: "DataSeeds/Zedge",
    initials: "D",
    status: "in-network",
    description: "Custom Image Collection",
    tags: ["images and video collection", "crowd-as-a-service", "data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "7",
    name: "Pulse.AI",
    initials: "P",
    status: "in-network",
    description: "Data extraction API",
    tags: ["ocr", "document extraction", "data extraction api", "tooling partner"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "8",
    name: "Premier",
    initials: "P",
    status: "in-progress",
    description: "Real-world Healthcare And Clinical Data Provider",
    tags: ["hospital service and charge data", "emr", "insurance claims", "hospital purchasing and supply data", "data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "9",
    name: "LXT",
    initials: "L",
    status: "in-progress",
    description: "Global Crowd-fueled Data Provider",
    tags: ["multilingual", "multi-modality", "data collection", "data annotation"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "10",
    name: "Columbus Lang",
    initials: "CL",
    status: "in-network",
    description: "Global language & localization services provider",
    tags: ["human translation", "260+ languages", "data collection"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "11",
    name: "Monisa Enterprise",
    initials: "ME",
    status: "in-network",
    description: "translation, localization & data collection",
    tags: ["multilingual", "translation", "data collection", "rare languages", "interpretation"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "12",
    name: "Data Ocean",
    initials: "DO",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "13",
    name: "Health Verity",
    initials: "HV",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "14",
    name: "Wow",
    initials: "W",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "15",
    name: "Truveta",
    initials: "T",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "16",
    name: "Flatiron Health",
    initials: "FH",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "17",
    name: "Exact Data",
    initials: "ED",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "18",
    name: "Protege",
    initials: "P",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "19",
    name: "Segmed",
    initials: "S",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "20",
    name: "iMerit",
    initials: "IM",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "21",
    name: "Prolific",
    initials: "P",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "22",
    name: "Collinear",
    initials: "C",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "23",
    name: "Sermo",
    initials: "S",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "24",
    name: "Book Your Data",
    initials: "BYD",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "25",
    name: "Carbon Arc",
    initials: "CA",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "26",
    name: "TriNex",
    initials: "T",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "27",
    name: "IQVIA",
    initials: "IQ",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "28",
    name: "Roamler",
    initials: "R",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
  {
    id: "29",
    name: "Zyte",
    initials: "Z",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
    samples: false,
    synthetic: false,
    ots: false,
  },
];

const STORAGE_KEY = "agency_data";

// Load agencies from localStorage or use initial data
const loadAgencies = (): AgencyData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with initial data to ensure all agencies exist (in case new ones were added)
      const merged = initialAgencies.map((initial) => {
        const storedAgency = parsed.find((a: AgencyData) => a.id === initial.id);
        if (storedAgency) {
          // Merge stored data with initial data to preserve any new fields
          return { ...initial, ...storedAgency };
        }
        return initial;
      });
      // Add any new agencies from stored data that don't exist in initial
      const storedIds = new Set(merged.map(a => a.id));
      const newAgencies = parsed.filter((a: AgencyData) => !storedIds.has(a.id));
      return [...merged, ...newAgencies];
    }
  } catch (error) {
    console.error("Error loading agencies from localStorage:", error);
  }
  return initialAgencies;
};

export function AgencyProvider({ children }: { children: ReactNode }) {
  const [agencies, setAgencies] = useState<AgencyData[]>(() => loadAgencies());

  // Save to localStorage whenever agencies change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(agencies));
    } catch (error) {
      console.error("Error saving agencies to localStorage:", error);
    }
  }, [agencies]);

  const updateAgency = (id: string, updates: Partial<AgencyData>) => {
    setAgencies((prev) => {
      const updated = prev.map((agency) => 
        agency.id === id ? { ...agency, ...updates } : agency
      );
      return updated;
    });
  };

  const addAgency = (agencyData: Omit<AgencyData, "id">) => {
    const newId = String(Math.max(...agencies.map(a => parseInt(a.id)), 0) + 1);
    const newAgency: AgencyData = {
      ...agencyData,
      id: newId,
    };
    setAgencies((prev) => [...prev, newAgency]);
  };

  const deleteAgency = (id: string) => {
    setAgencies((prev) => prev.filter((agency) => agency.id !== id));
  };

  const getAgencyByName = (name: string): AgencyData | undefined => {
    return agencies.find((agency) => agency.name === name);
  };

  return (
    <AgencyContext.Provider value={{ agencies, updateAgency, addAgency, deleteAgency, getAgencyByName }}>
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgency() {
  const context = useContext(AgencyContext);
  if (context === undefined) {
    throw new Error("useAgency must be used within an AgencyProvider");
  }
  return context;
}

