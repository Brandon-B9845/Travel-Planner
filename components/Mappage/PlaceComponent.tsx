import { useRef } from 'react'
import { StandaloneSearchBox } from '@react-google-maps/api'
import styles from '@/styles/componentStyles/PlaceSearchInput.module.css'

const PlaceComponent = (props: any) => {
  //useRef that holds the value of the searched itmes even if the page re-renders
  const inputRef: any = useRef()
  //This handles if the place has changed meaning that you have selected one of the suggestions.It currently just console.logs out the information that it is given
  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces()
    if (place) {
      console.log(place.formatted_address)
      console.log(place.geometry.location.lat())
      console.log(place.geometry.location.lng())
    }
  }
  //The final return that checks if isLoaded is true and if so renders the searchBox  and inputs.
  return props.isLoaded ? (
    <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChanged}>
      <input type="text" className={styles.formControl} placeholder="What are you searching for?" />
    </StandaloneSearchBox>
  ) : (
    <div>Loading...</div>
  )
}

export default PlaceComponent