"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const registerSchema = z.object({
  email : z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "name is required"),


});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handleRegister = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/register", data);
      if (typeof window !== "undefined") {
        localStorage.setItem("usertoken", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
          
            email: res.data.user.email,
            name: res.data.user.name,
            token : res.data.token
          })
        );
      }
      router.push("/dashboard");
    } catch (err: any) {
      
      if (err.status === 401) {
        toast.error(err.response.data.error);
      }

      toast.error(err?.response?.data.error || "An error occurred");
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(handleRegister)}
        className="space-y-4 w-full max-w-md p-6 shadow-2xl rounded-lg bg-white"
      >
        <h1 className="text-xl font-semibold text-center">Register</h1>



        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="EX: olivier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="EX: olivier@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="secondary"
          type="submit"
           className="w-full bg-primary text-white hover:bg-blue-400 "
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <p className="">Have an account <Link
      href="/signin"
      >Login</Link> </p>
      </form>
    </Form>
  );
}