import { nanoid } from 'nanoid'
import 'react-native-get-random-values'
import 'fastestsmallesttextencoderdecoder';
import crypto from 'isomorphic-webcrypto'; // trying to get crypto.suble.digest in react native.

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


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
