import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Mail, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ContactFormDialog } from "@/components/ContactFormDialog";

interface PartnerCardProps {
  id: string;
  name: string;
  initials: string;
  status: string;
  description: string;
  tags: string[];
  website?: string;
  samples?: boolean;
  synthetic?: boolean;
  ots?: boolean;
}

const statusColors: Record<string, string> = {
  "in-network": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "In Pipeline": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  "Draft": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
  "Legal Redlining": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  "Internal Catalog Only": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  "Discovery": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
};

export const PartnerCard = ({ 
  id, 
  name, 
  initials, 
  status, 
  description, 
  tags, 
  website,
  samples = false,
  synthetic = false,
  ots = false
}: PartnerCardProps) => {
  const navigate = useNavigate();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  
  const statusColor = statusColors[status] || "bg-muted text-muted-foreground";
  const isICliniq = name === "ICliniq";
  const isPremier = name === "Premier";
  const hasBlueMarker = isICliniq || isPremier;
  const isDraft = status === "Draft";

  const handleViewDetails = () => {
    // Use generic route for all agencies - this ensures consistency and works for all agencies
    const encodedName = encodeURIComponent(name);
    navigate(`/agency/${encodedName}`);
  };

  const handleEdit = () => {
    // Use generic route for all agencies with edit parameter
    const encodedName = encodeURIComponent(name);
    navigate(`/agency/${encodedName}?edit=true`);
  };

  return (
    <Card className={`flex flex-col h-full hover:shadow-lg transition-all duration-200 hover:scale-105 ${
      hasBlueMarker ? "border-l-4 border-l-blue-500" : ""
    } ${
      isDraft ? "bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800" : ""
    }`}>
      <CardHeader className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-muted-foreground">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg text-foreground truncate">{name}</h3>
              {status && (
                <Badge variant="outline" className={`${statusColor} flex-shrink-0 text-xs px-2 py-0.5`}>
                  {status}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        {(samples || synthetic || ots) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {ots && <Badge variant="outline" className="text-xs">OTS</Badge>}
            {samples && <Badge variant="outline" className="text-xs">Samples</Badge>}
            {synthetic && <Badge variant="outline" className="text-xs">Synthetic</Badge>}
          </div>
        )}
        <div className="flex items-center justify-between pt-2 gap-2">
          <div className="flex items-center gap-2">
            {status === "in-network" && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsContactDialogOpen(true)}
                className="flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
              className="flex items-center gap-1 p-2"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleViewDetails}
          >
            View details <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
      <ContactFormDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        agencyName={name}
      />
    </Card>
  );
};
