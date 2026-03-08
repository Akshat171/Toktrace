"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Code2, 
  ArrowRight, 
  Twitter, 
  CheckCircle2, 
  Layers,
  Mail,
  MessageSquare,
  Clock,
  AlertCircle
} from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CostFlowDiagram } from './components/CostFlowDiagram';

const Home = () => {
  const [email, setEmail] = useState('');
  const [provider, setProvider] = useState<string[]>([]);
  const [painPoint, setPainPoint] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [problemIndex, setProblemIndex] = useState(0);

  const problems = [
    {
      title: "Blind to Which Features Burn Tokens",
      description: "You have LLM calls scattered across your app, but no idea which feature is quietly eating thousands in tokens.",
      tweet: {
        author: "bootstrappedDev",
        handle: "@bootstrappedDev",
        text: "Just got my OpenAI bill… $4,200 this month 😭 I thought the content generator was cheap… turns out it's 68% of the spend. No breakdown, no clue which endpoint or prompt is the killer. How do people even debug this??",
        date: "2:14 PM · Mar 6, 2026",
        replies: 12, retweets: 4, likes: 12
      }
    },
    {
      title: "Rate Limits & Errors Hit Silently",
      description: "Rate limits, 429s, timeouts — your app retries blindly and you only see the damage in the bill.",
      tweet: {
        author: "sidehustle_ai",
        handle: "@sidehustle_ai",
        text: "Woke up to 1,200 failed requests overnight. OpenAI rate limit. No alert. Just $380 in wasted retries. Why is there no simple dashboard that tells me when shit breaks in real time??",
        date: "11:23 AM · Mar 5, 2026",
        replies: 24, retweets: 14, likes: 89
      }
    },
    {
      title: "No Per-Request or Budget Caps",
      description: "One bad prompt loop or viral user spike = your monthly budget gone in hours.",
      tweet: {
        author: "indiehackersguy",
        handle: "@indiehackersguy",
        text: "Just burned through my $500 monthly OpenAI budget in 36 hours because of one poorly written agent loop. No per-request limit. No hard cap. Nothing. Now I'm manually killing endpoints like it's 2008 again. Kill me.",
        date: "3:47 PM · Mar 4, 2026",
        replies: 42, retweets: 31, likes: 204
      }
    },
    {
      title: "No Instant Alerts for Spikes",
      description: "Cost spikes, provider downtime, sudden 5× usage — you discover it days later.",
      tweet: {
        author: "ai_product_guy",
        handle: "@ai_product_guy",
        text: "My Claude bill went from $180 → $1,900 in one week. No notification. No anomaly alert. Just opened Stripe and nearly cried. Someone please build real-time spend monitoring for LLM APIs 😭",
        date: "9:15 AM · Mar 7, 2026",
        replies: 24, retweets: 9, likes: 67
      }
    },
    {
      title: "Can't Predict Future Costs",
      description: "You have no forecast — is that new feature going to 10× your bill?",
      tweet: {
        author: "solodevlife",
        handle: "@solodevlife",
        text: "Added AI search to my SaaS. Usage looks fine now… but what happens when we hit 10k users? No trend forecasting. No 'if this continues' projection. I'm literally gambling with next month's runway.",
        date: "7:42 PM · Mar 3, 2026",
        replies: 18, retweets: 6, likes: 41
      }
    },
    {
      title: "Redundant Calls & No Smart Routing",
      description: "Same prompt 100× times, always using GPT-4o when Groq would do 80% cheaper.",
      tweet: {
        author: "prompt_engineer",
        handle: "@prompt_engineer",
        text: "Just realized 40% of my tokens are identical prompts repeated across sessions. No caching layer. No auto-fallback to cheaper models. I'm basically donating money to OpenAI at this point 💀",
        date: "1:28 PM · Mar 6, 2026",
        replies: 45, retweets: 22, likes: 128
      }
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setProblemIndex((prev) => (prev + 1) % problems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [problems.length]);

  const handleProviderToggle = (p:any) => {
    setProvider(prev => 
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          providers: provider,
          pain_point: painPoint,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const shareOnX = () => {
    const text = encodeURIComponent("Just joined the wishlist for Toktrace! Cutting my LLM API bills by 50% without changing code. Check it out: ");
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-green-100 selection:text-green-900 relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-4 h-4 sm:w-5 sm:h-5">
                <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0"/><path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"/><path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"/><circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">Toktrace</span>
          </div>
          <a href="#wishlist" className="bg-slate-900 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all active:scale-95">
            Join Wishlist
          </a>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden relative z-10">
        {/* Hero Section */}
        <section className={`max-w-5xl mx-auto px-4 sm:px-6 text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-bold mb-5 sm:mb-6 uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-current" /> Fast, Invisible, Effective
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4 sm:mb-5">
            Cut Your LLM API Bills by <span className="text-green-600">50%+</span> <br className="hidden sm:block" /> 
            <span className="text-slate-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl block mt-2 sm:mt-0 sm:inline">Without Touching Your Code</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
            The drop-in proxy that caches, routes smartly, and optimizes OpenAI, Anthropic, Groq, & Gemini. Founders are wasting thousands monthly—don't be one of them.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-16">
            {[
              { icon: CheckCircle2, text: "Auto-cache repeated prompts" },
              { icon: Layers, text: "Smart routing to cheaper models" },
              { icon: BarChart3, text: "Real-time spend dashboard" },
              { icon: Code2, text: "5-min setup: Change base URL" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white p-2.5 sm:p-3 rounded-xl border-2 border-slate-200 shadow-sm">
                <item.icon className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Visual Mockup */}
          <div className="relative max-w-4xl mx-auto mb-12 sm:mb-20">
            <div className="absolute inset-0 bg-green-400/20 blur-[100px] rounded-full -z-10"></div>
            <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-8 shadow-2xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between mb-4 sm:mb-8 border-b border-slate-800 pb-3 sm:pb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-slate-500 text-[10px] sm:text-xs font-mono">api.toktrace.com/v1</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 text-left">
                <div className="md:col-span-2 space-y-3 sm:space-y-4">
                  <div className="h-24 sm:h-32 bg-slate-800/50 rounded-xl border border-slate-700 p-3 sm:p-4 flex flex-col justify-end relative overflow-hidden">
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-green-400 text-[10px] sm:text-xs font-bold bg-green-400/10 px-2 py-1 rounded">LIVE SAVINGS</div>
                    <div className="text-slate-400 text-[10px] sm:text-xs mb-1 uppercase tracking-widest font-bold">Total Saved This Month</div>
                    <div className="text-2xl sm:text-4xl font-bold text-white">$1,247.82</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="bg-slate-800/30 rounded-xl p-3 sm:p-4 border border-slate-700">
                      <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-bold mb-1">Cache Hit Rate</div>
                      <div className="text-lg sm:text-xl font-bold text-white">64.2%</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-xl p-3 sm:p-4 border border-slate-700">
                      <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-bold mb-1">Latency Reduced</div>
                      <div className="text-lg sm:text-xl font-bold text-white">-120ms</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-3 sm:p-4 border border-slate-700 flex flex-col gap-2 sm:gap-3">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1 sm:mb-2">Connected Providers</div>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
                    {['OpenAI', 'Anthropic', 'Gemini', 'Groq'].map((p) => (
                      <div key={p} className="flex items-center justify-between text-xs py-1.5 sm:py-2 border-b border-slate-700/50 last:border-0 md:last:border-0">
                        <span className="text-slate-300">{p}</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logs Section */}
              <div className="mt-3 sm:mt-6 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                <div className="px-3 sm:px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Request Logs</span>
                  <span className="text-slate-600 text-[10px] font-mono">Live</span>
                </div>
                <div className="p-2 sm:p-3 font-mono text-[9px] sm:text-[11px] leading-relaxed space-y-1 max-h-28 sm:max-h-32 overflow-y-auto overflow-x-hidden">
                  <div className="flex gap-1.5 sm:gap-2"><span className="text-slate-500 shrink-0">14:32:01</span><span className="text-green-400 shrink-0">CACHE HIT</span><span className="text-slate-400 truncate">saved 2.4k tokens</span></div>
                  <div className="flex gap-1.5 sm:gap-2"><span className="text-slate-500 shrink-0">14:31:58</span><span className="text-blue-400 shrink-0">ROUTED</span><span className="text-slate-400 truncate">gpt-4o → groq (80% cheaper)</span></div>
                  <div className="flex gap-1.5 sm:gap-2"><span className="text-slate-500 shrink-0">14:31:55</span><span className="text-green-400 shrink-0">CACHE HIT</span><span className="text-slate-400 truncate">saved 1.8k tokens</span></div>
                  <div className="flex gap-1.5 sm:gap-2"><span className="text-slate-500 shrink-0">14:31:52</span><span className="text-amber-400 shrink-0">PASSTHROUGH</span><span className="text-slate-400 truncate">claude-3-opus</span></div>
                  <div className="flex gap-1.5 sm:gap-2"><span className="text-slate-500 shrink-0">14:31:48</span><span className="text-green-400 shrink-0">CACHE HIT</span><span className="text-slate-400 truncate">saved 512 tokens</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Flow Diagram */}
        <CostFlowDiagram />

        {/* Dynamic Problem Section */}
        <section id="problem" className="py-12 sm:py-22 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#22C55E_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-8 sm:mb-16">
              <h2 className="text-green-500 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4">// THE REALITY CHECK</h2>
              <p className="text-2xl sm:text-3xl md:text-5xl font-extrabold max-w-2xl leading-tight">
                LLM Costs are Killing <br /> 
                <span className="text-slate-400 italic">Startup Margins.</span>
              </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-20 items-start">
              {/* Left Side: Problem Detail */}
              <div>
                {(() => {
                  const prob = problems[problemIndex];
                  return (
                    <div className="transition-opacity duration-500">
                      <div className="mb-3 sm:mb-5">
                        <span className="text-green-500 font-mono text-xs sm:text-sm tracking-wide mb-1.5 sm:mb-2 block">0{problemIndex + 1} / 0{problems.length}</span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                          {prob.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed mb-5 sm:mb-8">
                        {prob.description}
                      </p>
                      <div className="flex gap-1.5">
                        {problems.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setProblemIndex(i)}
                            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                              i === problemIndex 
                                ? 'w-6 sm:w-8 bg-green-500' 
                                : 'w-3 sm:w-4 bg-slate-600 hover:bg-slate-500'
                            }`}
                            aria-label={`Go to problem ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right Side: Twitter Post Template */}
              <div className="relative lg:sticky lg:top-24 w-full">
                {(() => {
                  const prob = problems[problemIndex];
                  return (
                    <div className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-700/60 transition-opacity duration-500">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <div className="flex gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-white text-xs sm:text-sm flex-shrink-0">
                            {prob.tweet.author[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-sm sm:text-base truncate">{prob.tweet.author}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 fill-current flex-shrink-0" />
                            </div>
                            <div className="text-slate-500 text-xs sm:text-sm truncate">{prob.tweet.handle}</div>
                          </div>
                        </div>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0 ml-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      
                      {/* Tweet Text */}
                      <p className="text-[13px] sm:text-[15px] text-slate-200 mb-4 sm:mb-5 leading-relaxed">
                        {prob.tweet.text}
                      </p>
                      
                      {/* Timestamp */}
                      <div className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-700/60">
                        {prob.tweet.date}
                      </div>
                      
                      {/* Engagement Stats */}
                      <div className="flex gap-5 sm:gap-6 text-slate-500 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{prob.tweet.replies ?? 24}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>{prob.tweet.retweets ?? 89}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-pink-400 transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{prob.tweet.likes ?? 142}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Wishlist Form */}
        <section id="wishlist" className="py-16 sm:py-32 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-5 sm:p-8 md:p-12 relative overflow-hidden">
            {submitted ? (
              <div className="text-center py-6 sm:py-10 space-y-4 sm:space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">You&apos;re on the list!</h2>
                <p className="text-slate-600 text-base sm:text-lg">We&apos;ll reach out soon with your cost audit invite and roadmap updates.</p>
                <div className="pt-3 sm:pt-4 flex flex-col gap-4">
                  <button 
                    onClick={shareOnX}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base hover:bg-slate-800 transition-all shadow-lg"
                  >
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" /> Share on X for Priority Spot
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 sm:mb-10 text-center">
                  <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-2 sm:mb-4">Join the Wishlist</h2>
                  <p className="text-slate-500 text-sm sm:text-base">Shape the product and claim your early bird benefits.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input 
                        type="email" 
                        required 
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base sm:text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 sm:mb-3">Which LLM providers do you use most?</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {['OpenAI', 'Anthropic', 'Groq', 'Gemini', 'Local/Ollama'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleProviderToggle(p)}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                            provider.includes(p) 
                            ? 'bg-green-600 border-green-600 text-white shadow-md' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Biggest pain point / wishlist feature?</label>
                    <textarea 
                      placeholder="e.g., Better caching for long contexts, Budget alerts per team member..."
                      rows={3}
                      value={painPoint}
                      onChange={(e) => setPainPoint(e.target.value)}
                      className="w-full p-3 sm:p-4 rounded-xl border-2 border-slate-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-base sm:text-lg resize-none"
                    ></textarea>
                  </div>

                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {formError}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-5 rounded-xl text-base sm:text-xl shadow-[0_10px_20px_rgba(34,197,94,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Joining...
                      </>
                    ) : (
                      <>Join Wishlist – Get Early Access <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-4 h-4">
                <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0"/><path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"/><path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"/><circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">Toktrace</span>
          </div>
          <div className="text-slate-400 text-xs">
            © 2026 Toktrace. Built for global builders.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;