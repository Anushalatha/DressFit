// Mock data for AI Fashion Platform

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  sustainabilityScore: number;
  carbonFootprint: number;
  ethicalLabor: boolean;
  circularRating: number;
  material: string[];
  tags: string[];
  sizes: string[];
}

export interface ResaleItem {
  id: string;
  name: string;
  originalPrice: number;
  suggestedPrice: number;
  image: string;
  authenticityScore: number;
  fabricWear: number;
  damageDetected: boolean;
  blockchainHash: string;
  ownershipVerified: boolean;
}

export interface DashboardStats {
  sustainabilityImpact: { month: string; score: number }[];
  resaleGrowth: { month: string; volume: number; revenue: number }[];
  aiAccuracy: { name: string; value: number }[];
  savedOutfits: number;
  totalTransactions: number;
  carbonSaved: number;
}

export const products: Product[] = [
  { id: "1", name: "Organic Cotton Blazer", brand: "EcoLux", price: 289, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop", category: "Outerwear", sustainabilityScore: 92, carbonFootprint: 3.2, ethicalLabor: true, circularRating: 88, material: ["Organic Cotton", "Recycled Polyester"], tags: ["eco-friendly", "recycled"], sizes: ["S", "M", "L", "XL"] },
  { id: "2", name: "Recycled Denim Jacket", brand: "ReNew", price: 195, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop", category: "Outerwear", sustainabilityScore: 87, carbonFootprint: 4.1, ethicalLabor: true, circularRating: 91, material: ["Recycled Denim"], tags: ["recycled", "eco-friendly"], sizes: ["M", "L", "XL"] },
  { id: "3", name: "Hemp Linen Shirt", brand: "Verdant", price: 125, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop", category: "Tops", sustainabilityScore: 95, carbonFootprint: 1.8, ethicalLabor: true, circularRating: 85, material: ["Hemp", "Linen"], tags: ["vegan", "eco-friendly"], sizes: ["S", "M", "L"] },
  { id: "4", name: "Bamboo Silk Dress", brand: "Aura", price: 340, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 78, carbonFootprint: 5.5, ethicalLabor: true, circularRating: 72, material: ["Bamboo Silk"], tags: ["vegan"], sizes: ["XS", "S", "M", "L"] },
  { id: "5", name: "Vegan Leather Boots", brand: "PurePath", price: 220, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=500&fit=crop", category: "Footwear", sustainabilityScore: 83, carbonFootprint: 6.2, ethicalLabor: true, circularRating: 79, material: ["Vegan Leather", "Recycled Rubber"], tags: ["vegan", "recycled"], sizes: ["US 7", "US 8", "US 9", "US 10"] },
  { id: "6", name: "Tencel Joggers", brand: "FlowFit", price: 98, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop", category: "Bottoms", sustainabilityScore: 89, carbonFootprint: 2.9, ethicalLabor: true, circularRating: 86, material: ["Tencel", "Organic Cotton"], tags: ["eco-friendly"], sizes: ["S", "M", "L", "XL"] },
  { id: "101", name: "Floral Summer Dress", brand: "EcoLux", price: 189, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 92, carbonFootprint: 3.2, ethicalLabor: true, circularRating: 88, material: ["Organic Cotton"], tags: ["eco-friendly"], sizes: ["S", "M", "L", "XL"] },
  { id: "102", name: "Evening Elegant Dress", brand: "Aura", price: 295, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 85, carbonFootprint: 4.1, ethicalLabor: true, circularRating: 82, material: ["Recycled Polyester"], tags: ["recycled"], sizes: ["S", "M", "L"] },
  { id: "103", name: "Polka Dot Vintage", brand: "RetroFit", price: 155, image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 88, carbonFootprint: 3.5, ethicalLabor: true, circularRating: 85, material: ["Tencel", "Recycled Cotton"], tags: ["eco-friendly", "vegan"], sizes: ["XS", "S", "M", "L"] },
  { id: "104", name: "Emerald Satin Gown", brand: "Lumiere", price: 420, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 76, carbonFootprint: 6.1, ethicalLabor: true, circularRating: 70, material: ["Silk", "Viscose"], tags: [], sizes: ["S", "M", "L"] },
  { id: "105", name: "Linen Wrap Dress", brand: "Verdant", price: 210, image: "https://images.unsplash.com/photo-1515347619362-75fe3f69af00?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 94, carbonFootprint: 2.1, ethicalLabor: true, circularRating: 92, material: ["100% Linen"], tags: ["vegan", "eco-friendly"], sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "106", name: "Essential White T-Shirt", brand: "Basics", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop", category: "Tops", sustainabilityScore: 88, carbonFootprint: 1.5, ethicalLabor: true, circularRating: 90, material: ["Organic Cotton"], tags: ["eco-friendly", "basic"], sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "107", name: "Midnight Black Tee", brand: "Basics", price: 45, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop", category: "Tops", sustainabilityScore: 88, carbonFootprint: 1.5, ethicalLabor: true, circularRating: 90, material: ["Organic Cotton"], tags: ["eco-friendly", "basic"], sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "108", name: "Crimson Royal Gown", brand: "Lumiere", price: 550, image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 78, carbonFootprint: 5.8, ethicalLabor: true, circularRating: 75, material: ["Silk", "Satin"], tags: [], sizes: ["S", "M", "L"] },
  { id: "109", name: "Midnight Velvet Gown", brand: "Lumiere", price: 650, image: "https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 82, carbonFootprint: 4.5, ethicalLabor: true, circularRating: 80, material: ["Velvet", "Silk"], tags: ["luxury"], sizes: ["S", "M", "L"] },
  { id: "110", name: "Pearl Beaded Gown", brand: "Verdant", price: 720, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 85, carbonFootprint: 3.8, ethicalLabor: true, circularRating: 82, material: ["Silk", "Recycled Beads"], tags: ["eco-friendly", "luxury"], sizes: ["S", "M", "L"] },
  { id: "111", name: "Ocean Breeze Chiffon Gown", brand: "RetroFit", price: 480, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop", category: "Dresses", sustainabilityScore: 89, carbonFootprint: 2.9, ethicalLabor: true, circularRating: 88, material: ["Recycled Chiffon"], tags: ["eco-friendly"], sizes: ["S", "M", "L"] },
];

export const resaleItems: ResaleItem[] = [
  { id: "r1", name: "Vintage Chanel Tweed Dress", originalPrice: 2400, suggestedPrice: 1680, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop", authenticityScore: 97, fabricWear: 12, damageDetected: false, blockchainHash: "0x7a3f...8b2e", ownershipVerified: true },
  { id: "r2", name: "Pre-Owned Dior Evening Gown", originalPrice: 3800, suggestedPrice: 1990, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=500&fit=crop", authenticityScore: 94, fabricWear: 18, damageDetected: false, blockchainHash: "0x4c1d...9e7f", ownershipVerified: true },
  { id: "r3", name: "Designer Floral Sundress", originalPrice: 450, suggestedPrice: 315, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop", authenticityScore: 89, fabricWear: 8, damageDetected: false, blockchainHash: "0x9b2a...3c4d", ownershipVerified: true },
  { id: "r4", name: "Stella McCartney Crepe Dress", originalPrice: 890, suggestedPrice: 534, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop", authenticityScore: 92, fabricWear: 22, damageDetected: true, blockchainHash: "0x1f8e...5a6b", ownershipVerified: false },
];

export const dashboardStats: DashboardStats = {
  sustainabilityImpact: [
    { month: "Jan", score: 62 }, { month: "Feb", score: 68 }, { month: "Mar", score: 71 },
    { month: "Apr", score: 75 }, { month: "May", score: 79 }, { month: "Jun", score: 84 },
    { month: "Jul", score: 87 }, { month: "Aug", score: 89 }, { month: "Sep", score: 91 },
  ],
  resaleGrowth: [
    { month: "Jan", volume: 120, revenue: 18400 }, { month: "Feb", volume: 145, revenue: 22100 },
    { month: "Mar", volume: 189, revenue: 28900 }, { month: "Apr", volume: 210, revenue: 31500 },
    { month: "May", volume: 267, revenue: 40200 }, { month: "Jun", volume: 312, revenue: 48700 },
  ],
  aiAccuracy: [
    { name: "Authentication", value: 97 }, { name: "Try-On Fit", value: 89 },
    { name: "Quality Check", value: 94 }, { name: "Sustainability", value: 91 },
  ],
  savedOutfits: 24,
  totalTransactions: 156,
  carbonSaved: 842,
};
