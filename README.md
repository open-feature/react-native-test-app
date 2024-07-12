# OpenFeature React Native Example

This is a short example showing the usage of the OpenFetaure React SDK together with React Native.

The App was created with the standard blank expo config and the build was not modified.

The Go Feature Flag and flagd examples are calling hosted instances of each service.

```bash
npx create-expo-app OpenFeatureExample --template blank
```

## Does it work?

The OpenFeature React SDK works in React Native without problems.

Suspense is working well and no errors occur using the `InMemoryProvider`

### OFREP Provider

The OFREP Web Provider using fetch is working without any problems.

### flagd Provider

The Flagd provider does not work out of the box.
The Connect RPC SDK has problems with the React Native JSC and Hermes runtimes.

It can be made work regarding the following example by the Connect Team:

https://github.com/connectrpc/examples-es/blob/main/react-native/app/index.tsx
