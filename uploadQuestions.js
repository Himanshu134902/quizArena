import { database } from "./src/firebase.js";

import {
  ref,
  push,
} from "firebase/database";

import fs from "fs";

const questions = JSON.parse(
  fs.readFileSync(
    "./questions.json",
    "utf-8"
  )
);

const upload = async () => {

  try {

    for (const q of questions) {

      await push(
        ref(database, "questions"),
        q
      );

      console.log(
        "Uploaded:",
        q.question
      );

    }

    console.log(
      "✅ ALL QUESTIONS UPLOADED"
    );

  } catch (err) {

    console.log(err);

  }

};

upload();