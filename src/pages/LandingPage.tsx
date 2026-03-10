import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, ShieldCheck, Recycle, BarChart3, Cpu, Layers,
  ArrowRight, Leaf, TrendingDown, CheckCircle2, ShoppingBag, Heart
} from "lucide-react";
import { products } from "@/data/mockData";
import { useStore } from "@/store/useStore";

const features = [
  { icon: Sparkles, title: "AI Virtual Try-On", desc: "Try clothes virtually with GAN-powered avatars and get real-time fit confidence scores.", color: "text-primary" },
  { icon: Recycle, title: "Sustainability Ranking", desc: "AI-driven ethical scoring for carbon footprint, labor practices, and circular economy.", color: "text-accent" },
  { icon: ShieldCheck, title: "Smart Resale Auth", desc: "CNN-based fabric analysis and blockchain verification for authentic resale.", color: "text-secondary" },
  { icon: BarChart3, title: "Ethical Score", desc: "Transparent supply chain scoring powered by NLP and real-time data analysis.", color: "text-primary" },
];

const stats = [
  { value: "92M", unit: "tons", label: "Textile Waste Reduced", icon: TrendingDown },
  { value: "40%", unit: "", label: "Return Reduction", icon: CheckCircle2 },
  { value: "85%", unit: "", label: "Authentication Accuracy", icon: ShieldCheck },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LandingPage = () => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl float-animation" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/8 rounded-full blur-3xl float-animation" style={{ animationDelay: "4s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Powered by GANs + CNNs + NLP</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Shop the <span className="gradient-text-hero">Luxury Collection</span> of AI‑Enhanced Fashion
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Browse our curated 3D garments, try them on virtually, and discover sustainable luxury powered by AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/try-on" className="btn-primary-gradient flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sustainability" className="btn-glass flex items-center gap-2">
                <Leaf className="w-4 h-4 text-accent" /> Sustainable Edit
              </Link>
              <Link to="/resale" className="btn-glass flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary" /> Resale Vault
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              AI-Powered <span className="gradient-text">Fashion Intelligence</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our research-backed framework combines multiple AI agents to transform every aspect of your fashion experience.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                className="glass-card-hover p-6"
              >
                <f.icon className={`w-10 h-10 ${f.color} mb-4`} />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={item} className="glass-card p-8 text-center">
                <s.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="font-display text-4xl font-bold gradient-text mb-1">
                  {s.value}<span className="text-lg text-muted-foreground ml-1">{s.unit}</span>
                </div>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                Featured <span className="gradient-text-accent">Collections</span>
              </h2>
              <p className="text-muted-foreground">Explore our top 3D model apparel galleries.</p>
            </motion.div>
            <Link to="/sustainability" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover overflow-hidden flex flex-col relative"
              >
                <button
                  type="button"
                  aria-label={isInWishlist(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => {
                    if (isInWishlist(p.id)) {
                      removeFromWishlist(p.id);
                    } else {
                      addToWishlist({ id: p.id, name: p.name, price: p.price, image: p.image });
                    }
                  }}
                  className="absolute top-2 right-2 p-1 bg-background/70 rounded-full hover:bg-background transition-colors z-10"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(p.id) ? 'text-accent' : 'text-muted-foreground'}`} />
                </button>
                <div className="aspect-[4/3] relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 glass-card px-3 py-1.5 rounded-full">
                    <span className="font-display font-bold text-sm text-accent">
                      {p.sustainabilityScore}/100
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground mb-1">{p.brand}</p>
                  <h3 className="font-display font-semibold mb-3">{p.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 border border-border rounded-full text-[10px] text-muted-foreground bg-muted/50">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-display font-bold text-lg">${p.price}</span>
                    <button
                      onClick={() => addToCart({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                        size: p.sizes[0]
                      })}
                      className="btn-primary-gradient py-1.5 px-4 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
             <Link to="/sustainability" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Research Badge */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-8 inline-block">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Layers className="w-5 h-5 text-secondary" />
              <span className="font-display font-semibold text-sm gradient-text">Published AI Framework</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Based on the research paper: "AI-Driven Personalized Fashion: Virtual Try-On, Smart Resale Authentication, and Sustainability Ranking"
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-display text-sm font-semibold gradient-text">AI-Driven Personalized Fashion</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cpu className="w-3 h-3" />
            Powered by GANs + CNNs + NLP
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
