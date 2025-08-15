import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Palette, BarChart2, Globe, Twitter, Youtube, X } from 'lucide-react';
import { FormEventHandler } from 'react';

// --- Mockup Components ---
const MockupLink = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="w-full bg-white text-slate-900 text-center font-semibold py-3 rounded-lg shadow-sm flex items-center justify-center gap-2">
        {icon}
        <span>{text}</span>
    </div>
);

const PhoneMockup = () => (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-900">
            <div className="flex flex-col items-center p-8 pt-12 space-y-4">
                <div className="size-24 rounded-full bg-teal-500 flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-900">A</span>
                </div>
                <h2 className="text-xl font-bold text-white">@angeldev</h2>
                <p className="text-sm text-slate-400">Welcome to my digital universe!</p>
                <div className="w-full space-y-3 pt-4">
                    <MockupLink icon={<Globe size={20} />} text="My Portfolio" />
                    <MockupLink icon={<X size={20} />} text="Follow me on X" />
                    <MockupLink icon={<Youtube size={20} />} text="Latest Video" />
                </div>
            </div>
        </div>
    </div>
);

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { data, setData } = useForm({ username: '' });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Use window.location.href for a full page redirect to the Google auth route
        window.location.href = route('auth.google.redirect', { username: data.username });
    };

    const pageUrl = "https://2myl.ink";
    const seo = {
        title: "2myLink - The Only Link You'll Ever Need",
        description: "Create a single, beautiful page to house all your important links. Perfect for your social media bios, portfolios, and connecting with your audience.",
        image: `${pageUrl}/logo_social.png` // Assumes you have a social share image in your /public folder
    };

    return (
        <>
            <Head>
                {/* Basic SEO and Page Title */}
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />

                {/* Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:image" content={seo.image} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                <meta name="twitter:image" content={seo.image} />
            </Head>

            <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
                {/* Header */}
                <header className="absolute top-0 left-0 w-full z-10 p-6">
                    <div className="container mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/logo_2ml.svg" alt="2myLink Logo" className="h-8" />
                        </Link>
                        <nav className="flex items-center gap-4 text-sm font-medium">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-4 py-2 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="px-4 py-2 hover:text-white transition-colors">
                                        Log In
                                    </Link>
                                    <Link href={route('register')} className="bg-white text-slate-900 px-4 py-2 rounded-md hover:bg-slate-200 transition-colors">
                                        Sign Up Free
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative pt-32 pb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                    <div className="container mx-auto px-6 relative">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white">
                                    Your Links,
                                    <br />
                                    <span className="text-teal-400">One Destination.</span>
                                </h1>
                                <p className="mt-6 max-w-lg mx-auto lg:mx-0 text-lg text-slate-400">
                                    {seo.description}
                                </p>
                                <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                                    <div className="relative flex-grow">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">2myl.ink/</span>
                                        <input
                                            type="text"
                                            placeholder="your-username"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-[85px] pr-4 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 shrink-0">
                                        Claim Username <ArrowRight size={20} />
                                    </button>
                                </form>
                            </div>
                            <div>
                                <PhoneMockup />
                            </div>
                        </div>
                    </div>
                </main>
                
                {/* Features Section */}
                <section className="py-20 bg-slate-950/50">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white">Why you'll love 2myLink</h2>
                        <p className="mt-2 text-slate-400">Everything you need to connect with your audience.</p>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div className="bg-slate-900 p-8 rounded-lg">
                                <Palette size={32} className="mx-auto text-teal-400" />
                                <h3 className="mt-4 text-xl font-semibold text-white">Customize Your Page</h3>
                                <p className="mt-2 text-slate-400">Match your brand with custom colors, fonts, and layouts.</p>
                            </div>
                            <div className="bg-slate-900 p-8 rounded-lg">
                                <CheckCircle size={32} className="mx-auto text-teal-400" />
                                <h3 className="mt-4 text-xl font-semibold text-white">Unlimited Links</h3>
                                <p className="mt-2 text-slate-400">Add as many links as you want. No limits, ever.</p>
                            </div>
                            <div className="bg-slate-900 p-8 rounded-lg">
                                <BarChart2 size={32} className="mx-auto text-teal-400" />
                                <h3 className="mt-4 text-xl font-semibold text-white">Track Your Clicks</h3>
                                <p className="mt-2 text-slate-400">Understand your audience with simple, powerful analytics.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 bg-slate-900">
                    <div className="container mx-auto px-6 text-center text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} 2myLink. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
