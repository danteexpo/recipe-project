import React, { useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import './Create.css'

const Create = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes' }

    try{
      await projectFirestore.collection('recipes').add(doc)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ingredient = newIngredient.trim()
    if(ingredient && !ingredients.includes(ingredient)){
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input 
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input 
              type="text" 
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button 
              className='btn'
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{ingredients.map(ingredient => <span key={ingredient}> {ingredient},</span>)}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input 
            type="number" 
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className='btn'>Submit</button>

      </form>
    </div>
  )
}

export default Create