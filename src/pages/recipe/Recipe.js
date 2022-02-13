import React from 'react'
import { useParams } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import './Recipe.css'

const Recipe = () => {
  const { id } = useParams()
  const { mode } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different'
    })
  }

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if(doc.exists){
        setRecipe(doc.data())
        setIsPending(false)
      } else {
        setError('Could not find that recipe')
        setIsPending(false)
      }
    })

    return () => unsub()
  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p> }
      {recipe && (
        <React.Fragment>
          <h2 className='page-title-h2'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </React.Fragment>
      )}
    </div>
  )
}

export default Recipe