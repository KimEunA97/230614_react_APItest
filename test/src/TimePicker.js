import React, { useEffect, useState } from "react";
import { View, Button, Text, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimePicker({ onTimeSelected }) {
  // 1초 * 60 = 60초(1분) * 60 = 60분 * 9 = 9시간
  const UTC9 = 1000 * 60 * 60 * 9; //한국시간 UTC+9
  const [time, setTime] = useState(new Date());

  const [selectedTime, setSelectedTime] = useState(0);
  const [show, setShow] = useState(false);
  const [timeSetToggle, setTimeSetToggle] = useState(false);

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setShow(false);
      setTime(selectedTime);
      setTimeSetToggle(true);
      onTimeSelected(selectedTime);
    }
  };

  return (
    <View>
      <Text style={styles.textSty}>알림 시간</Text>
      <Button title="Open Time Picker" onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          locale="KO"
          value={time}
          mode="time"
          is24Hour={false}
          onChange={onChange}
          display="spinner"
        />
      )}
      {timeSetToggle && (
        <Text style={styles.timeTextStyle}> 설정시간 : {time.toLocaleTimeString("ko-KR")}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textSty: {
    // color: "white",
    fontSize: 30,
  },
  timeTextStyle: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
