// 푸시 알림 등록 함수
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    // 안드로이드 알람 채널 설정
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) { // 물리적 기기 확인
    const { status: existingStatus } = await Notifications.getPermissionsAsync(); //알림 권한 상태 가져오기
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') { // 권한이 없는 경우
      const { status } = await Notifications.requestPermissionsAsync(); // 권한 요청
      finalStatus = status;
    }
    if (finalStatus !== 'granted') { // 최종 권한 상태가 여전히 부여되지 않은 경우 함수 종료
      alert('Failed to get push token for push notification!');
      return;
    }

    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // 프로젝트 ID와 함께 푸시 토큰을 가져옴
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'cfa6b78d-3f29-4ffa-84cd-dac3e5a676f9' })).data;
    console.log(token);
  } else {
    // 실제 기기인지 확인
    alert('Must use physical device for Push Notifications');
  }
  return token;
}

