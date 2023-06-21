import styles from '@/styles/componentStyles/SideBarModal.module.css'
import Image from 'next/image'

function SideBarModal(props: any) {
  const clickHandler = () => {
    console.log('done got clicked')
    props.modalDisplay(false)
  }

  return (
    <div>
      <div
        className={styles.darkBG}
        onClick={() => {
          clickHandler()
        }}
      ></div>
      <div className={styles.absoluteContainer}>
        {/* <div className={styles.mainContainer}> */}
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <Image src={props.locationDetails.imageUrl} alt="location image" fill />
          </div>
          <p className={styles.name}>{props.locationDetails.name}</p>
          <p className={styles.address}>{props.locationDetails.address}</p>
          <p className={styles.content}>{props.locationDetails.descriptionShort}</p>
          <p className={styles.content}>{props.locationDetails.descriptionLong}</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default SideBarModal
