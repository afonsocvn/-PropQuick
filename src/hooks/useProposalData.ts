import { useState, useEffect, ChangeEvent } from 'react';

export function useProposalData() {
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(() => {
    const stored = localStorage.getItem('proposalData');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse proposalData from localStorage', e);
      }
    }
  }, []);

  // Save data only when it changes
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      try {
        localStorage.setItem('proposalData', JSON.stringify(data));
      } catch (e) {
        if (e instanceof Error && e.name === 'QuotaExceededError') {
          console.error('LocalStorage quota exceeded. Try using smaller images.');
          alert('O limite de armazenamento do browser foi atingido. A imagem é demasiado grande ou tens demasiados dados guardados. Por favor, usa uma imagem mais pequena (idealmente menos de 1MB).');
        } else {
          console.error('Failed to save to localStorage', e);
        }
      }
    }
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    setData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const updateData = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return { data, handleChange, updateData };
}
