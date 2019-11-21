/**
 * 
 * @param { object } longLat 
 * Parses out the longitude and latitude of the station destination
 * to be able to use with eventbrite and returns an object with
 * the longitude and latitude
 * 
 */
let manageLongLat = ( longLat ) => {
    let longData = longLat.data.root.stations.station.gtfs_longitude
    let latData = longLat.data.root.stations.station.gtfs_latitude

    return {
        longitude: longData,
        latitude: latData
    }
}

module.exports.manageLongLat = manageLongLat;