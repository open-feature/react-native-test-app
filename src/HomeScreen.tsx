import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
    FLAG_CHANGE_DEMO_DESCRIPTION,
    FLAGD_DEMO_DESCRIPTION,
    GOFF_DEMO_DESCRIPTION,
    SUSPENSE_DEMO_DESCRIPTION
} from "./constants";

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>OpenFeature React Native Demo</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Flag Change')}
            >
                <Text style={styles.buttonText}>{FLAG_CHANGE_DEMO_DESCRIPTION}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Suspense')}
            >
                <Text style={styles.buttonText}>{SUSPENSE_DEMO_DESCRIPTION}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Go Feature Flag')}
            >
                <Text style={styles.buttonText}>{GOFF_DEMO_DESCRIPTION}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('flagd')}
            >
                <Text style={styles.buttonText}>{FLAGD_DEMO_DESCRIPTION}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 32,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#001fea',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
});
