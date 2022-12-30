import React, { useState, useEffect } from "react";
import "./Messages.css";
import { db } from "../../../Firebase";
import { doc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { Card, Text, Button, Group, Divider, Loader, Center } from "@mantine/core";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "messages", id));
  };

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "messages"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            docId: doc.id,
            ...doc.data(),
          });
        });
        setMessages(list);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => {
      allData();
    };
  }, []);

  return (
    <div>
      <div className="messages">
        <h1>All Messages</h1>
        {Loading && <Center m="lg"><Loader color="green" /></Center>}
        {error && <h1>{error}</h1>}
        {messages.map((message, index) => (
          <Card key={index} shadow="sm" p="lg" radius="md" mb="sm" withBorder>
            <Text size="xl" weight={500} mb="sm">
              {message.subject}
            </Text>
            <Text size="sm" weight={500} mb="sm">
              {message.message}
            </Text>
            <Divider mb="sm" />
            <Group>
              <Text size="sm" weight={400} mb="sm">
                {message.name}
              </Text>
              <Text size="sm" weight={400} mb="sm">
                {message.email}
              </Text>
            </Group>
            <Button color="green" variant="solid" onClick={() => deleteMessage(message.docId)}>
              Mark as Noted
            </Button>
          </Card>
        ))}

        
      </div>
    </div>
  );
};

export default Messages;