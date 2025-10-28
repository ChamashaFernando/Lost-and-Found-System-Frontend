
// import React, { useEffect, useState, useCallback } from "react";
// import { 
//   View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert 
// } from "react-native";
// import axios from "axios";

// const BASE_URL = "http://172.20.10.3:8096/api/chat";

// export default function ChatScreen({ route }) {
//   const { user, token } = route.params; // ✅ user & token එක pass වෙලා එනවා
//   const [session, setSession] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState("");

//   // ✅ Admin ID එක — database එකෙන් Shani (ADMIN) = id 4
//   const ADMIN_ID = 4;

//   // Chat session create කිරීම
//   const createChatSession = useCallback(async () => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/session`,
//         {
//           user1Id: user.id,
//           user2Id: ADMIN_ID,
//           verified: true,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("Chat session created:", response.data);
//       setSession(response.data);
//     } catch (err) {
//       console.error("Chat start error:", err.response?.data || err.message);
//       Alert.alert("Error", "Chat start කරන්න බැහැ. පසුව නැවත උත්සාහ කරන්න.");
//     }
//   }, [user.id, token]);

//   // Messages fetch කිරීම
//   const fetchMessages = useCallback(async () => {
//     if (!session?.id) return;

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/session/${session.id}/messages`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessages(response.data);
//     } catch (err) {
//       console.error("Fetch messages error:", err.response?.data || err.message);
//     }
//   }, [session?.id, token]);

//   // Messages auto-refresh
//   useEffect(() => {
//     if (session) {
//       fetchMessages();
//       const interval = setInterval(fetchMessages, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [session, fetchMessages]);

//   // Component mount වෙද්දි chat session create කරන්න
//   useEffect(() => {
//     createChatSession();
//   }, [createChatSession]);

//   // Message send කිරීම
//   const handleSend = async () => {
//     if (!content.trim()) return;

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/message`,
//         {
//           content,
//           senderId: user.id,
//           chatSessionId: session.id,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessages((prev) => [...prev, response.data]);
//       setContent("");
//     } catch (err) {
//       console.error("Send message error:", err.response?.data || err.message);
//       Alert.alert("Error", "Message යවන්න බැහැ. නැවත උත්සාහ කරන්න.");
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageBubble,
//               item.senderId === user.id ? styles.myMessage : styles.otherMessage,
//             ]}
//           >
//             <Text style={styles.messageText}>{item.content}</Text>
//           </View>
//         )}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Type a message..."
//           value={content}
//           onChangeText={setContent}
//           style={styles.input}
//         />
//         <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
//           <Text style={styles.sendText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// // ✅ Styles
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: "#f5f9ff" },
//   messageBubble: { padding: 10, borderRadius: 10, marginVertical: 4, maxWidth: "80%" },
//   myMessage: { backgroundColor: "#4a90e2", alignSelf: "flex-end" },
//   otherMessage: { backgroundColor: "#d3d3d3", alignSelf: "flex-start" },
//   messageText: { color: "#fff", fontSize: 16 },
//   inputContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 5 },
//   input: { flex: 1, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, height: 40, backgroundColor: "#fff" },
//   sendButton: { marginLeft: 8, backgroundColor: "#3578c6", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
//   sendText: { color: "#fff", fontWeight: "bold" },
// });





import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import axios from "axios";

const BASE_URL = "http://172.20.10.3:8096/api/chat";

export default function ChatScreen({ route }) {
  const { user, token } = route.params;
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const ADMIN_ID = 4; // Admin ID

  // Create Chat Session
  const createChatSession = useCallback(async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/session`,
        {
          user1Id: user.id,
          user2Id: ADMIN_ID,
          verified: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSession(response.data);
    } catch (err) {
      console.error("Chat start error:", err.response?.data || err.message);
      Alert.alert("Error", "Chat start කරන්න බැහැ. පසුව නැවත උත්සාහ කරන්න.");
    }
  }, [user.id, token]);

  // Fetch Messages
  const fetchMessages = useCallback(async () => {
    if (!session?.id) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/session/${session.id}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(response.data);
    } catch (err) {
      console.error("Fetch messages error:", err.response?.data || err.message);
    }
  }, [session?.id, token]);

  useEffect(() => {
    if (session) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 4000);
      return () => clearInterval(interval);
    }
  }, [session, fetchMessages]);

  useEffect(() => {
    createChatSession();
  }, [createChatSession]);

  // Send Message
  const handleSend = async () => {
    if (!content.trim()) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/message`,
        {
          content,
          senderId: user.id,
          chatSessionId: session.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, response.data]);
      setContent("");
    } catch (err) {
      console.error("Send message error:", err.response?.data || err.message);
      Alert.alert("Error", "Message යවන්න බැහැ. නැවත උත්සාහ කරන්න.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>💬 Chat with Admin</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.senderId === user.id
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.senderId !== user.id && { color: "#000" },
                ]}
              >
                {item.content}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type your message..."
            value={content}
            onChangeText={setContent}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={handleSend}
            style={[
              styles.sendButton,
              { backgroundColor: content ? "#3578c6" : "#ccc" },
            ]}
            disabled={!content.trim()}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 💅 Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f9ff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f5f9ff",
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 14,
    marginVertical: 5,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  myMessage: {
    backgroundColor: "#4a90e2",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#000",
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginLeft: 8,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
