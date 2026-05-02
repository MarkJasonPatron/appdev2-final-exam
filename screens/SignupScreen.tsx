import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function SignupScreen() {
  // Navigation hook to handle screen transitions
  const navigation = useNavigation<any>();

  // State for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Convex mutation for user registration
  const register = useMutation(api.users.register);

  const handleSignup = async () => {
    // Basic validation
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const result = await register({
        username: email, // Mapping email to username per project logic
        password: password,
        fullname: fullName,
      });

      if (result) {
        Alert.alert("Success", "Account created successfully!");
        // Navigate back to Login after successful registration
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Error", "Registration failed. Email might already be taken.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/signup.webp")}
          style={styles.image}
        />
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="john@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
        />

        {/* Signup Action */}
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        {/* Social Login Row */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-google" size={30} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-apple" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-facebook" size={30} color="#4267B2" />
          </TouchableOpacity>
        </View>

        {/* Navigation back to Login */}
        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D7AFF",
    paddingTop: 40,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "70%",
    resizeMode: "contain",
  },
  formContainer: {
    flex: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 30,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FFCC00",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  linkText: {
    color: "#FFCC00",
    fontWeight: "bold",
  },
});