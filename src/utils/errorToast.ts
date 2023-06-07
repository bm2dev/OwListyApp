import Toast from 'react-native-toast-message';

export function errorToast(error: any) {
	!!error.response.data.mensagem
		? Toast.show({
				type: 'error',
				text1: error.response.data.message,
		  })
		: Toast.show({
				type: 'error',
				text1: 'Ocorreu um erro :/',
		  });
}
