import { format } from "date-fns";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

type DateInputProps = {
  field: any;
  error?: any;
  label?: string;
};

export function DateInput({ label, field, error }: DateInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>{label}</FieldLabel>

      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between font-normal">
              {field.value ? format(field.value, "PPP") : "Pick a date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} captionLayout="dropdown" />
          </PopoverContent>
        </Popover>
      </div>

      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
