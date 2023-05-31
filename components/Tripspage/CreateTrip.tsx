import Image from 'next/image'
import styles from '@/styles/componentStyles/TripComponents.module.css'


function CreateTrip(props) {
    const onClickHandler = () => {
        props.setModalDisplay(prevVal => !prevVal)
    }

    return (
        <div className={styles.createTripContainer} onClick={() => onClickHandler()} >
            <div className={styles.createTripImage}>
            <Image 
                src="/createTripPlus.webp"
                alt="Plus Sign"
                height={30}
                width={30}
            />
            </div>
            <h2>Create Trip</h2>
        </div>
    );
}

export default CreateTrip;