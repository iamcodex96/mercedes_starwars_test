import { vi } from 'vitest'
import { config } from '@vue/test-utils'

global.vi = vi
config.global.plugins = []
