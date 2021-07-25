// TextEncode/Decode imports
import { nanoid } from 'nanoid'
import 'react-native-get-random-values'
import 'fastestsmallesttextencoderdecoder';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

// ceramic imports.
import CeramicClient from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx';
import KeyDidResolver from 'key-did-resolver';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { fromString } from 'uint8arrays';

export default function App() {
  const onCreate = async () => {
    const API_URL = "https://ceramic-clay.3boxlabs.com"
    const ceramic = new CeramicClient(API_URL, { syncInterval: 100 });
    const resolver = KeyDidResolver.getResolver();
    const SEED = 'd5f727c343f9311780f396c236eebc6a10ccb9ada6c1efccb2471273f4be4bdf';

    const encodedSeed = fromString(SEED, 'base16');
    const provider = new Ed25519Provider(encodedSeed);
    const did = new DID({ provider, resolver });

    // ceramic is consided authenticated if the DID is set.
    ceramic.did = did;
    await did.authenticate();

    const idx = new IDX({ ceramic });

    // the line below throws an exception in: undefined is not an object (evaluating 'crypto.subtle.digest')]
    // node_modules/multihashing-async/src/sha.browser.js:35:34 in digest
    // node_modules/multihashing-async/src/sha.browser.js:53:17
    // node_modules/multihashing-async/src/index.js:39:27 in Multihashing.digest
    // node_modules/multihashing-async/src/index.js:22:23 in Multihashing
    const created = await idx.set('basicProfile', { 'name': 'expo' });
    console.debug('createProfile: created:', created.toString()); // stream id
  }

  return (
    <View style={styles.container}>
      <Button title='create' onPress={onCreate}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
