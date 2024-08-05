import React from 'react';
import { TextInput, Button, Group, Text, Slider } from '@mantine/core';

const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Text align="center" size="xl" weight={700}>
        Add To Do Item
      </Text>

      <Group direction="column" grow>
        <TextInput
          label="To Do Item"
          placeholder="Item Details"
          onChange={(e) => props.handleChange(e, 'text')}
          name="text"
        />

        <TextInput
          label="Assigned To"
          placeholder="Assignee Name"
          onChange={(e) => props.handleChange(e, 'assignee')}
          name="assignee"
        />

        <Slider
          label="Difficulty"
          defaultValue={props.difficulty}
          min={1}
          max={5}
          step={1}
          onChange={(value) => props.handleChange({ target: { name: 'difficulty', value } })}
          name="difficulty"
          marks={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ]}
        />

        <Button type="submit">Add Item</Button>
      </Group>
    </form>
  );
};

export default Form;
