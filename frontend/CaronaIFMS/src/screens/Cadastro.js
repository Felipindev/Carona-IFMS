import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro() {
    const navigation = useNavigation();

    function TelaLogin() {
        navigation.navigate('Login')
    }

    return(
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>          
                <Text style={styles.welcomeText}>Crie sua conta!</Text>
            </View> 
            <View style={styles.circle}> 
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Nome" />
                    <TextInput style={styles.input} placeholder="E-mail" />
                    <TextInput style={styles.input} placeholder="Senha" />
                    <TextInput style={styles.input} placeholder="Confirmar senha" />
                    <TextInput style={styles.contact} placeholder="Contato (opcional)" />
                    <View style={styles.containerButton}>
                        <Text style={styles.text}>Já tem uma conta?</Text>
                        <TouchableOpacity style={styles.button} onPress={TelaLogin}>
                            <Text style={styles.textButton}>Ir para Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        alignItems: 'center',
        backgroundColor: '#49be39',
        width: "100%",
        height: "65%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        bottom: 0,
        padding: 30
    },
    welcomeContainer: {
        position: 'absolute',
        top: 150,
        alignItems: 'center'
    },
    welcomeText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 24,
        color: '#000'
    },
    text:{
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#000',
        marginTop: 25
    },
    textButton: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#fff',
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: "#138309",
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 10
    },
    contact: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginTop: 10,
        fontFamily: 'Poppins_400Regular',

    },
    form: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontFamily: "Poppins_400Regular"
        
    },

})