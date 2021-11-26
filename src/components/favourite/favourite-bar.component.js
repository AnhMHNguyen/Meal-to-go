import React from 'react';
import styled from 'styled-components';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { CompactRestaurantInfo } from '../restaurant/compact-restaurant-info.component';
import { Spacer } from '../spacer/spacer.component';
import { CustomText } from '../typography/text.component';

const FavouritesWrapper = styled(View)`
  padding: 10px;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouritesWrapper>
      <Spacer variant="left.large">
        <CustomText variant="caption">Favourites</CustomText>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => (
          <Spacer key={restaurant.placeId} position="left" size="medium">
            <TouchableOpacity onPress={() => onNavigate("RestaurantDetail", { restaurant })}>
              <CompactRestaurantInfo restaurant={restaurant} />
            </TouchableOpacity>
          </Spacer>
        ))}
      </ScrollView>
    </FavouritesWrapper>
  );
}