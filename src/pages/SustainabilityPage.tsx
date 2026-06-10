import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Leaf, Recycle, Heart, BarChart3, Filter, Info, X, ShoppingBag, Sparkles, Award, TrendingDown, ArrowRightCircle } from "lucide-react";
import { products } from "@/data/mockData";
import { useStore } from "@/store/useStore";
import MiniGarmentViewer from "../components/VirtualTryOn/MiniGarmentViewer";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { sustainabilityBackend, SustainabilityDashboardStats } from "@/services/sustainabilityBackend";

const filters = ["All", "eco-friendly", "recycled", "vegan"];

const SustainabilityPage = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace'>('dashboard');
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const [stats, setStats] = useState<SustainabilityDashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useStore();

  const womensProductIds = ["4", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111"];
  const womensProducts = products.filter(p => womensProductIds.includes(p.id));

  const idToGarmentId: Record<string, string> = {
    "4": "dress02",
    "101": "dress02",
    "102": "dress03",
    "103": "dress02",
    "104": "dress02",
    "105": "dress03",
    "106": "tshirt01",
    "107": "tshirt01",
    "108": "dress03",
    "109": "dress03",
    "110": "dress03",
    "111": "dress03",
  };

  const filtered = activeFilter === "All"
    ? womensProducts
    : womensProducts.filter((p) => p.tags.includes(activeFilter));

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent";
    if (score >= 75) return "text-primary";
    return "text-secondary";
  };

  useEffect(() => {
    if (activeTab === 'dashboard' && !stats) {
       setLoadingStats(true);
       sustainabilityBackend.getUserDashboard('user_123').then(res => {
         setStats(res);
         setLoadingStats(false);
       });
    }
  }, [activeTab, stats]);

  const handleSimulateLifecycle = async () => {
     if (window.confirm("Confirm you are recycling 'Vintage Denim Jacket' locally?")) {
         const res = await sustainabilityBackend.logLifecycleEvent({
            itemId: "item_999",
            eventType: "RECYCLING",
            location: "Local Return Hub",
            timestamp: new Date().toISOString()
         });
         alert(`Smart Contract Executed! Action logged on Blockchain.\nTransaction Hash: ${res.hash}`);
         if (stats) {
            setStats({...stats, totalCarbonSaved: stats.totalCarbonSaved + 15.5});
         }
     }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-3">
            Sustainability <span className="gradient-text-accent">Hub</span>
          </h1>
          <p className="text-muted-foreground">Track your wardrobe's environmental impact driven by AI & Blockchain provenance.</p>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
           <div className="glass-card p-1 flex items-center rounded-full">
              <button 
                 onPointerDown={() => setActiveTab('dashboard')} 
                 className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-primary text-secondary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                 My Impact
              </button>
              <button 
                 onPointerDown={() => setActiveTab('marketplace')} 
                 className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'marketplace' ? 'bg-primary text-secondary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                 Eco Marketplace
              </button>
           </div>
        </div>

        {activeTab === 'dashboard' ? (
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              {loadingStats ? (
                 <div className="text-center py-20">
                    <p className="text-muted-foreground animate-pulse">Syncing blockchain nodes and generating AI sustainability metrics...</p>
                 </div>
              ) : stats && (
                 <>
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
                          <Leaf className="w-8 h-8 text-accent mb-3" />
                          <p className="text-sm text-muted-foreground mb-1">Total Carbon Saved</p>
                          <p className="font-display text-4xl font-bold text-primary">{stats.totalCarbonSaved} kg</p>
                          <p className="text-xs text-accent mt-2 flex items-center gap-1"><TrendingDown className="w-3 h-3"/> -12% vs last month</p>
                       </div>
                       <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
                          <Recycle className="w-8 h-8 text-primary mb-3" />
                          <p className="text-sm text-muted-foreground mb-1">Active Eco-Wardrobe</p>
                          <p className="font-display text-4xl font-bold">{stats.itemsInWardrobe}</p>
                          <p className="text-xs text-muted-foreground mt-2">Verified transparent supply chains.</p>
                       </div>
                       <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
                          <Award className="w-8 h-8 text-secondary mb-3" />
                          <p className="text-sm text-muted-foreground mb-1">Cumulative Eco Score</p>
                          <p className="font-display text-4xl font-bold text-secondary">{stats.averageScore}/100</p>
                          <p className="text-xs text-secondary mt-2 font-semibold">Top 5% of Users</p>
                       </div>
                    </div>

                    {/* Chart & Gamification Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                       <div className="glass-card p-6 lg:col-span-2">
                          <h3 className="font-display font-semibold mb-4 text-lg">Carbon Footprint Analysis (kg CO2e)</h3>
                          <div className="h-[300px] w-full">
                             <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={stats.impactData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                 <defs>
                                   <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                                     <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                                   </linearGradient>
                                   <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3}/>
                                     <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                                   </linearGradient>
                                 </defs>
                                 <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                 <YAxis stroke="hsl(var(--muted-foreground))" />
                                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                 <RechartsTooltip 
                                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                                 />
                                 <Legend />
                                 <Area type="monotone" name="Your Footprint" dataKey="userFootprint" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorUser)" />
                                 <Area type="monotone" name="Industry Average" dataKey="industryAvg" stroke="hsl(var(--muted-foreground))" fillOpacity={1} fill="url(#colorAvg)" />
                               </AreaChart>
                             </ResponsiveContainer>
                          </div>
                       </div>
                       
                       <div className="space-y-6">
                          <div className="glass-card p-6">
                             <h3 className="font-display font-semibold mb-4 text-lg">Achievements</h3>
                             <div className="flex flex-wrap gap-2">
                                {stats.badges.map(badge => (
                                   <span key={badge} className="bg-primary/20 text-primary px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 border border-primary/30">
                                      <Award className="w-3.5 h-3.5" />
                                      {badge}
                                   </span>
                                ))}
                             </div>
                          </div>
                          
                          <div className="glass-card p-6 bg-accent/5 border border-accent/20">
                             <h3 className="font-display font-semibold mb-2 text-lg text-accent">Log Lifecycle Action</h3>
                             <p className="text-xs text-muted-foreground mb-4">Are you recycling or reselling an item? Record it on-chain to receive token rewards and improve your score.</p>
                             <button onClick={handleSimulateLifecycle} className="w-full py-2 bg-accent hover:bg-accent/90 text-primary-foreground text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
                                Demo: Recycle Item On-Chain <ArrowRightCircle className="w-4 h-4" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </>
              )}
           </motion.div>
        ) : (
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeFilter === f
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted text-muted-foreground border border-border hover:border-primary/20"
                      }`}
                  >
                    {f === "All" ? "All Products" : f.replace("-", " ")}
                  </button>
                ))}
                <button onClick={() => setShowModal(true)} className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Info className="w-3 h-3" /> How scores work
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card-hover overflow-hidden"
                  >
                    <div className="aspect-[4/3] relative rounded-t-xl bg-muted/30 overflow-hidden">
                      <MiniGarmentViewer 
                        modelPath={`/models/garments/${idToGarmentId[p.id] || "dress01"}.glb`} 
                        textureUrl={p.image} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 right-3 glass-card px-3 py-1.5 rounded-full">
                        <span className={`font-display font-bold text-sm ${getScoreColor(p.sustainabilityScore)}`}>
                          {p.sustainabilityScore}/100
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground mb-1">{p.brand}</p>
                      <h3 className="font-display font-semibold mb-3">{p.name}</h3>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-xs">
                          <Leaf className="w-3.5 h-3.5 text-accent" />
                          <span className="text-muted-foreground">Carbon: {p.carbonFootprint}kg</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Recycle className="w-3.5 h-3.5 text-primary" />
                          <span className="text-muted-foreground">Circular: {p.circularRating}%</span>
                        </div>
                        {p.ethicalLabor && (
                          <div className="flex items-center gap-2 text-xs col-span-2">
                            <Heart className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-muted-foreground">Ethical Labor Certified</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {p.material.map((m) => (
                          <span key={m} className="px-2 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground border border-border">
                            {m}
                          </span>
                        ))}
                      </div>

                      {/* Score bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Sustainability Score</span>
                          <span className={`font-semibold ${getScoreColor(p.sustainabilityScore)}`}>{p.sustainabilityScore}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${p.sustainabilityScore}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="h-1.5 rounded-full"
                            style={{ background: "var(--gradient-accent)" }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-display font-bold text-lg">${p.price}</span>
                          <select
                            className="bg-muted text-xs rounded-md px-2 py-1 border border-border"
                            value={selectedSizes[p.id] || p.sizes[0]}
                            onChange={(e) => setSelectedSizes({ ...selectedSizes, [p.id]: e.target.value })}
                          >
                            {p.sizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => addToCart({
                              id: p.id,
                              name: p.name,
                              price: p.price,
                              image: p.image,
                              size: selectedSizes[p.id] || p.sizes[0]
                            })}
                            className="btn-primary-gradient py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Add
                          </button>
                          <button
                            onClick={() => navigate('/try-on')}
                            className="btn-glass py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:text-primary transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5" /> Try On
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
           </motion.div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Ranking Methodology
                </h3>
                <button onClick={() => setShowModal(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Score calculated using <span className="text-primary font-medium">AI Ethical Ranking Agent</span> analyzing:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-accent" /> Carbon footprint from supply chain data</li>
                <li className="flex items-center gap-2"><Heart className="w-4 h-4 text-secondary" /> Labor practices and fair wage verification</li>
                <li className="flex items-center gap-2"><Recycle className="w-4 h-4 text-primary" /> Material recyclability and circular economy impact</li>
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SustainabilityPage;
