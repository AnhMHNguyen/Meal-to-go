import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { View, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourite/favourite-bar.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-card.component";
import { Search } from "../components/search.component";


const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  }
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({  navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);

  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} color="tomato" animating={true}/>
        </LoadingContainer>
      )}
      <Search isFavouritesToggled={isToggled} onFavouritesToggle={() => setIsToggled(!isToggled)} />
      {isToggled && <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail", {restaurant: item})}>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item}/>
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
