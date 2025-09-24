import { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import { router } from "expo-router";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { api } from "@/services/api";
import { fontFamily, colors } from "@/styles/theme";
import { Categories, type CategoriesProps } from "@/components/categories";
import { Places } from "@/components/places";
import type { PlaceProps } from "@/components/place";

type EstablishmentProps = PlaceProps & {
	latitude: number;
	longitude: number;
};

const currentLocation = {
	latitude: -23.561187293883442,
	longitude: -46.656451388116494,
};

export default function Home() {
	const [categories, setCategories] = useState<CategoriesProps>([]);
	const [category, setCategory] = useState<string>("");
	const [establishments, setEstablishments] = useState<EstablishmentProps[]>(
		[],
	);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const { data } = await api.get("/categories");
				setCategories(data);
				setCategory(data[0].id);
			} catch (_error) {
				Alert.alert("Categorias", "Não foi possível carregar as categorias.");
			}
		}

		fetchCategories();
	}, []);

	useEffect(() => {
		async function fetchEstablishments() {
			try {
				if (!category) return;

				const { data } = await api.get(`/markets/category/${category}`);
				setEstablishments(data);
			} catch (_error) {
				Alert.alert("Locais", "Não foi possível carregar os locais.");
			}
		}

		fetchEstablishments();
	}, [category]);

	return (
		<View style={{ flex: 1, backgroundColor: "#CECECE" }}>
			<Categories
				data={categories}
				onSelect={setCategory}
				selected={category}
			/>

			<MapView
				provider={PROVIDER_GOOGLE}
				style={{ flex: 1 }}
				initialRegion={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker
					identifier="current"
					coordinate={{
						latitude: currentLocation.latitude,
						longitude: currentLocation.longitude,
					}}
					image={require("@/assets/location.png")}
				/>

				{establishments.map((item) => (
					<Marker
						key={item.id}
						identifier={item.id}
						coordinate={{
							latitude: item.latitude,
							longitude: item.longitude,
						}}
						image={require("@/assets/pin.png")}
					>
						<Callout
							onPress={() => router.navigate(`/establishment/${item.id}`)}
						>
							<View>
								<Text
									style={{
										fontSize: 14,
										color: colors.gray[600],
										fontFamily: fontFamily.medium,
									}}
								>
									{item.name}
								</Text>
								<Text
									style={{
										fontSize: 12,
										color: colors.gray[600],
										fontFamily: fontFamily.regular,
									}}
								>
									{item.address}
								</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<Places data={establishments} />
		</View>
	);
}
