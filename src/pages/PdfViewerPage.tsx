import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';

const PdfViewerPage = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') || '';
  const title = searchParams.get('title') || 'PDF Document';
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) {
      setError(true);
    }
  }, [url]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title.replace(/\s+/g, '_') + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error || !url) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">无法加载PDF文档</p>
          <Button variant="outline" onClick={() => window.close()}>
            关闭窗口
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with title and actions */}
      <header className="border-b bg-muted/10 p-4 flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold text-foreground truncate flex-1">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            title="下载PDF"
          >
            <Download className="h-4 w-4 mr-1" />
            下载
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(url, '_blank')}
            title="在新标签打开"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            新标签
          </Button>
        </div>
      </header>

      {/* PDF viewer - using native browser rendering */}
      <div className="flex-1 relative">
        <iframe
          src={url}
          className="absolute inset-0 w-full h-full border-0"
          title={title}
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
};

export default PdfViewerPage;
