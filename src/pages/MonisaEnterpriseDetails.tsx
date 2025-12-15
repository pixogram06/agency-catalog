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

const MonisaEnterpriseDetails = () => {
  const navigate = useNavigate();
  const showContactButton = isInNetwork("Monisa Enterprise");
  const { 
    isEditMode, 
    setIsEditMode, 
    handlePublish, 
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
  } = useEditableAgency("Monisa Enterprise");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("edit") === "true") {
      setIsEditMode(true);
      setSearchParams({});
    }
  }, [searchParams, setIsEditMode, setSearchParams]);  return (
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
          <AgencyDetailHeader
            agencyName="Monisa Enterprise"
            showContactButton={showContactButton}
            isEditMode={isEditMode}
            onEditModeChange={setIsEditMode}
            onPublish={handlePublish}
            onSaveAsDraft={handleSaveAsDraft}
            onCancel={handleCancel}
          />

          <AgencyEditSection 
            agencyName="Monisa Enterprise" 
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

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                Detailed information for Monisa Enterprise is coming soon.
              </p>
            </CardContent>
          </Card>

          <EditableAccordionSections 
            agencyName="Monisa Enterprise" 
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
          <DangerZone agencyName="Monisa Enterprise" />
        </div>
      </div>
    </div>
  );
};

export default MonisaEnterpriseDetails;
