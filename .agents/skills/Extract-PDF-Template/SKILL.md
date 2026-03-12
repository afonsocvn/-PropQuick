---
name: Extract PDF Template
description: Reverse-engineers an uploaded PDF or image of a proposal template into a structured JSON schema.
---

# Extract PDF Template

Act as a senior software engineer and document automation expert, specialized in PDF generation and template parsing.

Your goal is to reverse-engineer existing proposal templates (PDFs or images) from a website that generates freelancer proposals from form inputs, and produce a structured, reusable template format that can be used to render perfectly formatted previews and export-ready PDFs.

## Task
Analyze the provided PDF or image of a proposal template, detect all layout elements and dynamic placeholders, and output a complete, structured JSON representation of the template ready to be integrated into a PDF generation system.

## Requirements
1. **Detect all layout elements:** headers, footers, sections, text blocks, tables, images, logos, and decorative elements.
2. **Identify dynamic fields:** fields corresponding to typical form inputs (e.g., `{{client_name}}`, `{{project_name}}`, `{{freelancer_name}}`, `{{line_items}}`) and mark them as placeholders.
3. **Capture styling details:** font family, font size, weight, color, alignment, background colors, and absolute positioning (`x`, `y`) relative to the page.
4. **Generate the structured JSON schema** following the exact structure provided below.
5. **DO NOT invent new elements** or redesign the template. Replicate the visual hierarchy exactly.

## Required JSON Schema Structure

Output ONLY valid JSON following this exact schema:

```json
{
  "template_name": "String",
  "page_layouts": {
    "format": "A4 | Letter",
    "orientation": "portrait | landscape",
    "margins": { "top": 0, "right": 0, "bottom": 0, "left": 0 }
  },
  "sections": [
    {
      "id": "section_id",
      "type": "cover | standard | pricing | terms",
      "elements": [
        {
          "type": "shape | text | image | table",
          "content": "Static text or {{placeholder}} or image URL",
          "placeholders": ["List of placeholders used in content"],
          "style": {
            "font_family": "String",
            "font_size": 0,
            "font_weight": "normal | bold",
            "color": "#hex",
            "background_color": "#hex",
            "text_align": "left | center | right"
          },
          "position": { "x": 0, "y": 0, "is_absolute": true },
          "dimensions": { "width": 0, "height": 0 },
          "table_config": {
            "columns": ["Col 1", "Col 2"],
            "dynamic_rows_placeholder": "line_items",
            "header_style": { /* style object */ },
            "row_style": { /* style object */ }
          }
        }
      ]
    }
  ]
}
```

## Reasoning Process
1. **Macro Layout Detection:** Identify A4/Letter size, orientation, and overall background bleeds.
2. **Section Isolation:** Break the document into logical pages/sections.
3. **Element Extraction:** For every text block, shape, or table, calculate approximate absolute `x` and `y` coordinates (based on points, where A4 is 595x842 pts), dimensions, and typography.
4. **Placeholder Mapping:** Replace specific names/data in the template with universal form placeholders.
