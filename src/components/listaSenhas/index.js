import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from "react-native";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import Icon from "@expo/vector-icons/Ionicons";

export const ListaSenhas = ({item, removerSenha}) => {
	const [icone, setIcone] = useState("md-copy");
	const [verSenha, setVerSenha] = useState(true);
	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(item)
			.then(() => {
				setIcone("checkmark");
				setTimeout(() => {
					setIcone("md-copy");
				}, 800);
			});

		ToastAndroid.show("Senha copiada com sucesso.", 2000);

	};
	return(
		<View style={styles.container}>
			<View style={styles.pegarSenha}>
				<View style={styles.viewPegarSenha}>
					<Text style={styles.pegarSenhaTexto} numberOfLines={1} adjustsFontSizeToFit>{verSenha ? "*".repeat(item.length) : item}</Text> 
					<Text style={styles.textoTamahoSenha}>Senha com {item.length} caracteres.</Text>
					{/* item.replace(/./g, "*") */}
				</View>
				<TouchableOpacity style={styles.pegarSenhaBtn} onPress={copyToClipboard}>
					<Icon name={icone} size={24} color={icone === "md-copy" ? "#FFF" : "#00FF00"} />
				</TouchableOpacity>

				<TouchableOpacity style={styles.excluirSenhaBtn} onPress={() => setVerSenha(anterior => !anterior)}>
					<Icon name={verSenha ? "eye" : "eye-off"} size={24} color= "#FFF" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.excluirSenhaBtn} onPress={() => removerSenha(item)}>
					<Icon name={"close-circle"} size={24} color= "#FFF" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	pegarSenha: {
		width: "90%",
		flexDirection: "row",
		padding: 12,
		borderRadius: 10,
		marginVertical: 10,
		backgroundColor: "#404040",
		elevation: 4,
	},
	viewPegarSenha: {
		width: "70%",
	},
	pegarSenhaTexto: {
		color: "#EFEFEF",
		fontSize: 16,
		fontWeight: "500",
		textAlign: "left",
	},
	textoTamahoSenha: {
		fontSize: 12,
		fontWeight: "500",
		color: "#00FF00"
	},
	pegarSenhaBtn: {
		width: "10%",
		justifyContent: "center",
		alignItems: "center"
	},
	excluirSenhaBtn: {
		width: "10%",
		justifyContent: "center",
		alignItems: "center"
	}
});