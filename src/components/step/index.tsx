import type { LucideProps } from "lucide-react-native";
import { View, Text } from "react-native";
import { colors } from "@/styles/theme";
import { styles } from "./styles";

type StepProps = {
	title: string;
	description: string;
	icon: React.ComponentType<LucideProps>;
};

export function Step({ title, description, icon: Icon }: StepProps) {
	return (
		<View style={styles.container}>
			{Icon && <Icon size={32} color={colors.red.base} />}
			<View style={styles.details}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
	);
}
