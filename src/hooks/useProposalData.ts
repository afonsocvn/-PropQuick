import { useState, useEffect } from 'react';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    setData((prev) => {
      const newData = { ...prev, [name]: finalValue };
      localStorage.setItem('proposalData', JSON.stringify(newData));
      return newData;
    });
  };

  const updateData = (key: string, value: any) => {
    setData((prev) => {
      const newData = { ...prev, [key]: value };
      localStorage.setItem('proposalData', JSON.stringify(newData));
      return newData;
    });
  };

  return { data, handleChange, updateData };
}
