import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
const useStorage = () => {
	const getItem = async (key) => {
		return await AsyncStorage.getItem(key)
			.then(response => {
				return JSON.parse(response) || [];
			})
			.catch(err => {
				console.log(`ERROR AO BUSCAR STORAGE: ${err}`);
				return [];
			});
	};

	const saveItem = async (key, value) => {
		let senhas = await getItem(key);
		
		if(senhas.includes(value)){
			ToastAndroid.show("Essa senha já esta salva.", 2000);
			return;
		}
		senhas?.unshift(value);

		ToastAndroid.show("Senha salvada com sucesso.", 2000);
		await AsyncStorage.setItem(key, JSON.stringify(senhas))
			.catch(err => {
				console.log(`ERROR AO SALVAR STORAGE: ${err}`);
			});
	};

	const removeItem = async (key, item) => {
		let senhas = await getItem(key)
			.then( senhas => senhas.filter((senhas) => {
				return (senhas !== item);
			}));

		await AsyncStorage.setItem(key, JSON.stringify(senhas))
			.catch(err => {
				console.log(`ERROR AO REMOVER STORAGE: ${err}`);
			});
        
		return senhas;
	};

	return { getItem, saveItem, removeItem };
};

export default useStorage;

