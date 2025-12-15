import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";

const partnerNames: Record<string, string> = {
  "/futurebee-ai": "FutureBee AI",
  "/macgence": "Macgence",
  "/encord": "Encord",
  "/c8c": "C8C",
  "/dataseeds": "Dataseeds"
};

const PartnerDetailsPlaceholder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const partnerName = partnerNames[location.pathname] || "Partner";

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
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-3">{partnerName}</h1>
          </div>

          {/* Description Card */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-lg text-center">
                Detailed information for {partnerName} is coming soon.
              </p>
            </CardContent>
          </Card>

          {/* Accordion Sections */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="website" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  Website
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="poc" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  POC
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="industry" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  Industry
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="use-case" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  Use Case
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="service" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  Service
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="modality" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  Modality
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="location" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  Location
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-list" className="border rounded-lg">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4">
                  OTS Data List
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">Coming soon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsPlaceholder;
