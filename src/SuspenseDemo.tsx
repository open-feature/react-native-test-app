import {Image, StyleSheet, Text, View} from "react-native";
import {
    EvaluationContext,
    InMemoryProvider,
    OpenFeature,
    OpenFeatureProvider,
    useBooleanFlagDetails
} from "@openfeature/react-sdk";
import {
    FLAG_CHANGE_DEMO_EXPLANATION,
    FLAG_CHANGE_DEMO_NAME,
    SUSPENSE_DEMO_DESCRIPTION, SUSPENSE_DEMO_EXPLANATION,
    SUSPENSE_DEMO_NAME
} from "./constants";
import {Suspense, useEffect} from "react";

const PROVIDER_NAME = SUSPENSE_DEMO_NAME;
const newMessageName = "new-message";

export default function SuspenseDemo() {
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
    const provider = new DelayedInMemoryProvider(flagConfig, 5000);

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
                <Text style={styles.descriptionText}>{SUSPENSE_DEMO_EXPLANATION}</Text>
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
                <Text style={styles.descriptionText}>{SUSPENSE_DEMO_EXPLANATION}</Text>
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

/**
 * A provider who's initialize is delayed for 'delay' seconds to demonstrate the React SDK's Suspense features.
 */
class DelayedInMemoryProvider extends InMemoryProvider {
    constructor(
        flagConfiguration: ConstructorParameters<typeof InMemoryProvider>[0],
        private delay: number
    ) {
        super(flagConfiguration);
    }

    // artificially delay our init (delaying PROVIDER_READY event)
    async initialize(context?: EvaluationContext | undefined): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, this.delay));
        return super.initialize(context);
    }
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
