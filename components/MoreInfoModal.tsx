import styles from '@/styles/componentStyles/MoreInfoModal.module.css'
import Image from 'next/image'
import { ratingsTrimmer } from '@/helperFunctions/helperFunction'

function MoreInfoModal(props: any) {
  return (
    <>
      <div className={props.className} onClick={() => props.setIsOpen(false)}></div>
      <div className={styles.absoluteContainer}>
        <button className={styles.closeBtn} onClick={() => props.setIsOpen(false)}>
          x
        </button>
        <div className={styles.mainContainer}> 
          <div className={styles.fillContainer}>
            <Image
              src={props.imageUrl}
              alt={props.name}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.header}>
              <p className={styles.nameLabel}>{props.name}</p>
              {props.rating ? (
                <div className={styles.reviewContainer}>
                  <p className={styles.rating}>{props.rating}</p>
                  <Image src="/star.svg" alt="a start" height={15} width={15} />
                  <p className={styles.reviewCount}>({ratingsTrimmer(props.reviewCount)})</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <p className={styles.sideInfo}>{props.attractionType}</p>
            <p className={styles.sideInfo}>{props.address}</p>

            <p className={styles.content}>{props.descriptionShort}</p>

            <p className={styles.content}>{props.descriptionLong}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoreInfoModal
