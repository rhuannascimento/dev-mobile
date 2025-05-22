import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";

export default function HelloWorldComponent() {
    const [uf, setUf] = useState("");
    const [error, setError] = useState("");
    const [cities, setCities] = useState([] as {id: number, nome: string}[]);
    const [loading, setLoading] = useState(false);

    const fetchCities = async () => {
        if (!uf) {
            setError("Erro! Por favor, digite uma UF válida.");
            return;
        }

        try {
            setLoading(true);

            setCities([]);

            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`);
            
            const cities = await response.json();
           
            setCities(cities);
            setLoading(false);
        } catch (error) {
            setError("Erro! Por favor, verifique a UF digitada.");
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Digite um UF</Text>
            <Text style={styles.text}>{error}</Text>
            <TextInput
                style={styles.input}
                value={uf}
                onChangeText={(uf) => setUf(uf)}
                placeholder="UF"
            />
            <Button icon="magnify" mode="contained" style={{backgroundColor: 'grey'}} onPress={() => fetchCities()}>
                Encontrar Cidades
            </Button>
            {loading && <ActivityIndicator animating={true} />}
            {cities.length > 0 && (
                <ScrollView style={{ maxHeight: 200, width: "100%"}}>
                    {cities.map((city) => (
                        <Text key={city.id} style={styles.text}> 
                            {city.nome}
                        </Text>
                    ))}
                </ScrollView>
            )}
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
