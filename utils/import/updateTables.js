const db = require('../../models');
const log = console.log;
const styles = require('../loggingStyles');

/**
 * Get foreign key for passed params
 * @param {*} param0 
 */
const getForeignKey = ( { referenceModelType, keyColumn, valueColumn, value} ) => new Promise((resolve, reject) => {

        db.sequelize
        .query( `SELECT ${keyColumn} FROM ${ db[referenceModelType] } WHERE ${valueColumn} = ?`, {
            model: db[referenceModelType],
            replacements: [value],
            types: db.sequelize.QueryTypes.SELECT
        })
        .then(result => {
            if(result.length > 0)
                resolve(projects[0][keyColumn]);
            else {
                reject("Item not found");
            }
    })
});

/**
 * Calculate a fields value using the supplied params
 * @param {object} updatedObject object returned by api call 
 * @param {object} calcDetails calculation parameters 
 */
const calculateField = (updatedObject, calcDetails) => new Promise((resolve, reject) => {

    switch(calcDetails.func){
        case "sum":
            resolve(calcDetails.args.reduce((a,b) => updatedObject[a] + updatedObject[b]));
        case "concat":
            resolve(calcDetails.args.map(arg => updatedObject[arg]).join(' '));
        case "foreignKey":
            resolve(1);
        // return await getForeignKey(calcDetails);
    }
});

/**
 * Get either the field value, or result of a calculation basedon several field value, from an object returned
 * by and api; based on the map provided
 * @param {object} updatedObject updated object
 * @param {string} propertyName property name in map 
 */
const getUpdatedValue = (map, updatedObject, propertyName) => new Promise((resolve, reject) => {

    if(typeof map[propertyName] === 'string')
        resolve( [propertyName, updatedObject[map[propertyName]]]); 
    else if (typeof map[propertyName] === 'object') {
        calculateField(updatedObject, map[propertyName])
        .then(value =>  resolve( [propertyName, value]))
        .catch(err => reject(err));}
});

const getUpdatedValues = (map, updatedObject) => new Promise((resolve, reject) => {

    const properties = Object.keys(map)
    
    Promise.all(properties.map(prop => getUpdatedValue(map, updatedObject, prop)))
    .then(results => resolve(results))
    .catch(err => reject(err));
});

/**
 * If any model instance properties in map differ from their up-to-date counterpart from
 * the api call, update them nad save the updated object
 * @param {object} map mapping of mdoel properties to object properties
 * @param {object} existingObject instance of model object 
 * @param {object} updatedObject instance's counterpart in new api data
 */
const updateSingleObject = (map, modelType, existingObjects, updatedObject) => new Promise((resolve, reject) => {
    let propertyUpdateCount = 0;

    // First property of map must represent the unique identfier of each record in data set
    const keyProperty = Object.getOwnPropertyNames(map)[0];
    const keyValueProperty = map[keyProperty]

    let existingObject = existingObjects.filter(obj => obj[keyProperty] === updatedObject[keyValueProperty]);

    // if there is an existing object that corresponds to updated object, compare and updated if needed
    if(existingObjects.length > 0){
        existingObject = existingObject[0];

        getUpdatedValues(map, updatedObject)
        .then(updatedValues => {

            updatedValues.forEach(([key, updatedValue]) => {

                if(existingObject[key] != updatedValue) {
                    existingObject[key] = updatedValue;
                    propertyUpdateCount++;
                } 

                // if any properties needed updating, save updated existing object
                if(propertyUpdateCount > 0) {
                    existingObject
                    .save()
                    .then(result => resolve(result))
                    .catch(err => reject(err));
                    setTimeout(function2, 100);
                }
                else
                    resolve();
            });
        })
        .catch(err => reject(err));
    }
    // if no corresponding existing object, create new instance
    else
        addNewObject(map, modelType, updatedObject)
        .then(result => resolve(result))
        .catch(err => reject(err));
});

/**
 * 
 * @param {*} map 
 * @param {*} modelType 
 * @param {*} existingObjects 
 * @param {*} updatedObjects 
 */
const updateExistingObjects = (map, modelType, existingObjects, updatedObjects) => new Promise((resolve, reject) => {

    Promise.all(updatedObjects.map(updatedObj => updateSingleObject(map, modelType, existingObjects, updatedObj)))
    .then(result => resolve(result))
    .catch(err => reject(err));
});

/**
 * Bulk add all items in array
 * @param {type} modelType sequelize model type
 * @param {array} updatedObjects objects returned by api call 
 */
const addNewObject = (map, modelType, updatedObject) => new Promise((resolve, reject) => {
    
    getUpdatedValues(map, updatedObject)
    .then(data => {

        const fields = {};
        data.forEach(([key, value]) => { fields[key] = value; });
       
        setTimeout(function2, 100);

        modelType.create(fields)
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
    .catch(err => reject(err));
});


const setMissingObjectsAsInactive = (missingFromUpdatedDate) => new Promise((resolve, reject) => {
    resolve();
});


const printRecordCount = (message, count) => {
    log(message + styles.number(count));
}


/**
 * Update database table to reflect latest dataset passed by api
 * @param {type} objectName type of object to be updated
 * @param {array} updatedObjects  set of objects returned by api
 */
module.exports = (map, modelType, updatedData) => new Promise((resolve, reject) => {
    
    modelType.findAll()
    .then(existingData => {

        // First property of map must represent the unique identfier of each record in data set
        const keyProperty = Object.getOwnPropertyNames(map)[0];
        const keyValueProperty = map[keyProperty]

        // generate arrays of ids from new data and existing data
        const updatedDataIds = updatedData.map(data => data[keyValueProperty]);
        const existingDataIds = existingData.map(data => data.id);

        // database records that have corresponding object in updated data - to be compared and updated if needed 
        const existingDataToUpdate = existingData.filter(data => updatedDataIds.includes(data.id));
        
        // database records that no longer have corresponding objects in updated data - to be marked as inactive
        const missingfromUpdatedData = existingData.filter(data => !updatedDataIds.includes(data.id));
        
        // updated data objects that do not have a corresponding record in database - new records to be created
        const updatedDataToAdd = updatedData.filter(data => !existingDataIds.includes(data[keyValueProperty]));

        log(" ")
        log(styles.title(`updating model '${modelType.name}'`));
        printRecordCount(" existing data count:       ", existingDataIds.length);
        printRecordCount(" updated data count:        ", updatedDataIds.length);
        printRecordCount(" existing data to update:   ", existingDataToUpdate.length);
        printRecordCount(" existing data to remove:   ", missingfromUpdatedData.length);
        printRecordCount(" data to add:               ", updatedDataToAdd.length);

        updateExistingObjects(map, modelType, existingData, updatedData)
        .then(data => {
            setMissingObjectsAsInactive().then( flagResult => resolve("table update complete"))
            .catch(err => reject(err))
        })
        .catch(err => reject(err));

    })
    .catch(err => reject(err));

});