module.exports = {
	name: "nearby-app",
	slug: "nearby-app",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/images/icon.png",
	userInterfaceStyle: "automatic",
	newArchEnabled: true,
	scheme: "nearby-app",
	splash: {
		image: "./assets/images/splash-icon.png",
		resizeMode: "contain",
		backgroundColor: "#257F49",
	},
	ios: {
		supportsTablet: true,
	},
	android: {
		versionCode: 1,
		package: "com.app.nearby_app",
		adaptiveIcon: {
			foregroundImage: "./assets/images/adaptive-icon.png",
			backgroundColor: "#257F49",
		},
		edgeToEdgeEnabled: true,
	},
	web: {
		bundler: "metro",
		favicon: "./assets/images/favicon.png",
	},
	plugins: [
		"expo-font",
		"expo-router",
		"expo-web-browser",
		[
			"react-native-maps",
			{
				iosGoogleMapsApiKey: process.env.EXPO_PUBLIC_IOS_GOOGLE_MAPS_API_KEY,
				androidGoogleMapsApiKey:
					process.env.EXPO_PUBLIC_ANDROID_GOOGLE_MAPS_API_KEY,
			},
		],
	],
	experiments: {
		typedRoutes: true,
	},
};
