import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Upload, Loader2, AlertTriangle, CheckCircle2, Link as LinkIcon, DollarSign, ShoppingBag, Wallet, FileCheck } from "lucide-react";
import { resaleItems } from "@/data/mockData";
import { resaleAuthBackend, KycResponse, VerificationStatusResponse } from "@/services/resaleAuthBackend";
import { useStore } from "@/store/useStore";
import MiniGarmentViewer from "../components/VirtualTryOn/MiniGarmentViewer";

const ResalePage = () => {
  const [kycStatus, setKycStatus] = useState<KycResponse | null>(null);
  const [isVerifyingKyc, setIsVerifyingKyc] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisMsg, setAnalysisMsg] = useState("");
  const [uploadResult, setUploadResult] = useState<VerificationStatusResponse | null>(null);
  const [uploadedPreviews, setUploadedPreviews] = useState<string[]>([]);
  const [listingStatus, setListingStatus] = useState<'idle' | 'listing' | 'success'>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);

  const [showBlockchain, setShowBlockchain] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addToCart } = useStore();

  const resaleIdToGarmentId: Record<string, string> = {
    "r1": "dress02",
    "r2": "dress03",
    "r3": "dress02",
    "r4": "dress02",
  };

  const handleWalletConnect = async () => {
    setIsVerifyingKyc(true);
    // Simulate wallet connection and KYC request
    const response = await resaleAuthBackend.verifySellerKyc("user_123", "0xABCD...1234");
    setKycStatus(response);
    setIsVerifyingKyc(false);
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const analyzeFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setAnalyzing(true);
    setUploadResult(null);
    setListingStatus('idle');
    setTxHash(null);
    
    // create previews
    const previews: string[] = [];
    for (const f of Array.from(files)) {
      previews.push(URL.createObjectURL(f));
    }
    setUploadedPreviews(previews);

    setAnalysisMsg("Initiating Authentication Protocol...");
    const verifyRes = await resaleAuthBackend.verifyItem("item_test", "qr_hash_xyz");

    setAnalysisMsg("Running AI Computer Vision (ResNet) on fibers...");
    await new Promise(r => setTimeout(r, 1000));
    
    setAnalysisMsg("Checking for duplicates and image manipulation...");
    await new Promise(r => setTimeout(r, 1000));

    setAnalysisMsg("Validating details against Ground Truth...");
    const statusRes = await resaleAuthBackend.checkItemVerificationStatus(verifyRes.verificationId);
    
    setUploadResult(statusRes);
    setAnalyzing(false);
  };

  const handleListOnBlockchain = async () => {
    if (!uploadResult) return;
    setListingStatus('listing');
    const res = await resaleAuthBackend.listItemOnBlockchain("item_test", "v_id", uploadResult.suggestedPrice);
    setTxHash(res.txHash);
    setListingStatus('success');
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-3">
            Secure Web3 <span className="gradient-text">Resale</span>
          </h1>
          <p className="text-muted-foreground">Authenticate and resell fashion items with AI verification and Blockchain proof</p>
        </motion.div>

        {/* Auth & Upload Section */}
        <div className="max-w-2xl mx-auto mb-16 space-y-6">
          
          {/* KYC Step */}
          {!kycStatus ? (
             <div className="glass-card p-8 text-center border border-primary/20 bg-primary/5">
                <Wallet className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl mb-2">Connect Wallet & Verify Seller Identity</h3>
                <p className="text-sm text-muted-foreground mb-6">In order to list items for resale, our smart contracts require verified seller KYC to combat counterfeit fraud.</p>
                <button 
                  onClick={handleWalletConnect}
                  disabled={isVerifyingKyc}
                  className="btn-primary-gradient px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 mx-auto"
                >
                  {isVerifyingKyc ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying Identity...</> : 'Connect MetaMask & Verify'}
                </button>
             </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-4 border border-accent/20 bg-accent/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-display font-semibold">Seller Verified</p>
                  <p className="text-xs text-muted-foreground">0xABCD...1234 • Trust Score: {kycStatus.trustScore}/100</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded bg-accent/20 text-accent text-xs font-semibold">
                KYC Level 2
              </div>
            </motion.div>
          )}

          {/* Upload Verification */}
          {kycStatus && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> AI Smart Authentication
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
                <Upload className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm font-medium">Upload Item Close-ups</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Required: Front view, Manufacturer Logo, Fabric Tag</p>
              </div>

              {uploadedPreviews.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Captured Evidences</h4>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {uploadedPreviews.map((p, idx) => (
                      <img key={p} src={p} alt={`upload-${idx}`} className="w-24 h-24 object-cover rounded-md border border-border" />
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {analyzing && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-sm font-medium text-primary ai-pulse">{analysisMsg}</p>
                    <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/80 animate-pulse w-3/4"></div>
                    </div>
                  </motion.div>
                )}
                {uploadResult && !analyzing && (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card p-4 flex flex-col justify-center items-center">
                        <FileCheck className="w-6 h-6 text-accent mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Authenticity Score</p>
                        <p className="font-display text-3xl font-bold text-primary">{(uploadResult.confidenceScore * 100).toFixed(1)}%</p>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Fabric Condition</p>
                        <p className="font-display text-xl font-bold mb-2">Good Form</p>
                        <p className="text-xs text-muted-foreground">{uploadResult.fabricWearPercent}% Wear Detected</p>
                      </div>
                      <div className="glass-card p-4 text-center col-span-2">
                        <p className="text-xs text-muted-foreground mb-1">Market Estimated Value</p>
                        <p className="font-display text-2xl font-bold gradient-text">${uploadResult.suggestedPrice}</p>
                      </div>
                    </div>

                    {/* Listing Action */}
                    {uploadResult.confidenceScore >= 0.95 ? (
                      <div className="p-4 bg-muted/30 rounded-xl border border-border">
                        <p className="text-sm mb-3">Item passed authenticity checks and is ready to list on the blockchain.</p>
                        {listingStatus === 'success' ? (
                           <div className="flex flex-col items-center p-3 bg-accent/10 border border-accent/20 rounded-lg">
                             <CheckCircle2 className="w-6 h-6 text-accent mb-1" />
                             <p className="text-sm font-bold text-accent">Successfully Listed</p>
                             <p className="text-xs text-muted-foreground mt-1 text-center">Tx Hash: {txHash}</p>
                           </div>
                        ) : (
                          <button 
                            onClick={handleListOnBlockchain}
                            disabled={listingStatus === 'listing'}
                            className="w-full btn-primary-gradient px-4 py-3 rounded-lg font-semibold flex flex-col items-center justify-center gap-1"
                          >
                            {listingStatus === 'listing' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'List to Smart Contract'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
                        <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-2" />
                        <p className="text-sm text-destructive font-semibold">Verification Failed</p>
                        <p className="text-xs text-destructive/80">Confidence score below 95%. Item flagged for manual review.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Marketplace Grid */}
        <h2 className="font-display text-2xl font-bold mb-8">Decentralized Resale Marketplace</h2>
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
                      <span className="text-[10px] text-accent">Verified On-Chain</span>
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
                    <LinkIcon className="w-3 h-3" /> Verify Record
                  </button>
                  <button
                    onClick={() => addToCart({
                      id: `resale-${item.id}`,
                      name: item.name,
                      price: item.suggestedPrice,
                      image: item.image,
                      isResale: true,
                      size: "One Size" 
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
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 p-3 bg-muted/30 rounded-lg overflow-hidden border border-border">
                      <p className="text-[10px] text-muted-foreground truncate" title={item.blockchainHash}>Tx: {item.blockchainHash}</p>
                      <p className="text-[10px] text-accent mt-2 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure Ethereum Transfer</p>
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
