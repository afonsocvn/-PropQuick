import React from 'react';

interface ElementPos {
  x: number;
  y: number;
  is_absolute: boolean;
}

interface ElementDim {
  width?: number;
  height?: number;
}

interface ElementStyle {
  font_family?: string;
  font_size?: number;
  font_weight?: string;
  color?: string;
  background_color?: string;
  text_align?: string;
  line_height?: number;
  padding?: number[];
  border_bottom?: string;
}

interface TemplateElement {
  type: 'shape' | 'text' | 'image' | 'table';
  content?: string;
  style?: ElementStyle;
  position?: ElementPos;
  dimensions?: ElementDim;
  table_config?: {
    columns: string[];
    dynamic_rows_placeholder: string;
    header_style: ElementStyle;
    row_style: ElementStyle;
  };
}

interface TemplateSection {
  id: string;
  type: string;
  elements: TemplateElement[];
}

export interface TemplateSchema {
  template_name: string;
  page_layouts: any;
  sections: TemplateSection[];
}

interface TemplateRendererProps {
  data: any;
  template: TemplateSchema;
}

export default function TemplateRenderer({ data, template }: TemplateRendererProps) {
  // Utility to replace placeholders
  const hydrate = (text: string) => {
    if (!text) return '';
    return text.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      // Special calculated fields
      if (key === 'total_investment') {
        const total = (data.milestones || []).reduce((sum: number, m: any) => sum + Number(m.amount || 0), 0);
        return `${data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}${total.toLocaleString()}`;
      }
      if (key === 'project_title') return data.projectTitle || 'Project Proposal';
      if (key === 'company_name') return data.companyName || 'Your Company';
      if (key === 'client_name') return data.clientName || 'Client Name';
      if (key === 'freelancer_name') return data.freelancerName || 'Your Name';
      if (key === 'project_context') return data.projectContext || 'Overview of the project.';
      if (key === 'company_description') return data.companyDescription || 'Company background.';
      if (key === 'company_image_url') return data.companyImageUrl || '';
      if (key === 'challenges_list') return (data.challenges || []).join('\n• ');
      if (key === 'freelancer_phone') return data.phone || '+00 000 000 000';
      if (key === 'freelancer_address') return data.address || 'Your Address';
      if (key === 'freelancer_email') return data.email || 'hello@company.com';
      if (key === 'logo_url') return data.logoUrl || '';
      if (key === 'challenges_title') return data.challengesTitle || 'The Challenge';
      if (key === 'objectives_title') return data.objectivesTitle || 'Objectives';
      if (key === 'objectives_list') return (data.objectives || []).join('\n• ');
      
      return data[key] || match;
    });
  };

  return (
    <>
      {template.sections.map((section) => (
        <div
          key={section.id}
          className="w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col relative overflow-hidden print:shadow-none print-dynamic-flow print:break-inside-avoid bg-white"
          style={{ width: '595.28px', height: '841.89px' }}
        >
          {section.elements.map((el, i) => {
            const styleProps: React.CSSProperties = {
              position: el.position?.is_absolute ? 'absolute' : 'relative',
              left: el.position?.x ? `${el.position.x}px` : undefined,
              top: el.position?.y ? `${el.position.y}px` : undefined,
              width: el.dimensions?.width ? `${el.dimensions.width}px` : undefined,
              height: el.dimensions?.height ? `${el.dimensions.height}px` : undefined,
              fontFamily: el.style?.font_family,
              fontSize: el.style?.font_size ? `${el.style.font_size}px` : undefined,
              fontWeight: el.style?.font_weight,
              color: el.style?.color,
              backgroundColor: el.style?.background_color,
               textAlign: el.style?.text_align as any,
              lineHeight: el.style?.line_height,
              borderBottom: el.style?.border_bottom,
              whiteSpace: 'pre-wrap'
            };

            if (el.type === 'shape') {
              return <div key={i} style={styleProps} />;
            }
            
            if (el.type === 'text') {
              return (
                <div key={i} style={styleProps}>
                  {hydrate(el.content || '')}
                </div>
              );
            }

            if (el.type === 'image') {
              const src = hydrate(el.content || '');
              if (!src) return null;

              let width = styleProps.width;
              let height = styleProps.height;
              let left = styleProps.left;

              if (el.content === '{{company_image_url}}') {
                if (data.companyImageSize === 'wide') {
                  width = '515.28px';
                  height = '240px';
                  left = '40px';
                } else if (data.companyImageSize === 'small') {
                  width = '120px';
                  height = '120px';
                } else {
                  width = '300px';
                  height = '210px';
                }
              }

              return (
                <img
                  key={i}
                  src={src}
                  alt="Template Image"
                  style={{ ...styleProps, width, height, left, objectFit: 'cover' }}
                />
              );
            }

            if (el.type === 'table' && el.table_config) {
              const { columns, dynamic_rows_placeholder, header_style, row_style } = el.table_config;
              
              // Resolve rows
              let rows: any[] = [];
              let extras: any[] = [];
              if (dynamic_rows_placeholder === 'milestones') {
                rows = (data.milestones || []).map((m: any) => [
                  m.name || 'Milestone',
                  m.date || 'TBD',
                  `${data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}${m.amount || '0'}`
                ]);
                extras = data.extras || [];
              }

              return (
                <table key={i} style={{ ...styleProps, borderCollapse: 'collapse', width: styleProps.width || '100%' }}>
                  <thead>
                    <tr>
                      {columns.map((col, cIdx) => (
                        <th
                          key={cIdx}
                          style={{
                            fontFamily: header_style.font_family,
                            fontSize: header_style.font_size ? `${header_style.font_size}px` : undefined,
                            fontWeight: header_style.font_weight as any,
                            color: header_style.color,
                            backgroundColor: header_style.background_color,
                            padding: header_style.padding ? `${header_style.padding.join('px ')}px` : '8px',
                            textAlign: header_style.text_align as any
                          }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell: any, cIdx: number) => (
                          <td
                            key={cIdx}
                            style={{
                              fontFamily: row_style.font_family,
                              fontSize: row_style.font_size ? `${row_style.font_size}px` : undefined,
                              color: row_style.color,
                              padding: row_style.padding ? `${row_style.padding.join('px ')}px` : '8px',
                              textAlign: cIdx === 2 ? 'right' : (row_style.text_align as any),
                              borderBottom: row_style.border_bottom
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {extras.length > 0 && dynamic_rows_placeholder === 'milestones' && (
                      <>
                        <tr>
                          <td colSpan={columns.length} style={{ paddingTop: '32px', paddingBottom: '8px', fontFamily: header_style.font_family, fontSize: '10px', textTransform: 'uppercase', color: '#a6baae', borderBottom: '1px solid #c9c3ba' }}>
                            Optional Add-ons
                          </td>
                        </tr>
                        {extras.map((extra: any, eIdx: number) => (
                          <tr key={`extra-${eIdx}`} style={{ backgroundColor: '#fafafa' }}>
                            <td style={{
                              fontFamily: row_style.font_family,
                              fontSize: row_style.font_size ? `${row_style.font_size}px` : undefined,
                              color: row_style.color,
                              padding: row_style.padding ? `${row_style.padding.join('px ')}px` : '8px',
                              textAlign: 'left',
                              borderBottom: row_style.border_bottom
                            }}>
                              {extra.name}
                            </td>
                            <td style={{
                              fontFamily: row_style.font_family,
                              fontSize: row_style.font_size ? `${Number(row_style.font_size)-2}px` : undefined,
                              color: '#6b7280',
                              padding: row_style.padding ? `${row_style.padding.join('px ')}px` : '8px',
                              textAlign: 'left',
                              borderBottom: row_style.border_bottom
                            }}>
                              {extra.date}
                            </td>
                            <td style={{
                              fontFamily: row_style.font_family,
                              fontSize: row_style.font_size ? `${row_style.font_size}px` : undefined,
                              color: row_style.color,
                              padding: row_style.padding ? `${row_style.padding.join('px ')}px` : '8px',
                              textAlign: 'right',
                              borderBottom: row_style.border_bottom
                            }}>
                              {data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}{extra.amount}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              );
            }

            return null;
          })}
        </div>
      ))}
    </>
  );
}
