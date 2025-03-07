"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

type Template = {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  category: "professional" | "corporate" | "completion";
};

type Badge = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: "gold" | "silver" | "bronze";
};

// 3 certificate templates
const certificateTemplates: Template[] = [
  {
    id: "achievement-certificate",
    name: "Achievement Certificate",
    description:
      "A sleek, modern design for professional Achievement certifications with clean typography and subtle branding elements.",
    previewUrl: "/certificates/achievement-certificate.png",
    category: "professional",
  },
  {
    id: "corporate-excellence-certificate",
    name: "Corporate Excellence",
    description:
      "A royal excellence certificate with elegant borders and formal typography suitable for Corporate achievements.",
    previewUrl: "/certificates/corporate-excellence-certificate.png",
    category: "corporate",
  },
  {
    id: "completion-certificate",
    name: "Completion Certificate",
    description:
      "Bold and colorful design celebrating achievements with modern graphic elements.",
    previewUrl: "/certificates/completion-certificate.png",
    category: "completion",
  },
];

// 3 badge options
const badgeOptions: Badge[] = [
  {
    id: "gold-badge",
    name: "Gold Excellence Badge",
    description:
      "Premium gold Badge for high-value certifications and outstanding achievements.",
    imageUrl: "/badges/gold-badge.png",
    category: "gold",
  },
  {
    id: "silver-badge",
    name: "Silver Distinction Badge",
    description: "Silver Badge for notable accomplishments.",
    imageUrl: "/badges/silver-badge.png",
    category: "silver",
  },
  {
    id: "bronze-badge",
    name: "Bronze Standard Badge",
    description:
      "Bronze seal for course completion and participation recognition.",
    imageUrl: "/badges/bronze-badge.png",
    category: "bronze",
  },
];

interface TemplateGalleryProps {
  selectedTemplateId: string | null;
  selectedBadgeId: string | null;
  onTemplateSelect: (templateId: string) => void;
  onBadgeSelect: (badgeId: string) => void;
}

export function TemplateGallery({
  selectedTemplateId,
  selectedBadgeId,
  onTemplateSelect,
  onBadgeSelect,
}: TemplateGalleryProps) {
  const selectedTemplate = certificateTemplates.find(
    (template) => template.id === selectedTemplateId
  );

  const selectedBadge = badgeOptions.find(
    (badge) => badge.id === selectedBadgeId
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Certificate Template Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">Certificate Template</h3>
            <Select
              value={selectedTemplateId || ""}
              onValueChange={onTemplateSelect}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a certificate template" />
              </SelectTrigger>
              <SelectContent>
                {certificateTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTemplate ? (
            <div className="rounded-md border">
              <div className="p-4">
                <h4 className="mb-2 text-base font-medium">
                  {selectedTemplate.name}
                </h4>
                <div className="overflow-hidden rounded-md border">
                  <img
                    src={selectedTemplate.previewUrl || "/placeholder.svg"}
                    alt={`${selectedTemplate.name} Preview`}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {selectedTemplate.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-[250px] items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">
                Select a template to see preview
              </p>
            </div>
          )}
        </div>

        {/* Badge Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">Certificate Badge</h3>
            <Select value={selectedBadgeId || ""} onValueChange={onBadgeSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a badge" />
              </SelectTrigger>
              <SelectContent>
                {badgeOptions.map((badge) => (
                  <SelectItem key={badge.id} value={badge.id}>
                    {badge.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedBadge ? (
            <div className="rounded-md border">
              <div className="p-4">
                <h4 className="mb-2 text-base font-medium">
                  {selectedBadge.name}
                </h4>
                <div className="flex justify-center overflow-hidden rounded-md border p-4">
                  <img
                    src={selectedBadge.imageUrl || "/placeholder.svg"}
                    alt={selectedBadge.name}
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {selectedBadge.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-[250px] items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">
                Select a badge to see preview
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Combined Certificate Preview */}
      {selectedTemplate && selectedBadge && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Certificate Preview</h3>
          <Card>
            <CardContent className="p-6">
              <div className="relative rounded-md border">
                <img
                  src={selectedTemplate.previewUrl || "/placeholder.svg"}
                  alt={`${selectedTemplate.name} Preview`}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute -bottom-6 left-28">
                  <img
                    src={selectedBadge.imageUrl || "/placeholder.svg"}
                    alt={selectedBadge.name}
                    className="size-80 object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                This is a preview of how your certificate will look with the
                selected template and badge. The actual certificate will include
                recipient details and course information.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
