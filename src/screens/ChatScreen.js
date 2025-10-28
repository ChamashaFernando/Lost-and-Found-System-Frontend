import React, { useEffect, useState, useCallback } from "react";
import { 
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert 
} from "react-native";
import { getChatMessages, sendChatMessage } from "../api/chat";

export default function ChatScreen({ route }) {
  const { session, user, token } = route.params;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!session?.id) return;
    try {
      const data = await getChatMessages(session.id, token);
      setMessages(data);
    } catch (err) {
      console.error("Fetch messages error:", err);
      Alert.alert("Error", "Messages load කරන්න බැහැ.");
    }
  }, [session?.id, token]);

  useEffect(() => {
    fetchMessages();

    // 5 sec එකකට messages auto refresh
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleSend = async () => {
    if (!content.trim()) return;

    try {
      const newMessage = await sendChatMessage(content, user.id, session.id, token);
      setMessages(prev => [...prev, newMessage]);
      setContent("");
    } catch (err) {
      console.error("Send message error:", err);
      Alert.alert("Error", "Message යවන්න බැහැ.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.senderId === user.id ? styles.myMessage : styles.otherMessage
          ]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={content}
          onChangeText={setContent}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f9ff" },
  messageBubble: { padding: 10, borderRadius: 10, marginVertical: 4, maxWidth: "80%" },
  myMessage: { backgroundColor: "#4a90e2", alignSelf: "flex-end" },
  otherMessage: { backgroundColor: "#d3d3d3", alignSelf: "flex-start" },
  messageText: { color: "#fff", fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 5 },
  input: { flex: 1, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, height: 40, backgroundColor: "#fff" },
  sendButton: { marginLeft: 8, backgroundColor: "#3578c6", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  sendText: { color: "#fff", fontWeight: "bold" }
});
