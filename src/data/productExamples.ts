/**
 * Product Data Management Module
 * 
 * Provides comprehensive data structures and utilities for managing jewellery
 * products in an e-commerce environment. Includes filtering, sorting, searching,
 * and integration helpers for platforms like Shopify.
 * 
 * @module productExamples
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Product variant (e.g., different materials or sizes of the same design)
 */
  id: string;
  material: string;
  color: string;
  price: number;
  assetPath?: string;
}

/**
 * Main product data structure
 * 
 * Comprehensive product information including metadata, pricing,
 * inventory, 3D assets, and e-commerce integration fields.
 */
export interface Product {
  // ========== CORE IDENTIFIERS ==========
  id: string;                    // Unique product ID
  sku: string;                   // Stock keeping unit
  
  // ========== BASIC INFO ==========
  name: string;                  // Product display name
  description: string;           // Full product description (HTML/markdown supported)
  type: "ring" | "necklace" | "bracelet" | "earring"; // Jewellery type
  category: string;              // Category (e.g., "Wedding Rings")
  tags: string[];                // Searchable tags
  
  // ========== PRICING ==========
  price: number;                 // Current price
  compareAtPrice?: number;       // Original price (for sales/discounts)
  
  // ========== MATERIALS & SPECS ==========
  material: string;              // Material description (e.g., "18K Gold")
  weight?: string;               // Physical weight (e.g., "3.5g")
  dimensions?: string;           // Size info (e.g., "18mm diameter")
  
  // ========== 3D ASSETS ==========
  assetPath?: string;            // Path to 3D GLB/glTF model
  anchorPoint?: string;          // Anchor name for try-on placement
  
  // ========== MEDIA ==========
  images: string[];              // Array of image URLs
  thumbnail: string;             // Thumbnail image URL
  
  // ========== INVENTORY ==========
  inStock: boolean;              // Availability status
  stockQuantity?: number;        // Available quantity
  
  // ========== VARIANTS ==========
  variants?: ProductVariant[];   // Product variations
  
  // ========== SOCIAL PROOF ==========
  rating?: number;               // Average rating (0-5)
  reviewCount?: number;          // Number of reviews
  
  // ========== TIMESTAMPS ==========
  createdAt?: Date;              // Creation date
  updatedAt?: Date;              // Last update date
}

// ============================================================================
// SAMPLE PRODUCT CATALOG
// ============================================================================

/**
 * Example product catalog demonstrating the full data structure
 * 
 * Use these as templates for your actual product data.
 * In production, this data would typically come from:
 * - Database (PostgreSQL, MongoDB, etc.)
 * - E-commerce platform API (Shopify, WooCommerce)
 * - Headless CMS (Contentful, Sanity)
 * - Custom API endpoint
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

// ============================================================================
// E-COMMERCE PLATFORM INTEGRATION
// ============================================================================

/**
 * Shopify product structure
 * 
 * This interface matches Shopify's REST Admin API product format.
 * Use for integrating with Shopify stores.
 * 
 * @see https://shopify.dev/docs/api/admin-rest/2024-01/resources/product
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

// ============================================================================
// PRODUCT FILTERING & SEARCH UTILITIES
// ============================================================================

/**
 * Filter products by jewellery type
 * 
 * @param products - Array of products to filter
 * @param type - Jewellery type to filter by
 * @returns Filtered product array
 */
export function filterByType(
  products: Product[],
  type: Product["type"],
): Product[] {
  return products.filter((p) => p.type === type);
}

/**
 * Filter products by price range
 * 
 * @param products - Array of products to filter
 * @param minPrice - Minimum price (inclusive)
 * @param maxPrice - Maximum price (inclusive)
 * @returns Filtered product array
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
 * 
 * Performs case-insensitive partial matching on material field.
 * 
 * @param products - Array of products to filter
 * @param material - Material to search for (e.g., "gold", "silver")
 * @returns Filtered product array
 */
export function filterByMaterial(
  products: Product[],
  material: string,
): Product[] {
  return products.filter((p) =>
    p.material.toLowerCase().includes(material.toLowerCase()),
  );
}

// ============================================================================
// PRODUCT SORTING
// ============================================================================

/** Available sorting options */
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
 * Search products by text query
 * 
 * Searches across product name, description, and tags.
 * Case-insensitive fuzzy matching.
 * 
 * @param products - Array of products to search
 * @param query - Search query string
 * @returns Matching products
 * 
 * @example
 * ```typescript
 * const results = searchProducts(SAMPLE_PRODUCTS, 'gold ring');
 * ```
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
 * Get related/recommended products
 * 
 * Finds products similar to the current one based on:
 * - Same jewellery type
 * - Shared tags
 * 
 * Useful for "You may also like" sections.
 * 
 * @param products - Full product catalog
 * @param currentProduct - Product to find related items for
 * @param limit - Maximum number of related products to return
 * @returns Array of related products
 * 
 * @example
 * ```typescript
 * const related = getRelatedProducts(
 *   SAMPLE_PRODUCTS,
 *   selectedProduct,
 *   4
 * );
 * ```
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
