import { Pencil, Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonAdd from "./ButtonAdd"; // Certifique-se de que esse componente também está adaptado para React Native

export function SectionListWithActions({ title, onAdd, children }) {
  return (
    <View
      style={{
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: "#6B7280",
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
        <ButtonAdd onPress={() => onAdd(title)} />
      </View>
      <View style={{ gap: 8 }}>{children}</View>
    </View>
  );
}

export function SectionListWithActionsItem({ value, title, onEdit, onDelete }) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text style={{ flex: 1 }}>{value}</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          onPress={onEdit}
          accessibilityLabel={`Editar ${title}`}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Pencil color="green" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          accessibilityLabel={`Excluir ${title}`}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Trash2 color="red" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default { SectionListWithActions, SectionListWithActionsItem };
