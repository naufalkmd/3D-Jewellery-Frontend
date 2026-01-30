import { Scene, SceneLoader, TransformNode, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

/**
 * Load a glTF/GLB jewellery asset
 * @param scene - Babylon.js scene
 * @param assetPath - Path to the glTF/GLB file (e.g., '/models/jewellery/ring.glb')
 * @param anchorName - Name of the anchor to attach to (e.g., 'anchor_ring_middle')
 * @returns Promise with the loaded mesh container
 */
export async function loadJewelleryAsset(
  scene: Scene,
  assetPath: string,
  anchorName: string,
) {
  try {
    // Load the asset
    const result = await SceneLoader.ImportMeshAsync("", "", assetPath, scene);

    // Get the root mesh
    const rootMesh = result.meshes[0];

    // Find the anchor point
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
 * Create an anchor point at a specific position
 * @param name - Name of the anchor
 * @param position - Position in 3D space
 * @param scene - Babylon.js scene
 * @returns TransformNode anchor
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

/**
 * Product catalog structure for integration
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
 * Example product catalog
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

/**
 * Anchor positions for different body parts
 */
export const ANCHOR_POSITIONS = {
  // Hand anchors
  ring_thumb: new Vector3(-0.4, 0.2, 0.65),
  ring_index: new Vector3(-0.25, 0.2, 0.95),
  ring_middle: new Vector3(0, 0.2, 1.0),
  ring_ring: new Vector3(0.25, 0.2, 0.95),
  ring_pinky: new Vector3(0.45, 0.2, 0.85),
  bracelet_wrist: new Vector3(0, 0.1, -0.6),

  // Neck anchors
  necklace_collarbone: new Vector3(0, 0.5, 0.3),
  necklace_chest: new Vector3(0, 0.2, 0.35),

  // Ear anchors
  earring_left: new Vector3(-0.35, 1.5, 0),
  earring_right: new Vector3(0.35, 1.5, 0),
};
