import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgency } from "@/contexts/AgencyContext";
import { useEditableAccordion } from "@/hooks/useEditableAccordion";

interface EditableAccordionSectionsProps {
  agencyName: string;
  isEditMode: boolean;
  editWebsite?: string;
  setEditWebsite?: (value: string) => void;
  editIndustry?: string;
  setEditIndustry?: (value: string) => void;
  editLocation?: string;
  setEditLocation?: (value: string) => void;
  editPoc?: { name: string; email: string }[];
  setEditPoc?: (value: { name: string; email: string }[]) => void;
  editUseCase?: string[];
  setEditUseCase?: (value: string[]) => void;
  editService?: string[];
  setEditService?: (value: string[]) => void;
  editModality?: string[];
  setEditModality?: (value: string[]) => void;
  editOtsDataList?: string[];
  setEditOtsDataList?: (value: string[]) => void;
}

export function EditableAccordionSections({ 
  agencyName, 
  isEditMode,
  editWebsite: externalEditWebsite,
  setEditWebsite: externalSetEditWebsite,
  editIndustry: externalEditIndustry,
  setEditIndustry: externalSetEditIndustry,
  editLocation: externalEditLocation,
  setEditLocation: externalSetEditLocation,
  editPoc: externalEditPoc,
  setEditPoc: externalSetEditPoc,
  editUseCase: externalEditUseCase,
  setEditUseCase: externalSetEditUseCase,
  editService: externalEditService,
  setEditService: externalSetEditService,
  editModality: externalEditModality,
  setEditModality: externalSetEditModality,
  editOtsDataList: externalEditOtsDataList,
  setEditOtsDataList: externalSetEditOtsDataList,
}: EditableAccordionSectionsProps) {
  const { getAgencyByName } = useAgency();
  const agency = getAgencyByName(agencyName);
  
  const {
    editWebsite: hookEditWebsite,
    setEditWebsite: hookSetEditWebsite,
    editIndustry: hookEditIndustry,
    setEditIndustry: hookSetEditIndustry,
    editLocation: hookEditLocation,
    setEditLocation: hookSetEditLocation,
    editPoc: hookEditPoc,
    setEditPoc: hookSetEditPoc,
    editUseCase: hookEditUseCase,
    setEditUseCase: hookSetEditUseCase,
    editService: hookEditService,
    setEditService: hookSetEditService,
    editModality: hookEditModality,
    setEditModality: hookSetEditModality,
    editOtsDataList: hookEditOtsDataList,
    setEditOtsDataList: hookSetEditOtsDataList,
  } = useEditableAccordion(agencyName);
  
  const editWebsite = externalEditWebsite !== undefined ? externalEditWebsite : hookEditWebsite;
  const setEditWebsite = externalSetEditWebsite || hookSetEditWebsite;
  const editIndustry = externalEditIndustry !== undefined ? externalEditIndustry : hookEditIndustry;
  const setEditIndustry = externalSetEditIndustry || hookSetEditIndustry;
  const editLocation = externalEditLocation !== undefined ? externalEditLocation : hookEditLocation;
  const setEditLocation = externalSetEditLocation || hookSetEditLocation;
  const editPoc = externalEditPoc !== undefined ? externalEditPoc : hookEditPoc;
  const setEditPoc = externalSetEditPoc || hookSetEditPoc;
  const editUseCase = externalEditUseCase !== undefined ? externalEditUseCase : hookEditUseCase;
  const setEditUseCase = externalSetEditUseCase || hookSetEditUseCase;
  const editService = externalEditService !== undefined ? externalEditService : hookEditService;
  const setEditService = externalSetEditService || hookSetEditService;
  const editModality = externalEditModality !== undefined ? externalEditModality : hookEditModality;
  const setEditModality = externalSetEditModality || hookSetEditModality;
  const editOtsDataList = externalEditOtsDataList !== undefined ? externalEditOtsDataList : hookEditOtsDataList;
  const setEditOtsDataList = externalSetEditOtsDataList || hookSetEditOtsDataList;

  if (!agency) {
    return null;
  }

  // Expose handlers via ref or return them
  if (typeof onEditModeChange === 'function') {
    // Store handlers for parent to access
    (EditableAccordionSections as any).handlers = { handlePublish, handleCancel };
  }

  const addPocContact = () => {
    setEditPoc([...editPoc, { name: "", email: "" }]);
  };

  const updatePocContact = (index: number, field: "name" | "email", value: string) => {
    const updated = [...editPoc];
    updated[index] = { ...updated[index], [field]: value };
    setEditPoc(updated);
  };

  const removePocContact = (index: number) => {
    setEditPoc(editPoc.filter((_, i) => i !== index));
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
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-4">
        {/* Website */}
        <AccordionItem value="website" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            Website
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <Input
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  placeholder="https://example.com"
                />
              ) : editWebsite ? (
                <a 
                  href={editWebsite.startsWith("http") ? editWebsite : `https://${editWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  {editWebsite.replace(/^https?:\/\//, "")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <p className="text-muted-foreground">No website provided</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* POC */}
        <AccordionItem value="poc" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            POC
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <div className="space-y-4">
                  {editPoc.map((contact, index) => (
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePocContact(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
              ) : editPoc.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {editPoc.map((contact, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No POC provided</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Industry */}
        <AccordionItem value="industry" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            Industry
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <Input
                  value={editIndustry}
                  onChange={(e) => setEditIndustry(e.target.value)}
                  placeholder="e.g., Healthcare, Automotive"
                />
              ) : editIndustry ? (
                <p className="text-foreground">{editIndustry}</p>
              ) : (
                <p className="text-muted-foreground">No industry specified</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Use Case */}
        <AccordionItem value="use-case" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            Use Case
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <div className="space-y-2">
                  {editUseCase.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem(editUseCase, setEditUseCase, index, e.target.value)}
                        placeholder="Use case item"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(editUseCase, setEditUseCase, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(editUseCase, setEditUseCase)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Use Case
                  </Button>
                </div>
              ) : editUseCase.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {editUseCase.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No use cases provided</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Service */}
        <AccordionItem value="service" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            Service
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <div className="space-y-2">
                  {editService.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem(editService, setEditService, index, e.target.value)}
                        placeholder="Service item"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(editService, setEditService, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(editService, setEditService)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </Button>
                </div>
              ) : editService.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {editService.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No services provided</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Modality */}
        <AccordionItem value="modality" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            Modality
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <div className="space-y-2">
                  {editModality.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem(editModality, setEditModality, index, e.target.value)}
                        placeholder="Modality item"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(editModality, setEditModality, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(editModality, setEditModality)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Modality
                  </Button>
                </div>
              ) : editModality.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {editModality.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No modalities provided</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location */}
        <AccordionItem value="location" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            Location
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <Input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="e.g., U.S. and India"
                />
              ) : editLocation ? (
                <p className="text-foreground">{editLocation}</p>
              ) : (
                <p className="text-muted-foreground">No location specified</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* OTS Data List */}
        <AccordionItem value="data-list" className="border rounded-lg">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
            OTS Data List
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              {isEditMode ? (
                <div className="space-y-2">
                  {editOtsDataList.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem(editOtsDataList, setEditOtsDataList, index, e.target.value)}
                        placeholder="OTS data item"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(editOtsDataList, setEditOtsDataList, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(editOtsDataList, setEditOtsDataList)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add OTS Data
                  </Button>
                </div>
              ) : editOtsDataList.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {editOtsDataList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No OTS data list provided</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

