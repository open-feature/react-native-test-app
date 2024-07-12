import {Image, StyleSheet, Text, View} from "react-native";
import {
    OpenFeature,
    OpenFeatureProvider,
    useBooleanFlagDetails
} from "@openfeature/react-sdk";
import {FLAGD_DEMO_EXPLANATION, FLAGD_DEMO_NAME} from "./constants";
import {Suspense} from "react";
import {FlagdWebProvider} from "@openfeature/flagd-web-provider";

const PROVIDER_NAME = FLAGD_DEMO_NAME;
const newMessageName = "example-flag";

/**
 * This fails because of Platform dependencies of the Connect RPC library
 * It should be fixable as connectrpc shows in the following example:
 * https://github.com/connectrpc/examples-es/blob/main/react-native/app/index.tsx
 */
export default function FlagdDemo() {
    const provider = new FlagdWebProvider({host: "flagd.of-cloud-native.reining.dev", port: 443, tls: true}, console);

    // set our provider, give it a name matching the scope of our OpenFeatureProvider below
    OpenFeature.setProvider(PROVIDER_NAME, provider);

    return (
        <OpenFeatureProvider domain={PROVIDER_NAME} suspend={true}>
            <Suspense fallback={<Fallback/>}>
                <Spinner/>
            </Suspense>
        </OpenFeatureProvider>
    )
}

function Fallback() {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.descriptionText}>{FLAGD_DEMO_EXPLANATION}</Text>
                <Image
                    style={styles.responsiveImage}
                    source={require("../assets/hourglass.png")}
                    alt="logo"
                />
                <Text style={styles.demoText}>Waiting for provider to be ready...</Text>
            </View>
        </>
    );
}


function Spinner() {
    const {value: showNewMessage} = useBooleanFlagDetails(newMessageName, false);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.descriptionText}>{FLAGD_DEMO_EXPLANATION}</Text>
                <Image
                    style={styles.responsiveImage}
                    source={require("../assets/logo.png")}
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
