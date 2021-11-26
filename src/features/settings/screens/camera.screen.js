import React, { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { CustomText } from '../../../components/typography/text.component';
import { Camera } from 'expo-camera';

const ProfileCamera = styled(Camera)`
  width:100%;
  height: 100%;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <CustomText>No access to camera</CustomText>;
  }

  return (
    <TouchableOpacity onPress={snap}>
      <ProfileCamera
        ref={(camera) => cameraRef.current = camera}
        type={Camera.Constants.Type.front}
        ratio={"16:9"}
      />
    </TouchableOpacity>
  );
};