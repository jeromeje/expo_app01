import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView } from "react-native";

type RegisterPageProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};
// const conn = "http://localhost:3000/register";
//const conn = "http://192.168.1.10:3000/register";

const conn = "http://localhost:3000/api/register" 
const RegisterPage: React.FC<RegisterPageProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(conn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        navigation.navigate("Login");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      console.error(error);

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;

// Use the same styles as in the original code
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
    },
    formContainer: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 24,
    },
    input: {
      height: 50,
      borderColor: "#ddd",
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: "#fff",
    },
    button: {
      backgroundColor: "#007AFF",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginBottom: 16,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    link: {
      alignItems: "center",
    },
    linkText: {
      color: "#007AFF",
      fontSize: 14,
    },
    message: {
      marginTop: 16,
      textAlign: "center",
      color: "#007AFF",
    },
  }); 
