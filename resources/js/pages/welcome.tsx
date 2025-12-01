import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy,
    ExternalLink,
    Info,
    MapPin,
    Menu,
    MessageCircle,
    Package,
    PoundSterling,
    ShieldCheck,
    ShoppingCart,
    TrendingUp,
    Utensils,
    X,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

// --- DATA: CSR Images Array ---
const CSR_IMAGES = [
    { src: '/images/csr/csr-1.jpg', alt: 'Community First Main' },
    { src: '/images/csr/csr-2.jpg', alt: 'Relief Pack Distribution' },
    { src: '/images/csr/csr-3.jpg', alt: 'Volunteer Team' },
    { src: '/images/csr/csr-4.jpg', alt: 'Supplies Handover' },
    { src: '/images/csr/csr-5.jpg', alt: 'Flood Area Visit' },
    { src: '/images/csr/csr-6.jpg', alt: 'Community Kitchen' },
    { src: '/images/csr/csr-7.jpg', alt: 'Previous Mission Group Photo' },
];

// --- Helper: Animated Counter ---
const AnimatedCounter = ({
    end,
    duration = 2000,
    suffix = '',
}: {
    end: number;
    duration?: number;
    suffix?: string;
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <span>
            {new Intl.NumberFormat('en-US').format(count)}
            {suffix}
        </span>
    );
};

// --- Helper: Copy Button ---
const CopyButton = ({ text, label }: { text: string; label?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 gap-2 border-slate-300 bg-[#f7a825] text-xs text-[#171749] transition-colors"
        >
            {copied ? (
                <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
                <Copy className="h-3 w-3" />
            )}
            {copied ? 'Copied!' : label || 'Copy'}
        </Button>
    );
};

export default function WISReliefLandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // --- LIGHTBOX STATE ---
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Constants
    const COORDINATION_NUMBER_SL = '+94 76 880 2085';
    const COORDINATION_NUMBER_UK = '0203 011 1898';
    const OFFICE_ADDRESS =
        'Bernards Business Park, Dutugemunu Street, Kohuwala, Colombo 06';
    const WHATSAPP_LINK = `https://wa.me/94768802085?text=${encodeURIComponent('Hi WIS Team, here is the tracking link for my Uber relief package:')}`;
    const AMAZON_LINK = 'https://amzn.eu/9pQLszX';

    // --- LIGHTBOX LOGIC ---
    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % CSR_IMAGES.length);
    }, []);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex(
            (prev) => (prev - 1 + CSR_IMAGES.length) % CSR_IMAGES.length
        );
    }, []);

    // Keyboard Navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, nextImage, prevImage]);

    return (
        <div className="min-h-screen scroll-smooth bg-slate-50 font-sans text-slate-900">
            <Head title="Ditwah – WIS Emergency Response" />
            {/* --- LIGHTBOX OVERLAY --- */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-[60] flex animate-in items-center justify-center bg-black/95 p-4 backdrop-blur-sm duration-200 fade-in">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white/70 transition-all hover:bg-white/20 hover:text-white"
                    >
                        <X className="h-8 w-8" />
                    </button>
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 z-50 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white md:block"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <div className="relative flex h-full max-h-[90vh] w-full max-w-5xl items-center justify-center">
                        <img
                            src={CSR_IMAGES[currentImageIndex].src}
                            alt={CSR_IMAGES[currentImageIndex].alt}
                            className="max-h-full max-w-full rounded-md object-contain shadow-2xl"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-md">
                            {currentImageIndex + 1} / {CSR_IMAGES.length}
                        </div>
                    </div>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 z-50 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white md:block"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>
                </div>
            )}

            {/* 1. URGENCY STRIP */}
            <div className="bg-[#f7a825] px-4 py-2 text-center text-xs font-bold tracking-wide text-[#171749]">
                <span className="inline-flex items-center gap-2">
                    <Activity className="h-3 w-3 animate-pulse" />
                    SITUATION UPDATE (DEC 01): KELANI RIVER LEVELS CRITICAL
                    (8.6 foot) - URGENT NEED FOR DRY CLOTHING
                </span>
            </div>

            {/* 2. NAVIGATION */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-auto flex-col items-center justify-center rounded-lg text-white">
                                <img
                                    src="https://wis-commissions.com/build/assets/logoblue-FcesUrWV.png"
                                    alt="WIS Logo"
                                    className="h-16 w-35"
                                />
                            </div>
                            <div>
                                <h1 className="text-sm leading-tight font-bold text-[#171749] md:text-lg">
                                    WIS Accountancy | Mortgages | Wealth
                                </h1>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="h-5 border-[#171749] px-1.5 text-[10px] font-bold text-[#171749]"
                                    >
                                        CSR INITIATIVE
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="hidden items-center gap-6 md:flex">
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-semibold text-slate-500 uppercase">
                                    Relief Coordination (SL)
                                </span>
                                <a
                                    href={`tel:${COORDINATION_NUMBER_SL.replace(/\s/g, '')}`}
                                    className="text-sm font-bold text-[#171749] hover:underline"
                                >
                                    {COORDINATION_NUMBER_SL}
                                </a>
                            </div>
                            <div className="flex flex-col items-end border-l pl-4">
                                <span className="text-xs font-semibold text-slate-500 uppercase">
                                    UK Hotline
                                </span>
                                <a
                                    href={`tel:${COORDINATION_NUMBER_UK.replace(/\s/g, '')}`}
                                    className="text-sm font-bold text-[#171749] hover:underline"
                                >
                                    {COORDINATION_NUMBER_UK}
                                </a>
                            </div>
                            <Button
                                className="bg-[#171749] px-6 font-bold text-white shadow-lg hover:bg-[#2a2a6e]"
                                onClick={() =>
                                    document
                                        .getElementById('donate-options')
                                        .scrollIntoView({ behavior: 'smooth' })
                                }
                            >
                                Donate Now
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu className="h-6 w-6 text-[#171749]" />
                            </Button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="space-y-4 border-t bg-white p-4 shadow-lg md:hidden">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-500">
                                SL Hotline:
                            </span>
                            <a
                                href={`tel:${COORDINATION_NUMBER_SL.replace(/\s/g, '')}`}
                                className="font-bold text-[#171749]"
                            >
                                {COORDINATION_NUMBER_SL}
                            </a>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-500">
                                UK Hotline:
                            </span>
                            <a
                                href={`tel:${COORDINATION_NUMBER_UK.replace(/\s/g, '')}`}
                                className="font-bold text-[#171749]"
                            >
                                {COORDINATION_NUMBER_UK}
                            </a>
                        </div>
                        <Button
                            className="w-full bg-[#f7a825] font-bold text-[#171749]"
                            onClick={() => {
                                document
                                    .getElementById('donate-options')
                                    .scrollIntoView();
                                setIsMenuOpen(false);
                            }}
                        >
                            Donate Now
                        </Button>
                    </div>
                )}
            </nav>

            {/* ==================================================================================
                  2. HERO SECTION
              ================================================================================== */}
            <div className="relative overflow-hidden border-b-8 border-[#f7a825] bg-[#171749] text-white">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <svg
                        className="absolute bottom-0 h-full w-full"
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-5">
                        {/* Hero Text (Span 3) */}
                        <div className="space-y-8 lg:col-span-3">
                            <Badge className="border-none bg-red-600 px-3 py-1 text-sm tracking-wide text-white hover:bg-red-700">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                EMERGENCY RESPONSE: PHASE 2
                            </Badge>

                            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight md:text-6xl">
                                Cyclone Ditwah Has Left Sri Lanka –<br />
                                <span className="text-[#f7a825]">
                                    But the Devastation Remains
                                </span>
                            </h1>

                            <div className="space-y-4 border-l-4 border-[#f7a825] pl-6">
                                <p className="max-w-xl text-lg leading-relaxed text-slate-200 md:text-xl">
                                    As communities wade through the wreckage,
                                    families are facing the harsh reality of
                                    lost homes, damaged schools, and limited
                                    access to clean water and food. Many are
                                    left with nothing but the clothes they
                                    escaped in. Your support can help deliver
                                    emergency supplies, restore essential
                                    services, and give these families a path
                                    toward rebuilding their lives with dignity
                                    and hope.
                                </p>
                                <p className="text-slate-300">
                                    We’re doing everything we can to bring
                                    relief where it’s needed most, and we’re
                                    inviting you to join us—even in a small way.
                                    We’re WIS, not a frontline NGO, but our team
                                    is stepping up. Think of us as a logistics
                                    hub, bridging the gap between your
                                    generosity and the displaced families who
                                    need dry clothes, meals, cleaning products
                                    and a glimmer of hope tonight.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                                <Button
                                    onClick={() =>
                                        document
                                            .getElementById('location')
                                            .scrollIntoView({
                                                behavior: 'smooth'
                                            })
                                    }
                                    className="flex h-14 items-center gap-2 rounded-md bg-[#f7a825] px-8 text-lg font-bold text-[#171749] shadow-lg hover:bg-[#d98e15]"
                                >
                                    <MapPin className="h-5 w-5" /> Drop-Off
                                    (Colombo)
                                </Button>
                                <Button
                                    onClick={() =>
                                        document
                                            .getElementById('uber')
                                            .scrollIntoView({
                                                behavior: 'smooth'
                                            })
                                    }
                                    variant="outline"
                                    className="flex h-14 items-center gap-2 rounded-md border-white/30 bg-white/10 px-8 text-lg text-white backdrop-blur-sm hover:bg-white hover:text-[#171749]"
                                >
                                    <Package className="h-5 w-5" /> Send via
                                    Uber Eats
                                </Button>
                            </div>
                        </div>

                        {/* Situation Dashboard (Span 2) */}
                        <div className="lg:col-span-2">
                            <Card className="border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-md">
                                <CardHeader className="border-b border-white/10 pb-4">
                                    <CardTitle className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#f7a825] uppercase">
                                        <Activity className="h-4 w-4" /> Live
                                        Impact Metrics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-black/20 p-3">
                                            <div className="text-3xl font-bold">
                                                <AnimatedCounter
                                                    end={309000}
                                                    suffix="+"
                                                />
                                            </div>
                                            <div className="mt-1 text-xs text-slate-300 uppercase">
                                                Displaced Persons
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-black/20 p-3">
                                            <div className="text-3xl font-bold">
                                                <AnimatedCounter
                                                    end={20000}
                                                    suffix="+"
                                                />
                                            </div>
                                            <div className="mt-1 text-xs text-slate-300 uppercase">
                                                Homes Damaged
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-end justify-between">
                                            <span className="text-sm font-medium">
                                                Kelani River Level (Nagalagam)
                                            </span>
                                            <span className="font-mono font-bold text-red-400">
                                                8.6 foot
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-black/30">
                                            <div className="h-full w-[95%] animate-pulse bg-red-500"></div>
                                        </div>
                                        <p className="text-right text-[10px] text-slate-400">
                                            Flood Threshold: 6.5m (Exceeded)
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 rounded border border-red-500/30 bg-red-500/20 p-3">
                                        <TrendingUp className="h-5 w-5 text-red-400" />
                                        <div className="text-xs">
                                            <span className="block font-bold text-red-300">
                                                Soil Saturation Critical ({'>'}
                                                95%)
                                            </span>
                                            <span>
                                                High landslide risk in
                                                Kandy/Badulla districts.
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="donate-options"
                className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
            >
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Card 1: Physical Drop Off */}
                    <Card
                        className="cursor-pointer border-t-4 border-t-[#171749] bg-[#171749] shadow-lg transition-shadow hover:shadow-xl"
                        onClick={() =>
                            document
                                .getElementById('location')
                                .scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#f7a825]">
                                <MapPin className="h-6 w-6" /> Drop-Off Point
                            </CardTitle>
                            <CardDescription>
                                Bernards Business Park, Kohuwala
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm text-slate-200">
                                Open Mon-Fri (11:30-8:30). High ground location
                                accessible via High Level Road.
                            </p>
                            <Button
                                variant="link"
                                className="p-0 font-bold text-[#f7a825]"
                            >
                                See Map & Directions →
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Card 2: Uber */}
                    <Card
                        className="cursor-pointer border-t-4 border-t-[#f7a825] bg-[#171749] shadow-lg transition-shadow hover:shadow-xl"
                        onClick={() =>
                            document
                                .getElementById('uber')
                                .scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#f7a825]">
                                <Package className="h-6 w-6" /> Send via Uber
                                Eats
                            </CardTitle>
                            <CardDescription>
                                Instant Courier Service
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm text-slate-200">
                                Can't travel? Use Uber "Package" to send items
                                directly to our coordination team.
                            </p>
                            <Button
                                variant="link"
                                className="p-0 font-bold text-[#f7a825]"
                            >
                                View Instructions →
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Card 3: Bank Transfer */}
                    <Card
                        className="cursor-pointer border-t-4 border-t-slate-500 bg-[#171749] shadow-lg transition-shadow hover:shadow-xl"
                        onClick={() =>
                            document
                                .getElementById('finance')
                                .scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#f7a825]">
                                <PoundSterling className="h-6 w-6" /> Financial
                                Aid
                            </CardTitle>
                            <CardDescription>
                                Verified Official Accounts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm text-slate-200">
                                We do not accept cash. Please transfer directly
                                to Red Cross or Govt Treasury.
                            </p>
                            <Button
                                variant="link"
                                className="p-0 font-bold text-[#f7a825]"
                            >
                                Get Account Details →
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-9">
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* LEFT COLUMN: OPERATIONS (Span 8) */}
                    <div className="space-y-16 lg:col-span-8">
                        {/* ----------------------------------------------------------------
                                SECTION: ITEMS NEEDED (Strategic Friction)
                            ---------------------------------------------------------------- */}
                        <section id="items" className="scroll-mt-24">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-8 w-1 rounded-full bg-[#f7a825]"></div>
                                <h2 className="text-2xl font-bold text-[#171749]">
                                    Priority Needs Assessment
                                </h2>
                            </div>

                            <Alert
                                variant="destructive"
                                className="mb-8 border-red-200 bg-red-50 text-red-900 shadow-sm"
                            >
                                <AlertCircle className="mt-0.5 h-5 w-5" />
                                <div className="ml-2">
                                    <AlertTitle className="text-lg font-bold">
                                        MEDICAL SAFETY PROTOCOL: NEW ITEMS ONLY
                                    </AlertTitle>
                                    <AlertDescription className="mt-1 text-sm leading-relaxed">
                                        Floodwaters contain sewage and
                                        industrial waste. Survivors are at high
                                        risk for fungal infections and
                                        leptospirosis.
                                        <strong>
                                            We cannot accept used clothes
                                        </strong>{' '}
                                        as we lack industrial sterilization
                                        facilities. Sending used items creates a
                                        logistical bottleneck and delays relief.
                                    </AlertDescription>
                                </div>
                            </Alert>

                            <div className="rounded-xl border bg-white p-8 shadow-sm">
                                <div className="grid gap-10 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-bold text-[#171749]">
                                            <CheckCircle className="h-5 w-5 text-[#f7a825]" />{' '}
                                            Hygiene (Critical)
                                        </h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="block font-bold text-slate-900">
                                                        Bath Towels
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        Highest priority. Needed
                                                        for drying off after
                                                        evacuation.
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="block font-bold text-slate-900">
                                                        Face Towels
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        For personal sanitation
                                                        in crowded shelters.
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="block font-bold text-slate-900">
                                                        Bed Sheets
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        Single or Double size
                                                        (Cotton preferred).
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-bold text-[#171749]">
                                            <CheckCircle className="h-5 w-5 text-[#f7a825]" />{' '}
                                            Clothing (New)
                                        </h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="block font-bold text-slate-900">
                                                        Sarongs & Skirts
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        Free-size clothing is
                                                        easiest to distribute.
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="block font-bold text-slate-900">
                                                        T-Shirts
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        All sizes (Men, Women,
                                                        Kids).
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="block font-bold text-slate-900">
                                                        Infant Wear
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        Critical for families
                                                        with newborns.
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-4 border-t pt-6 md:col-span-2">
                                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#171749]">
                                            <Utensils className="h-5 w-5 text-[#f7a825]" />{' '}
                                            Dry Rations (Accepted)
                                        </h3>
                                        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                                            <ul className="grid gap-4 md:grid-cols-2">
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                                    <div>
                                                        <span className="block font-bold text-slate-900">
                                                            Packed Dry Rations
                                                        </span>
                                                        <span className="text-sm text-slate-500">
                                                            Long shelf life
                                                            items only (Rice,
                                                            Dhal, Canned Fish,
                                                            Biscuits).
                                                        </span>
                                                    </div>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                                    <div>
                                                        <span className="block font-bold text-red-700">
                                                            NO Instant Foods
                                                        </span>
                                                        <span className="text-sm text-red-600">
                                                            We cannot accept
                                                            cooked meals,
                                                            instant noodles, or
                                                            perishables.
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ----------------------------------------------------------------
                            SECTION: UBER LOGISTICS
                        ---------------------------------------------------------------- */}
                        <section id="uber" className="scroll-mt-24">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-8 w-1 rounded-full bg-[#f7a825]"></div>
                                <h2 className="text-2xl font-bold text-[#171749]">
                                    Remote Donation: Uber Connect
                                </h2>
                            </div>

                            <div className="relative overflow-hidden rounded-xl bg-[#171749] text-white shadow-xl">
                                <div className="absolute top-0 right-0 p-10 opacity-10">
                                    <Package className="h-64 w-64" />
                                </div>

                                <div className="relative z-10 p-8">
                                    <div className="flex flex-col gap-8 md:flex-row">
                                        {/* Instructions */}
                                        <div className="space-y-6 md:w-1/2">
                                            <div className="mb-2 inline-block rounded-xl bg-white p-4 text-[#171749]">
                                                <Package className="h-8 w-8" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#f7a825]">
                                                The "Zero-Friction" Method
                                            </h3>
                                            <p className="text-sm text-slate-300">
                                                Open Uber. Select "Package".
                                                Send to us. Simple.
                                            </p>

                                            <div className="space-y-4">
                                                {/* Step 1 */}
                                                <div className="flex gap-4">
                                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f7a825] font-bold text-[#171749]">
                                                        1
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold">
                                                            Select "Package"
                                                            Mode
                                                        </h4>
                                                        <p className="text-sm text-slate-400">
                                                            Open Uber App.
                                                            Choose "Package" or
                                                            "Connect" (Brown Box
                                                            Icon).{' '}
                                                            <span className="font-semibold text-[#f7a825]">
                                                                Do NOT select
                                                                "Ride".
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Step 2 */}
                                                <div className="flex gap-4">
                                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f7a825] font-bold text-[#171749]">
                                                        2
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold">
                                                            Enter Destination
                                                        </h4>
                                                        <div className="mt-2 flex items-center justify-between gap-4 rounded border border-white/20 bg-white/10 p-3">
                                                            <code className="font-mono text-sm text-[#f7a825]">
                                                                {OFFICE_ADDRESS}
                                                            </code>
                                                            <CopyButton
                                                                text={
                                                                    OFFICE_ADDRESS
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Step 3 */}
                                                <div className="flex gap-4">
                                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f7a825] font-bold text-[#171749]">
                                                        3
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold">
                                                            Recipient Details
                                                        </h4>
                                                        <div className="mt-2 grid gap-4 sm:grid-cols-1">
                                                            <div className="rounded border border-white/20 bg-white/10 p-3">
                                                                <span className="block text-xs text-slate-400">
                                                                    Name
                                                                </span>
                                                                <span className="font-bold">
                                                                    WIS Relief
                                                                    Team
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between rounded border border-white/20 bg-white/10 p-3">
                                                                <div>
                                                                    <span className="block text-xs text-slate-400">
                                                                        Phone
                                                                    </span>
                                                                    <span className="mr-5 font-mono font-bold">
                                                                        {
                                                                            COORDINATION_NUMBER_SL
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <CopyButton
                                                                    text={
                                                                        COORDINATION_NUMBER_SL
                                                                    }
                                                                    label="Copy"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Step 4 */}
                                                <div className="flex gap-4">
                                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f7a825] font-bold text-[#171749]">
                                                        4
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold">
                                                            Notify Us (Critical)
                                                        </h4>
                                                        <p className="mb-3 text-sm text-slate-400">
                                                            We need the tracking
                                                            link to inform
                                                            security.
                                                        </p>
                                                        <Button
                                                            className="gap-2 border-none bg-green-600 text-white hover:bg-green-700"
                                                            onClick={() =>
                                                                window.open(
                                                                    WHATSAPP_LINK,
                                                                    '_blank'
                                                                )
                                                            }
                                                        >
                                                            <MessageCircle className="h-4 w-4" />{' '}
                                                            Send Tracking via
                                                            WhatsApp
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Video Player */}
                                        <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl">
                                            <div className="absolute top-3 left-3 z-30 rounded-lg bg-black/50 px-3 py-1 text-xl font-medium text-white backdrop-blur-sm">
                                                How to Order on Uber Connect
                                            </div>
                                            {/* Play Button Overlay */}
                                            {!isVideoPlaying && (
                                                <button
                                                    onClick={() => {
                                                        setIsVideoPlaying(true);
                                                        const vid =
                                                            document.getElementById(
                                                                'donationVideo'
                                                            );
                                                        vid?.play();
                                                    }}
                                                    className="absolute inset-0 z-20 flex items-center justify-center"
                                                >
                                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition hover:bg-white">
                                                        <svg
                                                            className="h-10 w-10 text-[#171749]"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            )}

                                            <video
                                                id="donationVideo"
                                                className="absolute inset-0 h-full w-full object-cover"
                                                controls={isVideoPlaying}
                                                poster="/images/poster/poster.png"
                                                onClick={() =>
                                                    setIsVideoPlaying(true)
                                                }
                                            >
                                                <source
                                                    src="/mp4/howToDo2.mp4"
                                                    type="video/mp4"
                                                />
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ----------------------------------------------------------------
                            SECTION: PHYSICAL LOCATION (Map)
                        ---------------------------------------------------------------- */}
                        <section id="location" className="scroll-mt-24">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-8 w-1 rounded-full bg-[#f7a825]"></div>
                                <h2 className="text-2xl font-bold text-[#171749]">
                                    Drop-Off Location
                                </h2>
                            </div>

                            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                                <div className="grid md:grid-cols-2">
                                    <div className="space-y-6 p-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#171749]">
                                                WIS Accountancy Colombo
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Official Collection Centre
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="mt-0.5 h-5 w-5 text-[#f7a825]" />
                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        Bernards Business Park
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        Dutugemunu Street,
                                                        Kohuwala, Colombo 06
                                                    </p>
                                                    <div className="mt-2">
                                                        <CopyButton
                                                            text={
                                                                OFFICE_ADDRESS
                                                            }
                                                            label="Copy Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Clock className="mt-0.5 h-5 w-5 text-[#f7a825]" />
                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        Operating Hours
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        Mon - Fri: 11:30 AM –
                                                        8:30 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                                            <p className="text-xs font-medium text-blue-800">
                                                <Info className="mr-1 inline h-3 w-3" />
                                                <strong>Logistics Note:</strong>{' '}
                                                Kohuwala is on higher ground.
                                                Accessible via High Level Road
                                                even if Kelaniya/Wattala are
                                                flooded.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative h-full min-h-[300px] bg-slate-200">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5028.831719210049!2d79.87448477592994!3d6.869961919038339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bb600e9a253%3A0xd416b6058c44e9f8!2sW.I.S%20ACCOUNTANCY%20SRI%20LANKA!5e1!3m2!1sen!2slk!4v1764551265089!5m2!1sen!2slk"
                                            width="100%"
                                            height="100%"
                                            loading="lazy"
                                            className="absolute inset-0"
                                            title="Map of WIS Accountancy"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ----------------------------------------------------------------
                            SECTION: UK DONATION (AMAZON WISHLIST)
                        ---------------------------------------------------------------- */}
                        <section id="uk-donation" className="mt-12 scroll-mt-24">
                            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#171749] shadow-xl">
                                {/* Background Pattern */}
                                <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-5">
                                    <ShoppingCart className="h-64 w-64 text-white" />
                                </div>

                                <div className="relative z-10 p-8 md:p-10">
                                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                                        {/* Text Content */}
                                        <div className="space-y-4 md:w-2/3">
                                            <div className="mb-2 flex items-center gap-3">
                                                <Badge className="border-none bg-[#f7a825] font-bold text-[#171749] hover:bg-[#e0961f]">
                                                    UK DONORS
                                                </Badge>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white md:text-3xl">
                                                Do you like to donate in UK?
                                            </h3>

                                            <div className="space-y-2 text-base leading-relaxed text-slate-300 md:text-lg">
                                                <p>
                                                    You can choose and order items via Amazon Wish list to our UK office.
                                                </p>
                                                <p className="flex items-center gap-2 font-medium text-white">
                                                    <CheckCircle className="h-4 w-4 text-[#f7a825]" />
                                                    We will handle the bulk shipment to Sri Lanka.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Clickable Card / Logo Area */}
                                        <div className="flex w-full flex-col items-center md:w-1/3">
                                            <p className="mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">
                                                Click below
                                            </p>

                                            <a
                                                href="https://amzn.eu/9pQLszX"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex h-40 w-full flex-col items-center justify-center rounded-lg border-4 border-transparent bg-white p-6 text-center shadow-2xl transition-all duration-300 hover:border-[#f7a825] hover:bg-slate-50"
                                            >
                                                {/* LOGO PLACEHOLDER: Replace src with your specific Amazon Wishlist logo */}
                                                <div className="mb-2 flex h-20 w-full items-center justify-center overflow-hidden">
                                                    <img
                                                        src="/images/poster/amazonwishlist.jpeg"
                                                        alt="Amazon Wishlist"
                                                        className="h-full w-auto object-contain"
                                                        onError={(e) => {
                                                            // Fallback if image is missing
                                                            (
                                                                e.target as HTMLImageElement
                                                            ).style.display =
                                                                'none';
                                                            (
                                                                e.target as HTMLImageElement
                                                            ).parentElement!.innerHTML =
                                                                '<span class="text-xl font-bold text-[#171749]">AMAZON<br/>WISHLIST</span>';
                                                        }}
                                                    />
                                                </div>

                                                <span className="flex items-center gap-1 text-xs font-bold text-[#171749] transition-colors group-hover:text-[#f7a825]">
                                                    View List{' '}
                                                    <ExternalLink className="h-3 w-3" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ----------------------------------------------------------------
                            SECTION: FAQ
                        ---------------------------------------------------------------- */}
                        <section className="pt-8">
                            <h3 className="mb-4 text-xl font-bold text-[#171749]">
                                Frequently Asked Questions
                            </h3>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full rounded-xl border bg-white px-4"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-medium text-slate-800">
                                        Why don't you accept cash directly?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600">
                                        To ensure 100% transparency. By
                                        directing you to official Red Cross and
                                        Government accounts, we eliminate any
                                        administrative overhead or doubt. We act
                                        solely as a logistics facilitator for
                                        goods.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-medium text-slate-800">
                                        Can I donate dry rations/food?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600">
                                        Yes, but with strict conditions. We
                                        accept packed dry rations with long
                                        shelf life (rice, dhal, canned goods).{' '}
                                        <strong className="text-red-600">
                                            We do NOT accept instant foods or
                                            cooked meals
                                        </strong>{' '}
                                        due to spoilage risks and lack of
                                        immediate consumption facilities in
                                        transit.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="font-medium text-slate-800">
                                        Do you provide transport receipts?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600">
                                        We confirm receipt of goods at our
                                        office. For tax-deductible financial
                                        receipts, please donate directly to the
                                        Red Cross (Option A) and request a
                                        receipt from them.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: FINANCIALS (Span 4) */}
                    <div className="space-y-8 lg:col-span-4" id="finance">
                        {/* STICKY FINANCIAL CARD */}
                        <div className="sticky top-24 space-y-6">
                            <Card className="overflow-hidden border-t-4 border-t-slate-500 bg-[#171749] shadow-xl">
                                <CardHeader className="border-b bg-slate-50 p-2">
                                    <CardTitle className="flex items-center gap-2 text-[#171749]">
                                        <PoundSterling className="h-5 w-5" />{' '}
                                        Financial Support
                                    </CardTitle>
                                    <CardDescription>
                                        Direct transfers to verified bodies.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    {/* OPTION A: RED CROSS */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                variant="outline"
                                                className="border-red-200 bg-red-50 font-bold text-red-700"
                                            >
                                                Option A: NGO
                                            </Badge>{' '}
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                                                Red Cross Society
                                            </span>
                                        </div>
                                        <div className="overflow-hidden rounded-lg border text-sm">
                                            <div className="flex justify-between border-b bg-slate-50 p-2 text-slate-500">
                                                <span>Bank</span>{' '}
                                                <span className="font-medium text-slate-900">
                                                    Sampath Bank
                                                </span>
                                            </div>
                                            <div className="space-y-2 bg-white p-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account Name
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            Sri Lanka Red Cross
                                                            Society – Assistance
                                                            Account
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account No
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            0929 1000 0286
                                                        </span>
                                                        <CopyButton text="092910000286" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Branch
                                                    </span>{' '}
                                                    <span className="text-slate-900">
                                                        Head Office
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Swift
                                                    </span>{' '}
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        BSAMLKLX
                                                    </span>
                                                </div>
                                                <div className="pt-2 text-center">
                                                    <a
                                                        href="https://www.redcross.lk/how-to-help/bank-transfers/"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:underline"
                                                    >
                                                        <ExternalLink className="h-3 w-3" />{' '}
                                                        Verify Official
                                                        Source{' '}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* OPTION B: GOVERNMENT */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                variant="outline"
                                                className="border-blue-200 bg-blue-50 font-bold text-blue-700"
                                            >
                                                Option B: State
                                            </Badge>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                                                Treasury (Disaster Fund)
                                            </span>
                                        </div>

                                        {/* USD ACCOUNT */}
                                        <div className="overflow-hidden rounded-lg border text-sm">
                                            <div className="flex justify-between border-b bg-slate-50 p-2 text-slate-500">
                                                <span>Currency</span>
                                                <span className="font-medium text-slate-900">
                                                    US Dollar (USD)
                                                </span>
                                            </div>
                                            <div className="space-y-3 bg-white p-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account Name
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            Central Bank of Sri
                                                            Lanka
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Bank
                                                    </span>
                                                    <span className="text-right text-slate-900">
                                                        Deutsche Bank Trust
                                                        Company Americas
                                                        <br />
                                                        New York, USA
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account No
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            04015541
                                                        </span>
                                                        <CopyButton text="04015541" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Routing No
                                                    </span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        021001033
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        SWIFT
                                                    </span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        BKTRUS33XXX
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* GBP ACCOUNT 1 – HSBC */}
                                        <div className="overflow-hidden rounded-lg border text-sm">
                                            <div className="flex justify-between border-b bg-slate-50 p-2 text-slate-500">
                                                <span>Currency</span>
                                                <span className="font-medium text-slate-900">
                                                    Pound Sterling (GBP) – HSBC
                                                    UK
                                                </span>
                                            </div>
                                            <div className="space-y-3 bg-white p-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account Name
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            Central Bank of Sri
                                                            Lanka
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Bank
                                                    </span>
                                                    <span className="text-slate-900">
                                                        HSBC Bank Plc, London
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account No
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            39600144
                                                        </span>
                                                        <CopyButton text="39600144" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Sort Code
                                                    </span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        40-05-15
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        IBAN
                                                    </span>
                                                    <span className="font-mono text-xs break-all text-[#171749]">
                                                        GB48MIDL40051539600144
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        SWIFT
                                                    </span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        MIDLGB22XXX
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* GBP ACCOUNT 2 – BOC UK */}
                                        <div className="overflow-hidden rounded-lg border text-sm">
                                            <div className="flex justify-between border-b bg-slate-50 p-2 text-slate-500">
                                                <span>Currency</span>
                                                <span className="font-medium text-slate-900">
                                                    Pound Sterling (GBP) – BOC
                                                    UK
                                                </span>
                                            </div>
                                            <div className="space-y-3 bg-white p-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account Name
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            Central Bank of Sri
                                                            Lanka
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Bank
                                                    </span>
                                                    <span className="text-slate-900">
                                                        Bank of Ceylon (UK) Ltd,
                                                        London
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Account No
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            88001249
                                                        </span>
                                                        <CopyButton text="88001249" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        Sort Code
                                                    </span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        40-50-56
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        IBAN
                                                    </span>
                                                    <span className="font-mono text-xs break-all text-[#171749]">
                                                        GB89BCEY40505688001249
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-600">
                                                        SWIFT
                                                    </span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        BCEYGB2LXXX
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-white p-2 text-center">
                                            <a
                                                href="https://www.cbsl.gov.lk/sites/default/files/cbslweb_documents/about/press_20251129_pmd_disaster_relief_fund_e.pdf"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:underline"
                                            >
                                                <ExternalLink className="h-3 w-3" />{' '}
                                                Verify Official Source
                                            </a>
                                        </div>
                                    </div>

                                    <Alert className="border-slate-200 bg-slate-50">
                                        <AlertDescription className="ml-2 text-xs leading-relaxed text-slate-600">
                                            <strong>Verification:</strong> These
                                            are the official assistance accounts
                                            for the SLRCS and GoSL Treasury.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>

            {/* 8. CSR GALLERY SECTION (Bento Grid with Lightbox) */}
            <section className="mt-16 border-t border-slate-200 bg-slate-100 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-[#171749]" />
                        <h2 className="text-3xl font-bold text-[#171749]">
                            A Legacy of Care
                        </h2>
                        <p className="mt-4 text-slate-600">
                            From previous flood relief missions to community
                            outreach, we have a verified track record. Click any
                            image to view.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
                        {/* Large Featured Image (Index 0) */}
                        <div
                            onClick={() => openLightbox(0)}
                            className="group relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                        >
                            <img
                                src={CSR_IMAGES[0].src}
                                alt={CSR_IMAGES[0].alt}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                                <p className="text-lg font-bold text-white">
                                    Community First
                                </p>
                            </div>
                        </div>
                        {/* Standard Images (Indices 1, 2, 3) */}
                        {[1, 2, 3].map((idx) => (
                            <div
                                key={idx}
                                onClick={() => openLightbox(idx)}
                                className="group col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-2xl shadow-md"
                            >
                                <img
                                    src={CSR_IMAGES[idx].src}
                                    alt={CSR_IMAGES[idx].alt}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                />
                            </div>
                        ))}

                        {/* Stat Block */}
                        <div className="col-span-1 row-span-1 flex items-center justify-center overflow-hidden rounded-2xl bg-[#171749] p-4 text-center text-white shadow-md">
                            <div>
                                <h4 className="text-2xl font-bold text-[#f7a825]">
                                    10+ Years
                                </h4>
                                <p className="text-xs opacity-80">of Service</p>
                            </div>
                        </div>

                        {/* Bottom Row (Indices 4, 5, 6) */}
                        {[4, 5].map((idx) => (
                            <div
                                key={idx}
                                onClick={() => openLightbox(idx)}
                                className="group col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-2xl shadow-md"
                            >
                                <img
                                    src={CSR_IMAGES[idx].src}
                                    alt={CSR_IMAGES[idx].alt}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                />
                            </div>
                        ))}

                        {/* Last Large Image (Index 6) */}
                        <div
                            onClick={() => openLightbox(6)}
                            className="group relative col-span-2 row-span-1 cursor-pointer overflow-hidden rounded-2xl shadow-md"
                        >
                            <img
                                src={CSR_IMAGES[6].src}
                                alt={CSR_IMAGES[6].alt}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <p className="rounded-full border-2 border-white px-4 py-1 text-sm font-bold text-white">
                                    Previous Missions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FAQ & FOOTER */}
            <footer className="mt-20 border-t border-slate-800 bg-[#0f0f36] py-12 text-slate-400">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-4 flex items-center gap-2 text-white">
                                <img
                                    src="https://wis-commissions.com/build/assets/logoblue-FcesUrWV.png"
                                    alt="Logo"
                                    className="h-17 w-25 rounded-2xl bg-white p-1"
                                />
                                <span className="text-xl font-bold">
                                    WIS Accountancy
                                </span>
                            </div>
                            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                                Consistent. Principled. Transparent. <br />
                                We are leveraging our corporate infrastructure
                                to support the Sri Lankan community during the
                                2025 flood crisis. All logistics are handled
                                pro-bono by our team.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 font-bold text-white">
                                Contact
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>Bernards Business Park, Colombo 06</li>
                                <li>
                                    SL:{' '}
                                    <a
                                        href={`tel:${COORDINATION_NUMBER_SL.replace(/\s/g, '')}`}
                                        className="transition-colors hover:text-white"
                                    >
                                        {COORDINATION_NUMBER_SL}
                                    </a>
                                </li>
                                <li>
                                    UK:{' '}
                                    <a
                                        href={`tel:${COORDINATION_NUMBER_UK.replace(/\s/g, '')}`}
                                        className="transition-colors hover:text-white"
                                    >
                                        {COORDINATION_NUMBER_UK}
                                    </a>
                                </li>
                                <li>
                                    Email:{' '}
                                    <a
                                        href="mailto:lindujan.sundararjan@wis-accountancy.co.uk"
                                        className="transition-colors hover:text-white"
                                    >
                                        lindujan.sundararjan@...
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-bold text-white">
                                Official Sources
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#f7a825]"
                                    >
                                        Disaster Management Centre
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#f7a825]"
                                    >
                                        Red Cross Sri Lanka
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#f7a825]"
                                    >
                                        Meteorology Department
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Separator className="my-8 bg-slate-800" />
                    <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-600 md:flex-row">
                        <div>
                            © 2025 WIS Accountancy. Verified Disaster Response
                            Initiative.
                        </div>
                        <div className="flex gap-4">
                            <span>Privacy Policy</span>
                            <span>Transparency Report (Pending Dec '25)</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
