${ae}

                uniform sampler2D tDiffuse;

                varying vec2 vUv;

                ${xE}

                uniform sampler3D tLUT;
                uniform float uLUTSize;
                uniform float uLUTIntensity;
                uniform float uGradientAlpha;

                vec3 hash32(vec2 p) {
                    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
                    p3 += dot(p3, p3.yxz+33.33);
                    return fract((p3.xxy+p3.yzz)*p3.zyx);
                }

                void main() {
                    vec2 uv = vUv;

                    // apply rgb shift
                    // float offset = 0.08 * length(vUv - 0.5);
                    // offset = pow(offset, 2.0);
                    // float r = texture2D(tDiffuse, uv + vec2(-offset, offset)).r;
                    // float g = texture2D(tDiffuse, uv).g;
                    // float b = texture2D(tDiffuse, uv + vec2(offset, -offset)).b;
                    // vec3 scene = vec3(r, g, b);

                    vec3 scene = texture2D(tDiffuse, uv).rgb;
                    float gradient = mix(0.8, 1.0, (uv.x + uv.y) * 0.5);
                    gradient = mix(1.0, gradient, uGradientAlpha);
                    scene *= gradient;

                    vec3 sceneColor = apply3DLUTTetrahedral(scene.rgb, tLUT, uLUTSize, uLUTIntensity);

                    // film grain
                    // vec3 noise = hash32(uv * 1000.0 + time);
                    // noise *= 2.0;
                    // noise -= 1.0;
                    // sceneColor += noise * 0.05;

                    gl_FragColor = vec4(sceneColor, 1.0);
                }
            `}),setTimeout(async()=>{const e=this.uniforms.tLUT.value;await e._loaded,this.uniforms.uLUTSize.value=e.image.width},0)}};async function A3(i,e){const t=new Eg(new m3);t.isIglooColorCorrectionPass=!0,e.addPass(t),await t.material.uniforms.tLUT.value._loaded}class g3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}init(){const e=new bd(800,12,12),t=new fe({uniformsGroups:[he.UBO],uniforms:{uColor1:{value:new Z("#d1d6e3")},uColor2:{value:new Z("#afb6c7")},uIntroColor:{value:new Z("#b3bac9")},uProgress:{value:0}},vertexShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;

                void main() {
                    vUv = uv;
                    vPos = position;
                    vec3 pos = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,fragmentShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;

                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform vec3 uIntroColor;
                uniform float uProgress;

                void main() {

                    // light to dark gradient
                    vec2 screenUv = gl_FragCoord.xy / resolution;
                    float grad = (screenUv.x + screenUv.y) * 0.5;
                    grad = pow(grad, 2.0);
                    vec3 color1 = uColor1;
                    vec3 color2 = uColor2;
                    vec3 color = mix(color2, color1, grad);

                    // intro animation
                    color = mix(uIntroColor, color, uProgress);

                    gl_FragColor = vec4(color, 1.0);
                }
            `,side:ei});this.mesh=new Ce(e,t),this.mesh.name="sky",this.mesh.scale.x=-1,this.mesh.rotation.x=16*3.14/180,this.mesh.rotation.z=-16*3.14/180,this.mesh.updateMatrixWorld(!0),this.mesh.matrixAutoUpdate=!1,this.mesh.receiveShadow=!1,this.mesh.castShadow=!1,this.scene.add(this.mesh),this.isReady()}}class v3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}init(){const e=new kt(20,5),t=le.load("wind_noise.ktx2","srgb-repeat"),s=new fe({uniformsGroups:[he.UBO],uniforms:{tWind:{value:t},uAlpha:{value:1}},vertexShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;

                void main() {
                    vUv = uv;
                    vPos = position;
                    vec3 pos = position;
                    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,fragmentShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;
                varying vec3 vNormal;

                uniform sampler2D tWind;
                uniform float uAlpha;

                void main() {
                    vec2 uv = vUv;
                    uv.x *= 2.0;

                    // wind
                    float t = time * 0.15;

                    if (vWorldPos.x > 6.0) {
                        t += 0.914;
                    }
                    float wind = texture2D(tWind, uv + vec2(-t, t * 0.4)).r;
                    wind *= texture2D(tWind, uv * 1.25 + vec2(-t, 0.75)).r;
                    wind *= texture2D(tWind, uv * 0.5 + vec2(-t, -t * 0.35)).r;
                    wind *= 8.0;

                    vec3 color = vec3(1.0);

                    float alpha = wind;
                    alpha *= 1.0 - vUv.y;
                    alpha *= smoothstep(0.0, 0.1, vUv.y);
                    alpha *= smoothstep(0.0, 0.5, vUv.x);
                    alpha *= smoothstep(1.0, 0.8, vUv.x);
                    alpha *= uAlpha;

                    gl_FragColor = vec4(color, alpha);
                }
            `,transparent:!0});this.mesh1=new Ce(e,s),this.mesh1.name="smoke1",this.mesh1.position.set(-5,1.25,-10),this.mesh1.renderOrder=2,this.mesh2=new Ce(e,s),this.mesh2.name="smoke2",this.mesh2.position.set(13.45,3,-4),this.mesh2.rotation.y=-10*3.14/180,this.mesh2.renderOrder=2,this.mesh1.updateMatrixWorld(!0),this.mesh2.updateMatrixWorld(!0),this.mesh1.matrixAutoUpdate=!1,this.mesh2.matrixAutoUpdate=!1,this.mesh1.receiveShadow=!1,this.mesh1.castShadow=!1,this.mesh2.receiveShadow=!1,this.mesh2.castShadow=!1,this.scene.add(this.mesh1),this.scene.add(this.mesh2),this.isReady()}}const x3=new b;class y3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.mousePosition=new b,this.init()}async init(){const e=await zt.load("ground.drc"),t=new fe({uniformsGroups:[he.UBO],uniforms:{tMap:{value:le.load("igloo/ground_color.ktx2","srgb")},tGroundGlow:{value:le.load("igloo/ground_glow.ktx2","srgb")},tWind:{value:le.load("wind_noise.ktx2","srgb-repeat")},tTriangles:{value:le.load("igloo/triangles_tiling.ktx2","srgb-repeat")},tNoise:{value:le.load("mosaic.ktx2","srgb-repeat-nearest")},uMousePos:{value:this.mousePosition},uProgress:{value:q.devScene?1:0},uProgress2:{value:q.devScene?1:0},uTriangleAlpha:{value:1},uAlpha:{value:1}},vertexShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;
                varying vec3 vMouseGlow;

                uniform vec3 uMousePos;
                uniform float uProgress;
                uniform float uProgress2;
                uniform sampler2D tNoise;

                void main() {
                    vUv = uv;
                    vPos = position;
                    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;

                    vec3 pos = position;

                    // approximate light glow based on igloo interaction
                    vMouseGlow = (1.0 - clamp(distance(uMousePos, vWorldPos.xyz * vec3(1.0, 0.0, 1.0)), 0.0, 5.0) / 5.0) * vec3(0.5, 0.7, 1.0) * smoothstep(-0.5, 2.0, uMousePos.y);
                    vMouseGlow *= 1.0 - clamp(length(vWorldPos.xyz), 0.0, 9.0) / 9.0;
                    vMouseGlow *= 2.0;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,fragmentShader:`
                //- edit
                ${ae}
                ${Ue}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;
                varying vec3 vMouseGlow;
                varying vec3 vNormal;

                uniform sampler2D tMap;
                uniform sampler2D tWind;
                uniform sampler2D tGroundGlow;
                uniform sampler2D tTriangles;
                uniform sampler2D tNoise;

                uniform vec3 uMousePos;
                uniform float uProgress;
                uniform float uProgress2;
                uniform float uTriangleAlpha;
                uniform float uAlpha;

                void main() {
                    float alpha = 1.0;

                    vec3 terrainColor = texture2D(tMap, vUv).rgb;

                    // ground glow based on mouse position
                    vec3 glow = texture2D(tGroundGlow, vUv).rgb;
                    float glowStrength = (sin(vPos.x - time * 1.0 + 3.2) * 0.5 + 0.5);
                    terrainColor += glow * glowStrength * terrainColor.r;
                    terrainColor += vMouseGlow * terrainColor.r;

                    // wind
                    float t = time;
                    float radialGrad = 1.0 - smoothstep(1.0, 0.8, length(vPos) * 0.2);
                    float verticalGrad = (1.0 - clamp(vPos.y * 0.3 + 1.1, 0.0, 1.0));
                    float wind = texture2D(tWind, vWorldPos.xz * 0.15 + vUv * 0.1 + vec2(-t * 0.15, -t * 0.15)).r;
                    wind *= texture2D(tWind, vWorldPos.xz * 0.17 + vUv * 0.1 + vec2(-t * 0.15, -t * 0.15)).r;
                    wind *= verticalGrad;
                    terrainColor = mix(terrainColor, vec3(1.0), wind * 4.0);

                    vec3 color = terrainColor;

                    // intro animation
                    if (uProgress2 < 1.0) {
                        // reduce alpha to zero so we can composite layers onto it
                        alpha *= 0.0;

                        // create input textures and values
                        float noise = texture2D(tNoise, vWorldPos.xz * 0.07).r;
                        float triangles = texture2D(tTriangles, vWorldPos.xz * 0.25).r;
                        vec3 blue = vec3(0.3, 0.45, 1.0);
                        float inputGradient = length(vWorldPos.xz);
                        inputGradient += noise * 3.5;

                        // terrain layer
                        vec3 terrainShockwaveColor = vec3(0.0);
                        float terrainShockwaveAlpha = 0.0;
                        float terrainFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 8.0, uProgress2);
                        float terrainFalloff2 = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 3.0, uProgress2);
                        terrainShockwaveColor += terrainFalloff * triangles * blue * 3.0;
                        terrainShockwaveColor += terrainFalloff2 * blue;
                        terrainShockwaveAlpha += falloff(inputGradient, -0.1, 31.9, 0.1, uProgress2);

                        // triangle layer
                        vec3 triangleShockwaveColor = vec3(0.0);
                        float triangleShockwaveAlpha = 0.0;
                        float triangleFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 10.0, uProgress);
                        triangleShockwaveColor += blue;
                        triangleShockwaveAlpha += falloff(inputGradient, 1.0, 33.0, 0.1, uProgress);
                        triangleShockwaveAlpha *= triangleFalloff;
                        triangleShockwaveAlpha *= triangles;

                        // composite layers
                        color += terrainShockwaveColor;
                        alpha += terrainShockwaveAlpha;

                        color += triangleShockwaveColor * (1.0 - terrainShockwaveAlpha);
                        alpha += triangleShockwaveAlpha * (1.0 - terrainShockwaveAlpha);
                    }

                    // fade at edges
                    alpha *= 1.0 - smoothstep(0.8, 1.0, length(vPos.xz) * 0.1085);

                    // color safety
                    alpha = clamp(alpha, 0.0, 1.0);
                    color = clamp(color, vec3(0.0), vec3(1.0));

                    // global fade
                    alpha *= uAlpha;

                    gl_FragColor = vec4(color, alpha);
                }
            `,transparent:!0});this.mesh=new Ce(e,t),this.mesh.name="igloobase",this.mesh.renderOrder=2,this.mesh.updateMatrixWorld(!0),this.mesh.matrixAutoUpdate=!1,this.mesh.receiveShadow=!1,this.mesh.castShadow=!1,this.scene.add(this.mesh),this.scene.beforeRenderCbs.push(()=>{Si.planeInteraction.setCamera(this.scene.camera);const s=Si.planeInteraction.unprojectDistance(19.25);x3.copy(s),this.mousePosition.lerp(s,ie.lerpCoefFPS(.03))}),this.isReady()}}let _3=class extends ga{constructor(){super(),this.uniforms={uniformsGroups:[he.UBO],uProgress:{value:1},uAlpha:{value:.185}},this.onBeforeCompile=e=>{e.uniforms={...e.uniforms,...this.uniforms},e.vertexShader=`
                attribute vec3 color;
                attribute vec3 centr;

                varying vec3 vColor;
                varying vec3 vWorldPos;
                varying vec3 vCentr;

                ${e.vertexShader}
            `,e.vertexShader=e.vertexShader.replace("#include <skinning_vertex>",`
                vColor = color;
                vCentr = centr;
                vWorldPos = (modelMatrix * vec4(centr, 1.0)).xyz;
            `),e.fragmentShader=`
                ${ae}
                ${Ue}

                varying vec3 vColor;
                varying vec3 vCentr;
                varying vec3 vWorldPos;

                uniform float uProgress;
                uniform float uAlpha;

                ${e.fragmentShader}
            `,e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>",`
                    float intro_gradientInput = length(vWorldPos);
                    float intro_shockwave = falloff(intro_gradientInput, 0.0, 20.0, 5.0, uProgress);

                    float alpha = uAlpha;
                    alpha *= intro_shockwave;

                    float idleAnimation = sin(vColor.r * 13.0 + time * 6.0) * 0.5 + 0.5;
                    alpha *= idleAnimation;

                    gl_FragColor.a = alpha;
            `)}}};class w3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}async init(){const e=await zt.load("igloo/igloo_cage.drc"),t=new _3({color:"#a7b2d6",opacity:.3,transparent:!0});t.depthTest=!1,t.depthWrite=!1,t.blending=pt,t.transparent=!0,this.mesh=new yr(e,t),this.mesh.frustumCulled=!1,this.mesh.visible=!q.devScene,this.mesh.name="igloo_cage",this.mesh.renderOrder=999,this.scene.add(this.mesh),this.isReady()}}class E3 extends ga{constructor(){super(),this.uniforms={uniformsGroups:[he.UBO],uProgress:{value:1},uAlpha:{value:1},uScrollAlpha:{value:0},uIntroMaterialize:{value:0}},this.onBeforeCompile=e=>{e.uniforms={...e.uniforms,...this.uniforms},e.vertexShader=`
                attribute vec3 color;
                attribute vec3 centr;

                varying vec3 vColor;
                varying vec3 vWorldPos;
                varying vec3 vCentr;

                ${e.vertexShader}
            `,e.vertexShader=e.vertexShader.replace("#include <skinning_vertex>",`
                vColor = color;
                vCentr = centr;
                vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
            `),e.fragmentShader=`
                ${ae}
                ${Ue}

                varying vec3 vColor;
                varying vec3 vCentr;
                varying vec3 vWorldPos;

                uniform float uProgress;
                uniform float uAlpha;
                uniform float uScrollAlpha;
                uniform float uIntroMaterialize;

                ${e.fragmentShader}
            `,e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>",`
                    // intro materialize effect

                    float alpha = mix(uAlpha, 1.0, uScrollAlpha);
                    float idleAnimation = sin(vWorldPos.y * 6.0 + time * 5.0) * 0.5 + 0.5;
                    idleAnimation *= cos(vWorldPos.z * 6.0 + time * 5.0) * 0.5 + 0.5;
                    idleAnimation *= sin(vWorldPos.x * 6.0 + time * 5.0) * 0.5 + 0.5;
                    idleAnimation = idleAnimation * 0.8 + 0.2;
                    alpha *= idleAnimation;

                    // materialize effect
                    alpha *= falloffsmooth(vWorldPos.y, 3.5, 0.1, 2.0, uIntroMaterialize);

                    gl_FragColor.a = alpha;
            `)}}}class C3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}async init(){const e=await zt.load("igloo/igloo_outline.drc"),t=new E3({color:"#a7b2d6",opacity:.3,transparent:!0});t.depthTest=!1,t.depthWrite=!1,t.blending=pt,t.transparent=!0,this.mesh=new yr(e,t),this.mesh.frustumCulled=!1,this.mesh.visible=!0,this.mesh.name="igloo_outline",this.mesh.renderOrder=999,this.scene.add(this.mesh),this.mesh.onBeforeRender=()=>{const s=ie.ease(ie.fit(this.scene.progress,0,.35,1,0),"sine.in")*2;this.mesh.material.uniforms.uScrollAlpha.value=s},this.isReady()}}class S3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}async init(){const e=await zt.load("mountain.drc"),t=new fe({uniformsGroups:[he.UBO],uniforms:{uColor1:{value:new Z("#d1d6e3")},uColor2:{value:new Z("#afb6c7")},tMap:{value:le.load("igloo/mountain_color.ktx2","srgb")},tTriangles:{value:le.load("igloo/triangles_tiling.ktx2","srgb-repeat")},tNoise:{value:le.load("mosaic.ktx2","srgb-repeat-nearest")},uProgress:{value:1},uProgress2:{value:1},uTriangleAlpha:{value:1},uAlpha:{value:1}},vertexShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;
                varying vec4 vMvPos;

                uniform float uProgress;
                uniform float uProgress2;

                void main() {
                    vUv = uv;
                    vPos = position;
                    vMvPos = modelViewMatrix * vec4(position, 1.0);
                    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;

                    vec3 pos = position;

                    // intro displacement
                    float maxDist = 32.0;
                    float worldLen01 = clamp(length(vWorldPos.xz), 0.0, maxDist) / maxDist;
                    float wave2 = smoothstep(0.0 + uProgress, 0.5 + uProgress, worldLen01);
                    wave2 = pow(wave2, 20.0);
                    // pos.y += wave2;

                    gl_Position = projectionMatrix * vMvPos;
                }
            `,fragmentShader:`
                //- edit
                ${ae}
                ${Ue}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec4 vMvPos;
                varying vec3 vWorldPos;

                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform sampler2D tMap;
                uniform sampler2D tTriangles;
                uniform sampler2D tNoise;

                uniform float uProgress;
                uniform float uProgress2;
                uniform float uTriangleAlpha;
                uniform float uAlpha;

                void main() {
                    // fog gradient
                    vec2 screenUv = gl_FragCoord.xy / resolution;
                    float grad = (screenUv.x + screenUv.y) * 0.5;
                    grad = pow(grad, 2.0);
                    vec3 color1 = uColor1;
                    vec3 color2 = uColor2;
                    vec3 fogColor = mix(color2, color1, grad);

                    vec3 color = texture2D(tMap, vUv).rgb;
                    float alpha = 1.0;

                    float distanceFog = clamp(-vMvPos.z * 0.005, 0.0, 1.0);
                    float fog = clamp(1.0 - vWorldPos.y * 0.05 - 0.5, 0.0, 1.0);
                    fog += distanceFog * 0.75;

                    // intro animation
                    if (uProgress2 < 1.0) {
                        vec3 originalColor = color;

                        // create input textures and values
                        float noise = texture2D(tNoise, vWorldPos.xz * 0.07).r;
                        float triangles = texture2D(tTriangles, vWorldPos.xz * 0.25).r;
                        vec3 blue = vec3(0.3, 0.45, 1.0);
                        float inputGradient = length(vWorldPos.xz);
                        inputGradient += noise * 3.5;

                        // mask background mountains from effects, so they're always visible
                        float backgroundMountainsMask = smoothstep(32.0, 36.0, inputGradient);
                        float invBackgroundMountainsMask = 1.0 - backgroundMountainsMask;

                        // reduce alpha to zero so we can composite layers onto it
                        alpha = backgroundMountainsMask * uAlpha;

                        // terrain layer
                        vec3 terrainShockwaveColor = vec3(0.0);
                        float terrainShockwaveAlpha = 0.0;
                        float terrainFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 8.0, uProgress2);
                        float terrainFalloff2 = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 3.0, uProgress2);
                        terrainShockwaveColor += terrainFalloff * triangles * blue * 3.0;
                        terrainShockwaveColor += terrainFalloff2 * blue;
                        terrainShockwaveAlpha += falloff(inputGradient, -0.1, 31.9, 0.1, uProgress2);

                        // triangle layer
                        vec3 triangleShockwaveColor = vec3(0.0);
                        float triangleShockwaveAlpha = 0.0;
                        float triangleFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 10.0, uProgress);
                        triangleShockwaveColor += blue;
                        triangleShockwaveAlpha += falloff(inputGradient, 1.0, 33.0, 0.1, uProgress);
                        triangleShockwaveAlpha *= triangleFalloff;
                        triangleShockwaveAlpha *= triangles;

                        // composite layers
                        color += terrainShockwaveColor * invBackgroundMountainsMask;
                        alpha += terrainShockwaveAlpha * invBackgroundMountainsMask;

                        color += triangleShockwaveColor * (1.0 - terrainShockwaveAlpha) * invBackgroundMountainsMask;
                        alpha += triangleShockwaveAlpha * (1.0 - terrainShockwaveAlpha) * invBackgroundMountainsMask;

                        // prevent snapping color at end of animation
                        float endmix = smoothstep(0.8, 1.0, uProgress2);
                        color = mix(color, originalColor, endmix);
                    }

                    // fade at edges
                    alpha = clamp(alpha, 0.0, 1.0);
                    alpha *= 1.0 - smoothstep(0.7, 0.9, length(vPos.xz) * 0.1085);

                    color = clamp(color, vec3(0.0), vec3(1.0));

                    // fog
                    color = mix(color, fogColor * 1.1 + smoothstep(0.5, 1.0, color.r), fog);

                    gl_FragColor = vec4(color, alpha);
                }
            `,transparent:!0});this.mesh1=new Ce(e,t),this.mesh1.position.set(59.53,-1,-11.84),this.mesh1.scale.x=4,this.mesh1.scale.y=3.14,this.mesh1.scale.z=4,this.mesh1.rotation.x=4.1*3.14/180,this.mesh1.rotation.y=-42.8*3.14/180,this.mesh1.rotation.z=5*3.14/180,this.mesh1.name="mountain1",this.mesh1.renderOrder=1,this.mesh2=new Ce(e,t),this.mesh2.position.set(1,-2.21,-23),this.mesh2.rotation.x=3.5*3.14/180,this.mesh2.rotation.y=30*3.14/180,this.mesh2.rotation.z=0*3.14/180,this.mesh2.scale.setScalar(2),this.mesh2.name="mountain2",this.mesh2.renderOrder=1,this.mesh3=new Ce(e,t),this.mesh3.position.x=75,this.mesh3.position.y=0,this.mesh3.position.z=-90,this.mesh3.scale.x=8,this.mesh3.scale.y=8,this.mesh3.scale.z=8,this.mesh3.rotation.x=3.2*3.14/180,this.mesh3.rotation.y=-16.7*3.14/180,this.mesh3.rotation.z=-2.6*3.14/180,this.mesh3.name="mountain3",this.mesh3.renderOrder=1,this.mesh4=new Ce(e,t),this.mesh4.position.x=250,this.mesh4.position.y=11.33,this.mesh4.position.z=-133,this.mesh4.scale.x=10,this.mesh4.scale.y=10,this.mesh4.scale.z=10,this.mesh4.rotation.x=13.2*3.14/180,this.mesh4.rotation.y=20*3.14/180,this.mesh4.rotation.z=5*3.14/180,this.mesh4.name="mountain4",this.mesh4.renderOrder=1,this.mesh5=new Ce(e,t),this.mesh5.position.set(-25.22,-1.59,-53.05),this.mesh5.rotation.x=3.5*3.14/180,this.mesh5.rotation.y=25*3.14/180,this.mesh5.rotation.z=0*3.14/180,this.mesh5.scale.setScalar(2.5),this.mesh5.name="mountain5",this.mesh5.renderOrder=1,this.mesh1.updateMatrixWorld(!0),this.mesh2.updateMatrixWorld(!0),this.mesh3.updateMatrixWorld(!0),this.mesh4.updateMatrixWorld(!0),this.mesh5.updateMatrixWorld(!0),this.mesh1.matrixAutoUpdate=!1,this.mesh2.matrixAutoUpdate=!1,this.mesh3.matrixAutoUpdate=!1,this.mesh4.matrixAutoUpdate=!1,this.mesh5.matrixAutoUpdate=!1,this.mesh1.receiveShadow=!1,this.mesh2.receiveShadow=!1,this.mesh3.receiveShadow=!1,this.mesh4.receiveShadow=!1,this.mesh5.receiveShadow=!1,this.mesh1.castShadow=!1,this.mesh2.castShadow=!1,this.mesh3.castShadow=!1,this.mesh4.castShadow=!1,this.mesh5.castShadow=!1,this.scene.add(this.mesh1),this.scene.add(this.mesh2),this.scene.add(this.mesh3),this.scene.add(this.mesh4),this.scene.add(this.mesh5),this.isReady()}}class M3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}async init(){const e=await zt.load("ground.drc"),t=new fe({uniformsGroups:[he.UBO],uniforms:{tMap:{value:le.load("igloo/ground_sansigloo_color.ktx2","srgb")},tWind:{value:le.load("wind_noise.ktx2","srgb-repeat")},tTriangles:{value:le.load("igloo/triangles_tiling.ktx2","srgb-repeat")},tNoise:{value:le.load("mosaic.ktx2","srgb-repeat-nearest")},uProgress:{value:q.devScene?1:0},uProgress2:{value:q.devScene?1:0},uTriangleAlpha:{value:1},uAlpha:{value:1}},vertexShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;

                uniform float uProgress;
                uniform float uProgress2;
                uniform sampler2D tNoise;

                void main() {
                    vUv = uv;
                    vPos = position;
                    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;

                    vec3 pos = position;

                    // intro displacement
                    // float maxDist = 32.0;
                    // float noise = texture2D(tNoise, vWorldPos.xz * 0.07).r;
                    // float worldLen01 = clamp(length(vWorldPos.xz), 0.0, maxDist) / maxDist;
                    // worldLen01 += noise * 0.1;
                    // float wave2 = smoothstep(0.0 + uProgress, 0.5 + uProgress, worldLen01);
                    // wave2 = pow(wave2, 35.0);
                    // pos.y += wave2 * smoothstep(0.1, 0.15, worldLen01) * 0.5;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,fragmentShader:`
                //- edit
                ${ae}
                ${Ue}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;

                uniform sampler2D tMap;
                uniform sampler2D tWind;
                uniform sampler2D tTriangles;
                uniform sampler2D tNoise;

                uniform float uProgress;
                uniform float uProgress2;
                uniform float uTriangleAlpha;
                uniform float uAlpha;

                float hash12(vec2 p) {
                    vec3 p3  = fract(vec3(p.xyx) * .1031);
                    p3 += dot(p3, p3.yzx + 33.33);
                    return fract((p3.x + p3.y) * p3.z);
                }

                void main() {
                    vec3 color = texture2D(tMap, vUv).rgb;
                    float alpha = 1.0;

                    // wind
                    float t = time;
                    float wind = texture2D(tWind, vWorldPos.xz * 0.1 + vWorldPos.xy * 0.1 + vec2(-t * 0.25, -t * 0.3)).r;
                    float verticalGrad = (1.0 - clamp(vPos.y * 0.5 + 0.75, 0.0, 1.0));
                    wind *= texture2D(tWind, vWorldPos.xz * 0.15 + vWorldPos.xy * 0.15 + vec2(-t * 0.18, -t * 0.225)).r;
                    wind *= verticalGrad;
                    wind *= color.r;
                    wind *= 2.0;
                    color += wind;

                    // intro animation
                    if (uProgress2 < 1.0) {
                        // reduce alpha to zero so we can composite layers onto it
                        alpha *= 0.0;

                        // create input textures and values
                        float noise = texture2D(tNoise, vWorldPos.xz * 0.07).r;
                        float triangles = texture2D(tTriangles, vWorldPos.xz * 0.25).r;
                        vec3 blue = vec3(0.3, 0.45, 1.0);
                        float inputGradient = length(vWorldPos.xz);
                        inputGradient += noise * 3.5;

                        // terrain layer
                        vec3 terrainShockwaveColor = vec3(0.0);
                        float terrainShockwaveAlpha = 0.0;
                        float terrainFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 8.0, uProgress2);
                        float terrainFalloff2 = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 3.0, uProgress2);
                        terrainShockwaveColor += terrainFalloff * triangles * blue * 3.0;
                        terrainShockwaveColor += terrainFalloff2 * blue;
                        terrainShockwaveAlpha += falloff(inputGradient, -0.1, 31.9, 0.1, uProgress2);

                        // triangle layer
                        vec3 triangleShockwaveColor = vec3(0.0);
                        float triangleShockwaveAlpha = 0.0;
                        float triangleFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 10.0, uProgress);
                        triangleShockwaveColor += blue;
                        triangleShockwaveAlpha += falloff(inputGradient, 1.0, 33.0, 0.1, uProgress);
                        triangleShockwaveAlpha *= triangleFalloff;
                        triangleShockwaveAlpha *= triangles;

                        // composite layers
                        color += terrainShockwaveColor;
                        alpha += terrainShockwaveAlpha;

                        color += triangleShockwaveColor * (1.0 - terrainShockwaveAlpha);
                        alpha += triangleShockwaveAlpha * (1.0 - terrainShockwaveAlpha);
                    }

                    // fade at edges
                    alpha = clamp(alpha, 0.0, 1.0);
                    alpha *= 1.0 - smoothstep(0.85, 1.0, length(vPos.xz) * 0.1085);

                    alpha *= uAlpha;

                    color = clamp(color, vec3(0.0), vec3(1.0));

                    gl_FragColor = vec4(color, alpha);
                }
            `,transparent:!0});this.mesh1=new Ce(e,t),this.mesh1.position.set(-3.76,-.58,12.5),this.mesh1.scale.set(.6,.6,.6),this.mesh1.rotation.x=-5.1*3.14/180,this.mesh1.rotation.y=0*3.14/180,this.mesh1.rotation.z=0*3.14/180,this.mesh1.name="terrain1",this.mesh1.renderOrder=1,this.mesh2=new Ce(e,t),this.mesh2.position.set(-17.63,-.01,2),this.mesh2.rotation.x=2.7*3.14/180,this.mesh2.rotation.y=.8*3.14/180,this.mesh2.rotation.z=0*3.14/180,this.mesh2.scale.set(1,1,1),this.mesh2.name="terrain2",this.mesh2.renderOrder=3,this.mesh3=new Ce(e,t),this.mesh3.position.set(3.12,-.75,-1.02),this.mesh3.scale.set(1.5,.66,1.5),this.mesh3.rotation.x=0*3.14/180,this.mesh3.rotation.y=0,this.mesh3.rotation.z=0,this.mesh3.name="terrain3",this.mesh3.renderOrder=1,this.mesh4=new Ce(e,t),this.mesh4.position.set(6,.16,15.78),this.mesh4.scale.setScalar(1,1,1),this.mesh4.rotation.x=1.1*3.14/180,this.mesh4.rotation.y=0*3.14/180,this.mesh4.rotation.z=7*3.14/180,this.mesh4.name="terrain4",this.mesh4.renderOrder=2,this.mesh5=new Ce(e,t),this.mesh5.position.set(16.06,.34,4),this.mesh5.scale.x=1,this.mesh5.scale.y=1,this.mesh5.scale.z=1,this.mesh5.rotation.x=0,this.mesh5.rotation.y=0,this.mesh5.rotation.z=0,this.mesh5.name="terrain5",this.mesh5.renderOrder=2,this.mesh1.updateMatrixWorld(!0),this.mesh2.updateMatrixWorld(!0),this.mesh3.updateMatrixWorld(!0),this.mesh4.updateMatrixWorld(!0),this.mesh5.updateMatrixWorld(!0),this.mesh1.matrixAutoUpdate=!1,this.mesh2.matrixAutoUpdate=!1,this.mesh3.matrixAutoUpdate=!1,this.mesh4.matrixAutoUpdate=!1,this.mesh5.matrixAutoUpdate=!1,this.mesh1.receiveShadow=!1,this.mesh2.receiveShadow=!1,this.mesh3.receiveShadow=!1,this.mesh4.receiveShadow=!1,this.mesh5.receiveShadow=!1,this.mesh1.castShadow=!1,this.mesh2.castShadow=!1,this.mesh3.castShadow=!1,this.mesh4.castShadow=!1,this.mesh5.castShadow=!1,this.scene.add(this.mesh1),this.scene.add(this.mesh2),this.scene.add(this.mesh3),this.scene.add(this.mesh4),this.scene.add(this.mesh5),this.isReady()}}class b3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}async init(){const e=await zt.load("igloo/patch.drc"),t=new fe({uniformsGroups:[he.UBO],uniforms:{tMap:{value:le.load("igloo/ground_sansigloo_color.ktx2","srgb")},tWind:{value:le.load("wind_noise.ktx2","srgb-repeat")},tTriangles:{value:le.load("igloo/triangles_tiling.ktx2","srgb-repeat")},tNoise:{value:le.load("mosaic.ktx2","srgb-repeat-nearest")},uProgress:{value:0},uProgress2:{value:0},uTriangleAlpha:{value:1},uAlpha:{value:1}},vertexShader:`
                //- edit
                ${ae}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;

                uniform float uProgress;
                uniform float uProgress2;
                uniform sampler2D tNoise;

                void main() {
                    vUv = uv;
                    vPos = position;
                    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;

                    vec3 pos = position;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,fragmentShader:`
                //- edit
                ${ae}
                ${Ue}

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vWorldPos;

                uniform sampler2D tMap;
                uniform sampler2D tWind;
                uniform sampler2D tTriangles;
                uniform sampler2D tNoise;

                uniform float uProgress;
                uniform float uProgress2;
                uniform float uTriangleAlpha;
                uniform float uAlpha;

                float hash12(vec2 p) {
                    vec3 p3  = fract(vec3(p.xyx) * .1031);
                    p3 += dot(p3, p3.yzx + 33.33);
                    return fract((p3.x + p3.y) * p3.z);
                }

                void main() {
                    vec3 color = texture2D(tMap, vUv).rgb;
                    float alpha = 1.0;

                    // wind
                    float t = time;
                    float wind = texture2D(tWind, vWorldPos.xz * 0.1 + vWorldPos.xy * 0.1 + vec2(-t * 0.25, -t * 0.3)).r;
                    float verticalGrad = (1.0 - clamp(vPos.y * 0.5 + 0.75, 0.0, 1.0));
                    wind *= texture2D(tWind, vWorldPos.xz * 0.15 + vWorldPos.xy * 0.15 + vec2(-t * 0.18, -t * 0.225)).r;
                    wind *= verticalGrad;
                    wind *= color.r;
                    wind *= 2.0;
                    color += wind;

                    // intro animation
                    if (uProgress2 < 1.0) {
                        // reduce alpha to zero so we can composite layers onto it
                        alpha *= 0.0;

                        // create input textures and values
                        float noise = texture2D(tNoise, vWorldPos.xz * 0.07).r;
                        float triangles = texture2D(tTriangles, vWorldPos.xz * 0.25).r;
                        vec3 blue = vec3(0.3, 0.45, 1.0);
                        float inputGradient = length(vWorldPos.xz);
                        inputGradient += noise * 3.5;

                        // terrain layer
                        vec3 terrainShockwaveColor = vec3(0.0);
                        float terrainShockwaveAlpha = 0.0;
                        float terrainFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 8.0, uProgress2);
                        float terrainFalloff2 = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 3.0, uProgress2);
                        terrainShockwaveColor += terrainFalloff * triangles * blue * 3.0;
                        terrainShockwaveColor += terrainFalloff2 * blue;
                        terrainShockwaveAlpha += falloff(inputGradient, -0.1, 31.9, 0.1, uProgress2);

                        // triangle layer
                        vec3 triangleShockwaveColor = vec3(0.0);
                        float triangleShockwaveAlpha = 0.0;
                        float triangleFalloff = 1.0 - falloffsmooth(inputGradient, 0.0, 32.0, 10.0, uProgress);
                        triangleShockwaveColor += blue;
                        triangleShockwaveAlpha += falloff(inputGradient, 1.0, 33.0, 0.1, uProgress);
                        triangleShockwaveAlpha *= triangleFalloff;
                        triangleShockwaveAlpha *= triangles;

                        // composite layers
                        color += terrainShockwaveColor;
                        alpha += terrainShockwaveAlpha;

                        color += triangleShockwaveColor * (1.0 - terrainShockwaveAlpha);
                        alpha += triangleShockwaveAlpha * (1.0 - terrainShockwaveAlpha);
                    }

                    // fade at edges
                    alpha = clamp(alpha, 0.0, 1.0);
                    alpha *= 1.0 - smoothstep(0.3, 0.48, length(vPos.xz));

                    alpha *= uAlpha;

                    color = clamp(color, vec3(0.0), vec3(1.0));

                    gl_FragColor = vec4(color, alpha);
                }
            `,transparent:!0});this.mesh1=new Ce(e,t),this.mesh1.position.set(-9.34,-1.77,6.96),this.mesh1.scale.set(7,7,7),this.mesh1.rotation.x=0*3.14/180,this.mesh1.rotation.y=0*3.14/180,this.mesh1.rotation.z=0*3.14/180,this.mesh1.name="terrainpatch1",this.mesh1.renderOrder=0,this.mesh2=new Ce(e,t),this.mesh2.position.set(-8.82,-1.35,11.69),this.mesh2.scale.set(8,8,8),this.mesh2.rotation.x=-5.5*3.14/180,this.mesh2.rotation.y=-25.6*3.14/180,this.mesh2.rotation.z=0*3.14/180,this.mesh2.name="terrainpatch2",this.mesh2.renderOrder=0,this.mesh1.updateMatrixWorld(!0),this.mesh2.updateMatrixWorld(!0),this.mesh1.matrixAutoUpdate=!1,this.mesh2.matrixAutoUpdate=!1,this.mesh1.receiveShadow=!1,this.mesh1.castShadow=!1,this.scene.add(this.mesh1),this.scene.add(this.mesh2),this.isReady()}}class T3{constructor(e){this.scene=e,this.ready=new Promise(t=>{this.isReady=t}),this.init()}async init(){const e=await zt.load("intro_particles.drc"),t=new fe({uniformsGroups:[he.UBO],uniforms:{tNumbers:{value:le.load("igloo/numbers.ktx2","srgb-repeat")},uProgress:{value:0},uAlpha:{value:1}},vertexShader:`
                //- edit
                ${ae}

                attribute vec3 color;

                varying vec3 vWorldPos;

                uniform sampler2D tNoise;

                void main() {
                    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = resolution.y / 100.0;

                }
            `,fragmentShader:`
                //- edit
                ${ae}
                ${Ue}

                varying vec3 vWorldPos;

                uniform sampler2D tNumbers;

                uniform float uProgress;
                uniform float uAlpha;

                void main() {
                    // scale uvs to match a single character of the spritesheet
                    vec2 uv = gl_PointCoord.xy;
                    uv.y = 1.0 - uv.y;
                    uv.y /= 32.0;
                    uv.y += 1.0 / 32.0;

                    // animate spritesheet character offset
                    float offset = length(vWorldPos);
                    float progress = uProgress * 4.0;
                    progress = floor(progress * 12.0 - offset) / 32.0;
                    progress = clamp(progress, 0.0, 1.0);
                    uv.y += progress;

                    // sample numbers texture with offset uvs
                    float numbers = texture2D(tNumbers, uv).r;
                    float alpha = 1.0;

                    // intro animation
                    float gradientInput = length(vWorldPos);
                    float shockwave = falloff(gradientInput, 0.0, 20.0, 5.0, uProgress);
                    alpha *= shockwave;

                    vec3 color = vec3(numbers);
                    alpha *= 0.5;

                    gl_FragColor = vec4(color, alpha);
                }
            `,transparent:!0,blending:pt,depthTest:!1,depthWrite:!1});this.mesh=new Fn(e,t),this.mesh.name="intro_particles",this.mesh.renderOrder=1e3,this.mesh.matrixAutoUpdate=!1,this.mesh.receiveShadow=!1,this.scene.add(this.mesh),this.isReady()}}var Zo="float aastep(float threshold,float value){float afwidth=length(vec2(dFdx(value),dFdy(value)))*0.70710678118654757;return smoothstep(threshold-afwidth,threshold+afwidth,value);}",I3="vec2 encodeNormal(vec3 n){n/=(abs(n.x)+abs(n.y)+abs(n.z));return(n.z>=0.0)? n.xy :(1.0-abs(n.yx))*sign(n.xy);}vec3 decodeNormal(vec2 f){vec3 n=vec3(f,1.0-abs(f.x)-abs(f.y));float t=max(-n.z,0.0);n.x+=(n.x>0.0)?-t : t;n.y+=(n.y>0.0)?-t : t;return normalize(n);}vec2 encodeNormalUint8(vec3 n){return encodeNormal(n)*0.5+0.5;}vec3 deodeNormalUint8(vec2 n){return decodeNormal(n*2.0-1.0);}vec2 encodeNormalSpheremap(vec3 n){float f=sqrt(8.0*n.z+8.0);return n.xy/f*2.0;}vec3 decodeNormalSpheremap(vec2 n){vec4 nn=vec4(n.xy,1.0,-1.0);float l=dot(nn.xyz,-nn.xyw);nn.z=l;nn.xy*=sqrt(l);return nn.xyz*2.0+vec3(0.0,0.0,-1.0);}vec2 encodeNormalSpheremapUint8(vec3 n){return encodeNormalSpheremap(n)*0.5+0.5;}vec3 deodeNormalSimpleUint8(vec2 n){return decodeNormalSpheremap(n*2.0-1.0);}",Cg="float treadmill(float p,float margin){float n=fract((p+margin)/(2.0*margin));return n*2.0*margin-margin;}vec2 treadmill(vec2 p,vec2 margin){vec2 n=fract((p+margin)/(2.0*margin));return n*2.0*margin-margin;}vec3 treadmill(vec3 p,vec3 margin){vec3 n=fract((p+margin)/(2.0*margin));return n*2.0*margin-margin;}vec4 treadmill(vec4 p,vec4 margin){vec4 n=fract((p+margin)/(2.0*margin));return n*2.0*margin-margin;}";class B3{constructor(e,t){this.scene=e,this.ready=new Promise(s=>{this.isReady=s}),this.options={count:1200,...t},this.mousePosition=new b,this.init()}init(){const e=new kt(.075,.15),t=this.options.count,s=ie.getTextureSizeParticles(t),n=new Float32Array(s*s*4);for(let o=0;o<t;o++)n[o*4+0]=Math.random()*50-25,n[o*4+1]=Math.random()*20-10,n[o*4+2]=Math.random()*50-25,n[o*4+3]=Math.random();const r=new Hi(n,s,s,wt,Lt);r.needsUpdate=!0;const a=new Hi(new Float32Array(s*s*4),s,s,wt,Lt);a.needsUpdate=!0,this.mesh=new gE({count:t,geometry:e,material:new fe({uniformsGroups:[he.UBO],uniforms:{tTexture1:{value:null},tTexture2:{value:a},uCount:{value:t},uColor1:{value:new Z("#cda05e")},uColor2:{value:new Z("#ab8349")},uMousePos:{value:this.mousePosition},uOutlineColor:{value:new Z("#904619")},uAlpha:{value:0}},vertexShader:`
                    ${ae}

                    uniform float uCount;

                    attribute vec4 rand;
                    attribute vec2 texuv;
                    uniform sampler2D tTexture1;
                    uniform sampler2D tTexture2;
                    uniform vec3 uMousePos;

                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec4 vRandom;
                    varying vec3 vPos;
                    varying vec4 vMvPos;
                    varying float vAlpha;
                    flat varying float vIndex;

                    mat2 rotateAngle(float a) {
                        float s = sin(a);
                        float c = cos(a);
                        mat2 m = mat2(c, s, -s, c);
                        return m;
                    }

                    const float PI = 3.14159;
                    const float HALF_PI = PI * 0.5;
                    const float TWO_PI = PI * 2.0;

                    void main() {
                        float index = float(gl_InstanceID);
                        vIndex = index;

                        vUv = uv;
                        vRandom = rand;

                        vec3 pos = position;
                        pos *= mix(0.85, 1.15, step(rand.x, 0.5));

                        // rotation value from fluid sim
                        // float interactionRotation = texture2D(tTexture2, texuv).a * 5.0;

                        // curl upwards
                        // mat2 rot = rotateAngle(0.25 * sin(uv.y * 3.5 + time + rand.z * 12.0 + rand.y + rand.x + interactionRotation * 3.0) + 0.2 * (1.0 - pow(1.0 - position.z, 2.0)));
                        // pos.yz = rot * pos.yz;

                        // random rotation angle
                        mat2 rot0 = rotateAngle(time * mix(0.75, 1.25, rand.z) + rand.z * 3.14 * 2.0);
                        mat2 rot1 = rotateAngle((rand.y + rand.z + rand.x) * 3.14 * 2.0);
                        mat2 rot2 = rotateAngle(rand.x * 3.14 * 2.0);
                        pos.xy = rot0 * pos.xy;
                        pos.zx = rot1 * pos.zx;
                        pos.yz = rot2 * pos.yz;

                        // vec3 norm = normal;
                        // norm.xy = rot0 * norm.xy;
                        // norm.zx = rot1 * norm.zx;
                        // norm.yz = rot2 * norm.yz;
                        // vNormal = normalize(normalMatrix * norm);

                        vec3 offset = texture2D(tTexture1, texuv).xyz;

                        pos += offset;

                        vPos = pos;
                        vMvPos = modelViewMatrix * vec4(pos, 1.0);

                        vAlpha = sin(time + pos.z * 0.25) * 0.5 + 0.5;

                        gl_Position = projectionMatrix * vMvPos;
                    }
                `,fragmentShader:`
                    ${ae}
                    ${Zo}
                    ${I3}
                    ${Ue}

                    uniform float uAlpha;

                    varying vec2 vUv;
                    varying vec3 vPos;
                    varying vec4 vMvPos;
                    varying float vAlpha;

                    void main() {
                        float value = 1.0 - min(10.0, length(vPos)) / 10.0;
                        vec3 color = vec3(mix(0.75, 1.0, value));
                        float alpha = 1.0;

                        // fade near bounds
                        vec3 bounds = vec3(25.0, 10.0, 25.0);
                        alpha *= 1.0 - min(bounds.x, abs(vPos.x)) / bounds.x;
                        alpha *= 1.0 - min(bounds.y, abs(vPos.y)) / bounds.y;
                        alpha *= 1.0 - min(bounds.z, abs(vPos.z)) / bounds.z;

                        // fade near camera
                        alpha *= smoothstep(length(vMvPos), 0.5, 1.0);

                        // fade near ground
                        alpha *= smoothstep(0.0, 2.0, vPos.y);

                        // fade near igloo
                        alpha *= smoothstep(0.5, 1.0, min(6.0, length(vPos)) / 6.0);

                        // shape
                        float circularGrad = 1.0 - length(vUv - 0.5) * 2.0;
                        alpha *= circularGrad;

                        alpha *= uAlpha;
                        alpha = clamp(alpha, 0.0, 1.0);

                        gl_FragColor = vec4(color, alpha);
                    }
                `,depthWrite:!1,transparent:!0})},{textures:2,initialTextures:[r,a],material:new fe({uniformsGroups:[he.UBO],uniforms:{tTexture1:{value:null},tTexture2:{value:null},tVel:{value:null},uViewMatrix:{value:new De},uModelMatrix:{value:new De},uProjMatrix:{value:new De}},vertexShader:`
                    varying vec2 vUv;

                    void main() {
                        vUv = uv;
                        gl_Position = vec4(position, 1.0);
                    }
                `,fragmentShader:`
                    #define outPos pc_fragColor
                    uniform sampler2D tTexture1;

                    layout(location = 1) out highp vec4 outVel;
                    uniform sampler2D tTexture2;

                    uniform mat4 uProjMatrix;
                    uniform mat4 uViewMatrix;
                    uniform mat4 uModelMatrix;
                    uniform sampler2D tVel;

                    varying vec2 vUv;

                    ${ae}
                    ${Cg}

                    void main() {
                        ivec2 uv = ivec2(gl_FragCoord.xy);
                        vec4 currentPos = texelFetch(tTexture1, uv, 0);
                        vec4 currentVel = texelFetch(tTexture2, uv, 0);

                        // add some velocity so leaves fall
                        currentVel.x += (sin(time * 0.2 + currentPos.w * 15.6547) + sign(currentPos.w - 0.5) * 2.0) * 0.00075 * dtRatio;
                        currentVel.x += 0.0025 * dtRatio;
                        currentVel.y -= 0.004 * mix(0.5, 0.8, fract(currentPos.w * 31.342)) * dtRatio;
                        currentVel.z += 0.0025 * dtRatio;

                        // add fluid sim interaction
                        // const float pushForce = 0.0035;
                        // vec4 wPos = uModelMatrix * vec4(currentPos.xyz, 1.0);
                        // vec4 vPos = uViewMatrix * wPos;
                        // vec4 posProjected = uProjMatrix * vPos;
                        // vec2 uvScreen = (posProjected.xy / posProjected.w + 1.0) * 0.5;
                        // vec2 vel = texture2D(tVel, uvScreen).xy;

                        /*
                        // since the camera is on -z, there's no need to calculate up and right vectors of camera
                        vec3 up = vec3(uViewMatrix[0][1], uViewMatrix[1][1], uViewMatrix[2][1]);
                        vec3 right = vec3(uViewMatrix[0][0], uViewMatrix[1][0], uViewMatrix[2][0]);
                        vec3 disp = (right * vel.x + up * vel.y);
                        */
                        // currentVel.xy += vel * pushForce * dtRatio;

                        // store rotation in alpha
                        // currentVel.a += length(vel) * pushForce * 1.75 * dtRatio;

                        // friction
                        currentVel.xyz *= exp2(log2(0.9) * dtRatio);

                        // add vel to position
                        currentPos.xyz += currentVel.xyz * dtRatio;

                        // treadmill position
                        currentPos.xyz = treadmill(currentPos.xyz, vec3(25.0, 10.0, 25.0));

                        outVel = currentVel;
                        outPos = currentPos;
                    }
                `})}),this.mesh.name="snowparticles",this.mesh.renderOrder=5,this.mesh.updateMatrixWorld(),this.mesh.matrixAutoUpdate=!1,this.mesh.frustumCulled=!1,this.scene.add(this.mesh),this.isReady()}}var Cr="vec2 rotateUV(vec2 uv,float rotation,vec2 mid){float c=cos(rotation);float s=sin(rotation);return vec2(c*(uv.x-mid.x)+s*(uv.y-mid.y)+mid.x,c*(uv.y-mid.y)-s*(uv.x-mid.x)+mid.y);}vec2 rotateUV(vec2 uv,float rotation,float mid){return rotateUV(uv,rotation,vec2(mid));}vec2 rotateUV(vec2 uv,float rotation){return rotateUV(uv,rotation,vec2(0.5));}vec2 scaleUV(vec2 uv,float scale,vec2 mid){uv-=mid;uv*=1.0/scale;uv+=mid;return uv;}vec2 scaleUV(vec2 uv,float scale,float mid){return scaleUV(uv,scale,vec2(mid));}vec2 scaleUV(vec2 uv,float scale){return scaleUV(uv,scale,vec2(0.5));}";class P3{constructor({scene:e,parent:t}={}){this.scene=e,this.parent=t,this.ready=new Promise(s=>{this.isReady=s}),this.init()}init(){const e=new ot;e.setAttribute("position",new nt(new Float32Array(this.parent.maxPlexusPoints*3),3)),e.setAttribute("progress",new nt(new Float32Array(this.parent.maxPlexusPoints),1));const t=new fe({uniformsGroups:[he.UBO],uniforms:{uColor:{value:new Z("#ffffff")},uSize:{value:200}},vertexShader:`
                //- edit
                ${ae}
                ${Rc}

                attribute float progress;
                uniform float uSize;

                flat varying float vProgress;

                void main() {
                    vProgress = progress;
                    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
                    float size = uSize * progress;

                    gl_Position = projectionMatrix * viewPos;
                    gl_PointSize = size / length(viewPos.xyz) * (resolution.y / 1300.0);
                }
            `,fragmentShader:`
                //- edit
                ${ae}
                ${Zo}
                ${Cr}

                uniform vec3 uColor;

                flat varying float vProgress;

                void main() {
                    if (vProgress < 0.001) discard;
                    vec2 uv = rotateUV(gl_PointCoord.xy, mix(1.3, 0.0, vProgress));
                    uv = uv * 2.0 - 1.0;

                    const float size = 0.125;
                    float shape = 1.0 - aastep(size, abs(uv.x)) * aastep(size, abs(uv.y));

                    gl_FragColor = vec4(uColor, shape * 0.5);
                }
            `,depthWrite:!1,depthTest:!1,transparent:!0,blending:pt});this.mesh=new Fn(e,t),this.mesh.frustumCulled=!1,this.mesh.name="plexus points",this.mesh.renderOrder=this.parent.lineMesh.renderOrder+1,this.scene.add(this.mesh),this.isReady()}update(){const e=this.mesh.geometry.attributes.position.count,t=this.parent.closest;for(let s=0;s<e;s++)t[s]?(this.mesh.geometry.attributes.position.array[s*3+0]=t[s].__UIPos[0],this.mesh.geometry.attributes.position.array[s*3+1]=t[s].__UIPos[1],this.mesh.geometry.attributes.position.array[s*3+2]=t[s].__UIPos[2],this.mesh.geometry.attributes.progress.array[s]=t[s].__plexusAnimation.value):(this.mesh.geometry.attributes.position.array[s*3+0]=0,this.mesh.geometry.attributes.position.array[s*3+1]=0,this.mesh.geometry.attributes.position.array[s*3+2]=0,this.mesh.geometry.attributes.progress.array[s]=0);this.mesh.geometry.attributes.position.needsUpdate=!0,this.mesh.geometry.attributes.progress.needsUpdate=!0}}function yE(i,e=!1){const t=i[0].index!==null,s=new Set(Object.keys(i[0].attributes)),n=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new ot;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=Fx(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let A=0;A<a[h].length;++A)f.push(a[h][A][u]);const p=Fx(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}return l}function Fx(i){let e,t,s,n=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(s===void 0&&(s=h.normalized),s!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new We(a,t,s);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/t;for(let u=0,f=h.count;u<f;u++)for(let p=0;p<t;p++){const A=h.getComponent(u,p);o.setComponent(u+d,p,A)}}else a.set(h.array,l);l+=h.count*t}return n!==void 0&&(o.gpuType=n),o}var Nt="vec3 getMatrixTranslation(mat4 mat){return vec3(mat[3]);}void setMatrixTranslation(inout mat4 mat,vec3 translation){mat[3].xyz=translation;}vec3 getMatrixScale(mat4 mat){vec3 scale=vec3(length(mat[0].xyz),length(mat[1].xyz),length(mat[2].xyz));return determinant(mat)<0.0 ? vec3(-scale.x,scale.yz): scale;}void setMatrixScale(inout mat4 mat,vec3 scale){vec3 invScale=1.0/getMatrixScale(mat);mat[0]*=invScale.x*scale.x;mat[1]*=invScale.y*scale.y;mat[2]*=invScale.z*scale.z;}mat4 getMatrixRotation(mat4 mat){mat4 m=mat4(1.0);vec3 scale=getMatrixScale(mat);m[0]=mat[0]/scale.x;m[1]=mat[1]/scale.y;m[2]=mat[2]/scale.z;return m;}void setMatrixRotation(inout mat4 mat,vec3 rotation){vec3 scale=getMatrixScale(mat);float x=rotation.x,y=rotation.y,z=rotation.z;float a=cos(x),b=sin(x);float c=cos(y),d=sin(y);float e=cos(z),f=sin(z);float ae=a*e,af=a*f,be=b*e,bf=b*f;mat[0].xyz=vec3(c*e,-c*f,d)*scale.x;mat[1].xyz=vec3(af+be*d,ae-bf*d,-b*c)*scale.y;mat[2].xyz=vec3(bf-ae*d,be+af*d,a*c)*scale.z;}void matrixCompose(inout mat4 mat,vec3 translation,vec4 quaternion,vec3 scale){float x=quaternion.x;float y=quaternion.y;float z=quaternion.z;float w=quaternion.w;float x2=x+x;float y2=y+y;float z2=z+z;float xx=x*x2;float xy=x*y2;float xz=x*z2;float yy=y*y2;float yz=y*z2;float zz=z*z2;float wx=w*x2;float wy=w*y2;float wz=w*z2;float sx=scale.x;float sy=scale.y;float sz=scale.z;mat[0]=vec4((1.0-(yy+zz))*sx,(xy+wz)*sx,(xz-wy)*sx,0.0);mat[1]=vec4((xy-wz)*sy,(1.0-(xx+zz))*sy,(yz+wx)*sy,0.0);mat[2]=vec4((xz+wy)*sz,(yz-wx)*sz,(1.0-(xx+yy))*sz,0.0);mat[3]=vec4(translation.xyz,1.0);}vec3 getViewRight(){return vec3(viewMatrix[0][0],viewMatrix[1][0],viewMatrix[2][0]);}vec3 getViewLeft(){return-getViewRight();}vec3 getViewUp(){return vec3(viewMatrix[0][1],viewMatrix[1][1],viewMatrix[2][1]);}vec3 getViewDown(){return-getViewUp();}vec3 getViewBack(){return vec3(viewMatrix[0][2],viewMatrix[1][2],viewMatrix[2][2]);}vec3 getViewForward(){return-getViewBack();}mat4 billBoardMatrix(mat4 mat){mat4 m=mat4(1.0);vec3 scale=getMatrixScale(mat);m[0].xyz=getViewRight()*scale.x;m[1].xyz=getViewUp()*scale.y;m[2].xyz=getViewBack()*scale.z;m[3].xyz=getMatrixTranslation(mat);return m;}mat4 billboardModelMatrix(vec3 offset){mat4 m=billBoardMatrix(modelMatrix);setMatrixTranslation(m,offset);return m;}mat4 billboardModelMatrix(){return billBoardMatrix(modelMatrix);}";const Th=new It;class D3{constructor({scene:e,parent:t}={}){this.scene=e,this.parent=t,this.ready=new Promise(s=>{this.isReady=s}),this.init()}init(){const t=new kt;t.scale(.77777,1,1),t.translate(-.5- -.1,0,0),t.setAttribute("side",new We(new Int32Array([-1,-1,-1,-1]),1));const s=new kt;s.scale(.77777,1,1),s.translate(.5+-.1,0,0),s.setAttribute("side",new We(new Int32Array([1,1,1,1]),1));const n=yE([t,s]),r=new Td;r.instanceCount=this.parent.maxPlexusPoints;for(const o in n.attributes)r.setAttribute(o,n.attributes[o]);r.setIndex(n.index),r.setAttribute("progress",new gr(new Float32Array(this.parent.maxPlexusPoints),1)),r.setAttribute("nums",new gr(new Int32Array(this.parent.maxPlexusPoints*2),2));const a=new fe({uniformsGroups:[he.UBO],uniforms:{tNums:{value:le.load("numbers-datatexture.ktx2","data")},uColor:{value:new Z("#ffffff")},uSize:{value:1}},vertexShader:`
                //- edit
                ${ae}
                ${Nt}
                ${Rc}

                attribute float progress;
                attribute ivec2 nums;
                attribute int side;
                flat varying ivec2 vNums;
                flat varying float vProgress;
                flat varying int vSide;

                uniform float uSize;
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    vSide = side;
                    vProgress = progress;
                    vNums = nums;

                    vec3 left = getViewLeft();
                    vec3 up = getViewUp();

                    float size = uSize;
                    vec4 pos = instanceMatrix * billboardModelMatrix() * vec4(position * size * power1In(progress), 1.0);

                    // detect side
                    vec4 projPos = projectionMatrix * viewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
                    float screenSide = -sign(projPos.x / projPos.w);

                    pos.xyz += left * screenSide * uSize * 1.75;
                    pos.xyz += up * 1.0 * uSize;

                    gl_Position = projectionMatrix * viewMatrix * pos;
                }
            `,fragmentShader:`
                //- edit
                ${ae}
                ${ii}

                flat varying float vProgress;
                flat varying int vSide;
                flat varying ivec2 vNums;

                uniform sampler2D tNums;
                uniform vec3 uColor;
                varying vec2 vUv;

                void main() {

                    float numStep = 1.0 / 10.0;
                    float num = float(vSide < 0 ? vNums.x : vNums.y);

                    vec2 uv = vec2(numStep * vUv.x + num * numStep, vUv.y);
                    float a = msdf(tNums, uv);

                    gl_FragColor = vec4(uColor, a);
                }
            `,transparent:!0,depthWrite:!1,depthTest:!1,blending:pt});this.mesh=new OA(r,a,this.parent.maxPlexusPoints),this.mesh.name="plexus numbers",this.mesh.frustumCulled=!1,this.mesh.renderOrder=this.parent.lineMesh.renderOrder+2,this.scene.add(this.mesh),this.isReady()}update(){const e=this.parent.closest;this.mesh.count=e.length;for(let t=0;t<e.length;t++){if(e[t]){Th.position.fromArray(e[t].__UIPos),this.mesh.geometry.attributes.progress.array[t]=e[t].__plexusAnimation.value;const s=e[t].centroid.distanceTo(e[t].position);let n=`${Math.floor(s*50)
