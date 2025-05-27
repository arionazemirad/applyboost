"use client";

import { useState } from "react";
import { Layout, Eye, Download, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean, ATS-friendly design perfect for tech roles",
    category: "Professional",
    preview: "/templates/modern-professional.jpg",
    features: ["ATS Optimized", "Clean Layout", "Tech-Focused"],
    isPopular: true,
  },
  {
    id: 2,
    name: "Creative Designer",
    description: "Visually appealing template for creative professionals",
    category: "Creative",
    preview: "/templates/creative-designer.jpg",
    features: ["Visual Appeal", "Portfolio Section", "Color Accents"],
    isPopular: false,
  },
  {
    id: 3,
    name: "Executive Leader",
    description: "Sophisticated design for senior-level positions",
    category: "Executive",
    preview: "/templates/executive-leader.jpg",
    features: ["Leadership Focus", "Achievement Highlights", "Premium Look"],
    isPopular: true,
  },
  {
    id: 4,
    name: "Minimalist",
    description: "Simple, elegant design that focuses on content",
    category: "Minimalist",
    preview: "/templates/minimalist.jpg",
    features: ["Content Focus", "Easy to Read", "Versatile"],
    isPopular: false,
  },
];

export function ResumeTemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);

  const getCategoryColor = (category: string) => {
    const colors = {
      Professional: "bg-blue-100 text-blue-800",
      Creative: "bg-purple-100 text-purple-800",
      Executive: "bg-green-100 text-green-800",
      Minimalist: "bg-gray-100 text-gray-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Layout className='h-5 w-5' />
          <span>Resume Templates</span>
        </CardTitle>
        <CardDescription>
          Choose from professionally designed templates
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Template Preview */}
              <div className='relative mb-3'>
                <div className='aspect-[3/4] bg-gray-100 rounded border flex items-center justify-center'>
                  <Layout className='h-8 w-8 text-gray-400' />
                </div>
                {template.isPopular && (
                  <Badge className='absolute -top-2 -right-2 bg-orange-500'>
                    Popular
                  </Badge>
                )}
                {selectedTemplate === template.id && (
                  <div className='absolute top-2 left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center'>
                    <Check className='h-4 w-4 text-white' />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-medium text-sm'>{template.name}</h4>
                  <Badge
                    variant='secondary'
                    className={`text-xs ${getCategoryColor(template.category)}`}
                  >
                    {template.category}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {template.description}
                </p>
                <div className='flex flex-wrap gap-1'>
                  {template.features.map((feature, index) => (
                    <Badge key={index} variant='outline' className='text-xs'>
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Template Actions */}
        {selectedTemplate && (
          <div className='border-t pt-4 space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>
                {templates.find((t) => t.id === selectedTemplate)?.name}
              </h4>
              <div className='flex space-x-2'>
                <Button variant='outline' size='sm'>
                  <Eye className='h-4 w-4 mr-2' />
                  Preview
                </Button>
                <Button size='sm'>
                  <Download className='h-4 w-4 mr-2' />
                  Use Template
                </Button>
              </div>
            </div>
            <p className='text-sm text-muted-foreground'>
              {templates.find((t) => t.id === selectedTemplate)?.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
