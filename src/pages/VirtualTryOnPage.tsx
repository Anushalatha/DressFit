import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Upload, User, Ruler, Loader2, CheckCircle2, Scissors, ShoppingBag, Heart } from "lucide-react";
import { products } from "@/data/mockData";
import { tryOnAgent, tailoringAgent, type TryOnResult, type TailoringResult } from "@/services/aiAgents";
import { miragicService } from "@/services/miragicService";
import { useStore } from "@/store/useStore";
import VirtualTryOnViewer from "../components/VirtualTryOn/VirtualTryOnViewer";
import MiniGarmentViewer from "../components/VirtualTryOn/MiniGarmentViewer";

const VirtualTryOnPage = () => {
  const tryOnDresses = products.filter(p => ["4", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117"].includes(p.id));
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

  const [humanPhoto, setHumanPhoto] = useState<File | null>(null);
  const [humanPhotoPreview, setHumanPhotoPreview] = useState<string>("");
  const [miragicResultUrl, setMiragicResultUrl] = useState<string>("");

  const photoInputRef = useRef<HTMLInputElement>(null);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  // Update selected size when product changes
  useEffect(() => {
    setSelectedSize(selectedProduct.sizes[0] || "");
    setMiragicResultUrl(""); // Reset logic on product change
    setTryOnResult(null);
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
    "112": "tshirt01",
    "113": "dress02",
    "114": "tshirt01",
    "115": "dress03", // Placeholder for jeans since there's no jeans mesh yet
    "116": "dress01", // Placeholder for skirt
    "117": "tshirt01", // Placeholder for button-down shirt
  };


  const handleTryOn = async () => {
    if (selectedProduct.category === "Tops") {
      if (!humanPhoto) {
        alert("Please upload your photo to use the 2D Image Try-On Engine.");
        return;
      }
      setProcessing(true);
      setMiragicResultUrl("");
      try {
        setProcessingMsg("Starting Miragic Generative AI Job...");
        const jobId = await miragicService.startTryOnJob(humanPhoto, selectedProduct.image);
        const finalUrl = await miragicService.pollJobStatus(jobId, (msg) => setProcessingMsg(msg));
        setMiragicResultUrl(finalUrl);
        setTryOnResult({ // Mock details for UI coherence
           fitConfidence: 96,
           sizeRecommendation: "M - Perfect Fit Profile",
           adjustments: ["Fits dynamically driven by Miragic AI"],
           processingTime: 5
        });
      } catch (err: any) {
        alert("Try-on failed: Make sure you put your real API Key in miragicService.ts! " + err.message);
      } finally {
        setProcessing(false);
      }
      return;
    }

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setHumanPhoto(file);
      setHumanPhotoPreview(URL.createObjectURL(file));
      setMiragicResultUrl(""); // Reset previous attempt
    }
  };

  const handleTailoring = async () => {
    setShowTailoring(true);
    setProcessingMsg("AI Tailoring Agent Optimizing Fit...");
    const result = await tailoringAgent(selectedProduct);
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
              <input type="file" ref={photoInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              <div onClick={() => photoInputRef.current?.click()} className="border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary/40 transition-colors">
                {humanPhotoPreview ? (
                   <img src={humanPhotoPreview} alt="User" className="mx-auto max-h-32 object-contain rounded" />
                ) : (
                  <>
                    <User className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload your full-body photo</p>
                  </>
                )}
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
                      <div className="flex-1 relative w-full h-full min-h-[400px] flex items-center justify-center">
                        {selectedProduct?.category === 'Dresses' || selectedProduct?.category === 'Bottoms' ? (
                          // 3D VIEWER: Used for Skirts & Dresses
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
                        ) : (
                          // 2D VIEWER (NEW SCRIPT): Used for Shirts & Tops
                          miragicResultUrl ? (
                             <img src={miragicResultUrl} className="absolute inset-0 w-full h-full object-cover z-10" alt="Miragic Result" />
                          ) : (
                              <div className="text-center p-6 border-2 border-dashed border-primary/50 m-4 rounded-lg bg-background/50 backdrop-blur w-full h-full flex flex-col items-center justify-center">
                                <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
                                  <Sparkles className="w-5 h-5 text-primary"/> Miragic 2D Try-On
                                </h4>
                                <>
                                  <p className="text-xs text-muted-foreground mb-4">
                                    Select a top and upload your photo to map the <b>{selectedProduct?.name}</b> directly onto your body.
                                  </p>
                                  <div className="flex justify-center items-center gap-4 opacity-50 mt-4">
                                     <img src={selectedProduct?.image} alt="Shirt" className="w-20 h-24 object-cover rounded shadow border border-border" />
                                     <div className="text-2xl font-bold">+</div>
                                     {humanPhotoPreview ? (
                                         <img src={humanPhotoPreview} alt="User" className="w-20 h-24 object-cover rounded shadow border border-border" />
                                     ) : (
                                         <div className="w-20 h-24 bg-muted flex items-center justify-center rounded border border-border">
                                           <User className="w-8 h-8 text-muted-foreground" />
                                         </div>
                                     )}
                                  </div>
                                </>
                              </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FIT CONFIDENCE & ADD TO CART - Moved below the photo block so it doesn't overlap */}
              <AnimatePresence>
                {tryOnResult && !processing && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 text-left">
                    <div className="glass-card p-4 relative z-20">
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
                          className="w-full btn-primary-gradient py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                        >
                          <ShoppingBag className="w-4 h-4" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {tryOnResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <button onClick={handleTailoring} className="btn-glass w-full flex items-center justify-center gap-2">
                  <Scissors className="w-4 h-4 text-secondary" /> Optimize Fit with AI Tailoring
                </button>
                <AnimatePresence>
                  {showTailoring && tailoringResult && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-4 mt-4 text-left">
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
