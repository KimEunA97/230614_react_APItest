import { useState, useEffect, useRef, onChange } from "react";
import { Text, View, Button, Platform } from "react-native";

import PushNotifi from "./src/PushNotifi";
import TimePicker from "./src/TimePicker";

export default function App() {
  return (
    <View
      style={{
        flex: 0.8,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* <PushNotifi /> */}
      <TimePicker/>
    </View>
  );
}
