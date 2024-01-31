import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import OtpInput from "react-otp-input";
import { Loader2 } from "lucide-react";

type propsTypes = {
	open: boolean;
	otp?: string | undefined;
	handleClose: () => void;
	handleVerifyOtp: () => void;
	changeOtp: any;
	loading: boolean;
};

const OtpVerifyDialog = (props: propsTypes): React.ReactNode => {
	const { open, handleClose, otp, changeOtp, handleVerifyOtp, loading } = props;

	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center">Verification</DialogTitle>
					<DialogDescription className="text-center">
						You will get a OTP via email.
					</DialogDescription>
				</DialogHeader>
				<div className="w-full md:px-20 px-10">
					<OtpInput
						value={otp}
						onChange={changeOtp}
						containerStyle={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
						}}
						inputStyle={{
							width: "56px",
							height: "56px",
							border: "1px solid black",
							borderRadius: "5px",
						}}
						// inputType="password"
						numInputs={4}
						renderInput={(props: any) => <input {...props} />}
					/>
				</div>

				<DialogFooter className="w-full md:px-20 px-10">
					<Button
						type="button"
						variant="secondary"
						onClick={handleClose}
						className="w-1/3"
					>
						Cancel
					</Button>
					<Button
						type="button"
						onClick={handleVerifyOtp}
						className="w-2/3"
						disabled={loading}
					>
						{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default OtpVerifyDialog;
