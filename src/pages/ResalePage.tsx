import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Upload, Loader2, AlertTriangle, CheckCircle2, Link as LinkIcon, DollarSign, ShoppingBag } from "lucide-react";
import { resaleItems } from "@/data/mockData";
import { resaleAgent, type ResaleAuthResult } from "@/services/aiAgents";
import { useStore } from "@/store/useStore";
import MiniGarmentViewer from "../components/VirtualTryOn/MiniGarmentViewer";

const ResalePage = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisMsg, setAnalysisMsg] = useState("");
  const [uploadResult, setUploadResult] = useState<ResaleAuthResult | null>(null);
  const [uploadedPreviews, setUploadedPreviews] = useState<string[]>([]);
  const [imageRecommendations, setImageRecommendations] = useState<{
    name: string;
    preview: string;
    result: ResaleAuthResult;
    suggestions: string[];
  }[]>([]);
  const [showBlockchain, setShowBlockchain] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addToCart } = useStore();

  const resaleIdToGarmentId: Record<string, string> = {
    "r1": "dress02",
    "r2": "dress03",
    "r3": "dress02",
    "r4": "dress02",
  };

  const handleUpload = async () => {
    // trigger file input
    inputRef.current?.click();
  };

  const analyzeFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setAnalyzing(true);
    setAnalysisMsg("Preparing images for AI analysis...");
    setImageRecommendations([]);
    const msgs = ["AI Scanning Fabric Texture...", "Detecting Wear Patterns...", "Running Damage Analysis..."];

    // create previews
    const previews: string[] = [];
    for (const f of Array.from(files)) {
      previews.push(URL.createObjectURL(f));
    }
    setUploadedPreviews(previews);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      for (const msg of msgs) {
        setAnalysisMsg(`${file.name}: ${msg}`);
        await new Promise(r => setTimeout(r, 600));
      }
      const result = await resaleAgent();

      // build suggestions based on mock result
      const suggestions: string[] = [];
      if (result.damageDetected) suggestions.push("Recommend repair - visible damage detected");
      if (result.fabricWearPercent > 20) suggestions.push("Consider restoration / deep clean (high wear)");
      if (result.authenticityScore < 90) suggestions.push("Send for expert authentication / provenance check");
      if (!result.damageDetected && result.authenticityScore >= 90) suggestions.push("Ready to relist with 'Verified' badge");
      suggestions.push(`Suggested relist price: $${result.suggestedPrice}`);

      setImageRecommendations(prev => [...prev, { name: file.name, preview: previews[i], result, suggestions }]);
      await new Promise(r => setTimeout(r, 300));
    }

    setAnalysisMsg("Analysis complete");
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-3">
            AI Resale <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-muted-foreground">Authenticate and resell fashion items with AI verification and blockchain proof</p>
        </motion.div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="glass-card p-8">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" /> Upload Item for AI Verification
            </h3>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => analyzeFiles(e.target.files)}
              className="hidden"
            />
            <div className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary/40 transition-colors mb-6" onClick={handleUpload}>
              <ShieldCheck className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Click to upload your item photo(s) for AI authentication</p>
              <p className="text-xs text-muted-foreground/60 mt-2">You can upload multiple images (different angles)</p>
            </div>

            {uploadedPreviews.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Uploaded Images</h4>
                <div className="flex gap-2 overflow-x-auto py-2">
                  {uploadedPreviews.map((p, idx) => (
                    <img key={p} src={p} alt={`upload-${idx}`} className="w-24 h-24 object-cover rounded-md border" />
                  ))}
                </div>
              </div>
            )}

            {imageRecommendations.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">AI Recommendations</h4>
                {imageRecommendations.map((rec) => (
                  <div key={rec.name} className="glass-card p-3">
                    <div className="flex items-start gap-3">
                      <img src={rec.preview} alt={rec.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">{rec.name}</p>
                            <p className="font-display font-bold">Auth: {rec.result.authenticityScore}%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Wear</p>
                            <p className="font-display font-bold text-accent">{rec.result.fabricWearPercent}%</p>
                          </div>
                        </div>
                        <ul className="mt-2 text-xs space-y-1">
                          {rec.suggestions.map((s) => (
                            <li key={s} className="flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full bg-primary/80" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {analyzing && (
                <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-6">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
                  <p className="text-sm text-primary ai-pulse">{analysisMsg}</p>
                </motion.div>
              )}
              {uploadResult && !analyzing && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Authenticity</p>
                      <p className="font-display text-2xl font-bold text-primary">{uploadResult.authenticityScore}%</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Fabric Wear</p>
                      <p className="font-display text-2xl font-bold text-accent">{uploadResult.fabricWearPercent}%</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Damage</p>
                      <p className={`font-display text-lg font-bold ${uploadResult.damageDetected ? "text-destructive" : "text-accent"}`}>
                        {uploadResult.damageDetected ? "Detected" : "None"}
                      </p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Suggested Price</p>
                      <p className="font-display text-2xl font-bold gradient-text">${uploadResult.suggestedPrice}</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-secondary" />
                      <span className="text-xs text-muted-foreground">Blockchain Hash: {uploadResult.blockchainHash}</span>
                    </div>
                    <span className="text-xs text-accent">Verified</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Marketplace Grid */}
        <h2 className="font-display text-2xl font-bold mb-8">Verified Resale Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resaleItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover overflow-hidden"
            >
              <div className="aspect-square relative rounded-t-xl bg-muted/30 overflow-hidden">
                <MiniGarmentViewer 
                  modelPath={`/models/garments/${resaleIdToGarmentId[item.id] || "dress02"}.glb`} 
                  textureUrl={item.image} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3">
                  {item.ownershipVerified ? (
                    <div className="glass-card px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-accent" />
                      <span className="text-[10px] text-accent">Verified</span>
                    </div>
                  ) : (
                    <div className="glass-card px-2 py-1 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                      <span className="text-[10px] text-destructive">Unverified</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-sm mb-2">{item.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground line-through">${item.originalPrice}</p>
                    <p className="font-display font-bold text-primary flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />{item.suggestedPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Auth Score</p>
                    <p className="font-display font-bold text-sm text-accent">{item.authenticityScore}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={() => setShowBlockchain(showBlockchain === item.id ? null : item.id)}
                    className="w-full text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 bg-muted/30 rounded py-2 border border-border"
                  >
                    <LinkIcon className="w-3 h-3" /> Blockchain Data
                  </button>
                  <button
                    onClick={() => addToCart({
                      id: `resale-${item.id}`,
                      name: item.name,
                      price: item.suggestedPrice,
                      image: item.image,
                      isResale: true,
                      size: "One Size" // Resale usually has a fixed size
                    })}
                    disabled={!item.ownershipVerified}
                    className={`w-full py-2 rounded text-[10px] font-semibold flex items-center justify-center gap-1 ${item.ownershipVerified
                        ? "btn-primary-gradient"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                      }`}
                  >
                    <ShoppingBag className="w-3 h-3" /> Buy Now
                  </button>
                </div>
                <AnimatePresence>
                  {showBlockchain === item.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 p-3 bg-muted/30 rounded-lg">
                      <p className="text-[10px] text-muted-foreground">TX Hash: {item.blockchainHash}</p>
                      <p className="text-[10px] text-accent mt-1">Ownership Verified on Ethereum</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResalePage;
