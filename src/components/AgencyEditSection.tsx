import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgency } from "@/contexts/AgencyContext";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AgencyEditSectionProps {
  agencyName: string;
  isEditMode?: boolean;
  editName?: string;
  setEditName?: (value: string) => void;
  editDescription?: string;
  setEditDescription?: (value: string) => void;
  editStatus?: string;
  setEditStatus?: (value: string) => void;
  editTags?: string;
  setEditTags?: (value: string) => void;
  editSamples?: boolean;
  setEditSamples?: (value: boolean) => void;
  editSynthetic?: boolean;
  setEditSynthetic?: (value: boolean) => void;
  editOts?: boolean;
  setEditOts?: (value: boolean) => void;
}

export function AgencyEditSection({ 
  agencyName,
  isEditMode: externalEditMode = false,
  editName: externalEditName,
  setEditName: externalSetEditName,
  editDescription: externalEditDescription,
  setEditDescription: externalSetEditDescription,
  editStatus: externalEditStatus,
  setEditStatus: externalSetEditStatus,
  editTags: externalEditTags,
  setEditTags: externalSetEditTags,
  editSamples: externalEditSamples,
  setEditSamples: externalSetEditSamples,
  editSynthetic: externalEditSynthetic,
  setEditSynthetic: externalSetEditSynthetic,
  editOts: externalEditOts,
  setEditOts: externalSetEditOts,
}: AgencyEditSectionProps) {
  const { getAgencyByName } = useAgency();
  const agency = getAgencyByName(agencyName);
  
  const [internalEditName, setInternalEditName] = useState(agency?.name || "");
  const [internalEditDescription, setInternalEditDescription] = useState(agency?.description || "");
  const [internalEditStatus, setInternalEditStatus] = useState(agency?.status || "");
  const [internalEditTags, setInternalEditTags] = useState(agency?.tags.join(", ") || "");
  const [internalEditSamples, setInternalEditSamples] = useState(agency?.samples || false);
  const [internalEditSynthetic, setInternalEditSynthetic] = useState(agency?.synthetic || false);
  const [internalEditOts, setInternalEditOts] = useState(agency?.ots || false);

  const editName = externalEditName !== undefined ? externalEditName : internalEditName;
  const setEditName = externalSetEditName || setInternalEditName;
  const editDescription = externalEditDescription !== undefined ? externalEditDescription : internalEditDescription;
  const setEditDescription = externalSetEditDescription || setInternalEditDescription;
  const editStatus = externalEditStatus !== undefined ? externalEditStatus : internalEditStatus;
  const setEditStatus = externalSetEditStatus || setInternalEditStatus;
  const editTags = externalEditTags !== undefined ? externalEditTags : internalEditTags;
  const setEditTags = externalSetEditTags || setInternalEditTags;
  const editSamples = externalEditSamples !== undefined ? externalEditSamples : internalEditSamples;
  const setEditSamples = externalSetEditSamples || setInternalEditSamples;
  const editSynthetic = externalEditSynthetic !== undefined ? externalEditSynthetic : internalEditSynthetic;
  const setEditSynthetic = externalSetEditSynthetic || setInternalEditSynthetic;
  const editOts = externalEditOts !== undefined ? externalEditOts : internalEditOts;
  const setEditOts = externalSetEditOts || setInternalEditOts;

  useEffect(() => {
    if (agency) {
      if (externalEditName === undefined) setInternalEditName(agency.name);
      if (externalEditDescription === undefined) setInternalEditDescription(agency.description);
      if (externalEditStatus === undefined) setInternalEditStatus(agency.status);
      if (externalEditTags === undefined) setInternalEditTags(agency.tags.join(", "));
      if (externalEditSamples === undefined) setInternalEditSamples(agency.samples || false);
      if (externalEditSynthetic === undefined) setInternalEditSynthetic(agency.synthetic || false);
      if (externalEditOts === undefined) setInternalEditOts(agency.ots || false);
    }
  }, [agency, externalEditName, externalEditDescription, externalEditStatus, externalEditTags, externalEditSamples, externalEditSynthetic, externalEditOts]);

  if (!agency) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Agency Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {externalEditMode ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-network">in-network</SelectItem>
                  <SelectItem value="in-pipeline">in-pipeline</SelectItem>
                  <SelectItem value="in-progress">in-progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
              <Input
                id="edit-tags"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Options</Label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-samples"
                    checked={editSamples}
                    onCheckedChange={(checked) => setEditSamples(checked === true)}
                  />
                  <Label htmlFor="edit-samples" className="text-sm font-normal cursor-pointer">
                    Samples
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-synthetic"
                    checked={editSynthetic}
                    onCheckedChange={(checked) => setEditSynthetic(checked === true)}
                  />
                  <Label htmlFor="edit-synthetic" className="text-sm font-normal cursor-pointer">
                    Synthetic
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-ots"
                    checked={editOts}
                    onCheckedChange={(checked) => setEditOts(checked === true)}
                  />
                  <Label htmlFor="edit-ots" className="text-sm font-normal cursor-pointer">
                    OTS
                  </Label>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-base">{agency.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-base">{agency.description}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant="outline">{agency.status}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-2">
                {agency.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {(agency.samples || agency.synthetic || agency.ots) && (
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium text-muted-foreground">Options</p>
                <div className="flex items-center gap-2">
                  {agency.samples && <Badge variant="outline">Samples</Badge>}
                  {agency.synthetic && <Badge variant="outline">Synthetic</Badge>}
                  {agency.ots && <Badge variant="outline">OTS</Badge>}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
