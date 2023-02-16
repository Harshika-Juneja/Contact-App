import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import ContactCard from "./components/ContactCard";
import { useDisclosure } from "@chakra-ui/react";
import Kmodal from "./components/Kmodal";
import ContactForm from "./components/ContactForm";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [searchData,setSearchData]= useState('');

  const [contacts, setContacts] = useState([
    { name: "Harshika", email: "harshikajuneja2001@gmail.com", id: 1 },
    { name: "Harshita", email: "harshita22@gmail.com", id: 2 },
    { name: "Anshika", email: "anshikachopra@gmail.com", id: 3 },
    { name: "Yashika", email: "yashikasuneja21@gmail.com", id: 4 },
  ]);
  const [contactId, setContactId] = useState();

  const addNewContact = (name, email) => {
    if (
      contacts.findIndex((contact) => contact.email === email) === -1 &&
      email !== ""
    ) {
      setContacts([...contacts, { name, email, id: uuidv4() }]);
    }
  };
  console.log(contacts);

  const getContactId = (id) => {
    setContactId(id);
  };
  console.log(getContactId);

  let searchContacts = contacts.filter((contact) =>
  contact.name.includes(searchData)
);

  const updateContact = (name, email, id) => {
    setContacts((prev) => [
      ...contacts.filter((contact) => contact.id !== id),
      { name, email, id },
    ]);
  };
  const deleteContact = (id) => {
    setContacts((prev) => [...contacts.filter((contact) => contact.id !== id)]);
  };

  let selectContact = contacts.find((contact) => contact.id === contactId);
  console.log(selectContact);
  return (
    <>
      <Kmodal
        isOpen={isOpen}
        title={"Add New Contact"}
        onClose={onClose}
        onOpen={onOpen}
      >
        <ContactForm addNewContact={addNewContact} onClose={onClose} />
      </Kmodal>

      <Kmodal
        isOpen={isOpenEdit}
        title={"Edit Contact"}
        onClose={onCloseEdit}
        onOpen={onOpenEdit}
      >
        <ContactForm
          updateContact={updateContact}
          contact={selectContact}
          addNewContact={addNewContact}
          onClose={onCloseEdit}
        />
      </Kmodal>
      <Box pr="6" pl="6">
        <Flex p="4" justify="center" align="center">
          <Image src="/banner.png" w="150px" h="100px" />
          <Heading as="h1" textTransform="uppercase">
            contact app
          </Heading>
        </Flex>
        <Box p="4">
          <Button
            bg="purple.700"
            color="white"
            w="full"
            fontSize="xl"
            fontWeight="bold"
            colorScheme="purple"
            onClick={onOpen}
          >
            <AddIcon h="20px" w="20px" mr="4" />
            Add Contact
          </Button>
        </Box>
        <Box p="4">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              focusBorderColor="purple.700"
              type="tel"
              placeholder="Search Contact..."
              onChange={(e) =>{setSearchData(e.target.value)}}
            />
          </InputGroup>
        </Box>
        <Box p="4">
          {searchContacts.map((contact) => (
            <ContactCard
              getContactId={getContactId}
              onOpen={onOpenEdit}
              contact={contact}
              key={contact.id}
              deleteContact={deleteContact}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default App;
