"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Category } from "@/types/type";
import axios from "axios";
import TextInputField from "../../text-select-inputs/textinputs";
import { SelectnumberField } from "../subcategory/subcategory";
const formSchema = z.object({
  amount: z.number().min(0, "Amount must be greater than or equal to 0"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  categoryId: z.number().min(1, "Category ID is required"),
});

type FormValues = z.infer<typeof formSchema>;

type BudgetFormProps = {
  onSubmit: (data: FormValues) => Promise<void>;
  onUpdate: (data: FormValues) => Promise<void>;
  initialValues: FormValues;
  isUpdate?: boolean;
};

const BudgetForm = ({ onSubmit, onUpdate, initialValues, isUpdate = false }: BudgetFormProps) => {
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
      toast.error("Failed to create/update budget");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>

        <TextInputField
             name="amount"
            label="Amount"
            placeholder="Enter budget amount"
            control={form.control}
            type="number"
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

          {/* // start date and end date */}

          <TextInputField
            name="startDate"
            label="Start Date"
            placeholder="Enter start date"
            control={form.control}
            type="date"
          />
         
         
            <TextInputField
                name="endDate"
                label="End Date"
                placeholder="Enter end date"
                control={form.control}
                type="date"
                />
      
          <Button type="submit" className="mt-3">
            {isUpdate ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BudgetForm;
