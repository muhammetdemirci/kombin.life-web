import { Injectable } from '@nestjs/common';
import firebase from 'firebase';
import firebaseAdmin from 'firebase-admin';
import { isNil } from 'lodash';

@Injectable()
export class FirebaseService {
  private config;
  private serviceAccounts;

  private firebaseInstance;
  private adminInstance;

  constructor() {
    const { FIREBASE_SERVICE_ACCOUNTS, FIREBASE_CONFIG, FIREBASE_AUTH_EMULATOR_HOST } = process.env;

    if (isNil(FIREBASE_SERVICE_ACCOUNTS)) {
      throw new Error('FIREBASE_SERVICE_ACCOUNTS is not set');
    }
    try {
      this.serviceAccounts = JSON.parse(FIREBASE_SERVICE_ACCOUNTS);
    } catch (error) {
      throw new Error('FIREBASE_SERVICE_ACCOUNTS is not valid JSON:');
    }

    if (isNil(FIREBASE_CONFIG)) {
      throw new Error('FIREBASE_CONFIG is not set');
    }
    try {
      this.config = JSON.parse(FIREBASE_CONFIG);
    } catch (error) {
      throw new Error('FIREBASE_CONFIG is not valid JSON');
    }

    if (isNil(FIREBASE_AUTH_EMULATOR_HOST)) {
      this.firebaseInstance = firebase.initializeApp(this.config);
      this.adminInstance = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(this.serviceAccounts),
      });
    } else {
      this.firebaseInstance = firebase.initializeApp(this.config);
      this.adminInstance = firebaseAdmin.initializeApp(this.serviceAccounts);
      firebase.auth().useEmulator('http://' + FIREBASE_AUTH_EMULATOR_HOST);
    }
  }

  get firebase(): firebase.app.App {
    return this.firebaseInstance;
  }

  get admin(): firebaseAdmin.app.App {
    return this.adminInstance;
  }
}
