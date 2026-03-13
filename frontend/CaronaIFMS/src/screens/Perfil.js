import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Perfil({ navigation }) {
  const user = auth.currentUser;
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState("");

  async function sair() {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  }

  async function carregarPerfil() {
    const user = auth.currentUser;

    const docRef = doc(db, "usuarios", user.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();

      setNome(dados.nome);
      setTelefone(dados.telefone);
      setCurso(dados.curso);
    }
  }

    useEffect(() => {
        carregarPerfil();
    }, []);

  return (
    <LinearGradient colors={["#49be39", "#0c2e08"]} style={styles.container}>
      <View style={styles.circle}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>{telefone}</Text>
          <Text style={styles.label}>Curso</Text>
          <Text style={styles.value}>{curso}</Text>
          <Text style={styles.label}>Campus</Text>
          <Text style={styles.value}>IFMS Três Lagoas</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={sair}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#fff",
    width: "100%",
    height: "75%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    padding: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
  },
  nome: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    marginTop: 10,
  },
  email: {
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 20,
    marginTop: 25,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    marginTop: 10,
    color: "#333",
  },
  value: {
    fontFamily: "Poppins_400Regular",
    color: "#555",
  },
  editButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#138309",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  editText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
  },
  logoutButton: {
    marginTop: 15,
  },
  logoutText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#d00000",
  },
});
