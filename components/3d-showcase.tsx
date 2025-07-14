'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box } from '@react-three/drei'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import * as THREE from 'three'

interface AppExample {
    id: string
    title: string
    description: string
    color: string
    icon: string
}

const appExamples: AppExample[] = [
    {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Modern shopping experience',
        color: '#3B82F6',
        icon: '🛒'
    },
    {
        id: '2',
        title: 'Task Manager',
        description: 'Productivity at its best',
        color: '#10B981',
        icon: '📋'
    },
    {
        id: '3',
        title: 'Weather Dashboard',
        description: 'Real-time data visualization',
        color: '#8B5CF6',
        icon: '🌤️'
    },
    {
        id: '4',
        title: 'Social Network',
        description: 'Connect with friends',
        color: '#F59E0B',
        icon: '👥'
    }
]

function FloatingApp({ app, index }: { app: AppExample; index: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    useFrame((state: any) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime()
            meshRef.current.position.y = Math.sin(time + index) * 0.5 + 2
            meshRef.current.rotation.y = time * 0.5 + index
            meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2
        }
    })

    return (
        <group
            ref={meshRef}
            position={[Math.cos(index * Math.PI / 2) * 3, 2, Math.sin(index * Math.PI / 2) * 3]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Box
                args={[1.5, 1.5, 0.1]}
                scale={hovered ? 1.2 : 1}
            >
                <meshStandardMaterial
                    color={app.color}
                    transparent
                    opacity={hovered ? 0.9 : 0.7}
                />
            </Box>

            <Text
                position={[0, 0, 0.06]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {app.icon}
            </Text>

            {hovered && (
                <Text
                    position={[0, -1, 0]}
                    fontSize={0.15}
                    color="white"
                    anchorX="center"
                    anchorY="top"
                    maxWidth={2}
                >
                    {app.title}
                </Text>
            )}
        </group>
    )
}

function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null)
    const positions = new Float32Array(1000 * 3)

    for (let i = 0; i < 1000; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    useFrame((state: any) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
        }
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={1000}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#3B82F6"
                transparent
                opacity={0.6}
            />
        </points>
    )
}

export function ThreeDShowcase() {
    const [selectedApp, setSelectedApp] = useState<AppExample | null>(null)

    return (
        <div className="relative h-screen w-full">
            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 5, 10], fov: 60 }}
                className="absolute inset-0"
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <ParticleField />

                {appExamples.map((app, index) => (
                    <FloatingApp key={app.id} app={app} index={index} />
                ))}

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center pointer-events-auto"
                >
                    <h1 className="m3-display-large font-black mb-6">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Build</span>
                        <br />
                        <span className="text-primary-foreground">Anything with AI</span>
                    </h1>

                    <p className="m3-headline-medium text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
                        Interact with the 3D showcase above to see examples of AI-generated applications
                    </p>

                    <M3Button
                        variant="filled"
                        size="lg"
                        className="px-8 py-4 text-xl font-bold"
                    >
                        Start Building Now
                    </M3Button>
                </motion.div>
            </div>

            {/* Interactive Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                <div className="flex gap-4">
                    {appExamples.map((app) => (
                        <motion.button
                            key={app.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedApp(app)}
                            className="p-3 bg-surface-container/80 backdrop-blur-sm rounded-xl border border-outline hover:border-primary transition-colors m3-ripple"
                        >
                            <span className="text-2xl">{app.icon}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* App Details Modal */}
            {selectedApp && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-surface/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
                    onClick={() => setSelectedApp(null)}
                >
                    <M3Card
                        variant="elevated"
                        className="max-w-md mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <M3CardHeader className="text-center">
                            <div className="text-4xl mb-4">{selectedApp.icon}</div>
                            <M3CardTitle className="m3-headline-medium font-bold text-foreground mb-2">
                                {selectedApp.title}
                            </M3CardTitle>
                            <p className="m3-body-medium text-muted-foreground mb-6">
                                {selectedApp.description}
                            </p>
                        </M3CardHeader>
                        <M3CardContent className="text-center">
                            <M3Button
                                variant="filled"
                                size="default"
                                className="w-full"
                            >
                                Generate This App
                            </M3Button>
                        </M3CardContent>
                    </M3Card>
                </motion.div>
            )}
        </div>
    )
} 