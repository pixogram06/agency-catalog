import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useAgency } from "@/contexts/AgencyContext";
import { useToast } from "@/hooks/use-toast";

interface AddAgencyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddAgencyDialog = ({ open, onOpenChange }: AddAgencyDialogProps) => {
  const { addAgency } = useAgency();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [poc, setPoc] = useState<{ name: string; email: string }[]>([{ name: "", email: "" }]);
  const [useCase, setUseCase] = useState<string[]>([""]);
  const [service, setService] = useState<string[]>([""]);
  const [modality, setModality] = useState<string[]>([""]);
  const [otsDataList, setOtsDataList] = useState<string[]>([""]);
  const [publishStatus, setPublishStatus] = useState<"draft" | "in-progress" | "in-pipeline">("draft");
  const [samples, setSamples] = useState(false);
  const [synthetic, setSynthetic] = useState(false);
  const [ots, setOts] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Description)",
        variant: "destructive",
      });
      return;
    }

    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    
    const pocFiltered = poc.filter(p => p.name.trim() && p.email.trim());
    const useCaseFiltered = useCase.filter(uc => uc.trim());
    const serviceFiltered = service.filter(s => s.trim());
    const modalityFiltered = modality.filter(m => m.trim());
    const otsDataListFiltered = otsDataList.filter(od => od.trim());
    
    addAgency({
      name: name.trim(),
      initials: name.trim().substring(0, 2).toUpperCase(),
      status: "in-network", // Set to in-network when submitted
      description: description.trim(),
      tags: tagsArray,
      website: website.trim() || undefined,
      industry: industry.trim() || undefined,
      location: location.trim() || undefined,
      poc: pocFiltered.length > 0 ? pocFiltered : undefined,
      useCase: useCaseFiltered.length > 0 ? useCaseFiltered : undefined,
      service: serviceFiltered.length > 0 ? serviceFiltered : undefined,
      modality: modalityFiltered.length > 0 ? modalityFiltered : undefined,
      otsDataList: otsDataListFiltered.length > 0 ? otsDataListFiltered : undefined,
      samples,
      synthetic,
      ots,
    });

    toast({
      title: "Agency Added",
      description: `${name} has been added successfully with status: in-network`,
    });

    // Reset form
    resetForm();
    onOpenChange(false);
  };

  const handleSaveAsDraft = () => {
    if (!name.trim() || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Description)",
        variant: "destructive",
      });
      return;
    }

    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    
    // Map publish status to actual status
    const statusMap: Record<"draft" | "in-progress" | "in-pipeline", string> = {
      "draft": "Draft",
      "in-progress": "in-progress",
      "in-pipeline": "In Pipeline",
    };
    
    const pocFiltered = poc.filter(p => p.name.trim() && p.email.trim());
    const useCaseFiltered = useCase.filter(uc => uc.trim());
    const serviceFiltered = service.filter(s => s.trim());
    const modalityFiltered = modality.filter(m => m.trim());
    const otsDataListFiltered = otsDataList.filter(od => od.trim());
    
    addAgency({
      name: name.trim(),
      initials: name.trim().substring(0, 2).toUpperCase(),
      status: statusMap[publishStatus],
      description: description.trim(),
      tags: tagsArray,
      website: website.trim() || undefined,
      industry: industry.trim() || undefined,
      location: location.trim() || undefined,
      poc: pocFiltered.length > 0 ? pocFiltered : undefined,
      useCase: useCaseFiltered.length > 0 ? useCaseFiltered : undefined,
      service: serviceFiltered.length > 0 ? serviceFiltered : undefined,
      modality: modalityFiltered.length > 0 ? modalityFiltered : undefined,
      otsDataList: otsDataListFiltered.length > 0 ? otsDataListFiltered : undefined,
      samples,
      synthetic,
      ots,
    });

    toast({
      title: "Agency Saved as Draft",
      description: `${name} has been saved with status: ${statusMap[publishStatus]}`,
    });

    // Reset form
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setTags("");
    setWebsite("");
    setIndustry("");
    setLocation("");
    setPoc([{ name: "", email: "" }]);
    setUseCase([""]);
    setService([""]);
    setModality([""]);
    setOtsDataList([""]);
    setPublishStatus("draft");
    setSamples(false);
    setSynthetic(false);
    setOts(false);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const addPocContact = () => {
    setPoc([...poc, { name: "", email: "" }]);
  };

  const updatePocContact = (index: number, field: "name" | "email", value: string) => {
    const updated = [...poc];
    updated[index] = { ...updated[index], [field]: value };
    setPoc(updated);
  };

  const removePocContact = (index: number) => {
    setPoc(poc.filter((_, i) => i !== index));
  };

  const addArrayItem = (array: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter([...array, ""]);
  };

  const updateArrayItem = (array: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    const updated = [...array];
    updated[index] = value;
    setter(updated);
  };

  const removeArrayItem = (array: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(array.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Agency</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new agency. Click Submit to publish with status "in-network".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Agency Name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the agency"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publish-status">Publish Status</Label>
            <Select
              value={publishStatus}
              onValueChange={(value: "draft" | "in-progress" | "in-pipeline") => setPublishStatus(value)}
            >
              <SelectTrigger id="publish-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="in-pipeline">In Pipeline</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Note: "Save as Draft" uses the selected status. "Submit" sets status to "in-network".
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Healthcare, Automotive"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <Label>POC (Point of Contact)</Label>
            <div className="space-y-2">
              {poc.map((contact, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1">
                    <Input
                      placeholder="Name"
                      value={contact.name}
                      onChange={(e) => updatePocContact(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={contact.email}
                      onChange={(e) => updatePocContact(index, "email", e.target.value)}
                    />
                  </div>
                  {poc.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePocContact(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPocContact}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Use Case</Label>
            <div className="space-y-2">
              {useCase.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateArrayItem(useCase, setUseCase, index, e.target.value)}
                    placeholder="Enter use case"
                  />
                  {useCase.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem(useCase, setUseCase, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(useCase, setUseCase)}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Use Case
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Service</Label>
            <div className="space-y-2">
              {service.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateArrayItem(service, setService, index, e.target.value)}
                    placeholder="Enter service"
                  />
                  {service.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem(service, setService, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(service, setService)}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Modality</Label>
            <div className="space-y-2">
              {modality.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateArrayItem(modality, setModality, index, e.target.value)}
                    placeholder="Enter modality"
                  />
                  {modality.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem(modality, setModality, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(modality, setModality)}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Modality
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>OTS Data List</Label>
            <div className="space-y-2">
              {otsDataList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateArrayItem(otsDataList, setOtsDataList, index, e.target.value)}
                    placeholder="Enter OTS data"
                  />
                  {otsDataList.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem(otsDataList, setOtsDataList, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(otsDataList, setOtsDataList)}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add OTS Data
              </Button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Label>Options</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="samples"
                  checked={samples}
                  onCheckedChange={(checked) => setSamples(checked === true)}
                />
                <Label htmlFor="samples" className="text-sm font-normal cursor-pointer">
                  Samples
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="synthetic"
                  checked={synthetic}
                  onCheckedChange={(checked) => setSynthetic(checked === true)}
                />
                <Label htmlFor="synthetic" className="text-sm font-normal cursor-pointer">
                  Synthetic
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ots"
                  checked={ots}
                  onCheckedChange={(checked) => setOts(checked === true)}
                />
                <Label htmlFor="ots" className="text-sm font-normal cursor-pointer">
                  OTS
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveAsDraft}>
            Save as Draft
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

