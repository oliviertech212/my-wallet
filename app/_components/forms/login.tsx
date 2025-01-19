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
import { Label } from "@/components/ui/label";

const loginSchema =  z.object({
  email : z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),

});



type LoginFormValues = z.infer<typeof loginSchema>;


export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    email : z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  
  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
   
  
    try {
      const res = await axios.post("/api/v1/auth/login", data);
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
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (err: any) {
      if (err.status === 401) {
        toast.error(err.response.data.error);
      }
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        method="post"
       
        onSubmit={form.handleSubmit (handleLogin)}
        className="space-y-4 w-full max-w-md p-6 shadow-2xl rounded-lg bg-white"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <Label>Email</Label>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<Label>PassWord</Label>
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
          className="w-full bg-primary text-white  hover:bg-blue-400"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>


        <p className=" w-[100%]   ">Dont have Account? <Link className="hover:text-blue-500 underline"
      href="/register"
      >Register</Link> </p>


      </form>

    
    </Form>

    
  );
}


