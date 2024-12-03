'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/toaster"
import { Copy, RefreshCw } from 'lucide-react'

type ColorScheme = 'monochromatic' | 'analogous' | 'complementary' | 'triadic'

function generateColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
}

function adjustHue(color: string, amount: number) {
  const hex = color.replace('#', '')
  const rgb = parseInt(hex, 16)
  const r = (rgb >> 16) & 0xFF
  const g = (rgb >> 8) & 0xFF
  const b = rgb & 0xFF
  
  const hsl = rgbToHsl(r, g, b)
  hsl[0] = (hsl[0] + amount) % 360
  const [r1, g1, b1] = hslToRgb(hsl[0], hsl[1], hsl[2])
  
  return '#' + ((1 << 24) + (r1 << 16) + (g1 << 8) + b1).toString(16).slice(1)
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255, g /= 255, b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return [h * 360, s, l]
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1/3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1/3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function isValidColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

function generateColorScheme(baseColor: string, scheme: ColorScheme, count: number): string[] {
  if (!isValidColor(baseColor)) {
    console.error('Invalid base color provided:', baseColor)
    return Array(count).fill('#000000')
  }

  const colors = [baseColor]
  const rgb = baseColor.match(/\w\w/g)?.map(x => parseInt(x, 16)) || []
  const hsl = rgbToHsl(rgb[0] || 0, rgb[1] || 0, rgb[2] || 0)

  switch (scheme) {
    case 'monochromatic':
      for (let i = 1; i < count; i++) {
        const l = Math.max(0, Math.min(1, hsl[2] + (i / count) * 0.6 - 0.3))
        colors.push('#' + hslToRgb(hsl[0], hsl[1], l).map(x => x.toString(16).padStart(2, '0')).join(''))
      }
      break
    case 'analogous':
      for (let i = 1; i < count; i++) {
        colors.push(adjustHue(baseColor, 30 * i))
      }
      break
    case 'complementary':
      colors.push(adjustHue(baseColor, 180))
      break
    case 'triadic':
      colors.push(adjustHue(baseColor, 120))
      colors.push(adjustHue(baseColor, 240))
      break
  }

  return colors
}

export default function ColorGenerator() {
  const [baseColorState, setBaseColorState] = useState(generateColor())
  const [scheme, setScheme] = useState<ColorScheme>('monochromatic')
  const [colorCount, setColorCount] = useState(5)
  const [colors, setColors] = useState(generateColorScheme(baseColorState, scheme, colorCount))

  const regenerateColors = () => {
    const newBaseColor = generateColor()
    setBaseColorState(newBaseColor)
    setColors(generateColorScheme(newBaseColor, scheme, colorCount))
  }

  const updateScheme = (newScheme: ColorScheme) => {
    setScheme(newScheme)
    setColors(generateColorScheme(baseColorState, newScheme, colorCount))
  }

  const updateColorCount = (newCount: number[]) => {
    setColorCount(newCount[0])
    setColors(generateColorScheme(baseColorState, scheme, newCount[0]))
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
  }

  const setBaseColor = (color: string) => {
    if (isValidColor(color)) {
      setBaseColorState(color)
      setColors(generateColorScheme(color, scheme, colorCount))
    } else {
      console.error('Invalid color input:', color)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Color Palette Generator
        </h1>
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="base-color">Base Color</Label>
              <div className="flex mt-2">
                <Input
                  id="base-color"
                  type="color"
                  value={baseColorState}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded mr-2"
                />
                <Input
                  type="text"
                  value={baseColorState}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="color-scheme">Color Scheme</Label>
              <RadioGroup
                id="color-scheme"
                value={scheme}
                onValueChange={(value) => updateScheme(value as ColorScheme)}
                className="flex flex-wrap gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monochromatic" id="monochromatic" />
                  <Label htmlFor="monochromatic">Monochromatic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="analogous" id="analogous" />
                  <Label htmlFor="analogous">Analogous</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complementary" id="complementary" />
                  <Label htmlFor="complementary">Complementary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="triadic" id="triadic" />
                  <Label htmlFor="triadic">Triadic</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-6">
            <Label htmlFor="color-count">Number of Colors: {colorCount}</Label>
            <Slider
              id="color-count"
              min={2}
              max={10}
              step={1}
              value={[colorCount]}
              onValueChange={updateColorCount}
              className="mt-2"
            />
          </div>
          <Button onClick={regenerateColors} className="mt-6">
            <RefreshCw className="mr-2 h-4 w-4" /> Generate New Colors
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div
                className="h-32 cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              />
              <div className="p-4 flex justify-between items-center">
                <span className="font-medium">{color}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(color)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  )
}

