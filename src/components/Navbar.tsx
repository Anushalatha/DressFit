import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ShoppingBag, Trash2, Plus, Minus, Heart, User } from "lucide-react";
import { useStore } from "../store/useStore";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/try-on", label: "Virtual Try-On" },
  { path: "/sustainability", label: "Sustainability" },
  { path: "/resale", label: "Resale" },
  { path: "/dashboard", label: "Dashboard" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { cart, removeFromCart, updateQuantity, cartTotal, wishlist, removeFromWishlist } = useStore();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg gradient-text">Dressfit</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label="Open wishlist"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              aria-label="Open profile"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border rounded-none"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist Slide-Over */}
      <AnimatePresence>
        {wishlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-card border-l border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" /> Wishlist
                </h2>
                <button
                  onClick={() => setWishlistOpen(false)}
                  aria-label="Close wishlist"
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Heart className="w-12 h-12 mb-4 opacity-20" />
                    <p>Your wishlist is empty.</p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-muted/30 p-3 rounded-xl border border-border/50">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md" />
                      )}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-sm line-clamp-1">{item.name || "Product"}</p>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.price != null && (
                          <p className="font-display font-bold text-primary mt-auto">${item.price}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Slide-Over */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-card border-l border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" /> Your Cart
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-muted/30 p-3 rounded-xl border border-border/50">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md" />
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                            {item.size && <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>}
                            {item.isResale && <span className="text-[10px] px-1.5 py-0.5 bg-secondary/20 text-secondary rounded mt-1 inline-block">Resale</span>}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            aria-label="Remove from cart"
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <p className="font-display font-bold text-primary">${item.price}</p>
                          <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded text-primary"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-display font-bold text-xl gradient-text">${cartTotal().toLocaleString()}</span>
                  </div>
                  <button className="w-full btn-primary-gradient py-3 rounded-xl font-semibold shadow-lg shadow-primary/25">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {profileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Profile
                  </h2>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="font-semibold">Jane Doe</p>
                  <button className="w-full btn-glass py-2 rounded-lg">Order History</button>
                  <button className="w-full btn-glass py-2 rounded-lg">Settings</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
