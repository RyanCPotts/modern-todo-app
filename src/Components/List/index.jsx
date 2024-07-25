import React from 'react'
import { Button, Card, Text, Pagination} from '@mantine/core';
import {When} from 'react-if';
import {useContext} from 'react';
import {SettingsContext} from '../../Context/Settings.jsx'
import Auth from '../Auth/auth.jsx';


const List = (props) => {
  const pageItems = useContext(SettingsContext)
  console.log(pageItems.pageItems)
  const showCompleted = useContext(SettingsContext)
  const renderList = showCompleted? props.list:props.list.filter(item =>!item.complete);
console.log(renderList)
  let start = pageItems.pageItems * (props.currentPage - 1);
  console.log(start)
  let end = start + pageItems.pageItems;
  let numPages = Math.ceil(renderList.length / pageItems);
  const displayList = renderList?renderList.slice(start, end): [];
  console.log(displayList)
  return(
    <>
      {
        displayList.map((item, idx) => (

          <Card
            shadow="lg"
            padding="xl"
            withBorder={true}
            key = {idx}
          >

            <Text fw={500} size="lg" mt="md">
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
            </Text>
            <Auth capability = {'update'}>
            <Text mt="xs" c="dimmed" size="sm">
              <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
            </Text>
            </Auth>
            <Auth capability = {'delete'}>
              <Button onClick = {()=>props.deleteItem(item.id)}>REMOVE ITEM</Button>
            </Auth>
          </Card>

        ))
  }
  <When condition = {renderList.length > 0}>
  <Pagination total={numPages} onChange={props.setCurrentPage} page = {props.currentPage} size="lg" radius="lg" withEdges />
  </When>
    </>
  )
}



export default List;
