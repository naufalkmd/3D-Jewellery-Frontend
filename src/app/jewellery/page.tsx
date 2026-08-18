/**
 * 3D Jewellery Virtual Try-On Showroom
 *
 * This component provides an interactive 3D environment for trying on jewellery
 * using Babylon.js rendering engine with realistic PBR materials and lighting.
 *
 * Features:
 * - Real-time 3D rendering with Babylon.js
 * - Hand and neck model support for different jewellery types
 * - Cinematic split lighting setup
 * - PBR materials for realistic appearance
 * - Interactive camera controls (rotate, zoom)
 * - Dynamic jewellery loading and attachment
 */

"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Hand,
  Info,
  Loader2,
  MousePointer2,
  ShoppingBag,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
  PointLight,
  SpotLight,
  Vector3,
  MeshBuilder,
  PBRMetallicRoughnessMaterial,
  Color3,
  Color4,
  TransformNode,
  ShadowGenerator,
  Mesh,
  SceneLoader,
  ImageProcessingConfiguration,
  AbstractMesh,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/** Type of jewellery item */
type JewelleryType = "ring" | "necklace" | "bracelet";

/** Material finish options */
type MaterialType = "gold" | "silver" | "rose-gold";

/** 3D view mode (body part to display) */
type ViewMode = "hand" | "neck";

/** Product data structure */
interface Product {
  id: string;
  name: string;
  type: JewelleryType;
  price: number;
  material: MaterialType;
  image?: string;
}

// ============================================================================
// PRODUCT CATALOG
// ============================================================================

/** Sample product catalog for demonstration */
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Gold Band Ring",
    type: "ring",
    price: 299,
    material: "gold",
  },
  {
    id: "2",
    name: "Silver Diamond Ring",
    type: "ring",
    price: 499,
    material: "silver",
  },
  {
    id: "3",
    name: "Rose Gold Ring",
    type: "ring",
    price: 399,
    material: "rose-gold",
  },
  {
    id: "4",
    name: "Gold Chain Necklace",
    type: "necklace",
    price: 599,
    material: "gold",
  },
  {
    id: "5",
    name: "Silver Pendant",
    type: "necklace",
    price: 699,
    material: "silver",
  },
  {
    id: "6",
    name: "Gold Bracelet",
    type: "bracelet",
    price: 449,
    material: "gold",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * JewelleryShowroom Component
 *
 * Main component that renders the 3D showroom interface with product selection
 * and interactive 3D visualization.
 */
export default function JewelleryShowroom() {
  // ========== REFS ==========
  /** Reference to the HTML canvas element for Babylon.js rendering */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** Reference to the Babylon.js scene */
  const sceneRef = useRef<Scene | null>(null);

  /** Reference to the loaded hand model */
  const handModelRef = useRef<AbstractMesh | null>(null);

  // ========== STATE ==========
  /** Currently selected product from the catalog */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /** Current view mode (hand or neck) */
  const [viewMode, setViewMode] = useState<ViewMode>("hand");

  /** Currently displayed jewellery mesh in the scene */
  const [currentJewellery, setCurrentJewellery] = useState<Mesh | null>(null);

  /** Loading state for 3D models */
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // 3D SCENE INITIALIZATION
  // ============================================================================

  useEffect(() => {
    if (!canvasRef.current) return;

    // ========== ENGINE & SCENE SETUP ==========
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true, // Enable screenshot capability
      stencil: true, // Enable stencil buffer for advanced effects
    });
    const scene = new Scene(engine);
    sceneRef.current = scene;

    // Set pure black background for dramatic contrast
    scene.clearColor = new Color4(0, 0, 0, 1);

    // ========== CAMERA CONFIGURATION ==========
    // Arc rotate camera allows orbital movement around the model
    const camera = new ArcRotateCamera(
      "camera",
      2.6340167868659607, // Original alpha
      1.994395102393196, // Original beta
      3, // Original radius
      new Vector3(0, 1, 0), // Original target
      scene,
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 1.5; // Minimum zoom distance
    camera.upperRadiusLimit = 6; // Maximum zoom distance
    camera.wheelPrecision = 50; // Mouse wheel sensitivity

    // ========== CINEMATIC LIGHTING SETUP ==========
    // 5-light configuration for dramatic split lighting effect
    // This creates depth, dimension, and visual interest

    // KEY LIGHT 1 (LEFT SIDE)
    // Main directional light providing primary illumination
    const keyLight = new DirectionalLight(
      "keyLight",
      new Vector3(1.5, -10, 0),
      scene,
    );
    keyLight.position = new Vector3(-10, -3, -1.0);
    keyLight.intensity = 8.0;
    keyLight.diffuse = new Color3(1.0, 1.0, 1.0); // Red/Magenta

    // 2. Key Light 2 (Cyan/Blue) - RIGHT
    const keyLight2 = new DirectionalLight(
      "keyLight2",
      new Vector3(-1.5, 10, 0),
      scene,
    );
    keyLight2.position = new Vector3(10, 3, 1.0);
    keyLight2.intensity = 8.0;
    keyLight2.diffuse = new Color3(1.0, 1.0, 1.0); // Cyan/Blue

    // 3. Fill Light (Hemispheric)
    const fillLight = new HemisphericLight(
      "fillLight",
      new Vector3(0, 1, 0),
      scene,
    );
    fillLight.intensity = 0.1;
    fillLight.diffuse = new Color3(0.3, 0.3, 0.4);
    fillLight.groundColor = new Color3(0.1, 0.1, 0.15);

    // 4. Rim Light (Point Light) - DISABLED
    const rimLight = new PointLight("rimLight", new Vector3(-4, 3, -2), scene);
    rimLight.intensity = 0.0; // Disabled
    rimLight.diffuse = new Color3(0.98, 0.95, 0.92);

    // 5. Accent Light (Spot Light)
    const accentLight = new SpotLight(
      "accentLight",
      new Vector3(2, 3, 2),
      new Vector3(-0.5, -1, -0.5),
      Math.PI / 3,
      2,
      scene,
    );
    accentLight.intensity = 0.5;
    accentLight.diffuse = new Color3(1, 1, 1);

    // ========== SHADOW CONFIGURATION ==========
    // High-quality shadows for photorealistic rendering

    // Primary shadow generator (from key light 1)
    const shadowGenerator = new ShadowGenerator(4096, keyLight);
    shadowGenerator.usePercentageCloserFiltering = true;
    shadowGenerator.filteringQuality = ShadowGenerator.QUALITY_HIGH;
    shadowGenerator.darkness = 3.0; // Increased for more dramatic shadows
    shadowGenerator.bias = 0.00001;
    shadowGenerator.useContactHardeningShadow = true; // More realistic shadow softening
    shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
    shadowGenerator.blurKernel = 64; // Soft shadow edges
    shadowGenerator.blurScale = 2;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.depthScale = 50; // Better depth perception

    const shadowGenerator2 = new ShadowGenerator(2048, keyLight2);
    shadowGenerator2.usePercentageCloserFiltering = true;
    shadowGenerator2.filteringQuality = ShadowGenerator.QUALITY_HIGH;
    shadowGenerator2.darkness = 0.85; // Complementary shadow from second light
    shadowGenerator2.bias = 0.00001;
    shadowGenerator2.useKernelBlur = true;
    shadowGenerator2.blurKernel = 32;

    // ========== POST-PROCESSING EFFECTS ==========
    // Image processing for cinematic look

    // Vignette effect (darkened corners)
    scene.imageProcessingConfiguration.vignetteEnabled = true;
    scene.imageProcessingConfiguration.vignetteWeight = 4.0;
    scene.imageProcessingConfiguration.vignetteStretch = 0.3;
    scene.imageProcessingConfiguration.vignetteColor = new Color4(0, 0, 0, 1);
    scene.imageProcessingConfiguration.vignetteCameraFov = 0.5;

    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.imageProcessingConfiguration.toneMappingType =
      ImageProcessingConfiguration.TONEMAPPING_ACES;
    scene.imageProcessingConfiguration.exposure = 1.2;
    scene.imageProcessingConfiguration.contrast = 1.3;

    scene.imageProcessingConfiguration.colorGradingEnabled = true;
    scene.imageProcessingConfiguration.colorCurvesEnabled = true;

    // ========== MODEL LOADING ==========
    // Load initial hand model with shadows
    loadHandModel(scene, shadowGenerator, shadowGenerator2);

    // ========== RENDER LOOP ==========
    // Continuous rendering at display refresh rate
    engine.runRenderLoop(() => {
      scene.render();
    });

    // ========== WINDOW RESIZE HANDLER ==========
    // Update canvas size on window resize
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener("resize", handleResize);

    // ========== CLEANUP ==========
    // Dispose resources when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      scene.dispose(); // Free scene memory
      engine.dispose(); // Free engine resources
    };
  }, []);

  // ============================================================================
  // VIEW MODE SWITCHING
  // ============================================================================

  /**
   * Effect: Handle switching between hand and neck view modes
   * Disposes current model and loads appropriate model for the view
   */
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Clear existing model
    scene.meshes.forEach((mesh) => {
      if (mesh.name.includes("hand") || mesh.name.includes("neck")) {
        mesh.dispose();
      }
    });

    // Clear anchors
    scene.transformNodes.forEach((node) => {
      if (node.name.includes("anchor")) {
        node.dispose();
      }
    });

    // Get shadow generators
    const keyLight = scene.getLightByName("keyLight") as DirectionalLight;
    const keyLight2 = scene.getLightByName("keyLight2") as DirectionalLight;
    const shadowGenerator = keyLight
      ? new ShadowGenerator(4096, keyLight)
      : null;
    const shadowGenerator2 = keyLight2
      ? new ShadowGenerator(2048, keyLight2)
      : null;

    if (shadowGenerator) {
      shadowGenerator.usePercentageCloserFiltering = true;
      shadowGenerator.filteringQuality = ShadowGenerator.QUALITY_HIGH;
      shadowGenerator.darkness = 3.0;
      shadowGenerator.bias = 0.00001;
    }

    if (shadowGenerator2) {
      shadowGenerator2.usePercentageCloserFiltering = true;
    }

    if (viewMode === "hand") {
      loadHandModel(scene, shadowGenerator, shadowGenerator2);
    } else {
      createNeckModel(scene, shadowGenerator);
    }

    // Clear current jewellery
    if (currentJewellery) {
      currentJewellery.dispose();
      setCurrentJewellery(null);
    }
  }, [viewMode]);

  // ============================================================================
  // 3D MODEL LOADING FUNCTIONS
  // ============================================================================

  /**
   * Load hand model from GLB file
   *
   * @param scene - Babylon.js scene
   * @param shadowGenerator - Primary shadow generator
   * @param shadowGenerator2 - Secondary shadow generator
   */
  const loadHandModel = async (
    scene: Scene,
    shadowGenerator: ShadowGenerator | null,
    shadowGenerator2: ShadowGenerator | null,
  ) => {
    try {
      setIsLoading(true);

      // Load the hand GLB model
      const result = await SceneLoader.ImportMeshAsync(
        "",
        "/models/hand/",
        "hand.glb",
        scene,
      );

      const rootMesh = result.meshes[0];
      handModelRef.current = rootMesh;

      // ========== MODEL POSITIONING ==========
      rootMesh.position.y = 1; // Vertical position adjustment

      // ========== SKIN MATERIAL CONFIGURATION ==========
      // Apply realistic skin shader with subsurface scattering
      result.meshes.forEach((mesh) => {
        if (mesh.material) {
          const material = mesh.material as PBRMetallicRoughnessMaterial;

          // Subsurface Scattering (SSS)
          if (material.subSurface) {
            material.subSurface.isTranslucencyEnabled = true;
            material.subSurface.translucencyIntensity = 0.5;
            material.subSurface.tintColor = new Color3(1.0, 0.95, 0.93);
            material.subSurface.minimumThickness = 1.0;
            material.subSurface.maximumThickness = 10.0;
          }

          // Emissive (Self-Illumination)
          material.emissiveColor = new Color3(0.75, 0.73, 0.71);
          material.emissiveIntensity = 0.2;

          // Lighten skin tone
          if (material.albedoColor) {
            material.albedoColor = material.albedoColor.scale(1.6);
          }
          if ((material as any).baseColor) {
            (material as any).baseColor = (material as any).baseColor.scale(
              1.6,
            );
          }

          // Surface properties
          material.microSurface = 0.75;
          material.roughness = 0.85;
          material.specularIntensity = 0.3;
          (material as any).metallicF0Factor = 0.5;

          // Environment reflection
          (material as any)._environmentIntensity = 1.0;
          material.useRadianceOverAlpha = true;
          material.useSpecularOverAlpha = true;
        }

        // Add to shadow casters
        if (shadowGenerator && mesh !== rootMesh) {
          shadowGenerator.addShadowCaster(mesh);
          mesh.receiveShadows = true;
        }
        if (shadowGenerator2 && mesh !== rootMesh) {
          shadowGenerator2.addShadowCaster(mesh);
        }
      });

      // ========== CREATE FINGER ANCHORS ==========
      // Anchor points for attaching rings to different fingers
      const fingerNames = ["thumb", "index", "middle", "ring", "pinky"];
      const anchorPositions = [
        new Vector3(-0.15, 0.65, 0.05), // thumb
        new Vector3(-0.08, 0.9, -0.02), // index
        new Vector3(0, 1.0, -0.02), // middle
        new Vector3(0.08, 0.95, -0.02), // ring
        new Vector3(0.15, 0.8, 0), // pinky
      ];

      fingerNames.forEach((name, index) => {
        const anchor = new TransformNode(`anchor_ring_${name}`, scene);
        anchor.position = anchorPositions[index];
        anchor.parent = rootMesh;
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading hand model:", error);
      setIsLoading(false);
    }
  };

  /**
   * Create procedural neck model
   *
   * @param scene - Babylon.js scene
   * @param shadowGenerator - Shadow generator
   */
  const createNeckModel = (
    scene: Scene,
    shadowGenerator: ShadowGenerator | null,
  ) => {
    // Neck cylinder
    const neck = MeshBuilder.CreateCylinder(
      "neck_cylinder",
      { height: 1.5, diameterTop: 0.5, diameterBottom: 0.6 },
      scene,
    );
    neck.position = new Vector3(0, 0, 0);

    // Bust/shoulders
    const bust = MeshBuilder.CreateSphere(
      "neck_bust",
      { diameter: 1.8, segments: 16 },
      scene,
    );
    bust.position = new Vector3(0, -0.9, 0);
    bust.scaling.y = 0.4;

    // Skin material
    const skinMat = new PBRMetallicRoughnessMaterial("skin", scene);
    skinMat.baseColor = new Color3(0.95, 0.8, 0.7);
    skinMat.metallic = 0;
    skinMat.roughness = 0.9;
    neck.material = skinMat;
    bust.material = skinMat;

    if (shadowGenerator) {
      shadowGenerator.addShadowCaster(neck);
      shadowGenerator.addShadowCaster(bust);
      neck.receiveShadows = true;
      bust.receiveShadows = true;
    }

    // Necklace anchor
    const anchor = new TransformNode("anchor_necklace", scene);
    anchor.position = new Vector3(0, 0.5, 0.3);
  };

  // ============================================================================
  // MATERIAL & COLOR HELPERS
  // ============================================================================

  /**
   * Get PBR color for material type
   *
   * @param material - Material type (gold, silver, rose-gold)
   * @returns Babylon.js Color3
   */
  const getMaterialColor = (material: MaterialType): Color3 => {
    switch (material) {
      case "gold":
        return new Color3(1, 0.84, 0);
      case "silver":
        return new Color3(0.75, 0.75, 0.75);
      case "rose-gold":
        return new Color3(0.96, 0.76, 0.69);
    }
  };

  // ============================================================================
  // JEWELLERY TRY-ON LOGIC
  // ============================================================================

  /**
   * Load and display selected jewellery on the model
   *
   * @param product - Product to try on
   */
  const tryOnProduct = async (product: Product) => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Remove existing jewellery
    if (currentJewellery) {
      currentJewellery.dispose();
      if (currentJewellery.metadata?.pendant) {
        currentJewellery.metadata.pendant.dispose();
      }
    }

    try {
      if (product.type === "ring") {
        // ========== RING LOADING ==========
        // Load ring 3D model from GLB file
        const result = await SceneLoader.ImportMeshAsync(
          "",
          "/models/ring/",
          "one_ring.glb",
          scene,
        );

        const ringMesh = result.meshes[0];

        // Find anchor
        const anchor = scene.getTransformNodeByName("anchor_ring_middle");
        if (anchor) {
          ringMesh.parent = anchor;
          ringMesh.position = Vector3.Zero();
          ringMesh.scaling = new Vector3(0.02, 0.02, 0.02); // Scale down the ring
          ringMesh.rotation = new Vector3(Math.PI / 2, 0, 0);
        }

        // Apply material to ring meshes
        result.meshes.forEach((mesh) => {
          if (mesh.material) {
            const material = mesh.material as PBRMetallicRoughnessMaterial;

            // Override with selected material color
            material.baseColor = getMaterialColor(product.material);
            material.metallic = 1.0;
            material.roughness = 0.2;
            material.environmentIntensity = 1.5;
          }
        });

        setCurrentJewellery(ringMesh as Mesh);
      } else if (product.type === "necklace") {
        // ========== NECKLACE CREATION ==========
        // Create procedural necklace geometry
        const chain = MeshBuilder.CreateTorus(
          "necklace",
          { diameter: 0.6, thickness: 0.015, tessellation: 48 },
          scene,
        );

        // Create pendant
        const pendant = MeshBuilder.CreateSphere(
          "pendant",
          { diameter: 0.08 },
          scene,
        );
        pendant.position = new Vector3(0, -0.35, 0);

        // Find anchor
        const anchor = scene.getTransformNodeByName("anchor_necklace");
        if (anchor) {
          chain.parent = anchor;
          pendant.parent = anchor;
          chain.position = Vector3.Zero();
        }

        // Apply PBR material
        const mat = new PBRMetallicRoughnessMaterial("jewelleryMat", scene);
        mat.baseColor = getMaterialColor(product.material);
        mat.metallic = 1;
        mat.roughness = 0.2;
        mat.environmentIntensity = 1.5;
        chain.material = mat;
        pendant.material = mat;

        chain.metadata = { pendant };

        setCurrentJewellery(chain);
      } else if (product.type === "bracelet") {
        // ========== BRACELET CREATION ==========
        // Create procedural bracelet geometry
        const bracelet = MeshBuilder.CreateTorus(
          "bracelet",
          { diameter: 0.15, thickness: 0.025, tessellation: 32 },
          scene,
        );

        // Position on wrist
        bracelet.position = new Vector3(0, 0.4, -0.1);
        bracelet.rotation = new Vector3(Math.PI / 2, 0, 0);

        // Apply PBR material
        const mat = new PBRMetallicRoughnessMaterial("jewelleryMat", scene);
        mat.baseColor = getMaterialColor(product.material);
        mat.metallic = 1;
        mat.roughness = 0.2;
        mat.environmentIntensity = 1.5;
        bracelet.material = mat;

        setCurrentJewellery(bracelet);
      }
    } catch (error) {
      console.error("Error loading jewellery:", error);
    }
  };

  /**
   * Handle try-on button click
   * Switches view mode if needed and loads jewellery
   */
  const handleTryOn = () => {
    if (selectedProduct) {
      // Switch view if needed
      if (selectedProduct.type === "necklace" && viewMode !== "neck") {
        setViewMode("neck");
        setTimeout(() => tryOnProduct(selectedProduct), 100);
      } else if (
        (selectedProduct.type === "ring" ||
          selectedProduct.type === "bracelet") &&
        viewMode !== "hand"
      ) {
        setViewMode("hand");
        setTimeout(() => tryOnProduct(selectedProduct), 100);
      } else {
        tryOnProduct(selectedProduct);
      }
    }
  };

  // ============================================================================
  // RENDER UI
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-gray-900">
      {/* ========== HEADER ========== */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              3D Jewellery Showroom
            </h1>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ========== PRODUCT SIDEBAR ========== */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag
                  aria-hidden="true"
                  className="w-5 h-5 text-purple-600 dark:text-purple-400"
                />
                Products
              </h2>

              {/* View Mode Toggle */}
              <div
                className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg"
                role="group"
                aria-label="View mode"
              >
                <button
                  onClick={() => setViewMode("hand")}
                  aria-pressed={viewMode === "hand"}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === "hand"
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Hand aria-hidden="true" className="w-4 h-4" />
                  Hand
                </button>
                <button
                  onClick={() => setViewMode("neck")}
                  aria-pressed={viewMode === "neck"}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === "neck"
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Sparkles aria-hidden="true" className="w-4 h-4" />
                  Neck
                </button>
              </div>

              {/* Product List */}
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {PRODUCTS.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    aria-pressed={selectedProduct?.id === product.id}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedProduct?.id === product.id
                        ? "border-purple-500 dark:border-purple-500 bg-purple-50 dark:bg-purple-950/40"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {product.type.charAt(0).toUpperCase() +
                        product.type.slice(1)}
                    </div>
                    <div className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-1">
                      ${product.price}
                    </div>
                  </button>
                ))}
              </div>

              {/* Try On Button */}
              {selectedProduct && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleTryOn}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-md hover:shadow-lg motion-safe:hover:scale-[1.02]"
                  >
                    Try On
                  </button>
                  <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                    {selectedProduct.name} • ${selectedProduct.price}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========== 3D VIEWER CANVAS ========== */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative">
              {isLoading && (
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
                  <Loader2
                    aria-hidden="true"
                    className="w-8 h-8 text-white motion-safe:animate-spin"
                  />
                  <div className="text-white text-sm font-medium">
                    Loading 3D model…
                  </div>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="w-full"
                style={{ height: "600px" }}
              />
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <MousePointer2 aria-hidden="true" className="w-4 h-4" />
                    Drag to rotate
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ZoomIn aria-hidden="true" className="w-4 h-4" />
                    Scroll to zoom
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Viewing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {viewMode === "hand" ? "Hand Model" : "Neck Model"}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Info
                  aria-hidden="true"
                  className="w-4 h-4 text-purple-600 dark:text-purple-400"
                />
                How to use
              </h3>
              <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 list-decimal list-inside">
                <li>Wait for the hand model to load</li>
                <li>Select a product from the sidebar</li>
                <li>Click "Try On" to see it on the 3D model</li>
                <li>Drag to rotate the view, scroll to zoom</li>
                <li>Toggle between Hand and Neck views</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
