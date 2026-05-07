import http from "k6/http";

import { sleep } from "k6";

export const options = {

  stages: [

    // 100 users
    {
      duration: "20s",
      target: 100,
    },

    // 300 users
    {
      duration: "30s",
      target: 300,
    },

    // 500 users
    {
      duration: "30s",
      target: 500,
    },

    // 700 users
    {
      duration: "30s",
      target: 700,
    },

    // ramp down
    {
      duration: "20s",
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