import { Textarea } from "@/components/ui/textarea";

export function TextareaInput({ field, placeholder }: any) {
  return <Textarea {...field} placeholder={placeholder} className="resize-none min-h-35" />;
}
