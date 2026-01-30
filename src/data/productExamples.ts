/**
 * Product data structure and examples for e-commerce integration
 */

export interface ProductVariant {
  id: string;
  material: string;
  color: string;
  price: number;
  assetPath?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  type: "ring" | "necklace" | "bracelet" | "earring";
  category: string;
  price: number;
  compareAtPrice?: number; // Original price for sales
  material: string;
  weight?: string; // e.g., "3.5g"
  dimensions?: string; // e.g., "18mm diameter"
  assetPath?: string; // Path to 3D model
  anchorPoint?: string; // Anchor for 3D try-on
  images: string[];
  thumbnail: string;
  inStock: boolean;
  stockQuantity?: number;
  sku: string;
  tags: string[];
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Example product catalog
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "ring-classic-gold-001",
    name: "Classic Gold Wedding Band",
    description:
      "Timeless 18K yellow gold wedding band with comfort fit interior. Perfect for everyday wear with a polished finish that catches the light beautifully.",
    type: "ring",
    category: "Wedding Rings",
    price: 599,
    compareAtPrice: 699,
    material: "18K Yellow Gold",
    weight: "4.2g",
    dimensions: "2mm width",
    assetPath: "/models/ring/classic-gold.glb",
    anchorPoint: "anchor_ring_middle",
    images: [
      "/images/products/ring-gold-1.jpg",
      "/images/products/ring-gold-2.jpg",
      "/images/products/ring-gold-3.jpg",
    ],
    thumbnail: "/images/products/ring-gold-thumb.jpg",
    inStock: true,
    stockQuantity: 15,
    sku: "RNG-CLS-GLD-001",
    tags: ["wedding", "gold", "classic", "bestseller"],
    rating: 4.8,
    reviewCount: 124,
    variants: [
      {
        id: "var-001",
        material: "14K Yellow Gold",
        color: "Gold",
        price: 499,
        assetPath: "/models/ring/classic-gold-14k.glb",
      },
      {
        id: "var-002",
        material: "Platinum",
        color: "White",
        price: 899,
        assetPath: "/models/ring/classic-platinum.glb",
      },
    ],
  },
  {
    id: "necklace-diamond-pendant-001",
    name: "Solitaire Diamond Pendant",
    description:
      "Stunning 0.50ct round brilliant diamond pendant set in 14K white gold. Features a delicate cable chain and secure lobster clasp.",
    type: "necklace",
    category: "Necklaces",
    price: 1299,
    material: "14K White Gold, Diamond",
    weight: "2.1g",
    dimensions: '16-18" adjustable chain',
    assetPath: "/models/necklace/diamond-pendant.glb",
    anchorPoint: "anchor_necklace",
    images: [
      "/images/products/necklace-diamond-1.jpg",
      "/images/products/necklace-diamond-2.jpg",
    ],
    thumbnail: "/images/products/necklace-diamond-thumb.jpg",
    inStock: true,
    stockQuantity: 8,
    sku: "NCK-DIA-PND-001",
    tags: ["diamond", "necklace", "pendant", "elegant"],
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "bracelet-tennis-001",
    name: "Classic Tennis Bracelet",
    description:
      "Elegant tennis bracelet featuring 2.5 carats of round diamonds set in 14K white gold. A timeless piece for any occasion.",
    type: "bracelet",
    category: "Bracelets",
    price: 2499,
    material: "14K White Gold, Diamonds",
    weight: "8.5g",
    dimensions: '7" length',
    assetPath: "/models/bracelet/tennis.glb",
    anchorPoint: "bracelet_wrist",
    images: [
      "/images/products/bracelet-tennis-1.jpg",
      "/images/products/bracelet-tennis-2.jpg",
    ],
    thumbnail: "/images/products/bracelet-tennis-thumb.jpg",
    inStock: true,
    stockQuantity: 5,
    sku: "BRC-TNS-001",
    tags: ["diamond", "bracelet", "tennis", "luxury"],
    rating: 5.0,
    reviewCount: 43,
  },
];

/**
 * E-commerce Integration Example: Shopify
 */
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: Array<{
    id: string;
    title: string;
    price: string;
    sku: string;
    inventory_quantity: number;
  }>;
  images: Array<{
    src: string;
    alt: string;
  }>;
  metafields?: Array<{
    key: string;
    value: string;
    namespace: string;
  }>;
}

/**
 * Convert Shopify product to internal format
 */
export function convertShopifyProduct(shopifyProduct: ShopifyProduct): Product {
  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    description: shopifyProduct.body_html,
    type: shopifyProduct.product_type.toLowerCase() as any,
    category: shopifyProduct.product_type,
    price: parseFloat(shopifyProduct.variants[0].price),
    material: shopifyProduct.vendor,
    assetPath: shopifyProduct.metafields?.find((m) => m.key === "model_path")
      ?.value,
    anchorPoint: shopifyProduct.metafields?.find(
      (m) => m.key === "anchor_point",
    )?.value,
    images: shopifyProduct.images.map((img) => img.src),
    thumbnail: shopifyProduct.images[0]?.src,
    inStock: shopifyProduct.variants[0].inventory_quantity > 0,
    stockQuantity: shopifyProduct.variants[0].inventory_quantity,
    sku: shopifyProduct.variants[0].sku,
    tags: shopifyProduct.tags,
  };
}

/**
 * Filter products by type
 */
export function filterByType(
  products: Product[],
  type: Product["type"],
): Product[] {
  return products.filter((p) => p.type === type);
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(
  products: Product[],
  minPrice: number,
  maxPrice: number,
): Product[] {
  return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
}

/**
 * Filter products by material
 */
export function filterByMaterial(
  products: Product[],
  material: string,
): Product[] {
  return products.filter((p) =>
    p.material.toLowerCase().includes(material.toLowerCase()),
  );
}

/**
 * Sort products
 */
export type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest"
  | "popular";

export function sortProducts(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "newest":
      return sorted.sort(
        (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0),
      );
    case "popular":
      return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    default:
      return sorted;
  }
}

/**
 * Search products by query
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}

/**
 * Get related products
 */
export function getRelatedProducts(
  products: Product[],
  currentProduct: Product,
  limit: number = 4,
): Product[] {
  return products
    .filter((p) => p.id !== currentProduct.id)
    .filter(
      (p) =>
        p.type === currentProduct.type ||
        p.tags.some((tag) => currentProduct.tags.includes(tag)),
    )
    .slice(0, limit);
}
