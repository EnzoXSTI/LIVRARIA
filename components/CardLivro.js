import {Image, Text, View} from "react-native";

export default function CardLivro({ livro }) {
    return (
        <View>
            <Image source={{uri: livro.imagem}} width={100} height={200} />
            <Text>{livro.titulo}</Text>
            <Text>{livro.categoria}</Text>
            <Text>{livro.autor}</Text>
            <Text>{livro.descricao}</Text>
        </View>
    )
}