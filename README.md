# Unable to write to Ceramic network from React Native + Expo

This repo is used to repro an error writing the Ceramic network when using React Native + Expo.

If/when I am able to get this issue resolved I'll update this repo to provide an example of connecting to the Ceramic network using React Native + Expo.

## Code

The code that throws the exception:

`const created = await idx.set('basicProfile', { 'name': 'expo' });`

## Exception

The resulting exception:

```
[Unhandled promise rejection: TypeError: undefined is not an object (evaluating 'crypto.subtle.digest')]
at node_modules/multihashing-async/src/sha.browser.js:35:34 in digest
at node_modules/multihashing-async/src/sha.browser.js:53:17 in <anonymous>
at node_modules/multihashing-async/src/index.js:39:27 in Multihashing.digest
at node_modules/multihashing-async/src/index.js:22:23 in Multihashing
at node_modules/ipld-dag-cbor/src/util.js:178:38 in cid
at node_modules/dag-jose-utils/lib/index.js:27:13 in <anonymous>
at node_modules/dag-jose-utils/lib/index.js:23:11 in <anonymous>
at node_modules/dids/lib/did.js:8:13 in <anonymous>
at node_modules/dids/lib/did.js:4:11 in <anonymous>
at node_modules/@ceramicnetwork/stream-tile/lib/tile-document.js:73:11 in _signDagJWS
```

## Expo Snack

https://snack.expo.dev/@git/github.com/detroitpro/ceramic-expo-crypto-exception

- works in web because Ceramic/IDX uses WebCrypto libs. Unsure what shim is required to get same libs in React Native.