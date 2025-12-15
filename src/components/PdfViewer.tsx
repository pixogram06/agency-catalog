import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// 使用本地打包的 worker，避免跨域与版本不匹配
// @ts-expect-error - Vite 以 URL 形式导入静态资源
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc as unknown as string;

interface PdfViewerProps {
  url: string;
  title: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url, title }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [pageInput, setPageInput] = useState<string>('1');

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    const newPage = Math.max(1, pageNumber - 1);
    setPageNumber(newPage);
    setPageInput(newPage.toString());
  };
  
  const goToNextPage = () => {
    const newPage = Math.min(numPages, pageNumber + 1);
    setPageNumber(newPage);
    setPageInput(newPage.toString());
  };
  
  const zoomIn = () => setScale(Math.min(2.0, scale + 0.2));
  const zoomOut = () => setScale(Math.max(0.5, scale - 0.2));

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
    } else {
      setPageInput(pageNumber.toString());
    }
  };

  const goToPage = (page: number) => {
    setPageNumber(page);
    setPageInput(page.toString());
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/10">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            {showThumbnails ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1">
            <Input
              type="number"
              value={pageInput}
              onChange={handlePageInputChange}
              className="w-16 h-8 text-center text-sm"
              min={1}
              max={numPages}
            />
            <span className="text-sm font-medium">/ {numPages}</span>
          </form>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(url, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            在新标签打开
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Thumbnails Sidebar */}
        {showThumbnails && (
          <ScrollArea className="w-48 border-r bg-muted/5">
            <div className="p-2 space-y-2">
              {Array.from(new Array(numPages), (_, index) => (
                <button
                  key={`thumb_${index + 1}`}
                  onClick={() => goToPage(index + 1)}
                  className={`w-full p-2 rounded border transition-colors ${
                    pageNumber === index + 1
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <Document file={url}>
                    <Page
                      pageNumber={index + 1}
                      width={150}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                  <div className="text-xs text-center mt-1 font-medium">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* PDF Content */}
        <div className="flex-1 overflow-auto flex justify-center p-4 bg-muted/5">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(err) => {
              // 详细日志方便定位问题（版本/CORS/路径）
              console.error('[PdfViewer] onLoadError', err);
            }}
            onSourceError={(err) => {
              console.error('[PdfViewer] onSourceError', err);
            }}
            loading={
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">正在加载PDF...</div>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                <div className="text-muted-foreground">无法加载PDF文档</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  在新标签中打开
                </Button>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale}
              className="shadow-lg"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};