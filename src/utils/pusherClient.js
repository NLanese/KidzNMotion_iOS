import { Pusher } from "@pusher/pusher-websocket-react-native";

var pusherClient = new Pusher("58efed017348be8ec435", {
  cluster: "us2",
});

export default pusherClient
