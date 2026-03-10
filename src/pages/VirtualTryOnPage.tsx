import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Upload, User, Ruler, Loader2, CheckCircle2, Scissors, ShoppingBag, Heart } from "lucide-react";
import { products } from "@/data/mockData";
import { tryOnAgent, tailoringAgent, type TryOnResult, type TailoringResult } from "@/services/aiAgents";
import { useStore } from "@/store/useStore";
import VirtualTryOnViewer from "../components/VirtualTryOn/VirtualTryOnViewer";
import MiniGarmentViewer from "../components/VirtualTryOn/MiniGarmentViewer";

const VirtualTryOnPage = () => {
  const tryOnDresses = products.filter(p => ["4", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111"].includes(p.id));
  const [selectedProduct, setSelectedProduct] = useState(tryOnDresses[0] || products[0]);
  const [processing, setProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("");
  const [tryOnResult, setTryOnResult] = useState<TryOnResult | null>(null);
  const [tailoringResult, setTailoringResult] = useState<TailoringResult | null>(null);
  const [showTailoring, setShowTailoring] = useState(false);
  const [height, setHeight] = useState<number | "">(170);
  const [chest, setChest] = useState<number | "">(90);
  const [waist, setWaist] = useState<number | "">(75);
  const [hips, setHips] = useState<number | "">(95);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  // Update selected size when product changes
  useEffect(() => {
    setSelectedSize(selectedProduct.sizes[0] || "");
  }, [selectedProduct]);

  const idToGarmentId: Record<string, string> = {
    "4": "dress02", // Changed from dress01 to fix framing bug
    "101": "dress02",
    "102": "dress03",
    "103": "dress02", // Changed from dress01 to fix framing bug
    "104": "dress02",
    "105": "dress03",
    "106": "tshirt01",
    "107": "tshirt01",
    "108": "dress03", // Reusing long dress base model
    "109": "dress03",
    "110": "dress03",
    "111": "dress03",
  };


  const handleTryOn = async () => {
    setProcessing(true);
    setTryOnResult(null);
    setTailoringResult(null);
    setShowTailoring(false);
    const messages = ["AI Analyzing Body Measurements...", "Generating 3D Avatar (React Three Fiber)...", "Mapping Garment to Avatar...", "Computing Fit Confidence..."];
    for (const msg of messages) {
      setProcessingMsg(msg);
      await new Promise(r => setTimeout(r, 600));
    }
    const result = await tryOnAgent();
    setTryOnResult(result);
    setProcessing(false);
  };

  const handleTailoring = async () => {
    setShowTailoring(true);
    setProcessingMsg("AI Tailoring Agent Optimizing Fit...");
    const result = await tailoringAgent();
    setTailoringResult(result);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-3">
            AI <span className="gradient-text">Virtual Try-On</span>
          </h1>
          <p className="text-muted-foreground">Upload your photo or enter measurements for an AI-powered fitting experience</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" /> Upload Photo
              </h3>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/40 transition-colors">
                <User className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" /> Body Measurements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Height (cm)</label>
                  <input value={height} onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="—" className="w-full mt-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Chest (cm)</label>
                  <input value={chest} onChange={(e) => setChest(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="—" className="w-full mt-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Waist (cm)</label>
                  <input value={waist} onChange={(e) => setWaist(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="—" className="w-full mt-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Hips (cm)</label>
                  <input value={hips} onChange={(e) => setHips(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="—" className="w-full mt-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                </div>
              </div>
            </div>

            <button onClick={handleTryOn} disabled={processing} className="btn-primary-gradient w-full flex items-center justify-center gap-2">
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {processing ? "Processing..." : "Generate AI Try-On"}
            </button>
          </div>

          {/* Center: Preview */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4 text-center">AI Try-On Preview</h3>
              <div className="relative aspect-[3/4] bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {processing ? (
                    <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                      <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                      <p className="text-sm text-primary ai-pulse">{processingMsg}</p>
                    </motion.div>
                  ) : (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex flex-col">
                      <div className="flex-1 relative w-full h-full min-h-[400px]">
                        <VirtualTryOnViewer
                          measurements={{
                            height: Number(height) || 170,
                            bust: Number(chest) || 90,
                            waist: Number(waist) || 75,
                            hips: Number(hips) || 95
                          }}
                          selectedGarmentId={idToGarmentId[selectedProduct?.id] || "dress01"}
                          productImage={selectedProduct?.image}
                        />
                      </div>
                      {tryOnResult && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="glass-card p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">Fit Confidence</span>
                              <span className="font-display font-bold text-primary text-lg">{tryOnResult.fitConfidence}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${tryOnResult.fitConfidence}%` }} transition={{ duration: 1 }} className="h-2 rounded-full" style={{ background: "var(--gradient-primary)" }} />
                            </div>
                            <p className="text-xs text-accent mt-2 flex items-center gap-1 mb-4">
                              <CheckCircle2 className="w-3 h-3" /> {tryOnResult.sizeRecommendation}
                            </p>
                            <div className="pt-3 border-t border-border/50 flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <span className="font-display font-bold">${selectedProduct.price}</span>
                                <select
                                  aria-label="Select size"
                                  className="bg-muted text-xs rounded-md px-2 py-1 border border-border"
                                  value={selectedSize}
                                  onChange={(e) => setSelectedSize(e.target.value)}
                                >
                                  {selectedProduct.sizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                  ))}
                                </select>
                              </div>
                              <button
                                onClick={() => addToCart({
                                  id: selectedProduct.id,
                                  name: selectedProduct.name,
                                  price: selectedProduct.price,
                                  image: selectedProduct.image,
                                  size: selectedSize
                                })}
                                className="w-full btn-primary-gradient py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                              >
                                <ShoppingBag className="w-4 h-4" /> Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {tryOnResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <button onClick={handleTailoring} className="btn-glass w-full flex items-center justify-center gap-2">
                  <Scissors className="w-4 h-4 text-secondary" /> Optimize Fit with AI Tailoring
                </button>
                <AnimatePresence>
                  {showTailoring && tailoringResult && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-4 mt-4">
                      <h4 className="font-display text-sm font-semibold mb-3">AI Tailoring Adjustments</h4>
                      {tailoringResult.adjustments.map((a) => (
                        <div key={a.area} className="flex justify-between text-xs py-1.5 border-b border-border/30 last:border-0">
                          <span className="text-muted-foreground">{a.area}</span>
                          <span className="text-primary">{a.adjustment}</span>
                        </div>
                      ))}
                      <div className="mt-3 text-xs text-accent flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Confidence: {tailoringResult.confidence}%
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Right: Product Grid */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold">Select Clothing</h3>
            <div className="grid grid-cols-2 gap-3">
              {tryOnDresses.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => { setSelectedProduct(p); setTryOnResult(null); }}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-colors ${selectedProduct.id === p.id ? "border-primary" : "border-transparent"
                    }`}
                >
                  <div className="aspect-[3/4] relative bg-muted/30">
                    <MiniGarmentViewer 
                      modelPath={`/models/garments/${idToGarmentId[p.id] || "dress01"}.glb`} 
                      textureUrl={p.image} 
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist(p.id)) {
                          removeFromWishlist(p.id);
                        } else {
                          addToWishlist({ id: p.id, name: p.name, price: p.price, image: p.image });
                        }
                      }}
                      aria-label={isInWishlist(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                      className="absolute top-2 right-2 p-1 bg-background/70 rounded-full hover:bg-background transition-colors z-10"
                    >
                      <Heart
                        className={`w-5 h-5 ${isInWishlist(p.id) ? 'text-accent' : 'text-muted-foreground'}`}
                      />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 flex flex-col items-start text-left pointer-events-none">
                      <p className="text-xs font-semibold truncate w-full text-white drop-shadow-md">{p.name}</p>
                      <p className="text-xs text-white/80 drop-shadow-md">${p.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnPage;
