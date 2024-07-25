import React, { useEffect, useState, useContext } from 'react';
import { Pagination } from '@mantine/core';
import useForm from '../../hooks/form';

import { v4 as uuid } from 'uuid';

import SettingsProvider from '../../Context/Settings';

import Header from '../Header';
import List from '../List';
import Form from '../Form';
import Auth from '../Auth/auth'

const Todo = () => {
  // const context = useContext(SettingsProvider);
  const [defaultValues] = useState({difficulty:4})

  // const {pageItems, showCompleted} = useContext(SettingsProvider)

  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {

    let filteredList = list.filter( item =>
    //    {
    //   return defaultValues.showCompleted ? true : item.complete === false;
    // }
    !item.complete).length;
  // };

    // let start = pageItems * (currentPage - 1);
    // let end = start + pageItems;

    // setDisplayList(showCompleted? filteredList.slice(start, end): []);
    // console.log(displayList)

    let incompleteCount = filteredList;
    setIncomplete(incompleteCount);

    document.title = `To Do List: ${incompleteCount}`;


  }, [list]);

  // let numPages = Math.ceil(incomplete / pageItems);

  return (
    <>

      <Header />
      <Auth>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} difficulty={defaultValues.difficulty} />

      <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} setCurrentPage ={setCurrentPage} currentPage = {currentPage}/>
      </Auth>

    </>
  );
};

export default Todo;
