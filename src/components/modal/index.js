import { StyleSheet, Text, View, TouchableOpacity, Pressable, ToastAndroid} from "react-native";
import * as Clipboard from "expo-clipboard";
import Icon from "@expo/vector-icons/Ionicons";
import { useState } from "react";

import useStorage from "../../hooks/useStorage";

export const ModalSenha = ({senha, handleClose}) =>{

	const [icone, setIcone] = useState("md-copy");
	const [senhaSalva, setSenhaSalva] = useState(false);


	const {saveItem} = useStorage();
	const handleOutsidePress = (event) => {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	};

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(senha)
			.then(() => {
				setIcone("checkmark");
				setTimeout(() => {
					setIcone("md-copy");
				}, 800);

				ToastAndroid.show("Senha copiada com sucesso", 2000);

			});
	};

	const handleSave = async () => {
		await saveItem("senhas", senha);
		setSenhaSalva(true);
	};

	return (
		<Pressable onPress={handleOutsidePress}  style={styles.constainer}>
			<View style={styles.modal}>
				<Text style={styles.title}>Senha gerada</Text>

				<View style={styles.pegarSenha}>
					<Text style={styles.pegarSenhaTexto} numberOfLines={1} adjustsFontSizeToFit>{senha}</Text>
					<TouchableOpacity style={styles.pegarSenhaBtn} onPress={copyToClipboard}>
						<Icon name={icone} size={24} color={icone === "md-copy" ? "#FFF" : "#00FF00"} />
					</TouchableOpacity>
				</View>

				<View style={styles.viewBotoes}>
					<TouchableOpacity style={[styles.btn, {backgroundColor: "#BDBDBD"}]} onPress={handleClose}>
						<Text style={styles.textoBtn}>Voltar</Text>
					</TouchableOpacity>
                    
					<TouchableOpacity style={[styles.btn, {backgroundColor: "#FE5000"}]} onPress={handleSave}>
						<Text style={styles.textoBtn}>{senhaSalva ? "Senha salva" : "salvar senha"}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	constainer: {
		flex: 1,
		backgroundColor: "rgba(24,24,24, 0.6)",
		alignItems: "center",
		justifyContent: "center",
	},
	modal: {
		width: "90%",
		backgroundColor: "#EFEFEF",
		borderRadius: 20,
		paddingVertical: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: "#000000",
		fontWeight: "bold",
		fontSize: 22,
		marginTop: 15,
	},
	pegarSenha: {
		width: "90%",
		flexDirection: "row",
		padding: 10,
		borderRadius: 10,
		marginVertical: 15,
		backgroundColor: "#404040",
	},
	pegarSenhaTexto: {
		width: "90%",
		color: "#EFEFEF",
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
	},
	pegarSenhaBtn: {
		width: "10%",
		justifyContent: "center",
		alignItems: "center"
	},
	viewBotoes: {
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
	},
	btn: {
		width: "48%",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderRadius: 10,
	},
	textoBtn: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "700",
	}
});