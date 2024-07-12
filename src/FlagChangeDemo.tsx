import {Image, StyleSheet, Text, View} from "react-native";
import {InMemoryProvider, OpenFeature, OpenFeatureProvider, useBooleanFlagDetails} from "@openfeature/react-sdk";
import {FLAG_CHANGE_DEMO_EXPLANATION, FLAG_CHANGE_DEMO_NAME} from "./constants";
import {useEffect} from "react";

const PROVIDER_NAME = FLAG_CHANGE_DEMO_NAME;
const newMessageName = "new-message";

export default function FlagChangeDemo() {
    const flagConfig = {
        [newMessageName]: {
            disabled: false,
            variants: {
                on: true,
                off: false,
            },
            defaultVariant: "off",
        },
    };
    const provider = new InMemoryProvider(flagConfig);

    // set our provider, give it a name matching the scope of our OpenFeatureProvider below
    OpenFeature.setProvider(PROVIDER_NAME, provider);

    // start an interval to change the flag vales every 2s for demo purposes
    const interval = window.setInterval(async () => {
        flagConfig[newMessageName].defaultVariant =
            flagConfig[newMessageName].defaultVariant === "on" ? "off" : "on";
        await provider.putConfiguration(flagConfig);
    }, 2000);

    useEffect(() => {
        return () => {
            window.clearInterval(interval);
        };
    });

    return (
        <OpenFeatureProvider domain={PROVIDER_NAME}>
            <Spinner/>
        </OpenFeatureProvider>
    )
}

function Spinner() {
    const {value: showNewMessage} = useBooleanFlagDetails(newMessageName, false);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.descriptionText}>{FLAG_CHANGE_DEMO_EXPLANATION}</Text>
                <Image
                    style={styles.responsiveImage}
                    source={require("../assets/logo.png")}
                    // className={showNewMessage ? "Demo-logo Demo-spin" : "Demo-logo"}
                    alt="logo"
                />
                {showNewMessage ? (
                    <Text style={styles.demoText}>Welcome to this OpenFeature-enabled React app!</Text>
                ) : (
                    <Text style={styles.demoText}>Welcome to this React app.</Text>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionText: {
        margin: 16,
        marginBottom: 32,
        textAlign: "center"
    },
    demoText: {
        margin: 16,
        textAlign: "center"
    },
    responsiveImage: {
        width: '50%',
        height: undefined,
        aspectRatio: 1024 / 890,
    },
});
