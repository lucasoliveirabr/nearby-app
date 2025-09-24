import { View, Text } from "react-native";
import type { LucideProps } from "lucide-react-native";
import { styles } from "./styles";
import { colors } from "@/styles/theme";

type Props = {
	description: string;
	icon: React.ComponentType<LucideProps>;
};

export function Info({ icon: Icon, description }: Props) {
	return (
		<View style={styles.container}>
			<Icon size={16} color={colors.gray[400]} />
			<Text style={styles.text}>{description}</Text>
		</View>
	);
}
