<script setup>
import {Snackbar} from "@varlet/ui";

const password = {
  id: "serpent1234", // "username" in a typical username/password pair
  name: "Serpentina", // display name for credential
  origin: "https://example.org",
  password: "the last visible dog",
};

const federated = {
  id: "1234",
  name: "Serpentina",
  origin: "https://example.org",
  protocol: "openidconnect",
  provider: "https://provider.example.org",
};
/**
 * @type {PublicKeyCredentialCreationOptions}, pubKeyCredParams: [{type: string, alg: number}]}}
 */
const publicKey = {
  challenge: crypto.getRandomValues(new Uint8Array(32)), // Get it from the server
  rp: {id: "localhost", name: "ACME Corporation"},
  user: {
    id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
    name: "test username",
    displayName: "test displayName",
  },
  pubKeyCredParams: [{type: "public-key", alg: -7}],
};

function create(options) {
  navigator.credentials.create(options).then(val => {
    console.log(val);
    let j = {};
    if (val.iconURL) j.iconURL = val.iconURL;
    if (val.id) j.id = val.id;
    if (val.name) j.name = val.name;
    if (val.type) j.type = val.type;
    if (val.password) j.password = val.password;
    if (val.protocol) j.protocol = val.protocol;
    if (val.provider) j.provider = val.provider;
    Snackbar.success(JSON.stringify(j));
  }).catch(err => Snackbar.error(err))
}

function get() {
  navigator.credentials.get({
    publicKey: {
      challenge: new Uint8Array([139, 66, 181, 87, 7, 203 /* ,… */]),
      rpId: "localhost",
      allowCredentials: [
        {
          type: "public-key",
          id: new Uint8Array([64, 66, 25, 78, 168, 226, 174 /* ,… */]),
        },
      ],
      userVerification: "required",
    },
    // signal: AbortSignal.timeout(10000), // Abort after 10 seconds
  }).then(val => {
    console.log(val);
  }).catch(err => Snackbar.error(err))
}

function store() {
  let credential = new PasswordCredential({
    id: "example-username",
    name: "Carina Anand", // In case of a login, the name comes from the server.
    password: "correct horse battery staple",
  });
  navigator.credentials.store(credential).catch(err => Snackbar.error(err))
}

function preventSilentAccess() {
  navigator.credentials.preventSilentAccess()
}
</script>

<template>
  <var-card title="credentials">
    <var-button block type="primary" @click="create({password})">create({password})</var-button>
    <var-button block type="info" @click="create({federated})">create({federated})</var-button>
    <var-button block type="danger" @click="create({publicKey})">create({publicKey})</var-button>
    <var-button block type="warning" @click="get">get({publicKey})</var-button>
    <var-button block type="success" @click="store">store</var-button>
    <var-button block @click="preventSilentAccess">preventSilentAccess</var-button>
  </var-card>
</template>