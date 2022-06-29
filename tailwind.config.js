module.exports={
	content:[
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme:{
		extend:{},
	},
	plugins:[
    require("daisyui"),
    {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    }
  ],
	daisyui: {
    styled: true,
    themes: ["cupcake", "dark", "cmyk"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "p-",
    darkTheme: "dark",
  },
}
