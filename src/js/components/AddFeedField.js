import React from 'react'
import { Form } from 'semantic-ui-react'

const AddFeedField = ({handleChange, handleSubmit, name, value}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Input
      icon={{
        onClick: handleSubmit,
        label: name,
        name: 'plus',
        circular: true,
        link: true
      }}
      value={value}
      placeholder={name}
      onChange={handleChange}
      name={name + "field"}
    />
  </Form>
)


export default AddFeedField;
