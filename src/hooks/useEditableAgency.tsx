import { useState, useEffect, useCallback } from "react";
import { useAgency } from "@/contexts/AgencyContext";
import { useToast } from "@/hooks/use-toast";

const DRAFT_STORAGE_KEY = "agency_drafts";

interface DraftData {
  name: string;
  description: string;
  status: string;
  tags: string;
  samples: boolean;
  synthetic: boolean;
  ots: boolean;
  website: string;
  industry: string;
  location: string;
  poc: { name: string; email: string }[];
  useCase: string[];
  service: string[];
  modality: string[];
  otsDataList: string[];
}

function getDraftKey(agencyId: string): string {
  return `${DRAFT_STORAGE_KEY}_${agencyId}`;
}

function loadDraft(agencyId: string): DraftData | null {
  try {
    const draft = localStorage.getItem(getDraftKey(agencyId));
    return draft ? JSON.parse(draft) : null;
  } catch {
    return null;
  }
}

function saveDraft(agencyId: string, draft: DraftData): void {
  try {
    localStorage.setItem(getDraftKey(agencyId), JSON.stringify(draft));
  } catch (error) {
    console.error("Error saving draft:", error);
  }
}

function clearDraft(agencyId: string): void {
  try {
    localStorage.removeItem(getDraftKey(agencyId));
  } catch (error) {
    console.error("Error clearing draft:", error);
  }
}

export function useEditableAgency(agencyName: string) {
  const { getAgencyByName, updateAgency } = useAgency();
  const { toast } = useToast();
  const agency = getAgencyByName(agencyName);
  
  const [isEditMode, setIsEditMode] = useState(false);
  
  // AgencyEditSection fields
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editSamples, setEditSamples] = useState(false);
  const [editSynthetic, setEditSynthetic] = useState(false);
  const [editOts, setEditOts] = useState(false);
  
  // Accordion fields
  const [editWebsite, setEditWebsite] = useState("");
  const [editIndustry, setEditIndustry] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPoc, setEditPoc] = useState<{ name: string; email: string }[]>([]);
  const [editUseCase, setEditUseCase] = useState<string[]>([]);
  const [editService, setEditService] = useState<string[]>([]);
  const [editModality, setEditModality] = useState<string[]>([]);
  const [editOtsDataList, setEditOtsDataList] = useState<string[]>([]);

  useEffect(() => {
    if (agency) {
      // Check for draft changes first
      const draft = loadDraft(agency.id);
      
      if (draft) {
        // Load draft data if available
        setEditName(draft.name);
        setEditDescription(draft.description);
        setEditStatus(draft.status);
        setEditTags(draft.tags);
        setEditSamples(draft.samples);
        setEditSynthetic(draft.synthetic);
        setEditOts(draft.ots);
        setEditWebsite(draft.website);
        setEditIndustry(draft.industry);
        setEditLocation(draft.location);
        setEditPoc(draft.poc);
        setEditUseCase(draft.useCase);
        setEditService(draft.service);
        setEditModality(draft.modality);
        setEditOtsDataList(draft.otsDataList);
      } else {
        // Load from agency data
        setEditName(agency.name);
        setEditDescription(agency.description);
        setEditStatus(agency.status);
        setEditTags(agency.tags.join(", "));
        setEditSamples(agency.samples || false);
        setEditSynthetic(agency.synthetic || false);
        setEditOts(agency.ots || false);
        
        // Accordion fields
        setEditWebsite(agency.website || "");
        setEditIndustry(agency.industry || "");
        setEditLocation(agency.location || "");
        setEditPoc(agency.poc || []);
        setEditUseCase(agency.useCase || []);
        setEditService(agency.service || []);
        setEditModality(agency.modality || []);
        setEditOtsDataList(agency.otsDataList || []);
      }
    }
  }, [agency]);

  const handlePublish = useCallback(() => {
    if (!agency) return;
    
    const updatedTags = editTags.split(",").map(tag => tag.trim()).filter(Boolean);
    
    // Update the main agency context (publishes to catalog)
    updateAgency(agency.id, {
      // AgencyEditSection fields
      name: editName,
      description: editDescription,
      status: editStatus,
      tags: updatedTags,
      samples: editSamples,
      synthetic: editSynthetic,
      ots: editOts,
      
      // Accordion fields
      website: editWebsite.trim() || undefined,
      industry: editIndustry.trim() || undefined,
      location: editLocation.trim() || undefined,
      poc: editPoc.length > 0 ? editPoc : undefined,
      useCase: editUseCase.length > 0 ? editUseCase : undefined,
      service: editService.length > 0 ? editService : undefined,
      modality: editModality.length > 0 ? editModality : undefined,
      otsDataList: editOtsDataList.length > 0 ? editOtsDataList : undefined,
    });
    
    // Clear draft after publishing
    clearDraft(agency.id);
    
    toast({
      title: "Changes Published",
      description: "All changes have been saved successfully.",
    });
    
    setIsEditMode(false);
  }, [agency, editName, editDescription, editStatus, editTags, editSamples, editSynthetic, editOts, editWebsite, editIndustry, editLocation, editPoc, editUseCase, editService, editModality, editOtsDataList, updateAgency, toast]);

  const handleSaveAsDraft = useCallback(() => {
    if (!agency) return;
    
    const updatedTags = editTags.split(",").map(tag => tag.trim()).filter(Boolean);
    
    // Save to localStorage as draft (not to main context)
    const draft: DraftData = {
      name: editName,
      description: editDescription,
      status: editStatus,
      tags: editTags,
      samples: editSamples,
      synthetic: editSynthetic,
      ots: editOts,
      website: editWebsite,
      industry: editIndustry,
      location: editLocation,
      poc: editPoc,
      useCase: editUseCase,
      service: editService,
      modality: editModality,
      otsDataList: editOtsDataList,
    };
    
    saveDraft(agency.id, draft);
    
    toast({
      title: "Changes Saved as Draft",
      description: "All changes have been saved as draft. They will not be published to the main catalog.",
    });
    
    setIsEditMode(false);
  }, [agency, editName, editDescription, editStatus, editTags, editSamples, editSynthetic, editOts, editWebsite, editIndustry, editLocation, editPoc, editUseCase, editService, editModality, editOtsDataList, toast]);

  const handleCancel = useCallback(() => {
    if (agency) {
      // Check if there's a draft - if so, reload it, otherwise use agency data
      const draft = loadDraft(agency.id);
      
      if (draft) {
        // Reload draft data
        setEditName(draft.name);
        setEditDescription(draft.description);
        setEditStatus(draft.status);
        setEditTags(draft.tags);
        setEditSamples(draft.samples);
        setEditSynthetic(draft.synthetic);
        setEditOts(draft.ots);
        setEditWebsite(draft.website);
        setEditIndustry(draft.industry);
        setEditLocation(draft.location);
        setEditPoc(draft.poc);
        setEditUseCase(draft.useCase);
        setEditService(draft.service);
        setEditModality(draft.modality);
        setEditOtsDataList(draft.otsDataList);
      } else {
        // Reset to agency data
        setEditName(agency.name);
        setEditDescription(agency.description);
        setEditStatus(agency.status);
        setEditTags(agency.tags.join(", "));
        setEditSamples(agency.samples || false);
        setEditSynthetic(agency.synthetic || false);
        setEditOts(agency.ots || false);
        
        // Reset Accordion fields
        setEditWebsite(agency.website || "");
        setEditIndustry(agency.industry || "");
        setEditLocation(agency.location || "");
        setEditPoc(agency.poc || []);
        setEditUseCase(agency.useCase || []);
        setEditService(agency.service || []);
        setEditModality(agency.modality || []);
        setEditOtsDataList(agency.otsDataList || []);
      }
    }
    setIsEditMode(false);
  }, [agency]);

  // Create a merged display agency that shows draft data when available
  const displayAgency = agency ? (() => {
    const draft = loadDraft(agency.id);
    if (draft && !isEditMode) {
      // Return merged agency with draft data for display
      return {
        ...agency,
        name: draft.name,
        description: draft.description,
        status: draft.status,
        tags: draft.tags.split(",").map(tag => tag.trim()).filter(Boolean),
        samples: draft.samples,
        synthetic: draft.synthetic,
        ots: draft.ots,
        website: draft.website || agency.website,
        industry: draft.industry || agency.industry,
        location: draft.location || agency.location,
        poc: draft.poc.length > 0 ? draft.poc : agency.poc,
        useCase: draft.useCase.length > 0 ? draft.useCase : agency.useCase,
        service: draft.service.length > 0 ? draft.service : agency.service,
        modality: draft.modality.length > 0 ? draft.modality : agency.modality,
        otsDataList: draft.otsDataList.length > 0 ? draft.otsDataList : agency.otsDataList,
      };
    }
    return agency;
  })() : undefined;

  return {
    isEditMode,
    setIsEditMode,
    // AgencyEditSection fields
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    editStatus,
    setEditStatus,
    editTags,
    setEditTags,
    editSamples,
    setEditSamples,
    editSynthetic,
    setEditSynthetic,
    editOts,
    setEditOts,
    // Accordion fields
    editWebsite,
    setEditWebsite,
    editIndustry,
    setEditIndustry,
    editLocation,
    setEditLocation,
    editPoc,
    setEditPoc,
    editUseCase,
    setEditUseCase,
    editService,
    setEditService,
    editModality,
    setEditModality,
    editOtsDataList,
    setEditOtsDataList,
    handlePublish,
    handleSaveAsDraft,
    handleCancel,
    agency: displayAgency || agency,
    hasDraft: agency ? loadDraft(agency.id) !== null : false,
  };
}

