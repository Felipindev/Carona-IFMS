import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    async function  HandleLogin() {
        try {
            const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        const user = userCredential.user;

        console.log("Usuário logado:", user.email);

        if (rememberMe) {
            await AsyncStorage.setItem("rememberMe", "true")
        } else {
            await AsyncStorage.removeItem("rememberMe")
        }

        navigation.replace("Tabs");
        } catch (error) {
            console.log("Erro:", error)
            alert("Erro ao conectar com servidor")
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            const lembrar = await AsyncStorage.getItem("rememberMe");

            console.log("USER:", user?.email);
            console.log("LEMBRAR:", lembrar);

            // se existe usuário E lembrar-me está ativado
            if (user && lembrar === "true") {
                navigation.replace("Tabs");
            }
        });

        return unsubscribe;
    }, [])

    return (
        <LinearGradient
            colors={['#49be39', '#0c2e08']}
            style={styles.container}
        >
            <View style={styles.circle}>
                <Text style={styles.text}>Bem-vindo de volta!</Text>
                <Text style={styles.subtitle}>Entre para continuar usando o Carona IFMS</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#777"
                        value={email}
                        onChangeText={setEmail}
                    />
                <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#777"
                            secureTextEntry={!mostrarSenha}
                            value={senha}
                            onChangeText={setSenha}
                        />
                        <TouchableOpacity
                            onPress={() => setMostrarSenha(!mostrarSenha)}
                            style={styles.showPassword}
                        >
                            <Text style={{ color: '#777', fontSize: 12 }}>
                                {mostrarSenha ? 'Ocultar Senha' : 'Mostrar Senha'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.options}>
                        <View style={styles.rememberContainer}>
                            <Switch 
                                value={rememberMe}
                                onValueChange={setRememberMe}
                            />
                            <Text style={styles.optionText}>Lembrar-me</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forgot}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Não tem uma conta?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cadastro')}
                        >
                            <Text style={styles.registerLink}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    circle: {
        backgroundColor: '#fff',
        alignItems: 'center',
        width: "100%",
        height: "70%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        bottom: 0,
        padding: 30
    },

    text: {
        fontSize: 26,
        fontFamily: 'Poppins_700Bold',
        marginTop: 20,
        color: "#000"
    },

    subtitle: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#666",
        marginTop: 5,
        marginBottom: 25,
        textAlign: "center"
    },

    form: {
        width: "100%",
        alignItems: "center"
    },

    passwordContainer: {
        width: "100%",
        position: "relative",

    },

    showPassword: { 
        position: 'absolute', 
        right: 15, 
        top: 13, 
        backgroundColor: '#fff', 
        fontSize: 10,
        padding: 5, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc', 
    },

    input: {
        width: "100%",
        height: 55,
        backgroundColor: "#f3f3f3",
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontFamily: "Poppins_400Regular",
        fontSize: 14
    },

    options: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25
    },

    rememberContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    optionText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 13,
        color: "#333"
    },

    forgot: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
        color: "#138309"
    },

    button: {
        width: "100%",
        height: 55,
        backgroundColor: "#138309",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    },

    textButton: {
        fontFamily: "Poppins_600SemiBold",
        color: "#fff",
        fontSize: 16
    },

    registerContainer: {
        flexDirection: "row",
        marginTop: 25,
        gap: 5
    },

    registerText: {
        fontFamily: "Poppins_400Regular",
        color: "#444",
        fontSize: 14
    },

    registerLink: {
        fontFamily: "Poppins_600SemiBold",
        color: "#138309",
        fontSize: 14
    }

})
