import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";
import { View, Text, StyleSheet, FlatList, ToastAndroid} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListaSenhas } from "../../components/listaSenhas";

export const Senhas = () => {
	const {getItem, removeItem} = useStorage();
	const focused = useIsFocused();
	const [listaDeSenhas, setListaDeSenhas] = useState([]);

	const getSenhas = async () => {
		await getItem("senhas")
			.then(senhas => {
				setListaDeSenhas(senhas);
			});
	};

	const removerSenha = async (item) => {
		await removeItem("senhas", item)
			.then(senhas => {
				setListaDeSenhas(senhas);
			});

		ToastAndroid.show("Senha excluida com sucesso.", 2000);
	};

	const ListEmptyComponent = () => {
		return(
			<View style={styles.viewListaVazia}>
				<Text style={styles.textoListaVazia}>Nenhuma senha salva por enquanto.</Text>
			</View>
		);
	};

	useEffect(() => {
		getSenhas();
	},[focused]);

	const renderItem = useCallback(({item}) => {
		return(<ListaSenhas item={item} removerSenha={removerSenha} />);
	},[listaDeSenhas]);

	return (
		<SafeAreaView style={styles.containerSafeAreaView}>
			<View style={styles.header}>
				<Text style={styles.title}>Minhas senhas</Text>
			</View>

			<View style={styles.content}>
				<FlatList
					data={listaDeSenhas}
					keyExtractor={item => String(item)}
					renderItem={renderItem}
				/>
			</View>
			{listaDeSenhas.length === 0 &&(
				<ListEmptyComponent />
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	containerSafeAreaView: {
		flex: 1,
		backgroundColor: "#EFEFEF",
	},
	header: {
		backgroundColor: "#FE5000",
		width: "100%",
		height: "8%",
		justifyContent: "center",
	},
	title: {
		left: 15,
		fontSize: 18,
		color: "#FFFFFF",
		fontWeight: "900",
		textAlign: "left",
	},
	viewListaVazia: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	textoListaVazia: {
		fontSize: 16,
		fontWeight: "500",
	},
	content: {
		flex: 1,
		// marginTop: 20,
	}
});