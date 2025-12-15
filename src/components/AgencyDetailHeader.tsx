import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Mail, FileText } from "lucide-react";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { useAgency } from "@/contexts/AgencyContext";
import { useToast } from "@/hooks/use-toast";

interface AgencyDetailHeaderProps {
  agencyName: string;
  showContactButton: boolean;
  onEditModeChange: (isEdit: boolean) => void;
  isEditMode: boolean;
  onPublish: () => void;
  onSaveAsDraft?: () => void;
  onCancel: () => void;
}

export function AgencyDetailHeader({
  agencyName,
  showContactButton,
  onEditModeChange,
  isEditMode,
  onPublish,
  onSaveAsDraft,
  onCancel,
}: AgencyDetailHeaderProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold text-foreground mb-3">{agencyName}</h1>
        <div className="flex items-center gap-2">
          {showContactButton && !isEditMode && (
            <Button
              variant="default"
              onClick={() => setIsContactDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact
            </Button>
          )}
          {!isEditMode ? (
            <Button
              variant="outline"
              onClick={() => onEditModeChange(true)}
              className="flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              {onSaveAsDraft && (
                <Button
                  variant="outline"
                  onClick={onSaveAsDraft}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Save as Draft
                </Button>
              )}
              <Button
                onClick={onPublish}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Publish
              </Button>
            </>
          )}
        </div>
      </div>
      {showContactButton && (
        <ContactFormDialog
          open={isContactDialogOpen}
          onOpenChange={setIsContactDialogOpen}
          agencyName={agencyName}
        />
      )}
    </>
  );
}

