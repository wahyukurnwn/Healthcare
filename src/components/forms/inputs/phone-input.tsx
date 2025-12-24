import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type PhoneInputNumberProps = {
  field: any;
  error?: any;
  label?: string;
};

export function PhoneInputNumber({ label, field, error }: PhoneInputNumberProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel>{label}</FieldLabel>

      <div
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          field.invalid && "border-destructive focus-within:ring-destructive"
        )}
      >
        <PhoneInput defaultCountry="ID" international withCountryCallingCode value={field.value} onChange={(v) => field.onChange(v ?? "")} className="flex-1" />
      </div>

      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
