import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Modal } from "react-native";
import { useState, useEffect } from "react"
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";

export default function ListaCaronas() {
    const user = auth.currentUser;
    const [usuario, setUsuario] = useState([]);
    const [caronas, setCaronas] = useState([]);
    const [caronaSelecionada, setCaronaSelecionada] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        carregarCaronas();
        carregarPerfil();
    }, []);

    async function carregarPerfil() {
        try {
            const user = auth.currentUser;

            if (!user) {
                console.log("Usuário não logado");
                return;
            }

            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const dados = docSnap.data();

                setUsuario({
                    id: user.uid,
                    nome: dados.nome
                });

                console.log("Usuário carregado:", dados.nome);
            } else {
                console.log("Documento não existe");
            }

        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        }
    }
    async function carregarCaronas() {
        try {
            const response = await fetch("http://192.168.0.8:3000/caronas");
            const data = await response.json();

            // filtrar só ativas
            const ativas = data.filter(c => c.status === "ativa");

            setCaronas(ativas);
        } catch (error) {
            console.log(error);
        }
    }

    async function entrarCarona(carona) {
        try {
            console.log(carona.id);
            const response = await fetch(`http://192.168.0.8:3000/caronas/${carona.id}/entrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id_usuario: user.uid }) // Substitua pelo ID do usuário logado
            });
            const data = await response.json();
            console.log("Entrou na carona:", data);
        } catch (error) {
            console.error("Erro ao entrar na carona:", error);
        }
    }
    
    function abrirModal(item) {
        setCaronaSelecionada(item);
        console.log(item);
    
        setModalVisible(true);
    }

    function formatarData(timestamp) {
        if (!timestamp?._seconds) return "";
        const data = new Date(timestamp._seconds * 1000);
        return data.toLocaleString();
    }

    return (
        <FlatList
            data={caronas}
            keyExtractor={(item) => item.id}

            numColumns={2}

            contentContainerStyle={styles.container}

            ListHeaderComponent={
                <>
                    <View style={styles.topBar}>
                        <Image source={require("../../assets/logo.png")} style={styles.logoSmall} />
                        <Text style={styles.topBarTitle}>Lista de Caronas</Text>
                        <View style={styles.notificationDot} />
                    </View>

                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingTitle}>Oi, {usuario?.nome}!</Text>
                        <Text style={styles.greetingSubtitle}>Bom dia</Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Pesquisar caronas..."
                            placeholderTextColor="#bbb"
                        />
                    </View>

                    <View style={styles.welcomeCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
                            <Text style={styles.welcomeSubtitle}>Pesquise caronas disponíveis!</Text>
                        </View>
                        <Image source={require("../../assets/logo.png")} style={styles.welcomeImage} />
                    </View>

                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionHeader}>Caronas em andamento</Text>
                        <Text style={styles.sectionViewAll}>ver todas</Text>
                    </View>

                    <Modal visible={modalVisible} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                            
                            <Text style={styles.welcomeTitle}>Detalhes da Carona</Text>
                            <Text style={styles.welcomeSubtitle}>Motorista: {caronaSelecionada?.motorista_nome}</Text>
                            <Text style={styles.welcomeSubtitle}>
                                Vagas disponíveis: {caronaSelecionada ? 
                                caronaSelecionada.vagas - caronaSelecionada.passageiros.length : 0}
                            </Text>
                            <Text style={styles.welcomeSubtitle}>Passageiros: {caronaSelecionada?.passageiros.map(p => p.nome).join(", ") || "Nenhum"}</Text>

                            <Text>{caronaSelecionada?.origem} → {caronaSelecionada?.destino}</Text>
                            <Text>{formatarData(caronaSelecionada?.data_hora)}</Text>
                            <Text style={styles.welcomeSubtitle}>Status: {caronaSelecionada?.status}</Text>

                            <TouchableOpacity onPress={() => entrarCarona(caronaSelecionada)} style={styles.exitButton}>
                                <Text style={{color: "#fff"}}>Entrar na carona</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.exitButton}>
                                <Text style={{color: "#fff"}}>Fechar</Text>
                            </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>

                </>
            }

            renderItem={({ item }) => (
                <TouchableOpacity style={styles.caronaCard} onPress={() => abrirModal(item)}>
                    <View>
                        <Text style={styles.caronaCardTitle}>
                            {item.origem} → {item.destino}
                        </Text>

                        <Text style={styles.caronaCardSubtitle}>
                            {formatarData(item.data_hora)}
                        </Text>

                        <Text style={styles.caronaCardSubtitle}>
                            {item.vagas} vagas
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 32,
        backgroundColor: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
    },
    exitButton: {
        marginTop: 20,
        backgroundColor: '#49be39',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    logoSmall: {
        width: 36,
        height: 36,
        borderRadius: 8,
    },
    topBarTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
        color: '#222',
    },
    notificationDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#49be39',
    },
    greetingContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    greetingTitle: {
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        color: '#222',
    },
    greetingSubtitle: {
        fontSize: 16,
        color: '#49be39',
        marginTop: 2,
        fontFamily: "Poppins_400Regular",
        marginBottom: 10,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        color: '#222',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    welcomeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eafbe7',
        borderRadius: 18,
        marginHorizontal: 20,
        marginTop: 18,
        padding: 18,
    },
    welcomeTitle: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: '#49be39',
    },
    welcomeSubtitle: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: '#222',
    },
    welcomeImage: {
        width: 60,
        height: 60,
        marginLeft: 10,
        borderRadius: 12,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 8,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: '#222',
    },
    sectionViewAll: {
        fontSize: 14,
        color: '#49be39',
        fontFamily: "Poppins_600SemiBold",
    },
    caronaCard: {
        backgroundColor: '#49be39',
        borderRadius: 16,
        flex: 1,
        margin: 10,
        padding: 16,
    },
    caronaCardTitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 6,
    },
    caronaCardSubtitle: {
        color: '#fff',
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
    },
});
