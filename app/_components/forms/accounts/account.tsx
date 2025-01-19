"use client";

import React, { useEffect, useState } from "react";
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
import SelectField from "../../text-select-inputs/selectinputs";
import TextInputField from "../../text-select-inputs/textinputs";
import { AccountType } from "@/types/type";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum(["BANK", "MOBILE_MONEY", "CASH", "CREDIT_CARD", "OTHER"]),
  balance: z.number().min(0, "Balance must be a positive number"),
  currency: z.string().default("RWF"),
});



type FormValues = z.infer<typeof formSchema>;

type AccountFormProps = {
  onSubmit: (data: FormValues) => Promise<void>;
  onUpdate: (data: FormValues) => Promise<void>;
  
  initialValues: FormValues;
  isUpdate?: boolean;
};

const AccountForm = ({
  onSubmit,
  onUpdate,
  initialValues,
  isUpdate = false,
}: AccountFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {},
  });



  const token =
    typeof window !== "undefined" && localStorage.getItem("usertoken");

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
      toast.error("Failed to create/update account");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
         
        >

            <div  className="md:space-y-0  gap-2 grid md:grid-cols-3">  <TextInputField
            name="name"
            label="Name"
            placeholder="Enter account name"
            control={form.control}
          />
          <SelectField
            name="type"
            label="Type"
            options={{
                BANK: "BANK",
                MOBILE_MONEY: "MOBILE_MONEY",
                CASH: "CASH",
                CREDIT_CARD: "CREDIT_CARD",
                OTHER: "OTHER"
              }}
            placeholder="Select account type"
            control={form.control}
          />
          <TextInputField
            name="balance"
            label="Balance"
            placeholder="Enter account balance"
            control={form.control}
            type="number"
          />
          <TextInputField
            name="currency"
            label="Currency"
            placeholder="Enter account currency"
            control={form.control}
          /></div>
         
         

         <div className=" mt-3 justify-start ">
            {loading ? (
              <Button
                variant="secondary"
                type="submit"
                className="bg-primary hover:bg-primary text-white"
              >
                <span> ......</span>
              </Button>
            ) : (
              <Button
                variant="secondary"
                type="submit"
                className="bg-primary hover:bg-primary text-white w-full md:w-1/3"
              >
                {isUpdate ? "Update" : "Create"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
