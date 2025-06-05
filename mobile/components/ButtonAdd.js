import { TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

function ButtonAdd({ ...props }) {
  return (
    <TouchableOpacity {...props}>
      <Feather name="plus-circle" color="#a6a6a6" />
    </TouchableOpacity>
  );
}
export default ButtonAdd;
