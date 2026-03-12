import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
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
            <View style={styles.welcomeContainer}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
                <Text style={styles.textUpper}>ENCONTRE OU OFEREÇA</Text>
                <Text style={styles.welcome}> caronas entre alunos do IFMS.</Text>
            </View>
            <LinearGradient colors={['#49be39', '#122e13']} style={styles.content}>
                <Text style={styles.title}>Carona IFMS</Text>
                <Text style={styles.subtitle}>Facilite suas viagens e economize combustível</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={TelaLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={TelaCadastro}>
                        <Text style={[styles.buttonText, styles.outlineText]}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: '#000',
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    welcomeContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 110,
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
        marginBottom: 10,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
    },
    textUpper: {
        backgroundColor: '#3a992e',
        color: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 10,
    },
    content: {
        alignItems: 'center',
        backgroundColor: '#3a992e',
        width: '100%',
        padding: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        bottom: 0,
        height: '45%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#4CAF50',
        width: '45%',
        paddingVertical: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    outlineButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#d2ecd3',
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