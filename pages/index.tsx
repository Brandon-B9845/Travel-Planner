import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NavBar from '@/components/NavBar'
import { use, useEffect, useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api'
import { env } from 'process'
import { useState } from 'react';
import FindLocation from '@/hooks/FindLocation'
import Map from '@/components/Map'

export default function Home() {

  //These are the two states used to get our location for centering
  const [location, setLocation] = useState()
  const [hasLoaded, setHasLoaded] = useState(false)

  // this sets our location State using this function
  function setUserLocation() {
    return FindLocation().then((value) => {
      setLocation(value)
      return value
    })
  }

  //This is a useEffect used to make sure that the users location is grabbed only once when the page is rendered
  useEffect(() => {
    fetch('api/pointsOfInterests').then((data) => {
      console.log(data)
    })
    if (!hasLoaded) {
      setUserLocation()
      setHasLoaded(true)
    }
  }, [])


  // this is our key and how we load in our google maps api
  const key: any = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const { isLoaded } = useLoadScript({
    'googleMapsApiKey': key
  })

  //sets the space where the map should be to loading... if it is not yet rendered
  if (!isLoaded) return <div>Loading...</div>

  console.log(location)

  //start of api maybe

  const fetchPlaces = async () => {
    const data = await fetch('/api/pointsOfInterest')
    console.log(await data.json())
  }

  //our final return for home
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className='info-container'>
          <div className='poi-container' >
            <button className='test-btn' onClick={fetchPlaces}>Test button</button>
          </div>
          <div className='info-col'>
          </div>
          <Map location={location} />
        </div>
      </main>
    </>
  )
}





