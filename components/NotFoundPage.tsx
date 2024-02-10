import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className="w-full h-full mt-[120px] flex flex-col items-center justify-center gap-[10px]">
			<p className="text-[white] font-medium text-[16px]">
				Rất tiếc, trang này không tồn tại
			</p>
			<div className="text-[#858585] text-[14px] font-light">
				Liên kết bạn truy cập có thể bị hỏng hoặc trang có thể đã bị gỡ.
			</div>
			<Button>
				<Link href={"/"}>Quay lại</Link>
			</Button>
		</div>
	);
};

export default NotFoundPage;
