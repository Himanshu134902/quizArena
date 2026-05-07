import admin from "firebase-admin";

import serviceAccount
from "./serviceAccountKey.json"
with { type: "json" };

import { questions }
from "./questions.js";

// 🔥 INIT FIREBASE
admin.initializeApp({

  credential:
    admin.credential.cert(
      serviceAccount
    ),

  databaseURL:
    "https://quiz-app-124dc-default-rtdb.firebaseio.com",

});

const db = admin.database();

// 🔥 UPLOAD QUESTIONS
async function uploadQuestions() {

  try {

    for (const q of questions) {

      await db.ref("questions")
        .push(q);

      console.log(
        `✅ Uploaded: ${q.question}`
      );

    }

    console.log(
      "🎉 ALL QUESTIONS UPLOADED"
    );

  } catch (err) {

    console.log(err);

  }

}

uploadQuestions();