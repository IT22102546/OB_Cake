// import React, { useState } from "react";
// import { View, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";

// const MapContainer = ({ onLocationSelect }) => {
//   const [region, setRegion] = useState({
//     latitude: 6.9271, // Default latitude for Colombo
//     longitude: 79.8612, // Default longitude for Colombo
//     latitudeDelta: 0.0922, // Controls zoom level for Colombo
//     longitudeDelta: 0.0421,
//   });

//   const [markerPosition, setMarkerPosition] = useState({
//     latitude: 6.9271,
//     longitude: 79.8612,
//   });

//   const handleMapPress = (event) => {
//     const { latitude, longitude } = event.nativeEvent.coordinate;
//     setMarkerPosition({ latitude, longitude });

//     // Pass the location to the parent component
//     if (onLocationSelect) {
//       onLocationSelect({ latitude, longitude });
//     }
//   };

//   return (
//     <View className="mb-6">
//       <Text className="text-lg font-semibold mb-4 font-JakartaBold">
//         Set marker to recipient address
//       </Text>
//       <MapView
//         style={{ height: 250, borderRadius: 8 }}
//         initialRegion={region}
//         onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//         onPress={handleMapPress} // Add this to detect map presses
//       >
//         <Marker
//           coordinate={markerPosition}
//           draggable
//           onDragEnd={(event) => handleMapPress(event)} // Update marker position on drag end
//         />
//       </MapView>
//     </View>
//   );
// };

// export default MapContainer;
