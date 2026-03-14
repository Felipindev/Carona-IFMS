import { View, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";

export default function ListaCaronas() {
    return (
        <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
            <View style={styles.topBar}>
                <Image source={require("../../assets/logo.png")} style={styles.logoSmall} />
                <Text style={styles.topBarTitle}>Lista de Caronas</Text>
                <View style={styles.notificationDot} />
            </View>

            <View style={styles.greetingContainer}>
                <Text style={styles.greetingTitle}>Oi, Usuário!</Text>
                <Text style={styles.greetingSubtitle}>Bom dia</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput style={styles.input} placeholder="Pesquisar caronas..." placeholderTextColor="#bbb" />
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
            <ScrollView>
                <View style={styles.caronasGrid}>
                    <View style={styles.caronaCard}>
                        <Text style={styles.caronaCardTitle}>Carona 1</Text>
                        <Text style={styles.caronaCardSubtitle}>Progresso 80%</Text>
                    </View>
                    <View style={styles.caronaCard}>
                        <Text style={styles.caronaCardTitle}>Carona 2</Text>
                        <Text style={styles.caronaCardSubtitle}>Progresso 50%</Text>
                    </View>
                    <View style={styles.caronaCard}>
                        <Text style={styles.caronaCardTitle}>Carona 3</Text>
                        <Text style={styles.caronaCardSubtitle}>Progresso 40%</Text>
                    </View>
                    <View style={styles.caronaCard}>
                        <Text style={styles.caronaCardTitle}>Carona 4</Text>
                        <Text style={styles.caronaCardSubtitle}>Progresso 60%</Text>
                    </View>
                    <View style={styles.caronaCard}>
                        <Text style={styles.caronaCardTitle}>Carona 5</Text>
                        <Text style={styles.caronaCardSubtitle}>Progresso 60%</Text>
                    </View>
                    <View style={styles.caronaCard}>
                        <Text style={styles.caronaCardTitle}>Carona 6</Text>
                        <Text style={styles.caronaCardSubtitle}>Progresso 60%</Text>
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingBottom: 32,
        backgroundColor: '#fff',
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
        marginLeft: 8,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    welcomeTitle: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: '#49be39',
        marginBottom: 2,
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
    caronasGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    caronaCard: {
        backgroundColor: '#49be39',
        borderRadius: 16,
        width: '47%',
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
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