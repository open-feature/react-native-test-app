import {Image, StyleSheet, Text, View} from "react-native";
import {OpenFeature, OpenFeatureProvider, useBooleanFlagDetails} from "@openfeature/react-sdk";
import {GOFF_DEMO_EXPLANATION, GOFF_DEMO_NAME} from "./constants";
import {Suspense} from "react";
import {OFREPWebProvider} from "@openfeature/ofrep-web-provider";

const PROVIDER_NAME = GOFF_DEMO_NAME;
const newMessageName = "example-flag";

export default function GoFeatureFlagDemo() {
    const provider = new OFREPWebProvider({baseUrl: "https://flagd.of-cloud-native.reining.dev"});

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
                <Text style={styles.descriptionText}>{GOFF_DEMO_EXPLANATION}</Text>
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
    const {value: exampleFlagLoaded} = useBooleanFlagDetails(newMessageName, false);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.descriptionText}>{GOFF_DEMO_EXPLANATION}</Text>
                <Image
                    style={styles.responsiveImage}
                    source={require("../assets/logo.png")}
                    alt="logo"
                />
                {exampleFlagLoaded ? (
                    <Text style={styles.demoText}>The example flag successfully returned true!</Text>
                ) : (
                    <Text style={styles.demoText}>Flag returned false, this should be true.</Text>
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
