import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Leaf, Recycle, Heart, BarChart3, Filter, Info, X, ShoppingBag, Sparkles } from "lucide-react";
import { products } from "@/data/mockData";
import { useStore } from "@/store/useStore";
import MiniGarmentViewer from "../components/VirtualTryOn/MiniGarmentViewer";

const filters = ["All", "eco-friendly", "recycled", "vegan"];

const SustainabilityPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

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

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-3">
            Sustainability <span className="gradient-text-accent">Ranking</span>
          </h1>
          <p className="text-muted-foreground">AI-powered ethical scoring for transparent, sustainable fashion choices</p>
        </motion.div>

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
