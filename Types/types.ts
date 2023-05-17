export interface Darkmode {
  darkmode: boolean,
  router: any
}

export interface ButtonProps {
  handler?: any
  name: string
  value: string
  style?: React.CSSProperties
  disabled: any
  params: any


}

export interface Card {
  name: string
  rating: number
  address: string
  lat: number
  lng: number
  attractionType: object
  ratingsCount: number
  setIsOpen: Function
  setShowInfo: Function

}

export interface Modal {
  setIsOpen: Function
}

export interface Dropdown {
  tripsList: string[]
}

export interface Location extends latLng {
  city: string
}

export interface latLng {
  lat: number
  lng: number
  city?: string
}
export interface HomeHeader {
  handleSavedTripsDisplay: Function,
  user: any
  isLoaded: any
  city: string,
  callback: Function
}
export interface PointsOfInterestApiParams {
  city?: string,
  typeOfInterest?: string
  callback?: Function
}

export interface LocationLabels {
  Shopping: string[]
  Restaurants: string[]
  Bars: string[]
  Attractions: string[]
}