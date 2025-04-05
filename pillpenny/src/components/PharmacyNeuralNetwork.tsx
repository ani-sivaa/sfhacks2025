'use client';

import { useEffect, useRef } from 'react';

interface PharmaNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  energy: number;
  type: 'pill' | 'capsule' | 'molecule' | 'flask' | 'dna';
  rotation: number;
  rotationSpeed: number;
}

export default function PharmacyNeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    // Initialize variables
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInCanvas = false;
    let animationFrameId: number;
    
    const nodes: PharmaNode[] = [];
    
    const maxDistance = 180;
    const mouseRadius = 250;
    const mouseInfluence = 1.5;
    const numNodes = 100;
    
    // Color themes
    const colors = {
      pill: { base: 'rgba(0, 243, 255, ', accent: 'rgba(0, 200, 255, ' },       // Neon blue
      capsule: { base: 'rgba(181, 55, 242, ', accent: 'rgba(150, 50, 230, ' },  // Neon purple
      molecule: { base: 'rgba(0, 255, 140, ', accent: 'rgba(0, 230, 120, ' },   // Neon green
      flask: { base: 'rgba(255, 215, 0, ', accent: 'rgba(230, 190, 0, ' },      // Gold
      dna: { base: 'rgba(255, 80, 180, ', accent: 'rgba(230, 60, 150, ' }       // Pink
    };

    // Create initial node distribution
    for (let i = 0; i < numNodes; i++) {
      const nodeTypes: PharmaNode['type'][] = ['pill', 'capsule', 'molecule', 'flask', 'dna'];
      const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2.5 + 1.5,
        energy: 0,
        type,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      });
    }

    function updateNode(node: PharmaNode) {
      // Update rotation
      node.rotation += node.rotationSpeed * (node.energy * 2 + 0.5);
      
      // Mouse interaction
      if (isMouseInCanvas) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          node.energy = Math.min(1, node.energy + 0.12);
          
          if (distance > 50) {
            node.vx += (dx / distance) * force * mouseInfluence;
            node.vy += (dy / distance) * force * mouseInfluence;
          } else {
            node.vx -= (dx / distance) * force * mouseInfluence * 2;
            node.vy -= (dy / distance) * force * mouseInfluence * 2;
          }
        }
      }

      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Add some random movement
      node.vx += (Math.random() - 0.5) * 0.2;
      node.vy += (Math.random() - 0.5) * 0.2;

      // Apply damping
      node.vx *= 0.98;
      node.vy *= 0.98;

      // Keep within bounds
      if (node.x < 0 || node.x > window.innerWidth) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(window.innerWidth, node.x));
      }
      if (node.y < 0 || node.y > window.innerHeight) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(window.innerHeight, node.y));
      }

      // Gradually reduce energy
      node.energy = Math.max(0, node.energy - 0.015);
    }

    function drawPill(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      
      ctx.beginPath();
      ctx.roundRect(-size * 3, -size, size * 6, size * 2, size);
      ctx.fill();
      
      ctx.restore();
    }
    
    function drawCapsule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      
      // Draw capsule
      ctx.beginPath();
      ctx.roundRect(-size * 4, -size, size * 8, size * 2, size);
      ctx.fill();
      
      // Draw dividing line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      
      ctx.restore();
    }
    
    function drawMolecule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      
      // Draw central atom
      ctx.beginPath();
      ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw orbital atoms
      for (let i = 0; i < 3; i++) {
        const angle = (i * 120) * Math.PI / 180;
        const orbitX = Math.cos(angle) * size * 4;
        const orbitY = Math.sin(angle) * size * 4;
        
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bonds
        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = size / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(orbitX, orbitY);
        ctx.stroke();
      }
      
      ctx.restore();
    }
    
    function drawFlask(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      
      // Draw flask body
      ctx.beginPath();
      ctx.moveTo(-size * 2, -size * 4);
      ctx.lineTo(-size * 2, -size * 2);
      ctx.lineTo(-size * 3, size * 2);
      ctx.lineTo(size * 3, size * 2);
      ctx.lineTo(size * 2, -size * 2);
      ctx.lineTo(size * 2, -size * 4);
      ctx.closePath();
      ctx.fill();
      
      // Draw liquid
      const liquidColor = typeof ctx.fillStyle === 'string' 
        ? ctx.fillStyle.replace(')', ', 0.7)').replace('rgba', 'rgba') 
        : 'rgba(0, 0, 0, 0.7)'; // Fallback color
      ctx.fillStyle = liquidColor;
      ctx.beginPath();
      ctx.moveTo(-size * 3, size * 2);
      ctx.lineTo(size * 3, size * 2);
      ctx.lineTo(size * 2, 0);
      ctx.lineTo(-size * 2, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    }
    
    function drawDNA(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      
      const helixWidth = size * 3;
      const helixHeight = size * 8;
      const steps = 4;
      
      // Draw helix backbones
      for (let backbone = -1; backbone <= 1; backbone += 2) {
        ctx.beginPath();
        ctx.moveTo(backbone * helixWidth, -helixHeight/2);
        
        for (let i = 0; i <= steps; i++) {
          const normalized = i / steps;
          const waveY = helixHeight * (normalized - 0.5);
          const waveX = Math.sin(normalized * Math.PI * 2) * helixWidth * backbone;
          
          if (i === 0) {
            ctx.moveTo(waveX, waveY);
          } else {
            ctx.lineTo(waveX, waveY);
          }
        }
        
        ctx.stroke();
      }
      
      // Draw base pairs connecting the helixes
      for (let i = 0; i <= steps; i++) {
        const normalized = i / steps;
        const y = helixHeight * (normalized - 0.5);
        const leftX = Math.sin(normalized * Math.PI * 2) * helixWidth * -1;
        const rightX = Math.sin(normalized * Math.PI * 2) * helixWidth;
        
        // Draw connector
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
        
        // Draw nucleotides
        ctx.beginPath();
        ctx.arc(leftX, y, size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(rightX, y, size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }

    function drawNetwork() {
      if (!canvas || !ctx) return;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, 'rgba(10, 11, 30, 1)'); // cyber-dark
      gradient.addColorStop(1, 'rgba(5, 6, 20, 1)');   // cyber-darker
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Update all nodes
      nodes.forEach(node => updateNode(node));

      // Draw connections
      ctx.globalCompositeOperation = 'lighter';
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i >= j) return;
          
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const combinedEnergy = Math.max(node.energy, other.energy);
            const baseOpacity = (1 - distance / maxDistance);
            const opacity = Math.min(0.8, baseOpacity * (0.2 + combinedEnergy * 0.8));
            
            // Node interaction forces
            const force = (maxDistance - distance) / maxDistance;
            if (distance < 50) {
              node.vx -= (dx / distance) * force * 0.5;
              node.vy -= (dy / distance) * force * 0.5;
              other.vx += (dx / distance) * force * 0.5;
              other.vy += (dy / distance) * force * 0.5;
            } else if (node.energy > 0.2 || other.energy > 0.2) {
              node.vx += (dx / distance) * force * 0.2;
              node.vy += (dy / distance) * force * 0.2;
              other.vx -= (dx / distance) * force * 0.2;
              other.vy -= (dy / distance) * force * 0.2;
            }
            
            // Generate connection line gradient based on node types
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            gradient.addColorStop(0, colors[node.type].base + opacity + ')');
            gradient.addColorStop(1, colors[other.type].base + opacity + ')');
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + combinedEnergy * 1.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            
            // Draw small data packets traveling on active connections if energy is high
            if (combinedEnergy > 0.4) {
              const packetPos = (Date.now() % 1000) / 1000;
              const packetX = node.x + dx * packetPos;
              const packetY = node.y + dy * packetPos;
              
              ctx.beginPath();
              ctx.fillStyle = 'rgba(255, 255, 255, ' + combinedEnergy + ')';
              ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });

        // Draw glow effect for energized nodes
        if (node.energy > 0.1) {
          const nodeColor = colors[node.type].base;
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.size * (5 + node.energy * 5)
          );
          gradient.addColorStop(0, nodeColor + (0.3 * node.energy) + ')');
          gradient.addColorStop(1, nodeColor + '0)');
          
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(node.x, node.y, node.size * (5 + node.energy * 5), 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node
        const nodeOpacity = 0.6 + node.energy * 0.4;
        const nodeColor = colors[node.type].base + nodeOpacity + ')';
        ctx.fillStyle = nodeColor;
        ctx.strokeStyle = colors[node.type].accent + (nodeOpacity * 0.7) + ')';
        ctx.lineWidth = 0.5;
        
        // Draw different node types
        switch (node.type) {
          case 'pill':
            drawPill(ctx, node.x, node.y, node.size, node.rotation);
            break;
          case 'capsule':
            drawCapsule(ctx, node.x, node.y, node.size, node.rotation);
            break;
          case 'molecule':
            drawMolecule(ctx, node.x, node.y, node.size, node.rotation);
            break;
          case 'flask':
            drawFlask(ctx, node.x, node.y, node.size, node.rotation);
            break;
          case 'dna':
            drawDNA(ctx, node.x, node.y, node.size, node.rotation);
            break;
        }
      });

      animationFrameId = requestAnimationFrame(drawNetwork);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseInCanvas = true;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        isMouseInCanvas = true;
        e.preventDefault();
      }
    };

    const handleMouseLeave = () => {
      isMouseInCanvas = false;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchend', handleMouseLeave);
    drawNetwork();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ touchAction: 'none' }}
    />
  );
}