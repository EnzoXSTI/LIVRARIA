import { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator
} from "react-native";

import {
    CameraView,
    useCameraPermissions
} from "expo-camera";

export default function CadastroDeLivro() {

    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");

    const [foto, setFoto] = useState(null);
    const [cameraAberta, setCameraAberta] = useState(false);

    const [carregando, setCarregando] = useState(false);

    const cameraRef = useRef(null);

    const [permission, requestPermission] = useCameraPermissions();


    // ==============================
    // ABRIR CÂMERA
    // ==============================
    async function abrirCamera() {

        if (!permission) {
            return;
        }

        if (!permission.granted) {

            const resposta = await requestPermission();

            if (!resposta.granted) {
                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de acesso à câmera para fotografar a capa do livro."
                );

                return;
            }
        }

        setCameraAberta(true);
    }


    // ==============================
    // TIRAR FOTO
    // ==============================
    async function tirarFoto() {

        try {

            if (!cameraRef.current) {
                return;
            }

            const imagem = await cameraRef.current.takePictureAsync({
                quality: 0.7
            });

            console.log(imagem);

            setFoto(imagem.uri);

            setCameraAberta(false);

        } catch (erro) {

            console.log(erro);

            Alert.alert(
                "Erro",
                "Não foi possível tirar a foto."
            );
        }
    }


    // ==============================
    // CADASTRAR LIVRO
    // ==============================
    async function cadastrarLivro() {

        if (
            !titulo ||
            !autor ||
            !categoria ||
            !descricao
        ) {

            Alert.alert(
                "Atenção",
                "Preencha todos os campos."
            );

            return;
        }

        if (!foto) {

            Alert.alert(
                "Atenção",
                "Tire uma foto da capa do livro."
            );

            return;
        }

        try {

            setCarregando(true);

            const formData = new FormData();

            formData.append("titulo", titulo);
            formData.append("autor", autor);
            formData.append("categoria", categoria);
            formData.append("descricao", descricao);
            formData.append("faixa_etaria", "10");


            // IMAGEM
            formData.append("imagem", {
                uri: foto,
                name: `livro-${Date.now()}.jpg`,
                type: "image/jpeg"
            });


            const response = await fetch(
                "https://apps-api-livros.ucxocw.easypanel.host/livros",
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6Iklnb3IgVGVzdGUiLCJlbWFpbCI6Imlnb3JAZW1haWwuY29tIiwiaWF0IjoxNzg4MjY5OTkwLCJleHAiOjE3ODgzMDU5OTB9.BGhEErTLF0FdpBAStIzLKtPmeFTjPy6ijKbVrFl1VQE",
                        "Content-Type": "multipart/form-data"

                    },

                    body: formData
                }
            );


            if (!response.ok) {

                const erro = await response.text();

                console.log("Erro da API:");
                console.log(erro);

                throw new Error(erro);
            }


            const dados = await response.json();

            console.log("Livro cadastrado:");
            console.log(dados);


            Alert.alert(
                "Sucesso",
                "Livro cadastrado com sucesso!"
            );


            // Limpa formulário
            setTitulo("");
            setAutor("");
            setCategoria("");
            setDescricao("");
            setFoto(null);


        } catch (erro) {

            console.log(erro);

            Alert.alert(
                "Erro",
                "Não foi possível cadastrar o livro."
            );

        } finally {

            setCarregando(false);
        }
    }


    // ==============================
    // CÂMERA
    // ==============================
    if (cameraAberta) {

        return (

            <View style={styles.cameraContainer}>

                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing="back"
                />

                <View style={styles.cameraBotoes}>

                    <TouchableOpacity
                        style={styles.botaoCancelar}
                        onPress={() => setCameraAberta(false)}
                    >
                        <Text style={styles.textoBotaoCamera}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.botaoFoto}
                        onPress={tirarFoto}
                    >
                        <View style={styles.circuloFoto} />
                    </TouchableOpacity>

                </View>

            </View>
        );
    }


    // ==============================
    // FORMULÁRIO
    // ==============================
    return (

        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.titulo}>
                Cadastrar Livro
            </Text>

            <Text style={styles.label}>
                Título
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o título"
                value={titulo}
                onChangeText={setTitulo}
            />


            <Text style={styles.label}>
                Autor
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o autor"
                value={autor}
                onChangeText={setAutor}
            />


            <Text style={styles.label}>
                Categoria
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ex: Ficção"
                value={categoria}
                onChangeText={setCategoria}
            />


            <Text style={styles.label}>
                Descrição
            </Text>

            <TextInput
                style={[
                    styles.input,
                    styles.textarea
                ]}
                placeholder="Digite uma descrição"
                value={descricao}
                onChangeText={setDescricao}
                multiline
            />


            {/* FOTO */}

            <Text style={styles.label}>
                Capa do Livro
            </Text>


            {foto ? (

                <View>

                    <Image
                        source={{ uri: foto }}
                        style={styles.imagem}
                    />

                    <TouchableOpacity
                        style={styles.botaoSecundario}
                        onPress={abrirCamera}
                    >

                        <Text style={styles.textoBotaoSecundario}>
                            Tirar outra foto
                        </Text>

                    </TouchableOpacity>

                </View>

            ) : (

                <TouchableOpacity
                    style={styles.botaoCamera}
                    onPress={abrirCamera}
                >

                    <Text style={styles.textoBotao}>
                        📷 Tirar foto da capa
                    </Text>

                </TouchableOpacity>

            )}


            {/* CADASTRAR */}

            <TouchableOpacity
                style={styles.botaoCadastrar}
                onPress={cadastrarLivro}
                disabled={carregando}
            >

                {carregando ? (

                    <ActivityIndicator color="#FFF" />

                ) : (

                    <Text style={styles.textoBotao}>
                        Cadastrar Livro
                    </Text>

                )}

            </TouchableOpacity>

        </ScrollView>
    );
}



const styles = StyleSheet.create({

    container: {
        padding: 24,
        backgroundColor: "#f5f5f5",
        flexGrow: 1
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#222"
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        color: "#333"
    },

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 20
    },

    textarea: {
        height: 120,
        textAlignVertical: "top"
    },

    imagem: {
        width: "100%",
        height: 300,
        borderRadius: 12,
        resizeMode: "cover",
        marginBottom: 10
    },

    botaoCamera: {
        backgroundColor: "#555",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20
    },

    botaoCadastrar: {
        backgroundColor: "#007AFF",
        padding: 17,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30
    },

    textoBotao: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },

    botaoSecundario: {
        padding: 12,
        alignItems: "center",
        marginBottom: 20
    },

    textoBotaoSecundario: {
        color: "#007AFF",
        fontWeight: "bold"
    },


    // CAMERA

    cameraContainer: {
        flex: 1,
        backgroundColor: "#000"
    },

    camera: {
        flex: 1
    },

    cameraBotoes: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },

    botaoFoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },

    circuloFoto: {
        width: 65,
        height: 65,
        borderRadius: 33,
        borderWidth: 3,
        borderColor: "#000"
    },

    botaoCancelar: {
        marginBottom: 25,
        padding: 10
    },

    textoBotaoCamera: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }

});