import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TextInput({ label, placeholder, field, error }: any) {
  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <Input {...field} placeholder={placeholder} />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
