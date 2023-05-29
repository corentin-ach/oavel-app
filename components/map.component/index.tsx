import Mapbox from '@rnmapbox/maps';
import React, { useEffect, useMemo, useRef } from 'react';
import { useGetFirestore } from '../../firebase/api';
import { useDispatch } from 'react-redux';
import { SpotState, setSpot } from '../../redux/spot';
import { setBounds } from '../../redux/bounds';
import { Colors } from 'react-native-ui-lib';

function MapView() {
  Mapbox.setAccessToken(
    'pk.eyJ1IjoiY29yZW50aW4yOSIsImEiOiJja3V3dmgxOG0wMTdpMnZsOGs2OGU4eDQzIn0.p3UORX0_zEWs7XpxBBWMHA',
  );

  const dispatch = useDispatch();
  const spots = useGetFirestore('spots');
  const camera = useRef<Mapbox.Camera>(null);
  const shapeSource = useRef<Mapbox.ShapeSource>(null);

  const markers: GeoJSON.FeatureCollection = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: spots.map((spot) => {
        return {
          type: 'Feature',
          properties: {
            ...spot,
            stringStatus: spot.status ? 'true' : 'false',
          },
          geometry: {
            type: 'Point',
            coordinates: [spot.coords[1], spot.coords[0]],
          },
        };
      }),
    }),
    [spots],
  );

  const onMarkersPress = async (event: any) => {
    const feature = event.features[0];

    const spot = {
      id: feature?.properties?.id,
      name: feature?.properties?.name,
      coords: feature?.geometry?.coordinates,
      status: feature?.properties?.status,
      quality: feature?.properties?.quality,
    };

    if (feature.properties?.cluster) {
      const zoom = await shapeSource.current?.getClusterExpansionZoom(feature);
      camera.current?.setCamera({
        centerCoordinate: feature?.geometry?.coordinates,
        zoomLevel: zoom,
      });
    } else {
      camera.current?.setCamera({
        centerCoordinate: feature?.geometry?.coordinates,
        zoomLevel: 15,
      });
      dispatch(setSpot(spot));
    }
  };

  const onMapIdle = (event) => {
    dispatch(setBounds(event.properties.bounds));
  };

  return (
    <Mapbox.MapView
      attributionEnabled={false}
      logoEnabled={false}
      styleURL={'mapbox://styles/corentin29/ckw9knz2x404s14pa0wiytqju'}
      style={{ flex: 1 }}
      onMapIdle={onMapIdle}
    >
      <Mapbox.Camera ref={camera} />
      <Mapbox.ShapeSource
        ref={shapeSource}
        cluster
        clusterRadius={50}
        id="markers"
        shape={markers}
        onPress={(event: any) => {
          onMarkersPress(event);
        }}
      >
        <Mapbox.CircleLayer
          id="unclusteredCircle"
          sourceID="markers"
          filter={['!', ['has', 'point_count']]}
          style={styles.unclusteredPointCircleLayer}
        />
        <Mapbox.CircleLayer
          id="clusters"
          sourceID="markers"
          filter={['has', 'point_count']}
          style={{
            circleColor: spots.some((s: SpotState) => s.status)
              ? Colors.orange30
              : Colors.green30,
            circleRadius: 40,
            circleBlur: 0.6,
          }}
        />
        <Mapbox.SymbolLayer
          id="clusterCount"
          sourceID="places"
          filter={['has', 'point_count']}
          style={styles.clusterCountSymbolLayer}
        />
      </Mapbox.ShapeSource>
    </Mapbox.MapView>
  );
}

const styles = {
  unclusteredPointCircleLayer: {
    circleColor: [
      'match',
      ['get', 'stringStatus'],
      'false',
      Colors.green30,
      'true',
      Colors.orange30,
      '#5DADEC',
    ],
    circleRadius: 12,
  },
  clusterCountSymbolLayer: {
    textField: ['get', 'point_count_abbreviated'], // Show the number of points that has been clustered
    textFont: ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    textSize: 20,
    textColor: 'white',
  },
};

export default MapView;
