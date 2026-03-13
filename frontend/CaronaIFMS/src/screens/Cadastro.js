import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { auth } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function Cadastro() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    async function cadastrar() {
        try {
            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem!");
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                senha, 
                nome,
                whatsapp
            );
            const user = userCredential.user;
            console.log("Usuário criado:", user.email);
            navigation.navigate("Login");
        } catch (error) {
            alert(error.message);
        }
    }


    return(
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>          
                <Text style={styles.welcomeText}>Crie sua conta!</Text>
                <Text style={styles.text}>Preencha os campos abaixo para se cadastrar no Carona IFMS</Text>
            </View> 
            <View style={styles.circle}> 
                <View style={styles.form}>
                    <TextInput style={styles.input} 
                        placeholder="Nome" 
                        placeholderTextColor="#777"
                        value={nome}
                        onChangeText={setNome}    
                    />
                    <TextInput style={styles.input} 
                        placeholder="E-mail" 
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#777"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput style={styles.input} 
                        placeholder="Senha" 
                        secureTextEntry 
                        placeholderTextColor="#777"
                        value={senha}
                        onChangeText={setSenha}
                    />
                    <TextInput style={styles.input} 
                        placeholder="Confirmar senha" 
                        secureTextEntry 
                        placeholderTextColor="#777"
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                    <TextInput style={styles.contact} 
                        placeholder="WhatsApp (opcional)" 
                        keyboardType="phone-pad" 
                        placeholderTextColor="#777"
                        value={whatsapp}
                        onChangeText={setWhatsapp}
                    />
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button2} onPress={cadastrar}>
                            <Text style={styles.textButton}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Já tem uma conta?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.registerLink}>Entrar</Text>
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
        height: "70%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        bottom: 0,
        padding: 30
    },
    welcomeContainer: {
        position: 'absolute',
        top: 120,
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
        marginTop: 2,
        textAlign: 'center',
        paddingHorizontal: 30
    },
    containerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        display: 'flex',  
    },
    textButton: {
        fontFamily: "Poppins_600SemiBold",
        color: "#fff",
        fontSize: 16
    },
    button2: {
        height: 55,
        backgroundColor: "#138309",
        borderRadius: 25,
        paddingHorizontal: 80,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
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
        padding: 25,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4
    },
    input: {
        width: '100%',
        height: 55,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontFamily: "Poppins_400Regular" 
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