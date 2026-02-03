/**
 * Jewellery Asset Loader Module
 *
 * Provides utilities for loading and managing 3D jewellery assets in Babylon.js.
 * This module handles GLB/glTF model loading, anchor point creation, and
 * product catalog structures for e-commerce integration.
 *
 * @module JewelleryAssetLoader
 */

import { Scene, SceneLoader, TransformNode, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

// ============================================================================
// ASSET LOADING FUNCTIONS
// ============================================================================

/**
 * Load a glTF/GLB jewellery asset and attach to anchor point
 *
 * @param scene - Babylon.js scene where the asset will be loaded
 * @param assetPath - Full path to the glTF/GLB file (e.g., '/models/jewellery/ring.glb')
 * @param anchorName - Name of the anchor transform node to attach to (e.g., 'anchor_ring_middle')
 * @returns Promise resolving to the loaded mesh container with all meshes
 * @throws Error if asset fails to load
 *
 * @example
 * ```typescript
 * const result = await loadJewelleryAsset(
 *   scene,
 *   '/models/ring/diamond.glb',
 *   'anchor_ring_middle'
 * );
 * ```
 */
export async function loadJewelleryAsset(
  scene: Scene,
  assetPath: string,
  anchorName: string,
) {
  try {
    // Load the GLB/glTF asset using SceneLoader
    const result = await SceneLoader.ImportMeshAsync("", "", assetPath, scene);

    // Extract root mesh from loaded result
    const rootMesh = result.meshes[0];

    // Find the anchor point by name in the scene
    const anchor = scene.getTransformNodeByName(anchorName);

    if (anchor) {
      // Attach to anchor
      rootMesh.parent = anchor;
      rootMesh.position = Vector3.Zero();
    } else {
      console.warn(`Anchor "${anchorName}" not found in scene`);
    }

    return result;
  } catch (error) {
    console.error("Error loading jewellery asset:", error);
    throw error;
  }
}

/**
 * Create an anchor point (empty transform node) at a specific 3D position
 *
 * Anchors serve as attachment points for jewellery items on body models.
 * They maintain consistent positioning and allow easy parent-child relationships.
 *
 * @param name - Unique identifier for the anchor (e.g., 'anchor_ring_middle')
 * @param position - 3D position in world space
 * @param scene - Babylon.js scene where the anchor will be created
 * @returns TransformNode anchor that can be used as a parent for meshes
 *
 * @example
 * ```typescript
 * const anchor = createAnchor(
 *   'anchor_necklace',
 *   new Vector3(0, 1.5, 0),
 *   scene
 * );
 * ```
 */
export function createAnchor(
  name: string,
  position: Vector3,
  scene: Scene,
): TransformNode {
  const anchor = new TransformNode(name, scene);
  anchor.position = position;
  return anchor;
}

// ============================================================================
// PRODUCT DATA STRUCTURES
// ============================================================================

/**
 * Product catalog structure for e-commerce integration
 *
 * This interface defines the complete product data structure including
 * metadata, pricing, variants, and 3D asset information.
 */
export interface JewelleryProduct {
  id: string;
  name: string;
  description: string;
  type: "ring" | "necklace" | "bracelet" | "earring";
  price: number;
  material: "gold" | "silver" | "rose-gold" | "platinum";
  assetPath: string; // Path to glTF/GLB file
  anchorPoint: string; // Name of anchor to attach to
  thumbnail?: string;
  images?: string[];
  inStock?: boolean;
  variants?: {
    material: string;
    price: number;
    assetPath: string;
  }[];
}

/**
 * Example product catalog demonstrating the data structure
 *
 * Use this as a template for integrating with your e-commerce backend
 * (Shopify, WooCommerce, custom API, etc.)
 */
export const EXAMPLE_PRODUCTS: JewelleryProduct[] = [
  {
    id: "ring-001",
    name: "Classic Gold Band",
    description: "Elegant 18K gold wedding band with brushed finish",
    type: "ring",
    price: 599,
    material: "gold",
    assetPath: "/models/jewellery/ring-gold-band.glb",
    anchorPoint: "anchor_ring_middle",
    thumbnail: "/images/products/ring-001-thumb.jpg",
    inStock: true,
  },
  {
    id: "necklace-001",
    name: "Diamond Pendant Necklace",
    description: "Sterling silver chain with 0.5ct diamond pendant",
    type: "necklace",
    price: 1299,
    material: "silver",
    assetPath: "/models/jewellery/necklace-diamond.glb",
    anchorPoint: "anchor_necklace",
    thumbnail: "/images/products/necklace-001-thumb.jpg",
    inStock: true,
    variants: [
      {
        material: "white-gold",
        price: 1599,
        assetPath: "/models/jewellery/necklace-diamond-white-gold.glb",
      },
    ],
  },
];

// ============================================================================
// ANCHOR POSITION DEFINITIONS
// ============================================================================

/**
 * Predefined anchor positions for different body parts and jewellery types
 *
 * These positions are calibrated for the standard hand and neck models.
 * Adjust values based on your specific 3D models.
 *
 * Coordinate system:
 * - X: Left (-) to Right (+)
 * - Y: Down (-) to Up (+)
 * - Z: Back (-) to Front (+)
 */
export const ANCHOR_POSITIONS = {
  // ========== HAND & FINGER ANCHORS ==========
  // Positions for rings on each finger
  ring_thumb: new Vector3(-0.4, 0.2, 0.65),
  ring_index: new Vector3(-0.25, 0.2, 0.95),
  ring_middle: new Vector3(0, 0.2, 1.0),
  ring_ring: new Vector3(0.25, 0.2, 0.95),
  ring_pinky: new Vector3(0.45, 0.2, 0.85),

  // Position for wrist bracelet
  bracelet_wrist: new Vector3(0, 0.1, -0.6),

  // ========== NECK ANCHORS ==========
  // Positions for necklaces at different lengths
  necklace_collarbone: new Vector3(0, 0.5, 0.3),
  necklace_chest: new Vector3(0, 0.2, 0.35),

  // ========== EAR ANCHORS ==========
  // Positions for earrings
  earring_left: new Vector3(-0.35, 1.5, 0),
  earring_right: new Vector3(0.35, 1.5, 0),
};
