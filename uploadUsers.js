import admin from "firebase-admin";

import fs from "fs";

import csv from "csv-parser";

// 🔥 IMPORT SERVICE ACCOUNT KEY
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

// 🔥 INITIALIZE FIREBASE ADMIN
admin.initializeApp({

  credential:
    admin.credential.cert(
      serviceAccount
    ),

  databaseURL:
    "https://quiz-app-124dc-default-rtdb.firebaseio.com",

});

const db = admin.database();

// 🔥 STORE USERS
const users = [];

// 🔥 READ CSV FILE
fs.createReadStream(
  "Most Intelligent Branch_responses (3).csv"
)

.pipe(csv())

.on("data", (row) => {

  users.push(row);

})

.on("end", async () => {

  console.log(
    `🚀 Found ${users.length} users`
  );

  for (const user of users) {

    try {

      // 🔥 CSV VALUES
      const email =
        rowValue(user, "Email");

      const regNo =
        rowValue(
          user,
          "Registration Number"
        );

      const username =
        rowValue(user, "Name");

      const branch =
        rowValue(user, "Branch");

      // 🔥 SKIP INVALID USERS
      if (
        !email ||
        !regNo
      ) {

        console.log(
          "⚠ Skipped invalid row"
        );

        continue;

      }

      // 🔥 CREATE FIREBASE AUTH USER
      const createdUser =
        await admin.auth()
          .createUser({

            email,

            password:
              String(regNo),

          });

      // 🔥 SAVE EXTRA USER DATA
      await db.ref(
        "users/" +
        createdUser.uid
      ).set({

        username,
        email,
        branch,
        regNo,

      });

      console.log(
        `✅ Created: ${email}`
      );

    } catch (err) {

      console.log(
        `❌ Failed: ${user.Email}`
      );

      console.log(
        err.message
      );

    }

  }

  console.log(
    "🎉 ALL USERS IMPORTED"
  );

});

// 🔥 SAFE CSV VALUE READER
function rowValue(row, key) {

  return row[key]?.trim() || "";

}