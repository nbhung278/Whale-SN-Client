"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/actions/auth/login.action";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import imageSocial from "../../../public/assets/images/social-3.jpg";
import Image from "next/image";

const FormSchema = z.object({
	email: z
		.string()
		.email({
			message: "This field must have type email.",
		})
		.max(64, {
			message: "This field can only have a maximum of 64 characters.",
		}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});
const SignIn = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const loginData = {
			email: data.email || "",
			password: data.password || "",
		};
		console.log("loginData", loginData);

		try {
			const res: any = await LoginUserMutation({
				variables: loginData,
			});
			if (res.data) {
				console.log("res", res);

				Cookies.set("access_token", res.data.login?.accessToken);
				Cookies.set("refresh_token", res.data.login?.refreshToken);
				router.push("/");
				toast.success("Login successfully");
				form.reset();
			} else {
				if (res?.errors?.length > 0) {
					toast.error(res?.errors[0]?.message, {
						description: "Sunday, December 03, 2023 at 9:00 AM",
					});
					console.log(res, "res");
				}
			}
		} catch (error: any) {
			console.log(error);

			toast.error(error?.message, {
				description: "Sunday, December 03, 2023 at 9:00 AM",
			});
		}
	};

	const [LoginUserMutation, { loading, error, data }] = useMutation(LOGIN_USER);
	return (
		<div className="flex flex-row items-center justify-between w-screen h-screen">
			<div className="h-full flex-1 max-md:hidden">
				<Image
					src={imageSocial}
					alt="loginImage"
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex flex-1 flex-col items-center justify-center xl:px-[100px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-5/6 space-y-5"
					>
						<div className="flex flex-col items-center">
							<h1 className="text-lg font-semibold">Login</h1>
							<p className="text-[13px] text-center">
								Enter your email and password to login
							</p>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Enter your email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="w-full flex flex-row justify-end">
							<Link href={"/forgot-password"}>
								<p className="text-[14px] cursor-pointer">Forgot Password?</p>
							</Link>
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</Form>
				<div className="mt-5 w-5/6 flex flex-col gap-4 items-center">
					<p>
						Don’t have an account?{" "}
						<Link href="sign-up">
							<span className="cursor-pointer text-[blue]">Register</span>
						</Link>
					</p>
					<Button type="button" variant="secondary" className="w-full">
						<FcGoogle className="mr-2" /> Google
					</Button>
					<p className="text-[13px] text-center">
						By clicking continue, you agree to our{" "}
						<span className="underline  cursor-pointer">Terms of Service</span>{" "}
						and{" "}
						<span className="underline  cursor-pointer">Privacy Policy</span> .
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
