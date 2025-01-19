import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: Record<string, string>;
  control: any;
  value?: any;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder,
  options,
  ...props
}) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => (
        <FormItem className={`${props.className}`}>
          <FormLabel className="">{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value || props.value}
            >
              <SelectTrigger
                className={cn(
                  "w-full text-left font-normal bg-white hover:bg-white hover:text-primary border-[0.8px] rounded-lg border-gray-500/90",
                  !field.value && "text-muted-foreground",
                  field.value && "bg-white"
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent style={{ zIndex: 3000 }}>
                <SelectGroup>
                  {Object.entries(options).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default SelectField;
