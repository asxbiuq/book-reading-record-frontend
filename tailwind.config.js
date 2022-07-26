module.exports={
	content:[
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme:{
		extend:{},
	},
	plugins:[require('daisyui'),require('tailwindcss-container-query')],
	daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "p-",
    darkTheme: "dark",
  },
}
