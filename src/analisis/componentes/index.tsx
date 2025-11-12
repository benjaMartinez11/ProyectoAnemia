import { ChangeEventHandler } from "react";

export const LabInputField = ({ label, unit, value, onChange, fieldName }:{ label: string, unit: string, value: number, onChange: ChangeEventHandler<HTMLInputElement> , fieldName: string }) => (
  <div className="flex w-full flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">
      {label} (<span className="text-xs">{unit}</span>)
    </label>
    <input
      type="number"
      aria-label={`${label}-${fieldName}`} // 🔹 accesibilidad única
      value={value}
      onChange={(e) => onChange(fieldName, e.target.value)}
      className="w-full rounded-md border border-gray-400 bg-white p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
);