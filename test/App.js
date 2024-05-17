import { useState, useEffect, useRef, onChange } from "react";
import { Text, View, Button, Platform } from "react-native";

import PushNotifi from "./src/push/PushNotifi";
import TimePicker from "./src/TimePicker";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <PushNotifi/>
      {/* <TimePicker/> */}
    </View>
  );
}
