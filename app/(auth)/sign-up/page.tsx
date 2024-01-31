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
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/actions/auth/register.action";
import { useState } from "react";
import OtpVerifyDialog from "@/components/dialogs/OtpVerifyDialog";
import { VERIFY_USER } from "@/graphql/actions/auth/activationToken.action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import imageBlogging from "../../../public/assets/images/social-2.jpg";

const FormSchema = z.object({
	email: z.string().min(2, {
		message: "Email must be at least 2 characters.",
	}),
});

const SignUp = () => {
	const router = useRouter();
	const [openOtpVerifyDialog, setOpenOtpVerifyDialog] = useState(false);
	const [otp, setOtp] = useState<undefined | string>(undefined);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});

	const handleCloseOtpVerifyDialog = () => {
		setOpenOtpVerifyDialog(false);
	};

	const changeOtp = (value: any) => {
		setOtp(value);
	};

	const handleVerifyOtp = async () => {
		const activationToken = localStorage.getItem("activation_token");
		const data = {
			activationToken: activationToken,
			activationCode: otp,
		};
		try {
			const res = await verifyUserMutation({
				variables: data,
			});
			if (res?.data) {
				localStorage.removeItem("activation_token");
				handleCloseOtpVerifyDialog();
				router.push("/sign-in");
			}
		} catch (error: any) {
			toast.error(error?.message, {
				description: "Sunday, December 03, 2023 at 9:00 AM",
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});
		}
	};

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const dataFake = {
			...data,
			firstName: "Hưng",
			lastName: "Bá",
			name: "nbhung278",
			phoneNumber: "0857560008",
			password: "nbhung278",
			address: "Phủ Lý, Hà Nam",
			bio: "quả đỉnh",
			gender: 1,
			birthDate: "2000-08-27T00:00:00.000Z",
		};
		console.log("data", data);

		try {
			const res: any = await registerUserMutation({
				variables: dataFake,
			});
			if (res.data?.register?.activation_token) {
				localStorage.setItem(
					"activation_token",
					res.data.register.activation_token
				);
				setOpenOtpVerifyDialog(true);
				form.reset();
			}
		} catch (error: any) {
			console.log("error", error);

			toast.error(error?.message, {
				description: "Sunday, December 03, 2023 at 9:00 AM",
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});
		}
	};

	const [registerUserMutation, { loading, error, data }] =
		useMutation(REGISTER_USER);

	const [
		verifyUserMutation,
		{ loading: LoadingVerify, error: errorVerify, data: dataVerify },
	] = useMutation(VERIFY_USER);

	return (
		<div className="flex flex-row items-center justify-between w-screen h-screen">
			<div className=" h-full flex-1 max-md:hidden">
				<Image
					src={imageBlogging}
					alt="loginImage"
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex flex-1 flex-col items-center justify-center xl:px-[100px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-5/6 space-y-6"
					>
						<div className="flex flex-col items-center">
							<h1 className="text-lg font-semibold">Create an account</h1>
							<p className="text-[13px] text-center">
								Enter your email below to create your account
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
						<Button disabled={loading} type="submit" className="w-full">
							{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Register with Email
						</Button>
					</form>
					<div className="mt-5 w-5/6 flex flex-col gap-4 items-center">
						<p>
							Already have an account?{" "}
							<Link href="sign-in">
								<span className="cursor-pointer text-[blue]">Sign In</span>
							</Link>
						</p>
						<p>OR</p>
						<Button type="button" variant="secondary" className="w-full">
							<FaGithub className="mr-2" /> Github
						</Button>
						<p className="text-[13px] text-center">
							By clicking continue, you agree to our{" "}
							<span className="underline  cursor-pointer">
								Terms of Service
							</span>{" "}
							and{" "}
							<span className="underline  cursor-pointer">Privacy Policy</span>{" "}
							.
						</p>
					</div>
				</Form>
			</div>
			{openOtpVerifyDialog && (
				<OtpVerifyDialog
					open={openOtpVerifyDialog}
					handleClose={handleCloseOtpVerifyDialog}
					otp={otp}
					changeOtp={changeOtp}
					loading={LoadingVerify}
					handleVerifyOtp={handleVerifyOtp}
				/>
			)}
		</div>
	);
};

export default SignUp;
