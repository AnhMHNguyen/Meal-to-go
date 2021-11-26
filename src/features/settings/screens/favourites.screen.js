import React, { useContext } from 'react';
import styled from 'styled-components';
import { TouchableOpacity, View, FlatList } from "react-native";
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { CustomText } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { FadeInView } from '../../../components/animations/fade.animation';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-card.component';

const NoFavouriteArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  }
})``;

const FavouriteArea = styled(View)`
  padding-top: ${props => props.theme.space[2]};
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <FavouriteArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item}/>
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </FavouriteArea>  
  ) : (
    <NoFavouriteArea>
      <CustomText center variant="label">No favourites yet</CustomText>
    </NoFavouriteArea>
  );
}