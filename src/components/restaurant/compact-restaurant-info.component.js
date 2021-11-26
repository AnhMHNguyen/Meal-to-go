import React from 'react';
import { Image, View, Platform } from 'react-native';
import styled from 'styled-components';
import Webview from 'react-native-webview';
import { CustomText } from '../typography/text.component';

const CompactImage = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(Webview)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled(View)`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const PlatformImage = (Platform.OS === 'android' && isMap) ? CompactWebview : CompactImage;
  return (
    <Item>
      <PlatformImage source={{uri: restaurant.photos[0]}}/>
      <CustomText center numberOfLines={3} variant="caption">{ restaurant.name }</CustomText>
    </Item>
  );
}