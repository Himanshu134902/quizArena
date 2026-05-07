import http from "k6/http";

import { sleep } from "k6";

export const options = {

  stages: [

    {
      duration: "20s",
      target: 50,
    },

    {
      duration: "20s",
      target: 100,
    },

    {
      duration: "20s",
      target: 200,
    },

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