"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProviderNode {
  id: string;
  name: string;
  color: string;
  yOffset: number;
  tooltip: string;
  icon: React.ReactNode;
}

export const CostFlowDiagram = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const providers: ProviderNode[] = [
    {
      id: 'openai',
      name: 'OpenAI',
      color: '#10A37F',
      yOffset: -120,
      tooltip: 'GPT-4 & GPT-3.5 models',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
        </svg>
      ),
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      color: '#D97706',
      yOffset: -60,
      tooltip: 'Claude 3 models',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2zm0 4.5L13.25 10l3.5 1.25-3.5 1.25L12 17.5l-1.25-4.75L7.25 11.25l3.5-1.25L12 6.5z"/>
        </svg>
      ),
    },
    {
      id: 'groq',
      name: 'Groq',
      color: '#9333EA',
      yOffset: 0,
      tooltip: 'Ultra-fast inference',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="currentColor"/>
          <rect x="12" y="12" width="8" height="8" fill="white"/>
          <rect x="12" y="28" width="8" height="8" fill="white"/>
          <rect x="28" y="12" width="8" height="8" fill="white"/>
          <rect x="28" y="28" width="8" height="8" fill="white"/>
          <rect x="20" y="20" width="8" height="8" fill="white"/>
        </svg>
      ),
    },
    {
      id: 'gemini',
      name: 'Gemini',
      color: '#4285F4',
      yOffset: 60,
      tooltip: 'Google AI models',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 7v5l8 5 8-5V7l-8-5z" fill="#4285F4"/>
          <path d="M12 12L4 7v5l8 5V12z" fill="#34A853"/>
          <path d="M20 12l-8 5V7l8 5z" fill="#FBBC04"/>
        </svg>
      ),
    },
    {
      id: 'mistral',
      name: 'Mistral',
      color: '#F2622E',
      yOffset: 120,
      tooltip: 'Open-source models',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="6" height="6" fill="currentColor"/>
          <rect x="3" y="11" width="6" height="6" fill="currentColor"/>
          <rect x="11" y="3" width="6" height="6" fill="currentColor"/>
          <rect x="11" y="11" width="6" height="6" fill="currentColor"/>
          <rect x="19" y="3" width="2" height="6" fill="currentColor"/>
          <rect x="19" y="11" width="2" height="6" fill="currentColor"/>
          <rect x="3" y="19" width="6" height="2" fill="currentColor"/>
          <rect x="11" y="19" width="6" height="2" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  const clientX = 150;
  const centerX = 450;
  const providerX = 750;
  const centerY = 200;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Headlines */}
      <div className="text-center mb-10 sm:mb-20 relative z-10">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Your LLM Costs Are{' '}
          <motion.span 
            className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% auto' }}
          >
            Flowing Out of Control
          </motion.span>
        </motion.h2>
        <motion.p 
          className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Calls from your app hit expensive providers directly → wasting 40-80% on repeats & overkill. 
          <span className="font-semibold text-green-600"> Toktrace intercepts every call</span>, caches, routes smarter, 
          and plugs the leaks — without code changes.
        </motion.p>
      </div>

      {/* SVG Diagram */}
      <div className="relative max-w-6xl mx-auto">
        <svg
          viewBox="0 0 900 400"
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#94A3B8" />
            </marker>
            <marker
              id="arrowhead-green"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
            </marker>
            
            <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Line from Client to Center (bidirectional) */}
          <g>
            {/* Request line (Client to TokenTrim) */}
            <motion.line
              x1={clientX + 90}
              y1={centerY - 3}
              x2={centerX - 130}
              y2={centerY - 3}
              stroke="#94A3B8"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.6,
              }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            />
            
            {/* Response line (TokenTrim to Client) */}
            <motion.line
              x1={centerX - 130}
              y1={centerY + 3}
              x2={clientX + 90}
              y2={centerY + 3}
              stroke="#10B981"
              strokeWidth="2"
              markerEnd="url(#arrowhead-green)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.6,
              }}
              transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
            />
            
            {/* Animated request particle (Client → TokenTrim) */}
            <motion.circle
              r="4"
              fill="#3B82F6"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.1, 0.9, 1]
              }}
            >
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#requestPath"/>
              </animateMotion>
            </motion.circle>
            <path id="requestPath" d={`M ${clientX + 90} ${centerY - 3} L ${centerX - 130} ${centerY - 3}`} fill="none" opacity="0"/>
            
            {/* Animated response particle (TokenTrim → Client) */}
            <motion.circle
              r="4"
              fill="#10B981"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
                times: [0, 0.1, 0.9, 1]
              }}
            >
              <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
                <mpath href="#responsePath"/>
              </animateMotion>
            </motion.circle>
            <path id="responsePath" d={`M ${centerX - 130} ${centerY + 3} L ${clientX + 90} ${centerY + 3}`} fill="none" opacity="0"/>
          </g>

          {/* Lines from Center to Providers (bidirectional) */}
          {providers.map((provider, index) => {
            const targetY = centerY + provider.yOffset;
            const controlX = centerX + (providerX - centerX) * 0.4;
            
            // Request path (TokenTrim → Provider)
            const requestPath = `M ${centerX + 130} ${centerY - 2} Q ${controlX} ${centerY + provider.yOffset * 0.4 - 2}, ${providerX - 55} ${targetY - 2}`;
            // Response path (Provider → TokenTrim)
            const responsePath = `M ${providerX - 55} ${targetY + 2} Q ${controlX} ${centerY + provider.yOffset * 0.4 + 2}, ${centerX + 130} ${centerY + 2}`;
            
            return (
              <g key={`line-${provider.id}`}>
                {/* Request line (TokenTrim → Provider) */}
                <motion.path
                  d={requestPath}
                  fill="none"
                  stroke={hoveredNode === provider.id ? provider.color : '#3B82F6'}
                  strokeWidth={hoveredNode === provider.id ? '2.5' : '1.5'}
                  markerEnd={hoveredNode === provider.id ? `url(#arrowhead-${provider.id})` : 'url(#arrowhead-blue)'}
                  opacity={hoveredNode === provider.id ? '0.8' : '0.4'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: hoveredNode === provider.id ? 0.8 : 0.4,
                  }}
                  transition={{ 
                    pathLength: { duration: 1.2, delay: 1 + index * 0.1, ease: "easeInOut" },
                    opacity: { duration: 0.3 }
                  }}
                  className="transition-all duration-300"
                />
                
                {/* Response line (Provider → TokenTrim) */}
                <motion.path
                  d={responsePath}
                  fill="none"
                  stroke={hoveredNode === provider.id ? provider.color : '#10B981'}
                  strokeWidth={hoveredNode === provider.id ? '2.5' : '1.5'}
                  markerEnd="url(#arrowhead-green)"
                  opacity={hoveredNode === provider.id ? '0.8' : '0.4'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: hoveredNode === provider.id ? 0.8 : 0.4,
                  }}
                  transition={{ 
                    pathLength: { duration: 1.2, delay: 1.1 + index * 0.1, ease: "easeInOut" },
                    opacity: { duration: 0.3 }
                  }}
                  className="transition-all duration-300"
                />
                
                {/* Animated request particle (TokenTrim → Provider) */}
                <motion.circle
                  r="3"
                  fill={provider.color}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.9, 0.9, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: 2 + index * 0.4,
                    ease: "easeInOut",
                    times: [0, 0.15, 0.85, 1]
                  }}
                >
                  <animateMotion dur="3s" repeatCount="indefinite" begin={`${2 + index * 0.4}s`}>
                    <mpath href={`#requestProviderPath${index}`}/>
                  </animateMotion>
                </motion.circle>
                <path id={`requestProviderPath${index}`} d={requestPath} fill="none" opacity="0"/>
                
                {/* Animated response particle (Provider → TokenTrim) */}
                <motion.circle
                  r="3"
                  fill="#10B981"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.9, 0.9, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: 3.5 + index * 0.4,
                    ease: "easeInOut",
                    times: [0, 0.15, 0.85, 1]
                  }}
                >
                  <animateMotion dur="3s" repeatCount="indefinite" begin={`${3.5 + index * 0.4}s`}>
                    <mpath href={`#responseProviderPath${index}`}/>
                  </animateMotion>
                </motion.circle>
                <path id={`responseProviderPath${index}`} d={responsePath} fill="none" opacity="0"/>
                
                <marker
                  id={`arrowhead-${provider.id}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 8 3, 0 6" fill={provider.color} />
                </marker>
              </g>
            );
          })}
          
          {/* Add blue arrow marker for request lines */}
          <marker
            id="arrowhead-blue"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#3B82F6" />
          </marker>

          {/* Client App Node (left) - cleaner style */}
          <motion.g
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <rect
              x={clientX - 90}
              y={centerY - 28}
              width="180"
              height="56"
              rx="12"
              fill="white"
              stroke="#E2E8F0"
              strokeWidth="2"
              filter="url(#shadow)"
            />
            <text
              x={clientX}
              y={centerY + 6}
              textAnchor="middle"
              fill="#475569"
              fontSize="17"
              fontWeight="600"
            >
              Client App
            </text>
          </motion.g>

          {/* TokenTrim Proxy Node (center) - THE HERO cleaner */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            {/* Single pulsing glow */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r="110"
              fill="#10B981"
              opacity="0.08"
              animate={{
                r: [110, 125, 110],
                opacity: [0.08, 0.12, 0.08],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <rect
              x={centerX - 130}
              y={centerY - 45}
              width="260"
              height="90"
              rx="16"
              fill="#10B981"
              filter="url(#glow-green)"
            />
            
            {/* Static icon */}
            <foreignObject
              x={centerX - 105}
              y={centerY - 28}
              width="56"
              height="56"
            >
              <div className="flex items-center justify-center w-full h-full text-white bg-white/10 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </foreignObject>
            
            <text
              x={centerX + 25}
              y={centerY - 8}
              textAnchor="middle"
              fill="white"
              fontSize="22"
              fontWeight="700"
            >
              Toktrace
            </text>
            <text
              x={centerX + 25}
              y={centerY + 18}
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontWeight="500"
              opacity="0.95"
            >
              Cache • Route • Optimize
            </text>
          </motion.g>

          {/* Provider Nodes (right) - cleaner circles */}
          {providers.map((provider, index) => {
            const nodeY = centerY + provider.yOffset;
            return (
              <motion.g
                key={provider.id}
                initial={{ x: 80, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.3 + index * 0.1,
                  ease: "easeOut"
                }}
                onMouseEnter={() => setHoveredNode(provider.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                {/* Circle with clean shadow */}
                <circle
                  cx={providerX}
                  cy={nodeY}
                  r={hoveredNode === provider.id ? '42' : '38'}
                  fill="white"
                  stroke={provider.color}
                  strokeWidth={hoveredNode === provider.id ? '3' : '2.5'}
                  filter="url(#shadow)"
                  className="transition-all duration-300"
                />
                
                {/* Icon */}
                <foreignObject
                  x={providerX - 13}
                  y={nodeY - 13}
                  width="26"
                  height="26"
                >
                  <div 
                    className="flex items-center justify-center w-full h-full" 
                    style={{ color: provider.color }}
                  >
                    {provider.icon}
                  </div>
                </foreignObject>

                {/* Label */}
                {/* <text
                  x={providerX}
                  y={nodeY + 58}
                  textAnchor="middle"
                  fill={provider.color}
                  fontSize="13"
                  fontWeight="600"
                >
                  {provider.name}
                </text> */}

                {/* Tooltip */}
                {hoveredNode === provider.id && (
                  <motion.g
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={providerX - 90}
                      y={nodeY - 75}
                      width="180"
                      height="34"
                      rx="8"
                      fill="#1E293B"
                      opacity="0.96"
                      filter="url(#shadow)"
                    />
                    <text
                      x={providerX}
                      y={nodeY - 53}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="500"
                    >
                      {provider.tooltip}
                    </text>
                  </motion.g>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Bottom explanation - cleaner style */}
      <motion.div 
        className="text-center mt-16 space-y-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border-2 border-green-200 rounded-full text-sm font-semibold text-green-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Toktrace intercepts all calls — automatically caching, routing to cheaper models, and cutting waste
        </div>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          Change one base URL. Save <span className="text-green-600 font-bold">50%+</span>. No code refactoring required.
        </p>
      </motion.div>
    </div>
  );
};
