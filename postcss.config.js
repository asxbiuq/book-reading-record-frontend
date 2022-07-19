import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
import nesting from '@tailwindcss/nesting'
import postFailOnWarn from 'postcss-fail-on-warn'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from "autoprefixer";


export default {
  plugins: [postFailOnWarn,postcssPresetEnv,nesting,tailwind(tailwindConfig),autoprefixer],
}
