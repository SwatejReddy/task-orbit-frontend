"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation";

// Define form schema using Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    username: z.string().min(4, { message: "Username must be at least 4 characters" }).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})


export const SignupForm = () => {
    // to naviagte to another page

    const router = useRouter();

    // keep track of loading state
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange", // Validate on change and blur
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        }
    })

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        //set loading animation
        setLoading(true);
        try {
            // make an api call and submit the form
            const res: any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, values);
            console.log(res.data)
            console.log(res)
            if (res.data.statusCode == 200) {
                alert("Account created successfully!");
                router.push("/login")
            }
            else {
                alert("An error occurred. Please try again.");
                router.push("/signup")
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {/* Name field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password field */}

                {
                    loading ?
                        (
                            <Button disabled={loading} className="w-full flex items-center ">
                                <ReloadIcon className="mr-2 h-4 animate-spin" />
                                Please wait
                            </Button>
                        ) :
                        (
                            <Button className="w-full" type="submit">Sign up</Button>
                        )
                }
            </form>
        </Form>
    )
}
