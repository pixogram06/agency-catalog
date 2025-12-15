import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { AgencyEditSection } from "@/components/AgencyEditSection";
import { EditableAccordionSections } from "@/components/EditableAccordionSections";
import { AgencyDetailHeader } from "@/components/AgencyDetailHeader";
import { DangerZone } from "@/components/DangerZone";
import { useAgency } from "@/contexts/AgencyContext";
import { useEditableAgency } from "@/hooks/useEditableAgency";

const GenericAgencyDetails = () => {
  const navigate = useNavigate();
  const { agencyName } = useParams<{ agencyName: string }>();
  const { getAgencyByName } = useAgency();
  
  // Decode the agency name from URL
  const decodedName = agencyName ? decodeURIComponent(agencyName) : "";
  const agency = getAgencyByName(decodedName);
  const showContactButton = agency?.status === "in-network";
  const [searchParams, setSearchParams] = useSearchParams();
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
  } = useEditableAgency(decodedName);

  useEffect(() => {
    if (searchParams.get("edit") === "true") {
      setIsEditMode(true);
      setSearchParams({});
    }
  }, [searchParams, setIsEditMode, setSearchParams]);

  if (!agency) {
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
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-lg text-center">
                Agency not found.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            agencyName={agency.name}
            showContactButton={showContactButton}
            isEditMode={isEditMode}
            onEditModeChange={setIsEditMode}
            onPublish={handlePublish}
            onSaveAsDraft={handleSaveAsDraft}
            onCancel={handleCancel}
          />

          {/* Edit Section */}
          <AgencyEditSection 
            agencyName={agency.name} 
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
              <p className="text-muted-foreground leading-relaxed">
                {displayAgency?.description || agency?.description || ""}
              </p>
            </CardContent>
          </Card>

          {/* Accordion Sections */}
          <EditableAccordionSections 
            agencyName={agency.name} 
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
          <DangerZone agencyName={agency.name} />
        </div>
      </div>
    </div>
  );
};

export default GenericAgencyDetails;

