import mqtt from "mqtt/dist/mqtt.esm";
import { useEffect } from "react";

// Client reference to be accessible outside the hook
let mqttClient = null;

// Function to publish messages to a topic
export const publishMqttMessage = (topic, message) => {
  if (mqttClient && mqttClient.connected) {
    mqttClient.publish(topic, message);
    console.log(`Published to ${topic}: ${message}`);
  } else {
    console.log("MQTT client not connected, cannot publish");
  }
};

const useMqtt = () => {
  useEffect(() => {
    mqttClient = mqtt.connect("wss://connection.realcodes.ai:8084/mqtt", {
      username: 'admin',
      password: 'Btvc9xg2TmJaCsj',
    });

    mqttClient.on("connect", () => {
      console.log("Connected to EMQ server");
    });

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  return { publishMqttMessage };
};

export default useMqtt;