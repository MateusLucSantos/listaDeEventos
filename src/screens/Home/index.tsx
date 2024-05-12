import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Partipant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participantName !== "") {
      if (participants.includes(participantName)) {
        return Alert.alert(
          "Participante cadastrado",
          "Já existe um participante na lista com esse nome!"
        );
      }
      setParticipants((prevState) => [...prevState, participantName]);
      setParticipantName("");
    }
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((prevState) => prevState !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro 2024</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      {/* FlatList é um outro componente de listagem ou scorlagem, ele tem a função de renderizar listas, a flatlist não envolve outros componentes e também renderiza os componentes aos poucos a medida que vai sendo mostrado na tela, por isso ela é mais performatica que a scrollview*/}
      {/* ScrollView -> renderiza todos os seus componentes filhos de reação de uma só vez, mas isso tem uma desvantagem de desempenho
      FlatList -> renderiza itens lentamente, quando eles estão prestes a aparecer, e remover itens que rolam para fora da tela para economizar memória e tempo de processamento.
      */}
      <FlatList
        data={participants} // A propriedade data é a responsável por pegar os dados que serão renderizados não precisa fazer um map para percorrer a lista
        keyExtractor={(item) => item} // verifica se o elemento é unico na lista para poder renderizar, o acesso é feito através de uma arrow function
        renderItem={(
          { item } // o render é o responsável pelo componente que vai ser renderizado em tela, também é passado por uma arrow function
        ) => (
          <Partipant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false} // responsável pela barra de rolagem
        ListEmptyComponent={() => (
          // quando não há dados ele irá mostrar o componente que estiver dentro dessa propriedade.
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evendo ainda? Adicione participantes a sua lista
            de participantes.
          </Text>
        )}
      />
    </View>
  );
}
