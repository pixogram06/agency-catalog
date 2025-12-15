import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AgencyProvider } from "@/contexts/AgencyContext";
import Index from "./pages/Index";
import ICliniqDetails from "./pages/ICliniqDetails";
import FutureBeeAIDetails from "./pages/FutureBeeAIDetails";
import MacgenceDetails from "./pages/MacgenceDetails";
import EncordDetails from "./pages/EncordDetails";
import C8CDetails from "./pages/C8CDetails";
import DataSeedsDetails from "./pages/DataSeedsDetails";
import PulseAIDetails from "./pages/PulseAIDetails";
import PremierDetails from "./pages/PremierDetails";
import LXTDetails from "./pages/LXTDetails";
import ColumbusLangDetails from "./pages/ColumbusLangDetails";
import MonisaEnterpriseDetails from "./pages/MonisaEnterpriseDetails";
import PdfViewerPage from "./pages/PdfViewerPage";
import PartnerDetailsPlaceholder from "./pages/PartnerDetailsPlaceholder";
import DataOceanDetails from "./pages/DataOceanDetails";
import HealthVerityDetails from "./pages/HealthVerityDetails";
import WowDetails from "./pages/WowDetails";
import TruvetaDetails from "./pages/TruvetaDetails";
import FlatironHealthDetails from "./pages/FlatironHealthDetails";
import ExactDataDetails from "./pages/ExactDataDetails";
import ProtegeDetails from "./pages/ProtegeDetails";
import SegmedDetails from "./pages/SegmedDetails";
import IMeritDetails from "./pages/IMeritDetails";
import ProlificDetails from "./pages/ProlificDetails";
import CollinearDetails from "./pages/CollinearDetails";
import SermoDetails from "./pages/SermoDetails";
import BookYourDataDetails from "./pages/BookYourDataDetails";
import CarbonArcDetails from "./pages/CarbonArcDetails";
import TriNexDetails from "./pages/TriNexDetails";
import IQVIADetails from "./pages/IQVIADetails";
import RoamlerDetails from "./pages/RoamlerDetails";
import ZyteDetails from "./pages/ZyteDetails";
import GenericAgencyDetails from "./pages/GenericAgencyDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Get base path from import.meta.env.BASE_URL (set by Vite)
  const basePath = import.meta.env.BASE_URL || '/';
  
  return (
    <QueryClientProvider client={queryClient}>
      <AgencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basePath}>
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/icliniq" element={<ICliniqDetails />} />
          <Route path="/futurebee-ai" element={<FutureBeeAIDetails />} />
          <Route path="/macgence" element={<MacgenceDetails />} />
          <Route path="/encord" element={<EncordDetails />} />
          <Route path="/c8c" element={<C8CDetails />} />
          <Route path="/dataseeds" element={<DataSeedsDetails />} />
          <Route path="/pulse-ai" element={<PulseAIDetails />} />
          <Route path="/premier" element={<PremierDetails />} />
          <Route path="/lxt" element={<LXTDetails />} />
          <Route path="/columbus-lang" element={<ColumbusLangDetails />} />
          <Route path="/monisa-enterprise" element={<MonisaEnterpriseDetails />} />
          <Route path="/data-ocean" element={<DataOceanDetails />} />
          <Route path="/health-verity" element={<HealthVerityDetails />} />
          <Route path="/wow" element={<WowDetails />} />
          <Route path="/truveta" element={<TruvetaDetails />} />
          <Route path="/flatiron-health" element={<FlatironHealthDetails />} />
          <Route path="/exact-data" element={<ExactDataDetails />} />
          <Route path="/protege" element={<ProtegeDetails />} />
          <Route path="/segmed" element={<SegmedDetails />} />
          <Route path="/imerit" element={<IMeritDetails />} />
          <Route path="/prolific" element={<ProlificDetails />} />
          <Route path="/collinear" element={<CollinearDetails />} />
          <Route path="/sermo" element={<SermoDetails />} />
          <Route path="/book-your-data" element={<BookYourDataDetails />} />
          <Route path="/carbon-arc" element={<CarbonArcDetails />} />
          <Route path="/trinex" element={<TriNexDetails />} />
          <Route path="/iqvia" element={<IQVIADetails />} />
          <Route path="/roamler" element={<RoamlerDetails />} />
          <Route path="/zyte" element={<ZyteDetails />} />
          <Route path="/pdf-viewer" element={<PdfViewerPage />} />
          <Route path="/agency/:agencyName" element={<GenericAgencyDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AgencyProvider>
  </QueryClientProvider>
  );
};

export default App;
