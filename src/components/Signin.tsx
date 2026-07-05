import { useState } from "react";

export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			// Handle success logic here
		}, 2500);
	};

	return (
		<main className="min-h-screen bg-[#F7F8FC] flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				<div className="rounded-md border-[3px] border-black bg-white shadow-[10px_10px_0px_#B8D8FF] p-10 transition-all duration-200 hover:-translate-y-1 hover:shadow-[14px_14px_0px_#B8D8FF]">
					<div className="mb-10">
						<h1 className="mt-3 text-4xl font-black tracking-tight text-black">
							Sign In
						</h1>
					</div>

					<form className="space-y-5" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className={`mb-2 block text-sm font-semibold text-black transition-opacity ${isLoading ? "opacity-50" : ""}`}
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								required
								disabled={isLoading}
								placeholder="Enter your email"
								className="w-full rounded-sm border-2 border-black bg-[#FDFDFD] px-5 py-4 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-[#F3FAFF] focus:shadow-[4px_4px_0px_#7DD3FC] disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-70"
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className={`mb-2 block text-sm font-semibold text-black transition-opacity ${isLoading ? "opacity-50" : ""}`}
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								name="password"
								required
								disabled={isLoading}
								placeholder="Enter your password"
								className="w-full rounded-sm border-2 border-black bg-[#FDFDFD] px-5 py-4 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-[#F8FFF5] focus:shadow-[4px_4px_0px_#86EFAC] disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-70"
							/>
						</div>
						<button
							type="submit"
							disabled={isLoading}
							className={`mt-4 w-full rounded-sm border-2 border-black py-4 text-base font-bold text-black transition-all duration-200 flex items-center justify-center gap-3 ${
								isLoading
									? "bg-neutral-300 cursor-not-allowed translate-y-0 shadow-none"
									: "bg-[#5EEAD4] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none"
							}`}
						>
							{isLoading ? (
								<>
									<span className="h-4 w-4 border-2 border-black bg-[#5EEAD4] animate-spin"></span>
									<span className="animate-pulse tracking-wide">
										VERIFYING...
									</span>
								</>
							) : (
								"Sign In"
							)}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
