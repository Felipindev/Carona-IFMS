import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { db } from "../services/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Perfil({ navigation }) {
  const user = auth.currentUser;
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState("");
  const [campus, setCampus] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  //states para edição
  const [nomeEdit, setNomeEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [tipoEdit, setTipoEdit] = useState("");
  const [campusEdit, setCampusEdit] = useState("");
  const [cursoEdit, setCursoEdit] = useState("");
  const [telefoneEdit, setTelefoneEdit] = useState("");
  const [fotoEdit, setFotoEdit] = useState("");
  const [podeDirigirEdit, setPodeDirigirEdit] = useState(false);

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

      setUsuario(dados);
      setNome(dados.nome);
      setCampus(dados.campus);
      setEmail(dados.email);
      setTelefone(dados.telefone);
      setCurso(dados.curso);
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  function abrirModal() {
    setNomeEdit(nome);
    setEmailEdit(auth.currentUser.email);
    setTipoEdit(usuario?.tipo || "");
    setCampusEdit(usuario?.campus || "");
    setCursoEdit(usuario?.curso || "");
    setTelefoneEdit(usuario?.telefone || "");
    setFotoEdit(usuario?.foto || "");
    setPodeDirigirEdit(usuario?.pode_dirigir || false);

    setModalVisivel(true);
  }

  async function salvarAlteracoes() {
    try {
      const user = auth.currentUser;

      await updateDoc(doc(db, "usuarios", user.uid), {
        nome: nomeEdit,
        email: emailEdit,
        tipo: tipoEdit,
        campus: campusEdit,
        curso: cursoEdit,
        telefone: telefoneEdit,
        foto: fotoEdit,
        pode_dirigir: podeDirigirEdit,
        atualizado_em: new Date()
      });

      setNome(nomeEdit);
      setEmail(emailEdit);
      setTelefone(telefoneEdit);
      setCurso(cursoEdit);
      setCampus(campusEdit);
      setUsuario({
        ...usuario,
        nome: nomeEdit,
        telefone: telefoneEdit,
        curso: cursoEdit,
        campus: campusEdit,
        tipo: tipoEdit,
        foto: fotoEdit,
        pode_dirigir: podeDirigirEdit
      });

      setModalVisivel(false);

    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  }

  return (
    <LinearGradient colors={["#49be39", "#0c2e08"]} style={styles.container}>
      <View style={styles.circle}>
        <Image
          source={{
            uri: usuario?.foto || "https://i.pravatar.cc/150"
          }}
          style={styles.avatar}
        />
        <Text style={styles.nome}>{usuario?.nome}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>{usuario?.telefone}</Text>
          <Text style={styles.label}>Curso</Text>
          <Text style={styles.value}>{usuario?.curso}</Text>
          <Text style={styles.label}>Campus</Text>
          <Text style={styles.value}>{usuario?.campus}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={abrirModal}>
          <Text style={styles.editText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={sair}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome"  
              value={nomeEdit}
              onChangeText={setNomeEdit}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={emailEdit}
              onChangeText={setEmailEdit}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Telefoe"
              value={telefoneEdit}
              onChangeText={setTelefoneEdit}
            />
            <TextInput 
              style={styles.modalInput}
              placeholder="Campus"
              value={campusEdit}
              onChangeText={setCampusEdit}
            />
            <TextInput 
              style={styles.modalInput}
              placeholder="Curso"
              value={cursoEdit}
              onChangeText={setCursoEdit}
            />

          <View style={styles.tipoContainer}>
            <TouchableOpacity
                style={[
                  styles.tipoButton,
                  tipoEdit === "aluno" && styles.tipoButtonAtivo
                ]}
                onPress={() => setTipoEdit("aluno")}
              >
                <Text
                  style={[
                    styles.tipoText,
                    tipoEdit === "aluno" && styles.tipoTextAtivo
                  ]}
                >
                  Aluno
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tipoButton,
                  tipoEdit === "servidor" && styles.tipoButtonAtivo
                ]}
                onPress={() => setTipoEdit("servidor")}
              >
                <Text
                  style={[
                    styles.tipoText,
                    tipoEdit === "servidor" && styles.tipoTextAtivo
                  ]}
                >
                  Servidor
                </Text>
              </TouchableOpacity>
          </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Pode dirigir</Text>
              <Switch
                value={podeDirigirEdit}
                onValueChange={setPodeDirigirEdit}
              />
            </View>


            <TouchableOpacity style={styles.modalButton} onPress={salvarAlteracoes}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "center",
  alignItems: "center"
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: 15,
    textAlign: "center"
  },
  modalInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular"
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10
  },
  tipoButton: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center"
  },
  tipoButtonAtivo: {
    backgroundColor: "#138309"
  },
  tipoText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#333"
  },
  tipoTextAtivo: {
    color: "#fff"
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  switchText: {
    fontFamily: "Poppins_600SemiBold"
  },
  modalButton: {
    backgroundColor: "#138309",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold"
  },
  modalCancel: {
    alignItems: "center",
    marginTop: 10
  },
  modalCancelText: {
    color: "#999",
    fontFamily: "Poppins_600SemiBold"
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
