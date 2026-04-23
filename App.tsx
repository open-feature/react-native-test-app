// https://github.com/connectrpc/examples-es/blob/main/react-native/app/index.tsx

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./src/HomeScreen";
import FlagChangeDemo from "./src/FlagChangeDemo";
import SuspenseDemo from "./src/SuspenseDemo";
import FlagdDemo from "./src/FlagdDemo";
import GoFeatureFlagDemo from "./src/GoFeatureFlagDemo";

const Stack = createNativeStackNavigator();

// https://github.com/connectrpc/examples-es/blob/main/react-native/app/index.tsx


export default function App() {
    return (
        <NavigationContainer>
            {/* `id` is typed as required by React Navigation v7 when no explicit generic is provided;
                passing `undefined` matches the intended behaviour of an anonymous navigator. */}
            <Stack.Navigator id={undefined}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'Welcome'}}
                />
                <Stack.Screen name="Flag Change" component={FlagChangeDemo}/>
                <Stack.Screen name="Suspense" component={SuspenseDemo}/>
                <Stack.Screen name="flagd" component={FlagdDemo}/>
                <Stack.Screen name="Go Feature Flag" component={GoFeatureFlagDemo}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
