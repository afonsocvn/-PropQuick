export const greenEleganceTemplate = {
  template_name: "Green Elegance - Video Production Proposal",
  page_layouts: {
    format: "A4",
    orientation: "portrait",
    margins: { top: 40, right: 40, bottom: 40, left: 40 }
  },
  sections: [
    {
      id: "cover_page",
      type: "cover",
      elements: [
        { type: "shape", style: { background_color: "#3d564b" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "image", content: "{{logo_url}}", dimensions: { width: 140, height: 40 }, position: { x: 40, y: 40, is_absolute: true } },
        { type: "text", content: "◆ {{company_name}}", style: { font_family: "Inter, sans-serif", font_size: 14, font_weight: "bold", color: "#ffffff", text_align: "left" }, position: { x: 40, y: 90, is_absolute: true } },
        { type: "text", content: "Project\nProposal", style: { font_family: "'Playfair Display', serif", font_size: 64, font_weight: "bold", color: "#f3ece1", text_align: "left", line_height: 1.1 }, position: { x: 40, y: 280, is_absolute: true } },
        { type: "text", content: "{{project_title}}", style: { font_family: "Inter, sans-serif", font_size: 16, font_weight: "normal", color: "#a6baae", text_align: "left" }, position: { x: 40, y: 440, is_absolute: true } },
        { type: "text", content: "PRESENTED TO:\n{{client_name}}", style: { font_family: "Inter, sans-serif", font_size: 10, font_weight: "bold", color: "#a6baae", line_height: 1.4 }, position: { x: 40, y: 760, is_absolute: true } },
        { type: "text", content: "PRESENTED BY\n{{freelancer_name}}", style: { font_family: "Inter, sans-serif", font_size: 10, font_weight: "bold", color: "#a6baae", line_height: 1.4 }, position: { x: 250, y: 760, is_absolute: true } }
      ]
    },
    {
      id: "about_us_page",
      type: "standard",
      elements: [
        { type: "shape", style: { background_color: "#f3ece1" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "text", content: "About Us", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 60, is_absolute: true } },
        { type: "text", content: "{{company_description}}", style: { font_family: "Inter, sans-serif", font_size: 12, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } },
        { type: "image", content: "{{company_image_url}}", dimensions: { width: 300, height: 210 }, position: { x: 40, y: 300, is_absolute: true } }
      ]
    },
    {
      id: "intro_page",
      type: "standard",
      elements: [
        { type: "shape", style: { background_color: "#f3ece1" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "text", content: "{{project_context_title}}", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 60, is_absolute: true } },
        { type: "text", content: "{{project_context}}", style: { font_family: "Inter, sans-serif", font_size: 12, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } }
      ]
    },
    {
      id: "challenges_and_objectives",
      type: "standard",
      elements: [
        { type: "shape", style: { background_color: "#f3ece1" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "text", content: "{{challenges_title}}", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 60, is_absolute: true } },
        { type: "text", content: "{{challenges_list}}", style: { font_family: "Inter, sans-serif", font_size: 12, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } },
        { type: "text", content: "{{objectives_title}}", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 400, is_absolute: true } },
        { type: "text", content: "{{objectives_list}}", style: { font_family: "Inter, sans-serif", font_size: 12, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 435, is_absolute: true } }
      ]
    },
    {
      id: "pricing_and_footer",
      type: "pricing",
      elements: [
        { type: "shape", style: { background_color: "#f3ece1" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "text", content: "Detailed Budget", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 60, is_absolute: true } },
        { type: "text", content: "Below is the breakdown of the investment required for this proposal.", style: { font_family: "Inter, sans-serif", font_size: 12, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } },
        { 
          type: "table", content: "", 
          table_config: {
            columns: ["Description", "", "Amount"],
            dynamic_rows_placeholder: "milestones",
            header_style: { font_family: "Inter, sans-serif", font_size: 12, font_weight: "bold", color: "#3c3c3c", background_color: "#e0d9d0", padding: [8,8,8,8], text_align: "left" },
            row_style: { font_family: "Inter, sans-serif", font_size: 11, color: "#3c3c3c", padding: [8,8,8,8], text_align: "left", border_bottom: "1px solid #c9c3ba" }
          },
          dimensions: { width: 515 }, 
          position: { x: 40, y: 150, is_absolute: true } 
        },
        { type: "text", content: "Financial Summary", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 400, is_absolute: true } },
        { type: "text", content: "Total Investment:\n{{total_investment}}", style: { font_family: "Inter, sans-serif", font_size: 14, font_weight: "bold", color: "#3d564b", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 440, is_absolute: true } },
        { type: "text", content: "Terms & Conditions", style: { font_family: "'Playfair Display', serif", font_size: 14, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 520, is_absolute: true } },
        { type: "text", content: "{{terms_and_conditions}}", style: { font_family: "Inter, sans-serif", font_size: 10, color: "#3c3c3c", line_height: 1.5, text_align: "justify" }, dimensions: { width: 515 }, position: { x: 40, y: 545, is_absolute: true } },
        { type: "shape", style: { background_color: "#3d564b" }, dimensions: { width: 595.28, height: 100 }, position: { x: 0, y: 741.89, is_absolute: true } },
        { type: "text", content: "EMAIL\n{{freelancer_email}}", style: { font_family: "Inter, sans-serif", font_size: 9, font_weight: "bold", color: "#f3ece1", line_height: 1.4 }, position: { x: 250, y: 770, is_absolute: true } }
      ]
    },
    {
      id: "signatures_page",
      type: "standard",
      elements: [
        { type: "shape", style: { background_color: "#f3ece1" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "text", content: "Agreement", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 60, is_absolute: true } },
        { type: "text", content: "By signing below, both parties agree to the terms and conditions outlined in this proposal. This document becomes a legally binding agreement upon signature.", style: { font_family: "Inter, sans-serif", font_size: 12, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } },
        
        // Client side
        { type: "text", content: "CLIENT", style: { font_family: "Inter, sans-serif", font_size: 10, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 200, is_absolute: true } },
        { type: "shape", style: { border_bottom: "1px solid #3d564b" }, dimensions: { width: 220, height: 40 }, position: { x: 40, y: 240, is_absolute: true } },
        { type: "text", content: "Signature", style: { font_family: "Inter, sans-serif", font_size: 9, color: "#a6baae" }, position: { x: 40, y: 285, is_absolute: true } },
        
        { type: "shape", style: { border_bottom: "1px solid #e0d9d0" }, dimensions: { width: 220, height: 30 }, position: { x: 40, y: 320, is_absolute: true } },
        { type: "text", content: "Full Name", style: { font_family: "Inter, sans-serif", font_size: 9, color: "#a6baae" }, position: { x: 40, y: 355, is_absolute: true } },
        
        { type: "shape", style: { border_bottom: "1px solid #e0d9d0" }, dimensions: { width: 220, height: 30 }, position: { x: 40, y: 390, is_absolute: true } },
        { type: "text", content: "Date", style: { font_family: "Inter, sans-serif", font_size: 9, color: "#a6baae" }, position: { x: 40, y: 425, is_absolute: true } },
        
        // Provider side
        { type: "text", content: "SERVICE PROVIDER", style: { font_family: "Inter, sans-serif", font_size: 10, font_weight: "bold", color: "#3d564b" }, position: { x: 335, y: 200, is_absolute: true } },
        { type: "shape", style: { border_bottom: "1px solid #3d564b" }, dimensions: { width: 220, height: 40 }, position: { x: 335, y: 240, is_absolute: true } },
        { type: "text", content: "Signature", style: { font_family: "Inter, sans-serif", font_size: 9, color: "#a6baae" }, position: { x: 335, y: 285, is_absolute: true } },
        
        { type: "shape", style: { border_bottom: "1px solid #e0d9d0" }, dimensions: { width: 220, height: 30 }, position: { x: 335, y: 320, is_absolute: true } },
        { type: "text", content: "Full Name", style: { font_family: "Inter, sans-serif", font_size: 9, color: "#a6baae" }, position: { x: 335, y: 355, is_absolute: true } },
        
        { type: "shape", style: { border_bottom: "1px solid #e0d9d0" }, dimensions: { width: 220, height: 30 }, position: { x: 335, y: 390, is_absolute: true } },
        { type: "text", content: "Date", style: { font_family: "Inter, sans-serif", font_size: 9, color: "#a6baae" }, position: { x: 335, y: 425, is_absolute: true } },

        // Bottom accent
        { type: "shape", style: { background_color: "#3d564b" }, dimensions: { width: 595.28, height: 10 }, position: { x: 0, y: 831.89, is_absolute: true } }
      ]
    }
  ]
};
