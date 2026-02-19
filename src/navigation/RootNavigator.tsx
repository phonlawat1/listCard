import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, CustomerDetailScreen } from "../features/customers";

type RootStackParamList = {
  Home: undefined;
  CustomerDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "ลูกค้า",
        }}
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetailScreen}
        options={{
          title: "รายละเอียดลูกค้า",
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
