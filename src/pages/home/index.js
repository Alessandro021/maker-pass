import { StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native";
import { useState } from "react";
import LottieView from "lottie-react-native";
import Slider from "@react-native-community/slider";

import Logo from "../../assets/logo-cadeado.json";
import {ModalSenha} from "../../components/modal";

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%&*";

export const Home = () => {
  
	const minimumValue = 6;
	const maximumValue = 25;

	const [value, setValue] = useState(minimumValue);
	const [senha, setSenha] = useState(null);
	const [modalVisivel, setModalVisivel] = useState(false);

	const gerarSenha = () => {

		let senha = "";
		let cont = 1;
		while(cont <= value){
			senha +=charset.charAt(Math.floor(Math.random() * charset.length));
			cont++;
		}

		setSenha(senha);
		setModalVisivel(true);
	};

	// console.log(senha);
	return (
		<View style={styles.container} >
			<LottieView
				autoPlay
				style={styles.logo}
				source={Logo}
			/>

			<Text style={styles.caracteres}>{value} caracteres</Text>

			<View style={styles.viewArea}>
				<Slider
					style={{width: "90%", height: 40}}
					minimumValue={minimumValue}    
					maximumValue={maximumValue}
					thumbTintColor={"#FE5000"}
					minimumTrackTintColor="#404040"
					maximumTrackTintColor="#BDBDBD"
					value={value}
					onValueChange={value => setValue(value.toFixed(0))}
				/>
			</View>
			<TouchableOpacity style={styles.btn} onPress={gerarSenha} activeOpacity={0.5} >
				<Text style={styles.btnText}>Gerar Senha</Text>
			</TouchableOpacity>

			<Modal visible={modalVisivel} animationType="fade" transparent onRequestClose={() => setModalVisivel(false)}>
				<ModalSenha senha={senha} handleClose={() => setModalVisivel(false)} />
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EFEFEF",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: "65%",
		marginBottom: 50
	},
	caracteres: {
		fontSize: 24,
		fontWeight: "bold"
	},
	viewArea : {
		marginVertical: 20,
		marginTop: 40,
		width: "75%",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 50,
		elevation: 2,
	},
	btn: {
		width: "75%",
		height: 50,
		marginBottom: 20,
		backgroundColor: "#FE5000",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		elevation: 4,
	},
	btnText: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "bold",
	}
});
