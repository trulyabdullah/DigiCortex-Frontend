import { useState } from "react";

export function SignUp() {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate a backend registration delay (e.g., 2.5 seconds)
		setTimeout(() => {
			setIsLoading(false);
			// Add success logic here later
		}, 2500);
	};

	return (
		<main className="min-h-screen bg-[#F7F8FC] flex items-center justify-center p-6">
			<div className="w-full max-w-md relative">
				<div className="absolute -top-5 -right-4 z-10 rotate-6 rounded-sm border-[3px] border-black bg-[#FDE047] px-4 py-1 text-sm font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_black] transition-transform hover:rotate-12">
					DIGICORTEX
				</div>

				<div className="relative rounded-md border-[3px] border-black bg-white shadow-[10px_10px_0px_#D8B4FE] p-10 transition-all duration-200 hover:-translate-y-1 hover:shadow-[14px_14px_0px_#D8B4FE]">
					<div className="mb-10">
						<h1 className="mt-3 text-4xl font-black tracking-tight text-black">
							Sign Up
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
								placeholder="Create a strong password"
								className="w-full rounded-sm border-2 border-black bg-[#FDFDFD] px-5 py-4 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:-translate-y-0.5 focus:bg-[#F8FFF5] focus:shadow-[4px_4px_0px_#86EFAC] disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-70"
							/>
						</div>
						<label
							className={`group flex items-start gap-4 pt-2 pb-2 transition-opacity ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
						>
							<span className="text-sm font-medium text-neutral-600 leading-tight pt-1">
								Just have{" "}
								<span
									className={`font-bold text-black underline decoration-2 underline-offset-2 transition-colors ${isLoading ? "" : "hover:bg-[#FDE047]"}`}
								>
									fun
								</span>{" "}
							</span>
						</label>
						<button
							type="submit"
							disabled={isLoading}
							className={`mt-4 w-full rounded-sm border-2 border-black py-4 text-base font-bold text-black transition-all duration-200 flex items-center justify-center gap-3
                                ${
									isLoading
										? "bg-neutral-300 cursor-not-allowed translate-y-0 shadow-none"
										: "bg-[#F472B6] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:shadow-none"
								}`}
						>
							{isLoading ? (
								<>
									<span className="h-4 w-4 border-2 border-black bg-[#FDE047] animate-spin"></span>
									<span className="animate-pulse tracking-wide">
										JUST A SEC...
									</span>
								</>
							) : (
								"Create Account"
							)}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
