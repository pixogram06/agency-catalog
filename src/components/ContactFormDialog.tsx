import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  requestSummary: z.string().min(10, "Request summary must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agencyName: string;
}

export const ContactFormDialog = ({ open, onOpenChange, agencyName }: ContactFormDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      requestSummary: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // EmailJS is required - check if configured
      if (!serviceId || !templateId || !publicKey) {
        toast({
          title: "Email service not configured",
          description: "Please configure EmailJS environment variables. Contact the administrator.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Prepare email template parameters
      const templateParams: Record<string, string> = {
        to_email: "kausalyarani.k@centific.com",
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        agency_name: agencyName,
        message: data.requestSummary,
        reply_to: data.email,
      };

      // Handle file attachment if present
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64File = reader.result as string;
          // EmailJS template should handle attachment_name and attachment_base64
          templateParams.attachment_name = file.name;
          templateParams.attachment_base64 = base64File.split(',')[1]; // Remove data:type;base64, prefix
          templateParams.attachment_type = file.type;
          
          try {
            await emailjs.send(serviceId, templateId, templateParams);
            showSuccess();
          } catch (error) {
            console.error("Error sending email with attachment:", error);
            throw error;
          }
        };
        reader.onerror = () => {
          throw new Error("Failed to read file");
        };
        reader.readAsDataURL(file);
      } else {
        // Send email without attachment
        await emailjs.send(serviceId, templateId, templateParams);
        showSuccess();
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly at kausalyarani.k@centific.com",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const showSuccess = () => {
    toast({
      title: "Message sent successfully!",
      description: "Your contact request has been sent.",
    });
    form.reset();
    setFile(null);
    onOpenChange(false);
    setIsSubmitting(false);
  };

  // Reset form when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      setFile(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact {agencyName}</DialogTitle>
          <DialogDescription>
            Fill out the form below to get in touch. We'll respond as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your request or inquiry..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="file-upload">Attachment (Optional)</Label>
              {!file ? (
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-accent transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Upload file</span>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                  setFile(null);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

