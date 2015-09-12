// this shader contains a vertex program that will modulate the the model's local y position based on the world Z coordinates of the vertex,
// using a sinosidual function.
// it's based on a default "standard shader" from Unity 5.1.3.
// Just put it on an object!

Shader "Custom/DiffuseWithWave" {
	Properties {
		_Color ("Color", Color) = (1,1,1,1)
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_Glossiness ("Smoothness", Range(0,1)) = 0.5
		_Metallic ("Metallic", Range(0,1)) = 0.0
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200
		
		CGPROGRAM
		
		#pragma vertex vert
		
		// Physically based Standard lighting model, and enable shadows on all light types
		#pragma surface surf Standard fullforwardshadows
		

		// Use shader model 3.0 target, to get nicer looking lighting
		#pragma target 3.0

		#include "UnityCG.cginc"

		sampler2D _MainTex;

		struct Input {
			float2 uv_MainTex;
		};
		

		half _Glossiness;
		half _Metallic;
		fixed4 _Color;

        
        void vert (inout appdata_full v) {
         float4 world_pos = 
               mul(_Object2World, v.vertex);
               
          	v.vertex.y +=  sin( 100 *(_Time + (world_pos.z / 100)));
     	 }
        
        //standard surface shader as defined by the default shader in Unity 5.1.3
		void surf (Input IN, inout SurfaceOutputStandard o) {
			// Albedo comes from a texture tinted by color
			fixed4 c = tex2D (_MainTex, IN.uv_MainTex) * _Color;
			o.Albedo = c.rgb;
			// Metallic and smoothness come from slider variables
			o.Metallic = _Metallic;
			o.Smoothness = _Glossiness;
			o.Alpha = c.a;
		}
		
		
        
		ENDCG
	} 
	FallBack "Diffuse"
}
