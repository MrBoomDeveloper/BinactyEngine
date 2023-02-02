module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[ 'module-resolver', {
			root: ['./src'],
			extensions: ['.js', '.ts', '.tsx', '.json'],
			alias: {
				"@components": "./src/components",
				"@screens": "./src/screens",
				"@data": "./src/data",
				"@static": "./src/static",
				"@util": "./src/util"
			}
		}]
	]
}