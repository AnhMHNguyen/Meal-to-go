import React, {  useContext, useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components';
import { Search } from '../components/search.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { LocationContext } from '../../../services/location/location.context';
import { MapCallout } from '../components/map-callout.component';

const Map = styled(MapView)`
  width:100%;
  height:100%;
`;

const RestaurantMap = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);
  const { lat, lng, viewport } = location;
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.06
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <MapView.Marker
              key={restaurant.placeId}
              title={ restaurant.name }
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <MapView.Callout
                onPress={() => navigation.navigate("RestaurantDetail", {restaurant})}
              >
                <MapCallout restaurant={restaurant} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
}

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  if (!location) {
    return (
      <Map
        region={{
          latitude: 51.213890,
          longitude: -102.462776,
          latitudeDelta: 100,
          longitudeDelta: 100
        }}
      />
    );
  }
  return <RestaurantMap navigation={navigation} />;
};