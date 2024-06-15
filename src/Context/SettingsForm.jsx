import React, {useState, useContext} from 'react';
import {When} from 'react-if';
import {Card, Grid, Button, NumberInput, TextInput, Switch, Text} from '@mantine/core'
import { SettingsContext } from './Settings';
const SettingsForm = () => {

  // const defaults = {
  //   showCompleted: false,
  //   difficulty: 4,
  //   perPage: 3,
  // };

  // const [settings, setSettings] = useState(defaults);

  // function toggleShowCompleted() {
  //   setSettings({...settings, showCompleted: !settings.showCompleted});
  // }

  // function setPerPage(value) {
  //   setSettings({...settings, perPage: value});
  // }

  // const providedValues = { settings, toggleShowCompleted, setPerPage };

  // return (
  //   <SettingsContext.Provider value={providedValues}>
  //     {props.children}
  //   </SettingsContext.Provider>
  // );

  const[show, setShow] = useState(false);

  const{
    showCompleted, setShowCompleted, pageItems, setPageItems, sort, setSort
} = useContext(SettingsContext)

const handleClick = () => {
  setShow(true);
}

return(
  <>
    <Grid style = {{width:'80%', margin: 'auto'}}>
      <Grid.Col xs = {12} sm = {6}>
    <Card shadow = 'sm' padding = 'lg'>
      <h1>Update Settings</h1>
      <Switch onChange = {(e) => setShowCompleted(e.currentTarget.checked)} checked = {showCompleted} label = 'Show Completed Todos'/>
        <NumberInput onChange = {(value) => setPageItems(value)} placeholder = {pageItems} label = 'Items Per Page'/>
          <TextInput onChange = {(e) => setSort(e.target.value)} placeholder = {sort} label = 'Sort Keyword'/>
            <Button onClick = {handleClick}> Show New Settings </Button>
    </Card>
    </Grid.Col>
    <Grid.Col xs = {12} sm = {6}>
      <When condition = {show}>
      <Card withBorder p = 'xs'>
      <Card.Section>
      <Text m = 'xl'> Updated Settings </Text>
      </Card.Section>
      <Text m = 'sm'>{showCompleted?'Show':'Hide'} Completed Todos </Text>
      <Text m = 'sm'> Items Per Page: {pageItems}</Text>
      <Text m = 'sm'> Sort Keyword: {sort}</Text>
      </Card>
      </When>
    </Grid.Col>
    </Grid>
  </>
)

}

export default SettingsForm;
