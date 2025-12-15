import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isInNetwork } from "@/lib/agencyStatus";
import { AgencyEditSection } from "@/components/AgencyEditSection";
import { EditableAccordionSections } from "@/components/EditableAccordionSections";
import { AgencyDetailHeader } from "@/components/AgencyDetailHeader";
import { DangerZone } from "@/components/DangerZone";
import { useEditableAgency } from "@/hooks/useEditableAgency";

const ICliniqDetails = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const showContactButton = isInNetwork("ICliniq");
  const { 
    isEditMode, 
    setIsEditMode, 
    handlePublish,
    handleSaveAsDraft,
    handleCancel,
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
    agency: displayAgency,
    hasDraft,
  } = useEditableAgency("ICliniq");

  useEffect(() => {
    if (searchParams.get("edit") === "true") {
      setIsEditMode(true);
      setSearchParams({});
    }
  }, [searchParams, setIsEditMode, setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <AgencyDetailHeader
            agencyName="ICliniq"
            showContactButton={showContactButton}
            isEditMode={isEditMode}
            onEditModeChange={setIsEditMode}
            onPublish={handlePublish}
            onSaveAsDraft={handleSaveAsDraft}
            onCancel={handleCancel}
          />

          {/* Edit Section */}
          <AgencyEditSection 
            agencyName="ICliniq" 
            isEditMode={isEditMode}
            editName={editName}
            setEditName={setEditName}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            editTags={editTags}
            setEditTags={setEditTags}
            editSamples={editSamples}
            setEditSamples={setEditSamples}
            editSynthetic={editSynthetic}
            setEditSynthetic={setEditSynthetic}
            editOts={editOts}
            setEditOts={setEditOts}
          />

          {/* Description Card */}
          <Card>
            <CardContent className="pt-6">
              {hasDraft && !isEditMode && (
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ You have unsaved draft changes. Click "Edit" to view or "Publish" to apply them.
                  </p>
                </div>
              )}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {displayAgency?.description || "iCliniq is a telemedicine platform offering doctor-led data annotation services across text, audio, image, and video modalities. Its annotation framework covers patient queries, clinical notes, lab and radiology reports, and medical education content, standardized with ICD-10 and MedDRA coding for AI, research, and regulatory use."}
              </p>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Related Documents:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <a
                    href="/documents/iCliniq_Capabilities_and_Offerings_Data_Annotation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    • Capabilities & Offerings - Data Annotation (PDF)
                  </a>
                  <a
                    href="/documents/iCliniq_Dataset_Overview.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    • Dataset Overview (PDF)
                  </a>
                  <a
                    href="/documents/iCliniq_Quality_Assurance_QA_Process.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    • Quality Assurance Process (PDF)
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accordion Sections */}
          <EditableAccordionSections 
            agencyName="ICliniq" 
            isEditMode={isEditMode}
            editWebsite={editWebsite}
            setEditWebsite={setEditWebsite}
            editIndustry={editIndustry}
            setEditIndustry={setEditIndustry}
            editLocation={editLocation}
            setEditLocation={setEditLocation}
            editPoc={editPoc}
            setEditPoc={setEditPoc}
            editUseCase={editUseCase}
            setEditUseCase={setEditUseCase}
            editService={editService}
            setEditService={setEditService}
            editModality={editModality}
            setEditModality={setEditModality}
            editOtsDataList={editOtsDataList}
            setEditOtsDataList={setEditOtsDataList}
          />

          {/* Danger Zone */}
          <DangerZone agencyName="ICliniq" />
        </div>
      </div>
    </div>
  );
};

export default ICliniqDetails;
