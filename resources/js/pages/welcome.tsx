import React, { useCallback, useEffect, useState } from 'react';
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
    TrendingUp,
    Utensils,
    X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Head } from '@inertiajs/react';

// --- DATA: CSR Images Array ---
// Make sure these files exist in your public/images/csr folder
const CSR_IMAGES = [
    { src: '/images/csr/csr-1.jpg', alt: 'Community First Main' }, // Index 0
    { src: '/images/csr/csr-2.jpg', alt: 'Relief Pack Distribution' }, // Index 1
    { src: '/images/csr/csr-3.jpg', alt: 'Volunteer Team' }, // Index 2
    { src: '/images/csr/csr-4.jpg', alt: 'Supplies Handover' }, // Index 3
    { src: '/images/csr/csr-5.jpg', alt: 'Flood Area Visit' }, // Index 4
    { src: '/images/csr/csr-6.jpg', alt: 'Community Kitchen' }, // Index 5
    { src: '/images/csr/csr-7.jpg', alt: 'Previous Mission Group Photo' } // Index 6
];

// --- Helper: Copy Button ---
const CopyButton = ({ text, label }: { text: string, label?: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <Button variant="outline" size="sm" onClick={handleCopy}
                className="h-8 text-xs gap-2 border-slate-300 bg-[#f7a825] text-[#171749] transition-colors">
            {copied ? <CheckCircle className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied!" : (label || "Copy")}
        </Button>
    );
};

export default function WISReliefLandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- LIGHTBOX STATE ---
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Constants
    const COORDINATION_NUMBER = "076 880 2085";
    const OFFICE_ADDRESS = "Bernards Business Park, Dutugemunu Street, Kohuwala, Colombo 06";
    const WHATSAPP_LINK = `https://wa.me/94768802085?text=${encodeURIComponent("Hi W.I.S Team, here is the tracking link for my Uber relief package:")}`;

    // --- LIGHTBOX LOGIC ---
    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset'; // Re-enable scrolling
    };

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % CSR_IMAGES.length);
    }, []);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + CSR_IMAGES.length) % CSR_IMAGES.length);
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
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
            <Head title="Ditwah – W.I.S Emergency Response" />
            {/* --- LIGHTBOX OVERLAY --- */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    {/* Close Button */}
                    <button onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50">
                        <X className="w-8 h-8" />
                    </button>

                    {/* Prev Button */}
                    <button onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 hidden md:block">
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Main Image */}
                    <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <img
                            src={CSR_IMAGES[currentImageIndex].src}
                            alt={CSR_IMAGES[currentImageIndex].alt}
                            className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                        />
                        <div
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm backdrop-blur-md">
                            {currentImageIndex + 1} / {CSR_IMAGES.length}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 hidden md:block">
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            )}

            {/* 1. URGENCY STRIP */}
            <div className="bg-[#f7a825] text-[#171749] text-xs font-bold py-2 px-4 text-center tracking-wide">
                <span className="inline-flex items-center gap-2">
                  <Activity className="w-3 h-3 animate-pulse" />
                  SITUATION UPDATE (NOV 30): KELANI RIVER LEVELS CRITICAL (8.6m) - URGENT NEED FOR DRY CLOTHING
                </span>
            </div>

            {/* 2. NAVIGATION */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-auto h-20 rounded-lg flex flex-col items-center justify-center text-white">
                                <img src="https://wis-commissions.com/build/assets/logoblue-FcesUrWV.png"
                                     alt="W.I.S Logo" className="w-35 h-16" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold text-[#171749] leading-tight">W.I.S Accountancy</h1>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline"
                                           className="text-[10px] border-[#171749] text-[#171749] font-bold px-1.5 h-5">CSR
                                        INITIATIVE</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-slate-500 uppercase font-semibold">Relief Coordination</span>
                                <a href={`tel:${COORDINATION_NUMBER.replace(/\s/g, '')}`}
                                   className="text-sm font-bold text-[#171749] hover:underline">{COORDINATION_NUMBER}</a>
                            </div>
                            <Button className="bg-[#171749] hover:bg-[#2a2a6e] text-white font-bold px-6 shadow-lg"
                                    onClick={() => document.getElementById('donate-options').scrollIntoView({ behavior: 'smooth' })}>
                                Donate Now
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu
                                className="w-6 h-6 text-[#171749]" /></Button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden border-t bg-white p-4 space-y-4 shadow-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-500">Hotline:</span>
                            <a href={`tel:${COORDINATION_NUMBER.replace(/\s/g, '')}`} className="font-bold text-[#171749]">{COORDINATION_NUMBER}</a>
                        </div>
                        <Button className="w-full bg-[#f7a825] text-[#171749] font-bold" onClick={() => {
                            document.getElementById('donate-options').scrollIntoView();
                            setIsMenuOpen(false);
                        }}>Donate Now</Button>
                    </div>
                )}
            </nav>

            {/* ==================================================================================
                  2. HERO SECTION
              ================================================================================== */}
            <div className="relative bg-[#171749] text-white overflow-hidden border-b-8 border-[#f7a825]">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {/* Abstract wave pattern simulation */}
                    <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12 items-center">

                        {/* Hero Text (Span 3) */}
                        <div className="lg:col-span-3 space-y-8">
                            <Badge className="bg-red-600 hover:bg-red-700 text-white border-none px-3 py-1 text-sm tracking-wide">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                EMERGENCY RESPONSE: PHASE 2
                            </Badge>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                                Cyclone Ditwah Has Left Sri Lanka –<br />
                                <span className="text-[#f7a825]">But the Devastation Remains</span>
                            </h1>

                            <div className="space-y-4 border-l-4 border-[#f7a825] pl-6">
                                <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl">
                                    As communities wade through the wreckage, families are facing the harsh reality of
                                    lost homes, damaged schools, and limited access to clean water and food. Many are
                                    left with nothing but the clothes they escaped in. Your support can help deliver
                                    emergency supplies, restore essential services, and give these families a path
                                    toward rebuilding their lives with dignity and hope.
                                </p>
                                <p className="text-slate-300">
                                    We’re doing everything we can to bring relief where it’s needed most, and we’re
                                    inviting you to join us—even in a small way. We’re WIS, not a frontline NGO, but our
                                    team is stepping up. Think of us as a logistics hub, bridging the gap between your
                                    generosity and the displaced families who need dry clothes, meals, cleaning products
                                    and a glimmer of hope tonight.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button onClick={() => document.getElementById('location').scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 bg-[#f7a825] hover:bg-[#d98e15] text-[#171749] font-bold text-lg rounded-md shadow-lg flex items-center gap-2">
                                    <MapPin className="w-5 h-5" /> Drop-Off (Colombo)
                                </Button>
                                <Button onClick={() => document.getElementById('uber').scrollIntoView({ behavior: 'smooth' })} variant="outline" className="h-14 px-8 border-white/30 text-white bg-white/10 hover:bg-white hover:text-[#171749] text-lg rounded-md flex items-center gap-2 backdrop-blur-sm">
                                    <Package className="w-5 h-5" /> Send via Uber Eats
                                </Button>
                            </div>
                        </div>

                        {/* Situation Dashboard (Span 2) */}
                        <div className="lg:col-span-2">
                            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
                                <CardHeader className="border-b border-white/10 pb-4">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#f7a825] flex items-center gap-2">
                                        <Activity className="w-4 h-4" /> Live Impact Metrics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-black/20 rounded-lg">
                                            <div className="text-3xl font-bold">108k+</div>
                                            <div className="text-xs text-slate-300 uppercase mt-1">Displaced Persons</div>
                                        </div>
                                        <div className="p-3 bg-black/20 rounded-lg">
                                            <div className="text-3xl font-bold">20k+</div>
                                            <div className="text-xs text-slate-300 uppercase mt-1">Homes Damaged</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-medium">Kelani River Level (Nagalagam)</span>
                                            <span className="text-red-400 font-bold font-mono">8.6m</span>
                                        </div>
                                        <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                                            <div className="bg-red-500 h-full w-[95%] animate-pulse"></div>
                                        </div>
                                        <p className="text-[10px] text-slate-400 text-right">Flood Threshold: 6.5m (Exceeded)</p>
                                    </div>

                                    <div className="flex items-center gap-3 bg-red-500/20 p-3 rounded border border-red-500/30">
                                        <TrendingUp className="w-5 h-5 text-red-400" />
                                        <div className="text-xs">
                                            <span className="font-bold text-red-300 block">Soil Saturation Critical (&gt;95%)</span>
                                            <span>High landslide risk in Kandy/Badulla districts.</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>

            <div id="donate-options" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1: Physical Drop Off */}
                    <Card
                        className="border-t-4 border-t-[#171749] bg-[#171749] shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => document.getElementById('location').scrollIntoView({ behavior: 'smooth' })}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#f7a825]">
                                <MapPin className="w-6 h-6" /> Drop-Off Point
                            </CardTitle>
                            <CardDescription>Bernards Business Park, Kohuwala</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-200 mb-4">Open Mon-Fri (8:30-5:30). High ground location
                                accessible via High Level Road.</p>
                            <Button variant="link" className="p-0 text-[#f7a825] font-bold">See Map &
                                Directions →</Button>
                        </CardContent>
                    </Card>

                    {/* Card 2: Uber */}
                    <Card
                        className="border-t-4 border-t-[#f7a825] bg-[#171749]  shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => document.getElementById('uber').scrollIntoView({ behavior: 'smooth' })}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#f7a825]">
                                <Package className="w-6 h-6" /> Send via Uber Eats
                            </CardTitle>
                            <CardDescription>Instant Courier Service</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-200 mb-4">Can't travel? Use Uber "Package" to send items
                                directly to our coordination team.</p>
                            <Button variant="link" className="p-0 text-[#f7a825] font-bold">View
                                Instructions →</Button>
                        </CardContent>
                    </Card>

                    {/* Card 3: Bank Transfer */}
                    <Card
                        className="border-t-4 border-t-slate-500 bg-[#171749] shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => document.getElementById('finance').scrollIntoView({ behavior: 'smooth' })}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#f7a825]">
                                <PoundSterling className="w-6 h-6" /> Financial Aid
                            </CardTitle>
                            <CardDescription>Verified Official Accounts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-200 mb-4">We do not accept cash. Please transfer directly
                                to Red Cross or Govt Treasury.</p>
                            <Button variant="link" className="p-0 text-[#f7a825] font-bold">Get Account
                                Details →</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: OPERATIONS (Span 8) */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* ----------------------------------------------------------------
                SECTION: ITEMS NEEDED (Strategic Friction)
            ---------------------------------------------------------------- */}
                        <section id="items" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-1 bg-[#f7a825] rounded-full"></div>
                                <h2 className="text-2xl font-bold text-[#171749]">Priority Needs Assessment</h2>
                            </div>

                            <Alert variant="destructive"
                                   className="mb-8 bg-red-50 border-red-200 text-red-900 shadow-sm">
                                <AlertCircle className="h-5 w-5 mt-0.5" />
                                <div className="ml-2">
                                    <AlertTitle className="font-bold text-lg">MEDICAL SAFETY PROTOCOL: NEW ITEMS
                                        ONLY</AlertTitle>
                                    <AlertDescription className="mt-1 text-sm leading-relaxed">
                                        Floodwaters contain sewage and industrial waste. Survivors are at high risk for
                                        fungal infections and leptospirosis.
                                        <strong>We cannot accept used clothes</strong> as we lack industrial
                                        sterilization facilities. Sending used items creates a logistical bottleneck and
                                        delays relief.
                                    </AlertDescription>
                                </div>
                            </Alert>

                            <div className="bg-white rounded-xl shadow-sm border p-8">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="font-bold text-[#171749] text-lg mb-4 flex items-center gap-2 border-b pb-2">
                                            <CheckCircle className="w-5 h-5 text-[#f7a825]" /> Hygiene (Critical)
                                        </h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="font-bold text-slate-900 block">Bath Towels</span>
                                                    <span className="text-sm text-slate-500">Highest priority. Needed for drying off after evacuation.</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="font-bold text-slate-900 block">Face Towels</span>
                                                    <span className="text-sm text-slate-500">For personal sanitation in crowded shelters.</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="font-bold text-slate-900 block">Bed Sheets</span>
                                                    <span className="text-sm text-slate-500">Single or Double size (Cotton preferred).</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#171749] text-lg mb-4 flex items-center gap-2 border-b pb-2">
                                            <CheckCircle className="w-5 h-5 text-[#f7a825]" /> Clothing (New)
                                        </h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span
                                                        className="font-bold text-slate-900 block">Sarongs & Skirts</span>
                                                    <span className="text-sm text-slate-500">Free-size clothing is easiest to distribute.</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="font-bold text-slate-900 block">T-Shirts</span>
                                                    <span className="text-sm text-slate-500">All sizes (Men, Women, Kids).</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                <div>
                                                    <span className="font-bold text-slate-900 block">Infant Wear</span>
                                                    <span className="text-sm text-slate-500">Critical for families with newborns.</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="md:col-span-2 mt-4 pt-6 border-t">
                                        <h3 className="font-bold text-[#171749] text-lg mb-4 flex items-center gap-2">
                                            <Utensils className="w-5 h-5 text-[#f7a825]" /> Dry Rations (Accepted)
                                        </h3>
                                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                            <ul className="grid md:grid-cols-2 gap-4">
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                    <div>
                                                        <span className="font-bold text-slate-900 block">Packed Dry Rations</span>
                                                        <span className="text-sm text-slate-500">Long shelf life items only (Rice, Dhal, Canned Fish, Biscuits).</span>
                                                    </div>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                    <div>
                                                        <span
                                                            className="font-bold text-red-700 block">NO Instant Foods</span>
                                                        <span className="text-sm text-red-600">We cannot accept cooked meals, instant noodles, or perishables.</span>
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
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-1 bg-[#f7a825] rounded-full"></div>
                                <h2 className="text-2xl font-bold text-[#171749]">Remote Donation: Send via Uber
                                    Eats</h2>
                            </div>

                            <div className="bg-[#171749] rounded-xl text-white overflow-hidden shadow-xl relative">
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 p-10 opacity-10">
                                    <Package className="w-64 h-64" />
                                </div>

                                <div className="p-8 relative z-10">
                                    <div
                                        className="flex flex-col md:flex-row md:items-center gap-6 mb-8 border-b border-white/10 pb-8">
                                        <div className="p-4 bg-white rounded-2xl text-[#171749]">
                                            <Package className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#f7a825]">The "Zero-Friction"
                                                Method</h3>
                                            <p className="text-slate-300 mt-2 max-w-2xl">
                                                Donate without leaving your home. Purchase items from a store or pack
                                                them at home, then use Uber Connect/Package to courier them to us.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Step 1 */}
                                        <div className="flex gap-4">
                                            <div
                                                className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f7a825] text-[#171749] font-bold flex items-center justify-center">1
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Select "Package" Mode</h4>
                                                <p className="text-slate-400 text-sm">Open Uber App. Choose "Package" or
                                                    "Connect" (Brown Box Icon). <span
                                                        className="text-[#f7a825] font-semibold">Do NOT select "Ride".</span>
                                                </p>
                                            </div>
                                        </div>
                                        {/* Step 2 */}
                                        <div className="flex gap-4">
                                            <div
                                                className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f7a825] text-[#171749] font-bold flex items-center justify-center">2
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Enter Destination</h4>
                                                <div
                                                    className="mt-2 bg-white/10 p-3 rounded border border-white/20 flex items-center justify-between gap-4">
                                                    <code
                                                        className="text-sm font-mono text-[#f7a825]">{OFFICE_ADDRESS}</code>
                                                    <CopyButton text={OFFICE_ADDRESS} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Step 3 */}
                                        <div className="flex gap-4">
                                            <div
                                                className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f7a825] text-[#171749] font-bold flex items-center justify-center">3
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Recipient Details</h4>
                                                <div className="mt-2 grid sm:grid-cols-2 gap-4">
                                                    <div className="bg-white/10 p-3 rounded border border-white/20">
                                                        <span className="text-xs text-slate-400 block">Name</span>
                                                        <span className="font-bold">W.I.S Relief Team</span>
                                                    </div>
                                                    <div
                                                        className="bg-white/10 p-3 rounded border border-white/20 flex justify-between items-center">
                                                        <div>
                                                            <span className="text-xs text-slate-400 block">Phone</span>
                                                            <span
                                                                className="font-bold font-mono mr-3">{COORDINATION_NUMBER}</span>
                                                        </div>
                                                        <CopyButton text={COORDINATION_NUMBER} label="Copy" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Step 4 */}
                                        <div className="flex gap-4">
                                            <div
                                                className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f7a825] text-[#171749] font-bold flex items-center justify-center">4
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Notify Us (Critical)</h4>
                                                <p className="text-slate-400 text-sm mb-3">We need the tracking link to
                                                    inform security.</p>
                                                <Button
                                                    className="bg-green-600 hover:bg-green-700 text-white border-none gap-2"
                                                    onClick={() => window.open(WHATSAPP_LINK, '_blank')}>
                                                    <MessageCircle className="w-4 h-4" /> Send Tracking via WhatsApp
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ----------------------------------------------------------------
                SECTION: PHYSICAL LOCATION (Map)
            ---------------------------------------------------------------- */}
                        <section id="location" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-1 bg-[#f7a825] rounded-full"></div>
                                <h2 className="text-2xl font-bold text-[#171749]">Drop-Off Location</h2>
                            </div>

                            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                                <div className="grid md:grid-cols-2">
                                    <div className="p-8 space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#171749]">W.I.S Accountancy
                                                Colombo</h3>
                                            <p className="text-slate-500 text-sm mt-1">Official Collection Centre</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-[#f7a825] mt-0.5" />
                                                <div>
                                                    <p className="text-slate-900 font-medium">Bernards Business Park</p>
                                                    <p className="text-slate-600 text-sm">Dutugemunu Street, Kohuwala,
                                                        Colombo 06</p>
                                                    <div className="mt-2">
                                                        <CopyButton text={OFFICE_ADDRESS} label="Copy Address" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Clock className="w-5 h-5 text-[#f7a825] mt-0.5" />
                                                <div>
                                                    <p className="text-slate-900 font-medium">Operating Hours</p>
                                                    <p className="text-slate-600 text-sm">Mon - Fri: 8:30 AM – 5:30
                                                        PM</p>
                                                    <p className="text-slate-600 text-sm">Sat: 9:00 AM – 1:00 PM</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <p className="text-xs text-blue-800 font-medium">
                                                <Info className="w-3 h-3 inline mr-1" />
                                                <strong>Logistics Note:</strong> Kohuwala is on higher ground.
                                                Accessible via High Level Road even if Kelaniya/Wattala are flooded.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-200 h-full min-h-[300px] relative">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5028.831719210049!2d79.87448477592994!3d6.869961919038339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bb600e9a253%3A0xd416b6058c44e9f8!2sW.I.S%20ACCOUNTANCY%20SRI%20LANKA!5e1!3m2!1sen!2slk!4v1764511518645!5m2!1sen!2slk"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            className="absolute inset-0"
                                            title="Map of WIS Accountancy"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ----------------------------------------------------------------
                SECTION: FAQ
            ---------------------------------------------------------------- */}
                        <section className="pt-8">
                            <h3 className="text-xl font-bold text-[#171749] mb-4">Frequently Asked Questions</h3>
                            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border px-4">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-medium text-slate-800">Why don't you accept cash
                                        directly?</AccordionTrigger>
                                    <AccordionContent className="text-slate-600">
                                        To ensure 100% transparency. By directing you to official Red Cross and
                                        Government accounts, we eliminate any administrative overhead or doubt. We act
                                        solely as a logistics facilitator for goods.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-medium text-slate-800">Can I donate dry
                                        rations/food?</AccordionTrigger>
                                    <AccordionContent className="text-slate-600">
                                        Yes, but with strict conditions. We accept packed dry rations with long shelf
                                        life (rice, dhal, canned goods). <strong className="text-red-600">We do NOT
                                        accept instant foods or cooked meals</strong> due to spoilage risks and lack of
                                        immediate consumption facilities in transit.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="font-medium text-slate-800">Do you provide transport
                                        receipts?</AccordionTrigger>
                                    <AccordionContent className="text-slate-600">
                                        We confirm receipt of goods at our office. For tax-deductible financial
                                        receipts, please donate directly to the Red Cross (Option A) and request a
                                        receipt from them.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>

                    </div>

                    {/* RIGHT COLUMN: FINANCIALS (Span 4) */}
                    <div className="lg:col-span-4 space-y-8" id="finance">

                        {/* STICKY FINANCIAL CARD */}
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-t-4 border-t-slate-500 bg-[#171749] shadow-xl overflow-hidden">
                                <CardHeader className="bg-slate-50 border-b p-2">
                                    <CardTitle className="text-[#171749] flex items-center gap-2">
                                        <PoundSterling className="w-5 h-5" /> Financial Support
                                    </CardTitle>
                                    <CardDescription>
                                        Direct transfers to verified bodies.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    {/* OPTION A: RED CROSS */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between"><Badge variant="outline"
                                                                                                  className="border-red-200 bg-red-50 text-red-700 font-bold">Option
                                            A: NGO</Badge> <span
                                            className="text-[10px] font-bold text-slate-400 uppercase">Red Cross Society</span>
                                        </div>
                                        <div className="border rounded-lg overflow-hidden text-sm">
                                            <div
                                                className="bg-slate-50 p-2 flex justify-between text-slate-500 border-b">
                                                <span>Bank</span> <span className="font-medium text-slate-900">Sampath Bank</span>
                                            </div>
                                            <div className="p-3 bg-white space-y-2">
                                                <div className="flex justify-between items-center"><span
                                                    className="text-xs text-slate-600">Account No</span>
                                                    <div className="flex items-center gap-2"><span
                                                        className="font-mono font-bold text-[#171749]">0929 1000 0286</span>
                                                        <CopyButton text="092910000286" /></div>
                                                </div>
                                                <div className="flex justify-between items-center"><span
                                                    className="text-xs text-slate-600">Branch</span> <span
                                                    className="text-slate-900">Head Office</span></div>
                                                <div className="flex justify-between items-center"><span
                                                    className="text-xs text-slate-600">Swift</span> <span
                                                    className="font-mono text-xs text-[#171749]">BSAMLKLX</span></div>
                                                <div className="pt-2 text-center"><a
                                                    href="https://www.redcross.lk/how-to-help/bank-transfers/"
                                                    target="_blank" rel="noreferrer"
                                                    className="text-xs text-blue-600 hover:underline flex items-center justify-center gap-1">
                                                    <ExternalLink className="w-3 h-3" /> Verify Official Source </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* OPTION B: GOVERNMENT */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                variant="outline"
                                                className="border-blue-200 bg-blue-50 text-blue-700 font-bold"
                                            >
                                                Option B: State
                                            </Badge>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">
            Treasury (Disaster Fund)
        </span>
                                        </div>

                                        {/* USD ACCOUNT */}
                                        <div className="border rounded-lg overflow-hidden text-sm">
                                            <div className="bg-slate-50 p-2 flex justify-between text-slate-500 border-b">
                                                <span>Currency</span>
                                                <span className="font-medium text-slate-900">US Dollar (USD)</span>
                                            </div>
                                            <div className="p-3 bg-white space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Bank</span>
                                                    <span className="text-slate-900 text-right">
                                                        Deutsche Bank Trust Company Americas<br />New York, USA
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Account No</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            04015541
                                                        </span>
                                                        <CopyButton text="04015541" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Routing No</span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        021001033
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">SWIFT</span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        BKTRUS33XXX
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* GBP ACCOUNT 1 – HSBC */}
                                        <div className="border rounded-lg overflow-hidden text-sm">
                                            <div
                                                className="bg-slate-50 p-2 flex justify-between text-slate-500 border-b">
                                                <span>Currency</span>
                                                <span className="font-medium text-slate-900">
                                                    Pound Sterling (GBP) – HSBC UK
                                                </span>
                                            </div>
                                            <div className="p-3 bg-white space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Bank</span>
                                                    <span className="text-slate-900">HSBC Bank Plc, London</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Account No</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            39600144
                                                        </span>
                                                        <CopyButton text="39600144" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Sort Code</span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        40-05-15
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">IBAN</span>
                                                    <span className="font-mono text-xs text-[#171749] break-all">
                                                        GB48MIDL40051539600144
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">SWIFT</span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        MIDLGB22XXX
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* GBP ACCOUNT 2 – BOC UK */}
                                        <div className="border rounded-lg overflow-hidden text-sm">
                                            <div className="bg-slate-50 p-2 flex justify-between text-slate-500 border-b">
                                                <span>Currency</span>
                                                <span className="font-medium text-slate-900">
                                                    Pound Sterling (GBP) – BOC UK
                                                </span>
                                            </div>
                                            <div className="p-3 bg-white space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Bank</span>
                                                    <span
                                                        className="text-slate-900">Bank of Ceylon (UK) Ltd, London</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Account No</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#171749]">
                                                            88001249
                                                        </span>
                                                        <CopyButton text="88001249" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">Sort Code</span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        40-50-56
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">IBAN</span>
                                                    <span className="font-mono text-xs text-[#171749] break-all">
                                                        GB89BCEY40505688001249
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-slate-600">SWIFT</span>
                                                    <span className="font-mono text-xs text-[#171749]">
                                                        BCEYGB2LXXX
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 rounded-xl text-center bg-white ">
                                            <a
                                                href="https://www.cbsl.gov.lk/sites/default/files/cbslweb_documents/about/press_20251129_pmd_disaster_relief_fund_e.pdf"
                                                target="_blank" rel="noreferrer"
                                                className="text-xs text-blue-600 hover:underline flex items-center justify-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" /> Verify Official Source
                                            </a>
                                        </div>
                                    </div>


                                    <Alert className="bg-slate-50 border-slate-200">
                                        <AlertDescription className="text-xs text-slate-600 leading-relaxed ml-2">
                                            <strong>Verification:</strong> These are the official assistance accounts
                                            for the SLRCS and GoSL Treasury.
                                        </AlertDescription>
                                    </Alert>

                                </CardContent>
                            </Card>

                            {/* International Contact */}
                            <div className="bg-[#171749] text-white p-6 rounded-xl shadow-lg">
                                <h4 className="font-bold mb-2 text-[#f7a825]">Do you like to donate in UK?</h4>
                                <p className="text-sm text-slate-300 mb-4">
                                    Our UK office can assist with coordinating large-scale relief shipments or corporate
                                    matching. Please get in touch.
                                </p>
                                <Button variant="outline"
                                        className="w-full border-white/20 hover:bg-white hover:text-[#171749] text-white"
                                        asChild>
                                    <a href="mailto:lindujan.sundararjan@wis-accountancy.co.uk">Contact UK Team</a>
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* 8. CSR GALLERY SECTION (Bento Grid with Lightbox) */}
            <section className="bg-slate-100 py-16 border-t border-slate-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <ShieldCheck className="w-12 h-12 text-[#171749] mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-[#171749]">A Legacy of Care</h2>
                        <p className="text-slate-600 mt-4">
                            From previous flood relief missions to community outreach, we have a verified track record.
                            Click any image to view.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        {/* Large Featured Image (Index 0) */}
                        <div onClick={() => openLightbox(0)}
                             className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                            <img src={CSR_IMAGES[0].src} alt={CSR_IMAGES[0].alt}
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <p className="text-white font-bold text-lg">Community First</p>
                            </div>
                        </div>
                        {/* Standard Images (Indices 1, 2, 3) */}
                        {[1, 2, 3].map((idx) => (
                            <div key={idx} onClick={() => openLightbox(idx)}
                                 className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md cursor-pointer group">
                                <img src={CSR_IMAGES[idx].src} alt={CSR_IMAGES[idx].alt}
                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                        ))}

                        {/* Stat Block */}
                        <div
                            className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md bg-[#171749] flex items-center justify-center text-white p-4 text-center">
                            <div>
                                <h4 className="font-bold text-2xl text-[#f7a825]">10+ Years</h4>
                                <p className="text-xs opacity-80">of Service</p>
                            </div>
                        </div>

                        {/* Bottom Row (Indices 4, 5, 6) */}
                        {[4, 5].map((idx) => (
                            <div key={idx} onClick={() => openLightbox(idx)}
                                 className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md cursor-pointer group">
                                <img src={CSR_IMAGES[idx].src} alt={CSR_IMAGES[idx].alt}
                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                        ))}

                        {/* Last Large Image (Index 6) */}
                        <div onClick={() => openLightbox(6)}
                             className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-md relative cursor-pointer group">
                            <img src={CSR_IMAGES[6].src} alt={CSR_IMAGES[6].alt}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <p className="text-white font-bold border-2 border-white px-4 py-1 rounded-full text-sm">Previous
                                    Missions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FAQ & FOOTER */}
            <footer className="bg-[#0f0f36] text-slate-400 py-12 border-t border-slate-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4 text-white">
                                <img src="https://wis-commissions.com/build/assets/logoblue-FcesUrWV.png" alt="Logo" className="w-25 p-1 rounded-2xl bg-white h-17" />
                                <span className="font-bold text-xl">W.I.S Accountancy</span>
                            </div>
                            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
                                Consistent. Principled. Transparent. <br />
                                We are leveraging our corporate infrastructure to support the Sri Lankan community
                                during the 2025 flood crisis. All logistics are handled pro-bono by our team.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li>Bernards Business Park, Colombo 06</li>
                                <li>Phone: <a href={`tel:${COORDINATION_NUMBER.replace(/\s/g, '')}`}
                                              className="hover:text-white transition-colors">{COORDINATION_NUMBER}</a>
                                </li>
                                <li>Email: <a href="mailto:lindujan.sundararjan@wis-accountancy.co.uk"
                                              className="hover:text-white transition-colors">lindujan.sundararjan@...</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">Official Sources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-[#f7a825] transition-colors">Disaster Management
                                    Centre</a></li>
                                <li><a href="#" className="hover:text-[#f7a825] transition-colors">Red Cross Sri
                                    Lanka</a></li>
                                <li><a href="#" className="hover:text-[#f7a825] transition-colors">Meteorology
                                    Department</a></li>
                            </ul>
                        </div>
                    </div>
                    <Separator className="my-8 bg-slate-800" />
                    <div
                        className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                        <div>© 2025 W.I.S Accountancy. Verified Disaster Response Initiative.</div>
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
