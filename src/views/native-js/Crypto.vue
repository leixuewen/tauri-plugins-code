<script setup>
import {onBeforeMount, ref} from "vue";
import {Snackbar} from '@varlet/ui';
import {writeFile} from "@tauri-apps/plugin-fs";
import {BaseDirectory} from "@tauri-apps/api/path";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const random = ref({
  uuid: "",
  array: undefined,
});

const crypt = ref({
  rsa: {
    oaep: {},
  },
  aes: {
    cbc: {},
    ctr: {},
    gcm: {},
  },
})

onBeforeMount(() => {
  getUUID()
  generateKey()
  getRandomValues()
  // crypto.deriveKey()
  // crypto.importKey()
  // crypto.unwrapKey()
  // crypto.wrapKey()
})

function getUUID() {
  random.value.uuid = crypto.randomUUID();
}

function getRandomValues() {
  random.value.array = crypto.getRandomValues(new Uint32Array(3));
}

function generateKey() {
  crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        // Consider using a 4096-bit key for systems that require long-term security
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
  ).then(val => {
    crypt.value.rsa.oaep = {
      algorithm: {name: "RSA-OAEP"},
      key: val,
    }
  })
  crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
  ).then(val => {
    crypt.value.aes.cbc = {
      algorithm: {
        name: "AES-CBC",
        iv: crypto.getRandomValues(new Uint8Array(16)),
      },
      key: val,
    }
  })
  crypto.subtle.generateKey(
      {
        name: "AES-CTR",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
  ).then(val => {
    crypt.value.aes.ctr = {
      algorithm: {
        name: "AES-CTR",
        counter: crypto.getRandomValues(new Uint8Array(16)),
        length: 64,
      },
      key: val,
    }
  })
  crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
  ).then(val => {
    crypt.value.aes.gcm = {
      algorithm: {
        name: "AES-GCM",
        iv: crypto.getRandomValues(new Uint8Array(12))
      },
      key: val,
    }
  })

  crypto.subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        // Consider using a 4096-bit key for systems that require long-term security
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["sign", "verify"]
  ).then(key => sign_verify.value["RSASSA-PKCS1-v1_5"].key = key)
  crypto.subtle.generateKey(
      {
        name: "RSA-PSS",
        // Consider using a 4096-bit key for systems that require long-term security
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["sign", "verify"]
  ).then(key => sign_verify.value["RSA-PSS"].key = key);
  generateKeyEcdsa().then(key => sign_verify.value.ECDSA.key = key);
  crypto.subtle.generateKey(
      {
        name: "HMAC",
        hash: {name: "SHA-512"}
      },
      true,
      ["sign", "verify"]
  ).then(key => sign_verify.value.HMAC.key = key);
}

function exportKey() {
  let data = crypt.value.aes;
  Object.keys(data).forEach(j => {
    ['raw', 'jwk'].forEach(k => {
      crypto.subtle.exportKey(k, data[j].key).then(val => {
        console.log(val);
        // if (!(val instanceof ArrayBuffer)) {
        //   val = encoder.encode(JSON.stringify(val));
        // }
        // return writeFile(`${i}-${j}.${k}`, val, {baseDir: BaseDirectory.AppConfig})
      }).catch(err => Snackbar.error(err))
    })
  })

  crypto.subtle.exportKey("pkcs8", crypt.value.rsa.oaep.key.privateKey).then(val => {
    let str = String.fromCharCode.apply(null, new Uint8Array(val));
    console.log(`-----BEGIN PRIVATE KEY-----\n${btoa(str)}\n-----END PRIVATE KEY-----`);
  })
  crypto.subtle.exportKey("spki", crypt.value.rsa.oaep.key.publicKey).then(val => {
    let str = String.fromCharCode.apply(null, new Uint8Array(val));
    console.log(`-----BEGIN PUBLIC KEY-----\n${btoa(str)}\n-----END PUBLIC KEY-----`);
  })

  exportKeyJwk(crypt.value.rsa.oaep.key.privateKey);
  exportKeyJwk(crypt.value.rsa.oaep.key.publicKey);
  generateKeyEcdsa().then(val => {
    exportKeyJwk(val.privateKey);
    exportKeyJwk(val.publicKey);
  })
}

function generateKeyEcdsa() {
  return crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384",
      },
      true,
      ["sign", "verify"],
  )
}

function exportKeyJwk(key) {
  crypto.subtle.exportKey("jwk", key).then(val => {
    console.log(val);
  })
}

function encrypt(name, key) {
  crypto.subtle.encrypt(name, key, encoder.encode(random.value.uuid)).then(val => {
    // console.log(val);
    // Snackbar.info(new Uint8Array(val));
    // Snackbar.info(new Uint16Array(val));
    Snackbar.info(new Uint32Array(val));
    random.value.array = val;
  }).catch(err => Snackbar.error(err));
}

function decrypt(name, key) {
  crypto.subtle.decrypt(name, key, random.value.array).then(val => {
    Snackbar.info(decoder.decode(val));
  }).catch(err => Snackbar.error(err));
}

function generateKeyECDH() {
  return crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-384",
      },
      false,
      ["deriveBits"],
  )
}

async function ecdh() {
  let key1 = await generateKeyECDH();
  let key2 = await generateKeyECDH();
  let sharedSecret = await crypto.subtle.deriveBits(
      {
        name: "ECDH",
        namedCurve: "P-384",
        public: key2.publicKey,
      },
      key1.privateKey,
      128,
  );
  Snackbar.info(new Uint8Array(sharedSecret));
}

async function pbkdf2() {
  let derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: crypto.getRandomValues(new Uint8Array(16)),
        iterations: 100000,
        hash: "SHA-256",
      },
      await crypto.subtle.importKey(
          "raw",
          encoder.encode(prompt("请输入你的密码")),
          {name: "PBKDF2"},
          false,
          ["deriveBits", "deriveKey"],
      ),
      256,
  );
  Snackbar.info(new Uint8Array(derivedBits));
}

function digest(algorithm) {
  crypto.subtle.digest(algorithm, encoder.encode(random.value.uuid)).then(val => {
    Snackbar.info(new Uint8Array(val));
  }).catch(err => Snackbar.error(err));
}

const sign_verify = ref({
  "RSASSA-PKCS1-v1_5": {
    algorithm: {name: "RSASSA-PKCS1-v1_5"},
    key: {},
  },
  "RSA-PSS": {
    algorithm: {name: 'RSA-PSS', saltLength: 32},
    key: {},
  },
  "ECDSA": {
    algorithm: {name: 'ECDSA', hash: {name: 'SHA-384'}},
    key: {},
  },
  "HMAC": {
    algorithm: "HMAC",
    key: {},
  },
});

function signFun(sv) {
  let key = (typeof sv.algorithm === 'string') ? sv.key : sv.key.privateKey;
  crypto.subtle.sign(sv.algorithm, key, encoder.encode(random.value.uuid)).then(val => {
    Snackbar.info(new Uint8Array(val));
    sv.sign = val;
  }).catch(err => Snackbar.error(err));
}

function verifyFun(sv) {
  let key = (typeof sv.algorithm === 'string') ? sv.key : sv.key.publicKey;
  crypto.subtle.verify(sv.algorithm, key, sv.sign, encoder.encode(random.value.uuid)).then(val => {
    Snackbar.info(val);
  }).catch(err => Snackbar.error(err));
}
</script>

<template>
  <var-card>
    <var-button block @click="getUUID" type="primary">crypto.randomUUID : {{ random.uuid }}</var-button>
    <var-button block @click="getRandomValues">crypto.getRandomValues : {{ random.array }}</var-button>
  </var-card>
  <var-card title="encrypt <=> decrypt">
    <var-button block @click="generateKey">generateKey</var-button>
    <var-button block @click="exportKey">exportKey</var-button>
    <var-cell v-for="item in Object.keys(crypt.rsa)">
      <var-button block type="info" @click="encrypt(crypt.rsa[item].algorithm, crypt.rsa[item].key.publicKey)">
        encrypt(rsa-{{ item }})
      </var-button>
      <var-button block type="primary" @click="decrypt(crypt.rsa[item].algorithm, crypt.rsa[item].key.privateKey)">
        decrypt(rsa-{{ item }})
      </var-button>
    </var-cell>
    <var-cell v-for="item in Object.keys(crypt.aes)">
      <var-button block type="warning" @click="encrypt(crypt.aes[item].algorithm, crypt.aes[item].key)">
        encrypt(aes-{{ item }})
      </var-button>
      <var-button block type="success" @click="decrypt(crypt.aes[item].algorithm, crypt.aes[item].key)">
        decrypt(aes-{{ item }})
      </var-button>
    </var-cell>
  </var-card>
  <var-card title="deriveBits">
    <var-button block type="success" @click="ecdh">deriveBits(ECDH)</var-button>
    <var-button block type="info" @click="pbkdf2">deriveBits(PBKDF2)</var-button>
  </var-card>
  <var-card title="digest">
    <var-button v-for="item in ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']" @click="digest(item)">
      digest({{ item }})
    </var-button>
  </var-card>
  <var-card title="sign verify">
    <var-cell v-for="item in Object.keys(sign_verify)">
      <var-button type="primary" @click="signFun(sign_verify[item])">sign({{ item }})</var-button>
      <var-button type="info" @click="verifyFun(sign_verify[item])">verify({{ item }})</var-button>
    </var-cell>
  </var-card>
</template>