import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, BarChart2, Globe, Link2, Palette, QrCode, Sparkles, Twitter, Youtube, Zap } from 'lucide-react';
import { FormEventHandler } from 'react';

const PAGE_URL = 'https://2myl.ink';

const SEO = {
    title: "2myLink — One Link. Every Destination.",
    description: "Your free, beautiful link-in-bio page. Share your portfolio, socials, and everything that matters — in one powerful, customizable link.",
    image: `${PAGE_URL}/logo_social.png`,
};

const FEATURES = [
    { icon: <Palette size={28} />, title: 'Beautiful Themes', desc: 'Choose from curated free and premium themes to perfectly match your personal brand.' },
    { icon: <BarChart2 size={28} />, title: 'Click Analytics', desc: 'See which links your audience clicks most. Make smarter decisions with real data.' },
    { icon: <QrCode size={28} />, title: 'QR Code Ready', desc: 'Instantly generate a QR code for your page. Share offline — at events, on print, anywhere.' },
    { icon: <Link2 size={28} />, title: 'Unlimited Links', desc: 'Add as many links as you need. No caps, no paywalls on core features.' },
    { icon: <Zap size={28} />, title: 'Lightning Fast', desc: 'Optimized for speed. Your visitors land on your page in milliseconds.' },
    { icon: <Globe size={28} />, title: 'Your Own URL', desc: 'Claim your unique 2myl.ink/username and own your online presence today.' },
];

const STEPS = [
    { step: '01', title: 'Claim Your Link', desc: 'Enter your username and sign up free with Google in seconds.' },
    { step: '02', title: 'Add Your Content', desc: 'Add links, customize your bio, pick a theme that matches your vibe.' },
    { step: '03', title: 'Share Everywhere', desc: 'Drop your 2myl.ink URL in every bio and watch your audience connect.' },
];

function PhoneMockup() {
    return (
        <div style={{ perspective: '1000px' }} className="flex justify-center">
            <div style={{ transform: 'rotateY(-8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}
                className="relative border-[10px] border-slate-700 bg-slate-800 rounded-[2.8rem] w-[270px] h-[560px] shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-700 rounded-b-2xl z-10" />
                <div className="rounded-[2.2rem] overflow-hidden w-full h-full"
                    style={{ background: 'linear-gradient(160deg,#0f0c29,#302b63,#24243e)' }}>
                    <div className="flex flex-col items-center pt-10 px-5 gap-3">
                        <div className="size-20 rounded-full flex items-center justify-center text-3xl font-black text-white"
                            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>A</div>
                        <p className="text-white font-bold text-base">@angeldev</p>
                        <p className="text-slate-400 text-xs text-center">Designer · Developer · Creator 🚀</p>
                        <div className="w-full space-y-2 pt-2">
                            {[
                                { icon: <Globe size={14} />, label: 'My Portfolio' },
                                { icon: <Twitter size={14} />, label: 'Follow on X' },
                                { icon: <Youtube size={14} />, label: 'Latest Video' },
                            ].map(({ icon, label }) => (
                                <div key={label}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-800"
                                    style={{ background: 'rgba(255,255,255,0.92)' }}>
                                    {icon}<span>{label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 text-[10px] text-slate-500">2myl.ink/angeldev</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { data, setData } = useForm({ username: '' });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        window.location.href = route('auth.google.redirect', { username: data.username });
    };

    return (
        <>
            <Head>
                <title>{SEO.title}</title>
                <meta name="description" content={SEO.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:title" content={SEO.title} />
                <meta property="og:description" content={SEO.description} />
                <meta property="og:image" content={SEO.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={SEO.title} />
                <meta name="twitter:description" content={SEO.description} />
                <meta name="twitter:image" content={SEO.image} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
                <style>{`
                    *{box-sizing:border-box}
                    body{margin:0;font-family:'Inter',sans-serif}
                    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
                    @keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
                    @keyframes float{0%,100%{transform:rotateY(-8deg) rotateX(4deg) translateY(0)}50%{transform:rotateY(-8deg) rotateX(4deg) translateY(-12px)}}
                    .fade-up{animation:fadeUp .7s ease both}
                    .delay-1{animation-delay:.15s}.delay-2{animation-delay:.3s}.delay-3{animation-delay:.45s}
                    .phone-float{animation:float 5s ease-in-out infinite}
                    .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08)}
                    .btn-primary{background:linear-gradient(135deg,#7c3aed,#06b6d4);transition:opacity .2s,transform .2s}
                    .btn-primary:hover{opacity:.9;transform:translateY(-1px)}
                    .feature-card:hover{background:rgba(255,255,255,0.07);transform:translateY(-4px);transition:all .25s}
                    .input-glow:focus{outline:none;box-shadow:0 0 0 2px #7c3aed88}
                `}</style>
            </Head>

            <div style={{ background: '#080812', color: '#e2e8f0', fontFamily: "'Inter',sans-serif", minHeight: '100vh' }}>

                {/* ── HEADER ── */}
                <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    className="glass px-6 py-4">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/logo2ml_blanco.png" alt="2myLink" className="h-8" />
                        </Link>
                        <nav className="flex items-center gap-3 text-sm font-medium">
                            {auth.user ? (
                                <Link href={route('dashboard')}
                                    style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}
                                    className="px-4 py-2 rounded-lg text-white font-semibold">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <a href={route('auth.google.redirect')}
                                        className="px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors">
                                        Log In
                                    </a>
                                    <a href={route('auth.google.redirect')}
                                        className="btn-primary px-4 py-2 rounded-lg text-white font-semibold">
                                        Get Started Free
                                    </a>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* ── HERO ── */}
                <section style={{ paddingTop: '5rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
                    {/* bg blobs */}
                    <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600,
                        background: 'radial-gradient(circle,rgba(124,58,237,0.18),transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 500, height: 500,
                        background: 'radial-gradient(circle,rgba(6,182,212,0.14),transparent 70%)', pointerEvents: 'none' }} />

                    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            {/* badge */}
                            <div className="fade-up inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
                                style={{ color: '#a78bfa' }}>
                                <Sparkles size={12} /> Free & Open Source
                            </div>

                            <h1 className="fade-up delay-1 text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                                One link.<br />
                                <span style={{ background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Every destination.
                                </span>
                            </h1>

                            <p className="fade-up delay-2 mt-5 text-lg text-slate-400 max-w-md leading-relaxed">
                                {SEO.description}
                            </p>

                            <form onSubmit={submit} className="fade-up delay-3 mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
                                <div className="relative flex-grow">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none select-none">
                                        2myl.ink/
                                    </span>
                                    <input
                                        id="username-input"
                                        type="text"
                                        placeholder="your-username"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        aria-label="Claim your username"
                                        className="input-glow w-full rounded-xl py-3.5 pl-[90px] pr-4 text-white text-sm"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                                    />
                                </div>
                                <button type="submit" id="claim-btn"
                                    className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-sm shrink-0">
                                    Claim Yours <ArrowRight size={16} />
                                </button>
                            </form>

                            <p className="fade-up delay-3 mt-4 text-xs text-slate-500">
                                Free forever · No credit card · Sign in with Google
                            </p>

                            {/* Social proof numbers */}
                            <div className="fade-up delay-3 flex gap-8 mt-10">
                                {[['10k+','Creators'],['1M+','Link Clicks'],['100%','Open Source']].map(([n,l]) => (
                                    <div key={l}>
                                        <p className="text-2xl font-black text-white">{n}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="phone-float hidden lg:flex justify-center">
                            <PhoneMockup />
                        </div>
                    </div>
                </section>

                {/* ── FEATURES ── */}
                <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.015)' }}>
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-black text-white">Everything you need.</h2>
                            <p className="mt-3 text-slate-400 text-lg">Nothing you don't.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {FEATURES.map(({ icon, title, desc }) => (
                                <div key={title} className="feature-card glass rounded-2xl p-7 transition-all"
                                    style={{ cursor: 'default' }}>
                                    <div className="size-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(6,182,212,0.2))' }}>
                                        <span style={{ color: '#a78bfa' }}>{icon}</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ── */}
                <section style={{ padding: '5rem 0' }}>
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-black text-white mb-3">Up and running in minutes.</h2>
                        <p className="text-slate-400 text-lg mb-14">Three steps. No setup. No friction.</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            {STEPS.map(({ step, title, desc }) => (
                                <div key={step} className="flex flex-col items-center text-center">
                                    <div className="text-5xl font-black mb-4"
                                        style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        {step}
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA BANNER ── */}
                <section style={{ padding: '5rem 1.5rem' }}>
                    <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-14"
                        style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.1))', border: '1px solid rgba(124,58,237,0.3)' }}>
                        <h2 className="text-4xl font-black text-white mb-4">Ready to own your link?</h2>
                        <p className="text-slate-400 text-lg mb-8">Join thousands of creators who share smarter with 2myLink.</p>
                        <a href={route('auth.google.redirect')} id="cta-signup"
                            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-base">
                            Get Your Free Link <ArrowRight size={18} />
                        </a>
                        <p className="mt-4 text-xs text-slate-500">Free forever · Open source · No credit card</p>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 1.5rem' }}>
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-3">
                            <img src="/logo2ml_blanco.png" alt="2myLink" className="h-6 opacity-60" />
                            <span>© {new Date().getFullYear()} 2myLink. All rights reserved.</span>
                        </div>
                        <div className="flex gap-6">
                            <a href="https://github.com/angel-gmz/2mylink" target="_blank" rel="noopener noreferrer"
                                className="hover:text-slate-300 transition-colors">GitHub</a>
                            <a href={route('auth.google.redirect')} className="hover:text-slate-300 transition-colors">Sign Up</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
