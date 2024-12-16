import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { api } from "@/services/api";
import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import type { CategoriesProps } from "@/components/categories";
import type { PlaceProps } from "@/components/place";

type EstablishmentProps = PlaceProps;

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState<string>("");
  const [establishments, setEstablishments] = useState<EstablishmentProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }

  async function fetchEstablishments() {
    try {
      if (!category) return;
      
      const { data } = await api.get(`/markets/category/${category}`);
      setEstablishments(data);
    } catch (error) {
      Alert.alert("Locais", "Não foi possível carregar os locais.");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchEstablishments();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <Places data={establishments} />
    </View>
  )
}