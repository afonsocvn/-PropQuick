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
        { type: "text", content: "◆ {{company_name}}", style: { font_family: "Inter, sans-serif", font_size: 14, font_weight: "bold", color: "#ffffff", text_align: "left" }, position: { x: 40, y: 50, is_absolute: true } },
        { type: "text", content: "Project\nProposal", style: { font_family: "'Playfair Display', serif", font_size: 64, font_weight: "bold", color: "#f3ece1", text_align: "left", line_height: 1.1 }, position: { x: 40, y: 250, is_absolute: true } },
        { type: "text", content: "{{project_title}}", style: { font_family: "Inter, sans-serif", font_size: 16, font_weight: "normal", color: "#a6baae", text_align: "left" }, position: { x: 40, y: 420, is_absolute: true } },
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
        { type: "text", content: "{{company_description}}", style: { font_family: "Inter, sans-serif", font_size: 10, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } },
        { type: "image", content: "{{company_image_url}}", dimensions: { width: 300, height: 210 }, position: { x: 40, y: 300, is_absolute: true } }
      ]
    },
    {
      id: "intro_challenges_page",
      type: "standard",
      elements: [
        { type: "shape", style: { background_color: "#f3ece1" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "text", content: "Introduction", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 60, is_absolute: true } },
        { type: "text", content: "{{project_context}}", style: { font_family: "Inter, sans-serif", font_size: 10, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } },
        { type: "text", content: "Our Challenge", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 350, is_absolute: true } },
        { type: "text", content: "{{challenges_list}}", style: { font_family: "Inter, sans-serif", font_size: 10, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 385, is_absolute: true } }
      ]
    },
    {
      id: "pricing_and_footer",
      type: "pricing",
      elements: [
        { type: "shape", style: { background_color: "#f3ece1" }, dimensions: { width: 595.28, height: 841.89 } },
        { type: "text", content: "Detailed Budget", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 60, is_absolute: true } },
        { type: "text", content: "Below is the breakdown of the investment required for this proposal.", style: { font_family: "Inter, sans-serif", font_size: 10, color: "#3c3c3c", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 95, is_absolute: true } },
        { 
          type: "table", content: "", 
          table_config: {
            columns: ["Description", "Due", "Amount"],
            dynamic_rows_placeholder: "milestones",
            header_style: { font_family: "Inter, sans-serif", font_size: 10, font_weight: "bold", color: "#3c3c3c", background_color: "#e0d9d0", padding: [8,8,8,8], text_align: "left" },
            row_style: { font_family: "Inter, sans-serif", font_size: 10, color: "#3c3c3c", padding: [8,8,8,8], text_align: "left", border_bottom: "1px solid #c9c3ba" }
          },
          dimensions: { width: 515 }, 
          position: { x: 40, y: 150, is_absolute: true } 
        },
        { type: "text", content: "Financial Summary", style: { font_family: "'Playfair Display', serif", font_size: 22, font_weight: "bold", color: "#3d564b" }, position: { x: 40, y: 400, is_absolute: true } },
        { type: "text", content: "Total Investment:\n{{total_investment}}", style: { font_family: "Inter, sans-serif", font_size: 14, font_weight: "bold", color: "#3d564b", line_height: 1.5 }, dimensions: { width: 515 }, position: { x: 40, y: 440, is_absolute: true } },
        { type: "shape", style: { background_color: "#3d564b" }, dimensions: { width: 595.28, height: 100 }, position: { x: 0, y: 741.89, is_absolute: true } },
        { type: "text", content: "PHONE\n{{freelancer_phone}}", style: { font_family: "Inter, sans-serif", font_size: 9, font_weight: "bold", color: "#a6baae", line_height: 1.4 }, position: { x: 40, y: 770, is_absolute: true } },
        { type: "text", content: "ADDRESS\n{{freelancer_address}}", style: { font_family: "Inter, sans-serif", font_size: 9, font_weight: "bold", color: "#a6baae", line_height: 1.4 }, position: { x: 180, y: 770, is_absolute: true } },
        { type: "text", content: "EMAIL\n{{freelancer_email}}", style: { font_family: "Inter, sans-serif", font_size: 9, font_weight: "bold", color: "#f3ece1", line_height: 1.4 }, position: { x: 400, y: 770, is_absolute: true } }
      ]
    }
  ]
};
