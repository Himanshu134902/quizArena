import http from "k6/http";

import { sleep } from "k6";

export const options = {

  stages: [

    // 50 users
    {
      duration: "20s",
      target: 50,
    },

    // 100 users
    {
      duration: "20s",
      target: 100,
    },

    // 200 users
    {
      duration: "20s",
      target: 200,
    },

    // ramp down
    {
      duration: "10s",
      target: 0,
    },

  ],

};

export default function () {

  http.get(
    "https://quiz-arena-eta-inky.vercel.app/"
  );

  sleep(1);

}