/**
 * Manifest-based LOD paths for /public/models assets.
 * Desktop: lod0 · Mobile: lod3 per optimization-report.json
 */

export interface ModelManifestR3f {
  useGLTF: {
    desktop: string;
    mobile: string;
    draco?: boolean;
    meshopt?: boolean;
  };
}

export interface ModelManifest {
  id: string;
  displayName: string;
  r3f: ModelManifestR3f;
}

export const TOURISM_AIRPORT_MANIFEST: ModelManifest = {
  id: 'tourism-airport',
  displayName: 'Modern Airport Terminal',
  r3f: {
    useGLTF: {
      desktop: '/models/tourism-airport/tourism-airport-lod0.glb',
      mobile: '/models/tourism-airport/tourism-airport-lod3.glb',
      draco: true,
      meshopt: true,
    },
  },
};

export const HOTEL_HOSPITALITY_MANIFEST: ModelManifest = {
  id: 'hotel-hospitality',
  displayName: 'Hotel Hallway (Hospitality)',
  r3f: {
    useGLTF: {
      desktop: '/models/hotel-hospitality/hotel-hospitality-lod0.glb',
      mobile: '/models/hotel-hospitality/hotel-hospitality-lod3.glb',
      draco: true,
      meshopt: true,
    },
  },
};

/** school-building, cnc-lathe, gear-eureka — blocked pending CAD export (see conversion-required.json). */
export const BLOCKED_ASSETS = ['school-building', 'cnc-lathe', 'gear-eureka'] as const;

export function resolveModelPath(manifest: ModelManifest, isMobile: boolean): string {
  return isMobile ? manifest.r3f.useGLTF.mobile : manifest.r3f.useGLTF.desktop;
}
