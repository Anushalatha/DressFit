import { motion } from "framer-motion";
import {
  User, Sparkles, Heart, Leaf, LinkIcon, BarChart3,
  TrendingUp, ShieldCheck, Cpu
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { dashboardStats, products } from "@/data/mockData";
import { useStore } from "@/store/useStore";

const CHART_COLORS = ["hsl(187,80%,55%)", "hsl(270,60%,55%)", "hsl(160,60%,45%)", "hsl(45,90%,55%)"];

const recommendations = [
  { productId: "3", reason: "Based on your sustainability preference", match: 94 },
  { productId: "2", reason: "Similar to your saved items", match: 89 },
  { productId: "6", reason: "Trending in your size", match: 86 },
];

const DashboardPage = () => {
  const { cart, addToCart } = useStore();
  const cartTotalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">
            Your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">AI-powered insights and personalized recommendations</p>
        </motion.div>

        {/* Profile + Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold">Alex Chen</p>
              <p className="text-xs text-muted-foreground">Eco-Conscious Shopper</p>
            </div>
          </motion.div>
          {[
            { icon: Heart, label: "Saved Outfits", value: dashboardStats.savedOutfits, color: "text-secondary" },
            { icon: LinkIcon, label: "Cart Value", value: `$${cartTotalAmount}`, color: "text-primary" },
            { icon: Leaf, label: "CO₂ Saved (kg)", value: dashboardStats.carbonSaved, color: "text-accent" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.1 }}
              className="glass-card p-6"
            >
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" /> Sustainability Impact
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dashboardStats.sustainabilityImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215,15%,55%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,15%,55%)" }} />
                <Tooltip contentStyle={{ background: "hsl(240,12%,8%)", border: "1px solid hsl(240,10%,16%)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="score" stroke="hsl(160,60%,45%)" strokeWidth={2} dot={{ fill: "hsl(160,60%,45%)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Resale Market Growth
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dashboardStats.resaleGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,16%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215,15%,55%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,15%,55%)" }} />
                <Tooltip contentStyle={{ background: "hsl(240,12%,8%)", border: "1px solid hsl(240,10%,16%)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="volume" fill="hsl(187,80%,55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-secondary" /> AI Accuracy Metrics
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dashboardStats.aiAccuracy}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dashboardStats.aiAccuracy.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(240,12%,8%)", border: "1px solid hsl(240,10%,16%)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {dashboardStats.aiAccuracy.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5 text-[10px]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                  <span className="text-muted-foreground">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recommendations + Blockchain History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> AI Recommendations
            </h3>
            <div className="space-y-3">
              {recommendations.map((r) => {
                const product = products.find(p => p.id === r.productId);
                if (!product) return null;
                return (
                  <div key={r.productId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{r.reason}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xs font-display font-bold text-primary">{r.match}% Match</span>
                      <button
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          size: product.sizes[0]
                        })}
                        className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded hover:bg-primary/30 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" /> Blockchain History
            </h3>
            <div className="space-y-3">
              {[
                { action: "Item Authenticated", hash: "0x7a3f...8b2e", time: "2 hours ago" },
                { action: "Ownership Transferred", hash: "0x4c1d...9e7f", time: "1 day ago" },
                { action: "Sustainability Verified", hash: "0x9b2a...3c4d", time: "3 days ago" },
              ].map((tx) => (
                <div key={tx.hash} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold">{tx.action}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{tx.hash}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{tx.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Styling Tips */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6 mt-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" /> AI Styling Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Pair your organic cotton blazer with recycled denim for a sustainable chic look.",
              "Your body type pairs well with structured shoulders — try hemp linen shirts.",
              "Based on your color palette, earth tones with pops of teal create the best outfits.",
            ].map((tip, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground flex items-start gap-2">
                <div className="glow-dot mt-1.5 shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
