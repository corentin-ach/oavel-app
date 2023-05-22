import Mapbox from '@rnmapbox/maps';
import React, { useEffect, useMemo, useRef } from 'react';

function MapView() {
  Mapbox.setAccessToken(
    'pk.eyJ1IjoiY29yZW50aW4yOSIsImEiOiJja3V3dmgxOG0wMTdpMnZsOGs2OGU4eDQzIn0.p3UORX0_zEWs7XpxBBWMHA',
  );

  const markers: GeoJSON.FeatureCollection = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { color: 'red' },
          geometry: {
            type: 'Point',
            coordinates: [151.75, -32.94],
          },
        },
        {
          type: 'Feature',
          properties: { color: 'red' },
          geometry: {
            type: 'Point',
            coordinates: [151.78, -32.92],
          },
        },
      ],
    }),
    [],
  );

  return (
    <Mapbox.MapView
      attributionEnabled={false}
      logoEnabled={false}
      styleURL={'mapbox://styles/corentin29/ckw9knz2x404s14pa0wiytqju'}
      style={{ flex: 1 }}
    >
      <Mapbox.Camera zoomLevel={9} centerCoordinate={[151.75, -32.94]} />
      <Mapbox.ShapeSource
        cluster
        clusterRadius={50}
        id="markers"
        shape={markers}
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
          style={styles.clustersCircleLayer}
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
    circleColor: '#65DEAB',
    circleRadius: 12,
  },
  clustersCircleLayer: {
    circleColor: '#65DEAB',
    circleRadius: 40,
    circleBlur: 0.6,
  },
  clusterCountSymbolLayer: {
    textField: ['get', 'point_count_abbreviated'], // Show the number of points that has been clustered
    textFont: ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    textSize: 20,
    textColor: 'white',
  },
};

export default MapView;
