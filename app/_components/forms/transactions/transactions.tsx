


// "use client";

// import React, { useState, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import axios from "axios";
// import { Account, Category, Subcategory } from "@/types/type";
// import TextInputField from "../../text-select-inputs/textinputs";
// import { SelectnumberField } from "../subcategory/subcategory";
// import SelectField from "../../text-select-inputs/selectinputs";

// const formSchema = z.object({
//   amount: z.number().min(0, "Amount must be greater than or equal to 0"),
//   description: z.string().optional(),
//   date: z.string().nonempty("Date is required"),
//   accountId: z.number().min(1, "Account ID is required"),
//   categoryId: z.number().optional(),
//   subcategoryId: z.number().optional(),
//   type: z.enum(["EXPENSE", "INCOME"]),
// });

// type FormValues = z.infer<typeof formSchema>;

// type TransactionFormProps = {
//   onSubmit: (data: FormValues) => Promise<void>;
//   onUpdate: (data: FormValues) => Promise<void>;
//   initialValues: FormValues;
//   isUpdate?: boolean;
// };

// const TransactionForm = ({ onSubmit, onUpdate, initialValues, isUpdate = false }: TransactionFormProps) => {
//   const [loading, setLoading] = useState(false);
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialValues || {},
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [accounts, setAccounts] = useState<Account[]>([]);

//   const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

//   const token = typeof window !== "undefined" && localStorage.getItem("usertoken");

//   const fetchAccounts = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get("/api/v1/accounts", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAccounts(response.data.accounts);
//       setIsLoading(false);
//     } catch (error: any) {
//       setIsLoading(false);
//       toast.error(error?.response?.data?.error || "Failed to fetch accounts");
//     }
//   };

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get("/api/v1/categories", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCategories(response.data.categories);
//       setIsLoading(false);
//     } catch (error: any) {
//       setIsLoading(false);
//       toast.error(error?.response?.data?.error || "Failed to fetch categories");
//     }
//   };

//   const fetchSubcategories = async (categoryId: number) => {
//     const selectedCategory = categories.find(category => category.id === categoryId);
//     if (selectedCategory) {
//       setSubcategories(selectedCategory.subcategories);
//     } else {
//       setSubcategories([]);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined" && localStorage.getItem("usertoken")) {
//       fetchAccounts();
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCategoryChange = (categoryId: number) => {
//     fetchSubcategories(categoryId);
//     form.setValue("subcategoryId", undefined); // Reset subcategory when category changes
//   };

//   const handleSubmit = async (data: FormValues) => {
//     setLoading(true);
//     try {
//       if (isUpdate) {
//         await onUpdate(data);
//       } else {
//         await onSubmit(data);
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       toast.error("Failed to create/update transaction");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)}>
//           <div className="md:space-y-0 gap-2 grid md:grid-cols-3">
//             <TextInputField
//               name="amount"
//               label="Amount"
//               placeholder="Enter budget amount"
//               control={form.control}
//               type="number"
//             />

//             <SelectField
//               name="type"
//               label="Type"
//               options={{
//                 EXPENSE: "EXPENSE",
//                 INCOME: "INCOME",
//               }}
//               placeholder="Select account type"
//               control={form.control}
//             />

//             <TextInputField
//               name="description"
//               label="Description"
//               placeholder="Enter category description"
//               control={form.control}
//             />

//             <FormField
//               control={form.control}
//               name="categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   <FormControl>
//                     <select
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(e);
//                         handleCategoryChange(Number(e.target.value));
//                       }}
//                       className=  "w-full  h-8 justify-start text-left font-normal bg-white hover:bg-white hover:text-primary border-[0.8px] rounded-lg border-gray-500/90"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="subcategoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Subcategory</FormLabel>
//                   <FormControl>
//                     <select {...field} className=  "w-full  h-8 justify-start text-left font-normal bg-white hover:bg-white hover:text-primary border-[0.8px] rounded-lg border-gray-500/90">
//                       <option value="">Select Subcategory</option>
//                       {subcategories.map((subcategory) => (
//                         <option key={subcategory.id} value={subcategory.id}>
//                           {subcategory?.name}
//                         </option>
//                       ))}
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <SelectnumberField
//               name="accountId"
//               label="Account"
//               options={accounts.reduce(
//                 (acc, account) => ({ ...acc, [account.name]: account.id }),
//                 {}
//               )}
//               placeholder="Select Account"
//               control={form.control}
//             />

//             <TextInputField
//               name="date"
//               label="Date"
//               placeholder="Enter Date"
//               control={form.control}
//               type="date"
//             />
//           </div>

//           <Button type="submit" className="mt-3">
//             {isUpdate ? "Update" : "Create"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// interface SelectFieldProps {
//   name: string;
//   label: string;
//   placeholder: string;
//   options: Record<string, number>;
//   control: any;
//   value?: any;
//   className?: string;
// }
// export default TransactionForm;


"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { Account, Category, Subcategory } from "@/types/type";
import TextInputField from "../../text-select-inputs/textinputs";
import { SelectnumberField } from "../subcategory/subcategory";
import SelectField from "../../text-select-inputs/selectinputs";

const formSchema = z.object({
  amount: z.number().min(0, "Amount must be greater than or equal to 0"),
  description: z.string().optional(),
  date: z.string().nonempty("Date is required"),
  accountId: z.number().min(1, "Account ID is required"),
  categoryId: z.number().optional(),
  subcategoryId: z.number().optional(),
  type: z.enum(["EXPENSE", "INCOME"]),
});

type FormValues = z.infer<typeof formSchema>;

type TransactionFormProps = {
  onSubmit: (data: FormValues) => Promise<void>;
  onUpdate: (data: FormValues) => Promise<void>;
  initialValues: FormValues;
  isUpdate?: boolean;
};

const TransactionForm = ({ onSubmit, onUpdate, initialValues, isUpdate = false }: TransactionFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const token = typeof window !== "undefined" && localStorage.getItem("usertoken");

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/accounts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data.accounts);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.error || "Failed to fetch accounts");
    }
  };

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
      toast.error(error?.response?.data?.error || "Failed to fetch categories");
    }
  };

  const fetchSubcategories = async (categoryId: number) => {
    const selectedCategory = categories.find(category => category.id === categoryId);
    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories);
    } else {
      setSubcategories([]);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("usertoken")) {
      fetchAccounts();
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    fetchSubcategories(categoryId);
    form.setValue("subcategoryId", undefined); // Reset subcategory when category changes
  };

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
      toast.error("Failed to create/update transaction");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="md:space-y-0 gap-2 grid md:grid-cols-3">
            <TextInputField
              name="amount"
              label="Amount"
              placeholder="Enter budget amount"
              control={form.control}
              type="number"
            />

            <SelectField
              name="type"
              label="Type"
              options={{
                EXPENSE: "EXPENSE",
                INCOME: "INCOME",
              }}
              placeholder="Select account type"
              control={form.control}
            />

            <TextInputField
              name="description"
              label="Description"
              placeholder="Enter category description"
              control={form.control}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                        handleCategoryChange(Number(e.target.value));
                      }}
                      className="w-full h-8 justify-start text-left font-normal bg-white hover:bg-white hover:text-primary border-[0.8px] rounded-lg border-gray-500/90"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full h-8 justify-start text-left font-normal bg-white hover:bg-white hover:text-primary border-[0.8px] rounded-lg border-gray-500/90"
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory?.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectnumberField
              name="accountId"
              label="Account"
              options={accounts.reduce(
                (acc, account) => ({ ...acc, [account.name]: account.id }),
                {}
              )}
              placeholder="Select Account"
              control={form.control}
            />

            <TextInputField
              name="date"
              label="Date"
              placeholder="Enter Date"
              control={form.control}
              type="date"
            />
          </div>

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
export default TransactionForm;