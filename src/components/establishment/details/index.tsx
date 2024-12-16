import { View, Text } from "react-native";
import { Phone, MapPin, Ticket } from "lucide-react-native";
import { styles } from "./styles";
import { Info } from "@/components/establishment/info";

export type PropsDetails = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
}

type Props = {
  data: PropsDetails;
}

export function Details({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {data.name}
      </Text>
      <Text style={styles.description}>
        {data.description}
      </Text>

      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>

        {data.coupons === 1 ? (
          <Info icon={Ticket} description={`${data.coupons} cupom disponível`} />
        ) : (
          <Info icon={Ticket} description={`${data.coupons} cupons disponíveis`} />
        )}
        <Info icon={MapPin} description={data.address} />
        <Info icon={Phone} description={data.phone} />
      </View>

      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={styles.rule}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
    </View>
  )
}