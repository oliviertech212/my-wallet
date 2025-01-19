

"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category } from "@/types/type";
import axios from "axios";
import TextInputField from "../../text-select-inputs/textinputs";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  categoryId: z.number().min(1, "Category ID is required"),
});

type FormValues = z.infer<typeof formSchema>;

type SubcategoryFormProps = {
  onSubmit: (data: FormValues) => Promise<void>;
  onUpdate: (data: FormValues) => Promise<void>;
  initialValues: FormValues;
  isUpdate?: boolean;
};

const SubcategoryForm = ({
  onSubmit,
  onUpdate,
  initialValues,
  isUpdate = false,
}: SubcategoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {},
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const token =
    typeof window !== "undefined" && localStorage.getItem("usertoken");

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.categories);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.error || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      if (isUpdate) {
        await onUpdate(data);
      } else {
        await onSubmit(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create/update subcategory");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg md:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInputField
            name="name"
            label="Name"
            placeholder="Enter subcategory name"
            control={form.control}
          />
          <TextInputField
            name="description"
            label="Description"
            placeholder="Enter subcategory description"
            control={form.control}
          />
          <SelectnumberField
            name="categoryId"
            label="Category"
            options={categories.reduce(
              (acc, category) => ({ ...acc, [category.name]: category.id }),
              {}
            )}
            placeholder="Select Category"
            control={form.control}
          />
          <Button type="submit" className="mt-3">
            {isUpdate ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: Record<string, number>;
  control: any;
  value?: any;
  className?: string;
}

export const SelectnumberField: React.FC<SelectFieldProps> = ({
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
              onValueChange={(val) => field.onChange(Number(val))} // Convert string back to number
              value={field.value?.toString() || props.value?.toString()}
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
                    <SelectItem key={key} value={value.toString()}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{fieldState.error?.error}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default SubcategoryForm;
