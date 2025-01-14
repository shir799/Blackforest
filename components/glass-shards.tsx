'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface Shard {
  id: number
  x: number
  y: number
  size: number
  rotation: number
}

export default function GlassShards() {
  const [shards, setShards] = useState<Shard[]>([])
  const { scrollY } = useScroll()

  useEffect(() => {
    // Generate random shards
    const newShards = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20, // 20 to 80
      rotation: Math.random() * 360,
    }))
    setShards(newShards)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shards.map((shard) => (
        <ShardElement key={shard.id} shard={shard} scrollY={scrollY} />
      ))}
    </div>
  )
}

function ShardElement({ shard, scrollY }: { shard: Shard; scrollY: MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 1000], [0, shard.y * 3])
  const scale = useTransform(scrollY, [0, 500], [1, 1 + shard.size / 50])
  const rotate = useTransform(scrollY, [0, 1000], [0, shard.rotation])
  const opacity = useTransform(scrollY, [0, 500], [0.2, 0.4])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${shard.x}%`,
        top: `${shard.y}%`,
        y,
        scale,
        rotate,
        opacity,
      }}
      className="glass-shard"
    >
      <div
        style={{
          width: `${shard.size}px`,
          height: `${shard.size}px`,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
        }}
      />
    </motion.div>
  )
}

