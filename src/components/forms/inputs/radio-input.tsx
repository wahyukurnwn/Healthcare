import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioInputProps {
  field: any;
  label?: any;
  error?: any;
  options?: { label: string; value: string }[];
}

export function RadioInput({ label, options, field }: RadioInputProps) {
  return (
    <RadioGroup value={field.value} onValueChange={field.onChange}>
      {options?.map((opt) => (
        <div key={opt.value} className="flex items-center space-x-2">
          <RadioGroupItem value={opt.value} />
          <label>{opt.label}</label>
        </div>
      ))}
    </RadioGroup>
  );
}
