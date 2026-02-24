import { useSignIn, useSignUp } from "@clerk/clerk-react";
import type { JSX } from "react";
import { FormEvent, useState } from "react";

const backgroundImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBfSc1xqwVrb39REOikVu30zxOeKfc3murY7suFY-3FkyOQTY5Vm2ycmaLvz-eNK3l-GY7gNIsUiUKM7ZAv10Ua39R0JzaCC4IMnMkYXlaNDck4-4ppcvf6vI3yoz7abX9jEVgVrgfu928DYq6ND3gBp1y-nJ62qoMKXWeA0OJk2eOF15zaO87JthuBZTxjRyGts2Zzk1_xRdaAGS6e7uiXC6lIvyx3i4uB3gv8rW7TcG7QW93fwgFHlUCxYFXNR7yD6JdzOACzp9M";

const avatarImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7CBvKIe_25TI2edCwVLyuM3vq48_oACDDeiMvO3KPnPe6usG4SMwEGEF4hAKVOVWVbH5vDpwwsMTrwWOMpr20fKpeO9tYclUjpO271sOKwfwmImzFsyMNT26p3oZ4QqiJQx6uSObppGbeywnMqZGZ9E22ql-C9i8aBhA1Oaut7D22B-4eavsWciTNNCBHwvrWFW7-a6Ln4JvGK71KDJZFWj0KcRPM2CBU1lksEKE_-DBT6wZzcuYov2bJNOKxrnVFtS1E1wbFMjA";

type ClerkError = {
    errors?: Array<{ message?: string }>;
};

export default function Signup(): JSX.Element {
    const { isLoaded, signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const parseError = (err: unknown): string => {
        const maybeError = err as ClerkError;
        return maybeError?.errors?.[0]?.message ?? "Something went wrong. Please try again.";
    };

    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            await signUp.create({
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setPendingVerification(true);
        } catch (err) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                window.location.href = "/";
            } else {
                setError("Verification is not complete yet. Please check your code and try again.");
            }
        } catch (err) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        if (!isLoaded || !signIn) return;

        setError("");
        setLoading(true);

        try {
            await signIn.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (err) {
            setError(parseError(err));
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#10221c] font-sans text-slate-100">
            <div className="absolute inset-0 z-0">
                <img
                    alt="Majestic mountain peaks at dusk"
                    className="h-full w-full object-cover"
                    src={backgroundImage}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#10221c]/40 to-[#10221c]/80" />
            </div>

            <main className="relative z-20 w-full max-w-[440px] px-6">
                <div className="rounded-xl border border-[#13eca4]/10 bg-[#10221c]/65 p-8 shadow-2xl backdrop-blur-2xl md:p-10">
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#13eca4]/20">
                            <span className="text-2xl text-[#13eca4]">[]</span>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">Create Account</h1>
                        <p className="text-sm text-slate-400">Join Wallpaper Studio and sync favorites</p>
                    </div>

                    {!pendingVerification ? (
                        <form className="space-y-5" onSubmit={handleSignup}>
                            <div>
                                <label
                                    className="mb-1.5 ml-1 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                    htmlFor="email"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    placeholder="name@example.com"
                                    className="w-full rounded-lg border border-slate-700 bg-[#10221c]/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-[#13eca4] focus:outline-none focus:ring-2 focus:ring-[#13eca4]/50"
                                />
                            </div>

                            <div>
                                <label
                                    className="mb-1.5 ml-1 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    placeholder="********"
                                    className="w-full rounded-lg border border-slate-700 bg-[#10221c]/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-[#13eca4] focus:outline-none focus:ring-2 focus:ring-[#13eca4]/50"
                                />
                            </div>

                            {error ? (
                                <p className="rounded-lg border border-red-400/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                                    {error}
                                </p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={loading || !isLoaded}
                                className="w-full rounded-lg bg-[#13eca4] py-3.5 font-bold text-[#10221c] shadow-lg shadow-[#13eca4]/20 transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? "Creating..." : "Sign Up"}
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-5" onSubmit={handleVerification}>
                            <div>
                                <label
                                    className="mb-1.5 ml-1 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                    htmlFor="code"
                                >
                                    Verification Code
                                </label>
                                <input
                                    id="code"
                                    name="code"
                                    type="text"
                                    value={code}
                                    onChange={(event) => setCode(event.target.value)}
                                    required
                                    placeholder="Enter the code from your email"
                                    className="w-full rounded-lg border border-slate-700 bg-[#10221c]/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-[#13eca4] focus:outline-none focus:ring-2 focus:ring-[#13eca4]/50"
                                />
                            </div>

                            {error ? (
                                <p className="rounded-lg border border-red-400/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                                    {error}
                                </p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={loading || !isLoaded}
                                className="w-full rounded-lg bg-[#13eca4] py-3.5 font-bold text-[#10221c] shadow-lg shadow-[#13eca4]/20 transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? "Verifying..." : "Verify Email"}
                            </button>
                        </form>
                    )}

                    {!pendingVerification ? (
                        <>
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700/50" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase tracking-tighter">
                                    <span className="bg-transparent px-3 font-medium text-slate-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => void handleOAuth("oauth_google")}
                                    disabled={loading || !isLoaded}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill="#EA4335"
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.912 4.152-1.228 1.228-3.14 2.56-6.408 2.56-5.116 0-9.212-4.14-9.212-9.212s4.096-9.212 9.212-9.212c2.776 0 4.792 1.092 6.276 2.492l2.308-2.308c-2.064-1.956-4.744-3.132-8.584-3.132-7.064 0-12.78 5.716-12.78 12.78s5.716 12.78 12.78 12.78c3.816 0 6.692-1.256 8.92-3.576 2.308-2.308 3.036-5.552 3.036-8.156 0-.612-.048-1.196-.136-1.74H12.48z"
                                        />
                                    </svg>
                                    Google
                                </button>

                                <button
                                    type="button"
                                    onClick={() => void handleOAuth("oauth_apple")}
                                    disabled={loading || !isLoaded}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.05 20.28c-.96.95-2.05 1.72-3.2 1.72-1.11 0-1.57-.69-2.92-.69-1.37 0-1.89.67-2.92.69-1.13.02-2.34-.84-3.34-1.89-2.1-2.18-3.6-6.22-1.5-9.87 1.04-1.81 2.9-2.92 4.62-2.92 1.3 0 2.21.75 3.05.75.83 0 1.95-.91 3.53-.75 1.5.15 2.66.75 3.4 1.83-3.1 1.7-2.6 5.8.5 7.13zm-3.03-14.7c1-1.33.66-3.13.66-3.13s-1.84.14-2.93 1.38c-1.02 1.15-.65 2.97-.65 2.97s1.84.19 2.92-1.22z" />
                                    </svg>
                                    Apple
                                </button>
                            </div>
                        </>
                    ) : null}

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?
                        <a
                            className="ml-1 font-semibold text-[#13eca4] underline-offset-4 decoration-[#13eca4]/30 hover:underline"
                            href="/sign-in"
                        >
                            Sign in
                        </a>
                    </p>
                </div>

                <div className="mt-8 flex justify-center space-x-6 text-xs font-medium text-slate-500">
                    <a className="transition-colors hover:text-slate-300" href="#">
                        Privacy Policy
                    </a>
                    <a className="transition-colors hover:text-slate-300" href="#">
                        Terms of Service
                    </a>
                    <a className="transition-colors hover:text-slate-300" href="#">
                        Help Center
                    </a>
                </div>
            </main>

            <div className="fixed bottom-6 right-6 hidden items-center gap-3 rounded-lg border border-white/5 bg-black/40 px-3 py-2 backdrop-blur-md md:flex">
                <img
                    alt="Photographer avatar"
                    className="h-6 w-6 rounded-full object-cover"
                    src={avatarImage}
                />
                <div className="text-[10px] leading-tight text-white">
                    <p className="font-normal text-slate-400">Wallpaper by</p>
                    <p className="font-bold">Ales Krivec</p>
                </div>
            </div>
        </div>
    );
}
