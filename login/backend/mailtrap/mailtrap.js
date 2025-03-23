import { MailtrapClient } from "mailtrap";

const TOKEN = "591d1b9676db3ef724550c5b2c492246";//0298mail
// const TOKEN = "0d8fcb68120f3ee296e68c057cd45048";


export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  // email: "OCE@demomailtrap.com",
  email: "oce@demomailtrap.co",
  name: "Online Code Editor",
};
