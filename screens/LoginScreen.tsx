import { useState } from "react";
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
import { Id } from "../convex/_generated/dataModel";

interface LoginProps {
    onLogin: (id: Id<"users">) => void
}

const LoginScreen = ({ onLogin } : LoginProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation<any>(); 
    const loginMutation = useMutation(api.users.login)

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter username and password!");
            return;
        }

        try {
            const result = await loginMutation({
                username: email, // Maps frontend 'email' to backend 'username'
                password: password
            })

            if (result.success && result.userId) {
                onLogin(result.userId)
                setEmail('')
                setPassword('')
            } else {
                Alert.alert("Login Failed", result.message)
            }
        } catch (error) {
            Alert.alert("Error", "Unexpected error happen. Please try again!")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("./../assets/login.webp")}
                    style={styles.illustration}
                />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="john@gmail.com" 
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="********"
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.linkText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#7D7AFF", paddingTop: 40 },
    header: { flex: 1, justifyContent: "center", alignItems: "center" },
    illustration: { width: "80%", height: "70%", resizeMode: "contain" },
    formContainer: { flex: 2, backgroundColor: "#FFF", borderTopLeftRadius: 60, borderTopRightRadius: 60, padding: 30 },
    label: { fontSize: 14, color: "#666", marginBottom: 5, marginTop: 15 },
    input: { backgroundColor: "#F0F0F0", padding: 15, borderRadius: 15, fontSize: 16 },
    loginButton: { backgroundColor: "#FFCC00", padding: 18, borderRadius: 15, alignItems: "center", marginTop: 30 },
    loginButtonText: { fontWeight: "bold", fontSize: 18 },
    footer: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
    linkText: { color: "#FFCC00", fontWeight: "bold" },
});

export default LoginScreen;