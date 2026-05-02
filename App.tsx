import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import { Id } from "./convex/_generated/dataModel";

// Import your screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import TodoScreen from "./screens/TodoScreen";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userId ? (
            <>
              <Stack.Screen name="Login">
                {(props) => (
                  <LoginScreen 
                    {...props} 
                    onLogin={(id: Id<"users">) => setUserId(id)} 
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <Stack.Screen name="Todo">
              {(props) => <TodoScreen {...props} userId={userId} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}