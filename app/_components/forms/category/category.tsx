"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TextInputField from "../../text-select-inputs/textinputs";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
  onSubmit: (data: FormValues) => Promise<void>;
  onUpdate: (data: FormValues) => Promise<void>;
  initialValues: FormValues;
  isUpdate?: boolean;
};

const CategoryForm = ({ onSubmit, onUpdate, initialValues, isUpdate = false }: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {},
  });

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
      toast.error("Failed to create/update category");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg md:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
    
            <TextInputField
            name="name"
            label="Name"
           placeholder="Enter category name"
            control={form.control}
            
          />
          <TextInputField
           name="description"
            label="Description"
            placeholder="Enter category description"
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

export default CategoryForm;
