import { useState, useEffect, useCallback } from "react";
import { useAgency } from "@/contexts/AgencyContext";
import { useToast } from "@/hooks/use-toast";

export function useEditableAccordion(agencyName: string) {
  const { getAgencyByName, updateAgency } = useAgency();
  const { toast } = useToast();
  const agency = getAgencyByName(agencyName);
  
  const [isEditMode, setIsEditMode] = useState(false);
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
      setEditWebsite(agency.website || "");
      setEditIndustry(agency.industry || "");
      setEditLocation(agency.location || "");
      setEditPoc(agency.poc || []);
      setEditUseCase(agency.useCase || []);
      setEditService(agency.service || []);
      setEditModality(agency.modality || []);
      setEditOtsDataList(agency.otsDataList || []);
    }
  }, [agency]);

  const handlePublish = useCallback(() => {
    if (!agency) return;
    
    updateAgency(agency.id, {
      website: editWebsite.trim() || undefined,
      industry: editIndustry.trim() || undefined,
      location: editLocation.trim() || undefined,
      poc: editPoc.length > 0 ? editPoc : undefined,
      useCase: editUseCase.length > 0 ? editUseCase : undefined,
      service: editService.length > 0 ? editService : undefined,
      modality: editModality.length > 0 ? editModality : undefined,
      otsDataList: editOtsDataList.length > 0 ? editOtsDataList : undefined,
    });
    
    toast({
      title: "Changes Published",
      description: "All changes have been saved successfully.",
    });
    
    setIsEditMode(false);
  }, [agency, editWebsite, editIndustry, editLocation, editPoc, editUseCase, editService, editModality, editOtsDataList, updateAgency, toast]);

  const handleCancel = useCallback(() => {
    if (agency) {
      setEditWebsite(agency.website || "");
      setEditIndustry(agency.industry || "");
      setEditLocation(agency.location || "");
      setEditPoc(agency.poc || []);
      setEditUseCase(agency.useCase || []);
      setEditService(agency.service || []);
      setEditModality(agency.modality || []);
      setEditOtsDataList(agency.otsDataList || []);
    }
    setIsEditMode(false);
  }, [agency]);

  return {
    isEditMode,
    setIsEditMode,
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
    handleCancel,
    agency,
  };
}

