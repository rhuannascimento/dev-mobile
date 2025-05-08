import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function HelloWorldComponent(props: {date: string}) {
	const [text, setText] = useState("");

	return (
        <View style={styles.container}>
			<Text style={styles.text}>Ola mundo!</Text>
			<TextInput
				style={styles.input}
				value={text}
				onChangeText={(text) => setText(text)}
				placeholder="Escreva seu nome"
			/>
			<Text style={styles.text}>Bem vindo {text}! Hoje é {props.date}</Text>
        </View>
	);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2',
    },
	input: {
        marginVertical: 10,
		width: "80%",
		backgroundColor: "#fcac03",
        textAlign: 'center'
	},
	text: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#000000",
        textAlign: 'center'
	},
});
