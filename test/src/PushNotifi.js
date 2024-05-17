import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { schedulePushNotification } from './Schedule';
import { registerForPushNotificationsAsync } from './Register';

/*
* # 함수 수행 작업 요약
*
* 알림 채널 설정
* 물리적 기기 확인
* 푸시 알림 권한 요청 및 상태 확인
* expo 푸시 토큰 가져오기
* 토큰을 반환해 푸시 알림 보낼 준비
*/


// 알림 핸들러 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    
    shouldShowAlert: true, // 알림 표시
    shouldPlaySound: false, //소리 재생
    shouldSetBadge: false, //배지 설정
  }),
});

export default function PushNotifi() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // 푸시 알림 등록 후 토큰 전달
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // 알림 수신 시 실행되는 리스너
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // 응답 처리 리스너 설정
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

