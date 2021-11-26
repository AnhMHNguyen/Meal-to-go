import React, { useContext, useState } from "react";
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/core";
import { View, TouchableOpacity } from 'react-native';
import { List, Avatar } from "react-native-paper";
import { SafeArea } from '../../../components/utility/safe-area.component';
import { CustomText } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const SettingsItem = styled(List.Item)`
  padding: ${props => props.theme.space[2]};
`;

const AvatarContainer = styled(View)`
  align-items: center;
  margin-top: ${props => props.theme.space[3]};
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (uid) => {
      const photoUri = await AsyncStorage.getItem(`${uid}-photo`);
      setPhoto(photoUri);
  }
  useFocusEffect(() => {
    getProfilePicture(user.uid);
  })

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={()=> navigation.navigate("Camera")}>
          {!photo ?
            <Avatar.Icon size={70} icon="account" backgroundColor="#F58840" />
            :
            <Avatar.Image size={70} source={{ uri: photo}} backgroundColor="#F58840" />
          }
        </TouchableOpacity>
        <Spacer size="medium" position="top">
          <CustomText variant="body">{ user.email}</CustomText>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View Your Favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() =>navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  )
};