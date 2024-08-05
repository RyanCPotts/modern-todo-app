import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Pagination,
  Space,
  Group,
  Text
} from '@mantine/core';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import Header from '../Header';
import List from '../List';
import Form from '../Form';
import Auth from '../Auth/auth';

const Todo = () => {
  const [defaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount}`;
  }, [list]);

  return (
    <>
      <Header />
      <Container size="sm" style={{ marginTop: '2rem' }}>
        <Title order={1} align="center" style={{ marginBottom: '1rem' }}>
        
        </Title>
        <Auth capability="create">
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            difficulty={defaultValues.difficulty}
          />
        </Auth>
        <Space h="md" />
        <Auth capability="read">
          <Group position="apart">
            <Text>Incomplete Tasks: {incomplete}</Text>
            <Pagination
              total={Math.ceil(incomplete / 10)}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </Group>
          <List
            list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Auth>
      </Container>
    </>
  );
};

export default Todo;
