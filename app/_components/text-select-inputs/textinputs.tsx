import React from "react";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import z from "zod";

// TextInputField component
interface TextInputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  control: any;
  type?: any;
  disabled?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  ...props
}) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => {
        const { onChange, ...restField } = field;
        return (
          <FormItem>
            <FormLabel className="">{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...restField}
                // onChange={(e) => onChange(e.target.value.trim())}
                onChange={(e) =>
                  props.type === "number"
                    ? onChange(parseInt(e.target.value))
                    : onChange(e.target.value)
                }
                className={cn(
                  "w-full justify-start text-left font-normal bg-white hover:bg-white hover:text-primary border-[0.8px] rounded-lg border-gray-500/90"
                  // !field.value && "text-muted-foreground"
                )}
                type={props.type}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextInputField;
