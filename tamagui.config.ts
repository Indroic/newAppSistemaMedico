import { tokens, fonts } from '@tamagui/config/v3'
import { createAnimations } from '@tamagui/animations-moti'
import * as themes from './themes'
import { createTamagui } from 'tamagui'


export const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
})

 
export const tamaguiConfig = createTamagui({
  tokens: tokens,
  themes: themes,
  fonts: fonts,
  animations: animations
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}