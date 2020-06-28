// map of model object's property names to corresponding api object property names 
let map;

/**
 * Calculate a fields value using the supplied params
 * @param {object} updatedObject object returned by api call 
 * @param {object} calcDetails calculation parameters 
 */
const calculateField = (updatedObject, calcDetails) => {
    switch(calcDetails.func){
        case "sum":
            return calcDetails.args.reduce((a,b) => updatedObject[a] + updatedObject[b]);
    }
};

const getUpdatedValue = (updatedObject, property) => {
    if(typeof property === 'string')
        return updatedObject[property]; 
    else if (typeof property === 'object')
        return calculateField(updatedObject, property);
};

/**
 * If any model instance properties in map differ from their up-to-date counterpart from
 * the api call, update them nad save the updated object
 * @param {object} existingObject instance of model object 
 * @param {object} updatedObject instance's counterpart in new api data
 */
const updateIfNeeded = async (existingObject, updatedObject) => {
    let propertyUpdateCount = 0;

    Object.keys(map).forEach(k => {
       if(existingObject[k] != updatedObject[map[k]]) {
           console.log(`${k}: ${existingObject[k]} != ${updatedObject[map[k]]}`)
           existingObject[k] = updatedObject[map[k]];
           propertyUpdateCount++;
       }
    });

    if(propertyUpdateCount > 0) await existingObject.save();
}

/**
 * Bulk add all items in array
 * @param {type} modelType derived model class 
 * @param {array} updatedObjects objects returned by api call 
 */
const addNewObjects = async (modelType, updatedObjects) => {
    
    const objArray = [];

    for(i = 0; i < updatedObjects.length; i++){

        const fields = {}

        Object.keys(map).forEach( k => {
            fields[k] = getUpdatedValue(updatedObjects[i], map[k]);
        });

        objArray.push(fields);
    }

    await modelType.bulkCreate(objArray);
};

/**
 * Iterate over existingObjects, if updatedObjects contains an object with a matching id, 
 * check if the existing object's properties match the up-to-date object's. If the id cannot
 * be found in the updated list, delete it. Remove object from updated objects list
 * @param {array} existingObjects all intances of model object contained in db
 * @param {array} updatedObjects all objects returned by api
 */
const checkExistingObjects = async (existingObjects, updatedObjects)  => {
    
    for(i = existingObjects.length - 1; i >= 0; i--){

        var updatedObject = updatedObjects.find(obj => obj[map["id"]] === existingObjects[i].id);

        if(typeof updatedObject != "undefined"){
            await updateIfNeeded(existingObjects[i], updatedObject);
        }
        else{
            console.log('remove object');
            await existingObjects[i].destroy();
        }

        updatedObjects.splice(i, 1)
        console.log(updatedObjects.length)
    }   
}

/**
 * Update database table to reflect latest dataset passed by api
 * @param {type} objectName type of object to be updated
 * @param {array} updatedObjects  set of objects returned by api
 */
module.exports = async function(modelType, updatedObjects){
    map = require('./maps.json')[modelType.name];

    await modelType.destroy({truncate: true});

    await addNewObjects(modelType, updatedObjects);
}