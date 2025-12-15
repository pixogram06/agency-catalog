import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PartnerCard } from "@/components/PartnerCard";
import { useAgency } from "@/contexts/AgencyContext";
import { Search, Filter, FileDown, Plus } from "lucide-react";
import { AddAgencyDialog } from "@/components/AddAgencyDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const partners = [
  {
    id: "1",
    name: "ICliniq",
    initials: "I",
    status: "in-network",
    description: "Healthcare Data Collection & Annotation",
    tags: ["medical images collection/annotation", "patient queries collection/annotation", "diagnostic report collection/annotation", "video annotation"],
    website: "#",
  },
  {
    id: "2",
    name: "FutureBee AI",
    initials: "FA",
    status: "in-network",
    description: "Data Collection And Annotation Services Across Multiple Domains",
    tags: ["healthcare", "automotive", "retail", "finance", "agriculture", "crowd-as-a-service", "custom data collection"],
    website: "#",
  },
  {
    id: "3",
    name: "Macgence",
    initials: "M",
    status: "in-network",
    description: "Data Licensing, Collection And Annotation Services Across Multiple Domains",
    tags: ["conversation ai", "computer vision", "genai", "adas", "audio datasets licensing"],
    website: "#",
  },
  {
    id: "4",
    name: "Encord",
    initials: "E",
    status: "in-network",
    description: "Multimodal Data Engine for Annotation & Curation",
    tags: ["tooling partner", "230+ language", "partner network", "dicom annotation"],
    website: "#",
  },
  {
    id: "5",
    name: "C8C",
    initials: "C",
    status: "In Pipeline",
    description: "Custom Voice Datasets Collection",
    tags: ["cinematic expressive voice & video", "speech data collection in studio", "conversational video", "scripted content", "human simulations", "human transcription & translation"],
    website: "#",
  },
  {
    id: "6",
    name: "DataSeeds/Zedge",
    initials: "D",
    status: "in-network",
    description: "Custom Image Collection",
    tags: ["images and video collection", "crowd-as-a-service", "data licensing"],
    website: "#",
  },
  {
    id: "7",
    name: "Pulse.AI",
    initials: "P",
    status: "in-network",
    description: "Data extraction API",
    tags: ["ocr", "document extraction", "data extraction api", "tooling partner"],
    website: "#",
  },
  {
    id: "8",
    name: "Premier",
    initials: "P",
    status: "in-progress",
    description: "Real-world Healthcare And Clinical Data Provider",
    tags: ["hospital service and charge data", "emr", "insurance claims", "hospital purchasing and supply data", "data licensing"],
    website: "#",
  },
  {
    id: "9",
    name: "LXT",
    initials: "L",
    status: "in-progress",
    description: "Global Crowd-fueled Data Provider",
    tags: ["multilingual", "multi-modality", "data collection", "data annotation"],
    website: "#",
  },
  {
    id: "10",
    name: "Columbus Lang",
    initials: "CL",
    status: "in-network",
    description: "Global language & localization services provider",
    tags: ["human translation", "260+ languages", "data collection"],
    website: "#",
  },
  {
    id: "11",
    name: "Monisa Enterprise",
    initials: "ME",
    status: "in-network",
    description: "translation, localization & data collection",
    tags: ["multilingual", "translation", "data collection", "rare languages", "interpretation"],
    website: "#",
  },
  {
    id: "12",
    name: "Data Ocean",
    initials: "DO",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "13",
    name: "Health Verity",
    initials: "HV",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "14",
    name: "Wow",
    initials: "W",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "15",
    name: "Truveta",
    initials: "T",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "16",
    name: "Flatiron Health",
    initials: "FH",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "17",
    name: "Exact Data",
    initials: "ED",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "18",
    name: "Protege",
    initials: "P",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "19",
    name: "Segmed",
    initials: "S",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "20",
    name: "iMerit",
    initials: "IM",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "21",
    name: "Prolific",
    initials: "P",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "22",
    name: "Collinear",
    initials: "C",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "23",
    name: "Sermo",
    initials: "S",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "24",
    name: "Book Your Data",
    initials: "BYD",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "25",
    name: "Carbon Arc",
    initials: "CA",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "26",
    name: "TriNex",
    initials: "T",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "27",
    name: "IQVIA",
    initials: "IQ",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "28",
    name: "Roamler",
    initials: "R",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
  {
    id: "29",
    name: "Zyte",
    initials: "Z",
    status: "in-progress",
    description: "Data Provider",
    tags: ["data licensing"],
    website: "#",
  },
];

const statusFilters = ["in-network", "in-progress", "In Pipeline", "Legal Redlining", "Internal Catalog Only", "Discovery"];
const categoryFilters = [
  "Agriculture",
  "Automotive",
  "CV",
  "Computer Vision",
  "Creative",
  "Finance",
  "Healthcare",
  "Imaging",
  "Labeling",
  "Medical Imaging",
  "Multilingual",
  "NLP",
  "Q&A Corpus",
  "Retail",
  "RWE",
  "Speech",
];

const Index = () => {
  const { agencies } = useAgency();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dataTypeFilter, setDataTypeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddAgencyDialogOpen, setIsAddAgencyDialogOpen] = useState(false);
  const itemsPerPage = 21;

  // Get unique statuses from partners
  const uniqueStatuses = Array.from(new Set(agencies.map((p) => p.status).filter(Boolean)));

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const filteredPartners = agencies.filter((partner) => {
    const matchesSearch =
      !searchQuery ||
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Handle status filter
    const matchesStatusFilter = statusFilter === "all" || partner.status === statusFilter;

    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(partner.status);

    const matchesCategory =
      selectedCategories.length === 0 ||
      partner.tags.some((tag) => selectedCategories.includes(tag));

    // Handle data type filter
    const matchesDataTypeFilter = 
      dataTypeFilter === "all" ||
      (dataTypeFilter === "OTS" && partner.ots) ||
      (dataTypeFilter === "Samples" && partner.samples) ||
      (dataTypeFilter === "Synthetic" && partner.synthetic);

    return matchesSearch && matchesStatusFilter && matchesStatus && matchesCategory && matchesDataTypeFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPartners = filteredPartners.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12 relative">
          <h1 className="text-5xl font-bold text-foreground">Agency Catalog</h1>
          <div className="absolute right-0 top-0 flex gap-2">
            <Button 
              variant="default" 
              className="gap-2"
              onClick={() => setIsAddAgencyDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Agency
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                // CSV Export functionality
                const headers = ["ID", "Name", "Status", "Description", "Tags", "OTS", "Samples", "Synthetic"];
                const csvContent = [
                  headers.join(","),
                  ...agencies.map((partner) => {
                    const tags = partner.tags.join("; ");
                    const ots = partner.ots ? "Yes" : "No";
                    const samples = partner.samples ? "Yes" : "No";
                    const synthetic = partner.synthetic ? "Yes" : "No";
                    return [
                      partner.id,
                      `"${partner.name}"`,
                      partner.status,
                      `"${partner.description}"`,
                      `"${tags}"`,
                      ots,
                      samples,
                      synthetic,
                    ].join(",");
                  }),
                ].join("\n");

                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "agency_list.csv");
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <FileDown className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Search Bar - Centered */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search agencies by name, use case, modality..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Filters - Left Aligned */}
        <div className="flex flex-col items-start mb-8 gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Filter by Agency Status</label>
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Agencies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agencies</SelectItem>
                  <SelectItem value="in-network">In-Network</SelectItem>
                  {uniqueStatuses
                    .filter((status) => status !== "in-network")
                    .map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Filter by Data Type</label>
              <Select
                value={dataTypeFilter}
                onValueChange={(value) => {
                  setDataTypeFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Data Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data Types</SelectItem>
                  <SelectItem value="OTS">OTS</SelectItem>
                  <SelectItem value="Samples">Samples</SelectItem>
                  <SelectItem value="Synthetic">Synthetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>


        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPartners.map((partner) => (
            <PartnerCard 
              key={partner.id} 
              {...partner}
            />
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No partners found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredPartners.length > 0 && totalPages > 1 && (
          <div className="flex justify-end mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <AddAgencyDialog
        open={isAddAgencyDialogOpen}
        onOpenChange={setIsAddAgencyDialogOpen}
      />
    </div>
  );
};

export default Index;
