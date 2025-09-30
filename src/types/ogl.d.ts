declare module 'ogl' {
  export class Renderer {
    constructor(options?: any);
    gl: WebGLRenderingContext;
    setSize(width: number, height: number): void;
    render(params: any): void;
    dpr: number;
  }

  export class Camera {
    constructor(gl: WebGLRenderingContext, options?: any);
    fov: number;
    position: { x: number; y: number; z: number };
    perspective(options: any): void;
    aspect: number;
  }

  export class Transform {
    constructor();
    addChild(child: any): void;
    removeChild(child: any): void;
    setParent(parent: any): void;
    position: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number; set: (x: number, y: number, z: number) => void };
    rotation: { x: number; y: number; z: number };
  }

  export class Plane {
    constructor(gl: WebGLRenderingContext, options?: any);
  }

  export class Program {
    constructor(gl: WebGLRenderingContext, options: any);
    uniforms: any;
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: any);
    geometry: any;
    program: Program;
    position: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number; set: (x: number, y: number, z: number) => void };
    rotation: { x: number; y: number; z: number };
    setParent(parent: Transform): void;
    addChild(child: any): void;
    removeChild(child: any): void;
  }

  export class Texture {
    constructor(gl: WebGLRenderingContext, options?: any);
    image: any;
  }

  export function lerp(p1: number, p2: number, t: number): number;
  
  // Add other functions that might be needed
  export class TextureLoader {
    constructor(gl: WebGLRenderingContext);
    load(src: string, onLoad?: (texture: Texture) => void, onProgress?: (progress: ProgressEvent) => void, onError?: (error: ErrorEvent) => void): Texture;
  }
}