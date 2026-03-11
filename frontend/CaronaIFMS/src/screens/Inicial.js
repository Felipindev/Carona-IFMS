import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Inicial() {
    const navigation = useNavigation();

    function TelaLogin() {
        navigation.navigate('Login');
    }

    function TelaCadastro() {
        navigation.navigate('Cadastro');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Seja Bem-vindo!</Text>
            <Image source={require("../../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Carona IFMS</Text>
            <Text style={styles.subtitle}>Facilite suas caronas no IFMS</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={TelaLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={TelaCadastro}>
                    <Text style={[styles.buttonText, styles.outlineText]}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcome: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        fontWeight: '600',
        color: '#000',
        marginBottom: 20,
    },
    logo: {
        width: 300,
        height: 300,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Roboto-Bold',
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        backgroundColor: '#4CAF50',
        width: '45%',
        paddingVertical: 12,
        borderRadius: 8,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    outlineText: {
        color: '#4CAF50',
    },
});