
const FindLocation = async () => {
    interface Location {
        lat: number,
        lng: number
    }

    let lat
    let lng

    // Creating a promise out of the function
    let getLocationPromise: Promise<Location> = new Promise((resolve, reject) => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

                lat = position.coords.latitude
                lng = position.coords.longitude

                // Resolving the values which I need
                resolve({
                    lat,
                    lng
                })
            })

        } else {
            reject("your browser doesn't support geolocation API")
        }
    })



    const center: any = async () => {
        let location: Location = await getLocationPromise
        let center = {
            lat: location.lat,
            lng: location.lng
        }
        return center
    }

    const cityLocator = async (latLng: Location) => {
        const lat = latLng.lat
        const lng = latLng.lng
        const reverseGeoCodeApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        const cityInformation = await fetch(reverseGeoCodeApi)
        const locationInfo = await cityInformation.json()
        let city: string | null = null
        locationInfo.results[0].address_components.forEach(function (element: any) {
            if (element.types[0] === 'postal_town') {
                city = element.long_name
                return
            }
            else if (element.types[0] == 'locality' && element.types[1] == 'political') {
                city = element.long_name
                return
            }
        })

        if (!city) {
            console.error('City name not found')
            alert('Unable to locate your city!')
        }
     
        return  city
    }

    const userLatLng = await center()
    const userCity = await cityLocator(userLatLng)

    return { lat: userLatLng.lat, lng: userLatLng.lng, city: userCity }

}

export default FindLocation
