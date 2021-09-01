import React, { useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import "./IngredientList.css"


export default function IngredientList({ ingredients, toggleOpen, clearIngredients }) {
  const [loading, setLoading] = useState(false)

  const handleCloseModal = () => {
    toggleOpen(false)
    clearIngredients()
  }

  return (
    <>
      <Modal.Header>{"View List"}</Modal.Header>
      <Modal.Content id="addEditMeal-body">
        <Form>
          {ingredients?.map((ingred, i) => {
            return (
              <Form.Group widths="equal" key={i}>
                <Form.Field
                  className="ingredients name"
                  control='input'
                  value={ingred.name || ""}
                  readOnly />
                <Form.Field
                  className="ingredients qty"
                  control='input'
                  value={`${ingred.qty} ${ingred.unit || ""}` || ""}
                  readOnly />
              </Form.Group>
            )
          })}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button content='Close' color='black' onClick={handleCloseModal} />
      </Modal.Actions>
    </>
  )
}