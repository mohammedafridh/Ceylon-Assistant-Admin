import React, { useState, useEffect } from "react";
import "./Messages.css";
import { db } from "../../../Firebase";
import { doc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { Card, Text, Button, Group, Divider, Loader, Center } from "@mantine/core";
import { toast } from "react-hot-toast";
import MessageReplyModal from "../../Modals/MessageReplyModal";
import BaseLayout from "../../Layouts/BaseLayout";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const[selectedMessage,setSelectedMessage] = useState('')
  const [modalOpened,setModalOpened] = useState(false)

  // const deleteMessage = async (id) => {
  //   await deleteDoc(doc(db, "messages", id));
  //   toast.success('Message Noted!')
  // };

  const sendMessage = (message)=>{
    setSelectedMessage(message)
    setModalOpened(true)
  }

  const rejectMessage = (message)=>{
    const item = deleteDoc(doc(db, 'messages', message));
  }

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
    <BaseLayout>
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
            {/* <Button color="green" variant="solid" onClick={() => deleteMessage(message.docId)}> */}
            <div className="msgBtnContainer">
              <Button color="green" variant="solid" onClick={() => rejectMessage(message.docId)} className='dltBtn delete'>Reject</Button>
              <Button color="green" variant="solid" onClick={() => sendMessage(message)}>Reply</Button>
            </div>
            <MessageReplyModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              message={selectedMessage}
            />
          </Card>
        ))}

        
      </div>
    </div>
    </BaseLayout>
  );
};

export default Messages;