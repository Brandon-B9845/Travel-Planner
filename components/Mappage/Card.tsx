import React, { useState } from 'react'
import Button from '@/components/Button'
import { useUser } from '@auth0/nextjs-auth0/client'
import styles from '@/styles/componentStyles/Card.module.css'
import { Card } from '@/Types/types'
import Image from 'next/image'
import { ratingsTrimmer } from '@/helperFunctions/helperFunction'
// import SideBarModal from './SideBarModal'

function Card(props: Card) {
  const [disabled, setDisabled] = useState(false)
  const [showMore, setShowMore] = useState(false)
  // const [modalDisplay, setModalDisplay] = useState(true) //CHANGE TO FALSE
  const locationData = [
    props?.name,
    props?.rating,
    props?.address,
    props?.lat,
    props?.lng,
    props?.attractionType,
    props?.reviewCount,
  ]

  const addAttractionToDB = async () => {
    const params = {
      userId: locationData?.[8],
      name: locationData?.[0],
      rating: locationData?.[1],
      address: locationData?.[2],
      lat: locationData?.[3],
      lng: locationData?.[4],
      attraction_type: locationData?.[5],
      rating_count: locationData?.[6],
      email: locationData?.[7],
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    }
    const data = await fetch('/api/saveAttraction', options)
    setDisabled(true)
  }

  const clickHandler = async () => {
    props.setIsOpen(true)
    props.setShowInfo(false)
  }

  const showMoreInfo = () => {
    setShowMore(!showMore)
    props.setModalDisplay(true)
    props.setLocationDetails({
      name: props.name,
      address: props.address,
      rating: props.rating,
      reviewCount: props.reviewCount,
      descriptionShort: props.descriptionShort,
      descriptionLong: props.descriptionLong,
      imageUrl: props.imageUrl,
    })
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer} onClick={() => showMoreInfo()}>
        <Image src={props.imageUrl} alt={props.name} fill />
      </div>
      <div className={styles.cardContentContainer}>
        <div className={styles.infoContainer} onClick={() => showMoreInfo()}>
          <div className={styles.cardContentHeader}>
            <h3 className={styles.infoContent}>{props.name}</h3>
            {props.rating ? (
              <div className={styles.reviewContainer}>
                <p className={styles.infoContent}>{props.rating}</p>
                <div className={styles.starContainer}>
                  <Image src="/star.svg" alt="a start" height={15} width={15} />
                </div>
                <p className={styles.reviewCount}>({ratingsTrimmer(props.reviewCount)})</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <p className={styles.infoContent}>{props.descriptionShort}</p>
          <p className={styles.showMore}>...show more</p>
          <div className={styles.cardBtnContainer}>
            <Button
              handler={addAttractionToDB as any}
              name="cardBtn"
              buttonText="cardBtnText"
              value="Add to profile!"
              disabled={disabled}
            ></Button>
            <Button
              handler={() => clickHandler()}
              name="cardBtn"
              buttonText="cardBtnText"
              value="Add to trip!"
              disabled=""
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
