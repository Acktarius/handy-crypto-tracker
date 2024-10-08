import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { CryptoPriceScreen } from "./CryptoPriceScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="CryptoPrice"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1F2937",
                },
                headerTintColor: "#FFFFFF",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="CryptoPrice"
                component={CryptoPriceScreen}
                options={{ title: "Crypto Price Tracker" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);