import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
import nesting from '@tailwindcss/nesting'
import postFailOnWarn from 'postcss-fail-on-warn'
import postcssPresetEnv from 'postcss-preset-env'

export default {
  plugins: [nesting,tailwind(tailwindConfig),postFailOnWarn,postcssPresetEnv({ stage: 3 })],
}
