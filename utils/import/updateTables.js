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
 * @param {type} modelType sequelize model type
 * @param {array} updatedObjects objects returned by api call 
 */
const addNewObjects = async (modelType, newData) => {
    
    const objArray = [];

    for(i = 0; i < newData.length; i++){

        const fields = {}

        Object.keys(map).forEach( k => {
            fields[k] = getUpdatedValue(newData[i], map[k]);
        });

        objArray.push(fields);
    }

    await modelType.bulkCreate(objArray);
};

const flagMissingObjects = (modelType) => {
    return true;
}

/**
 * Iterate over data array backwards. If data id field matches that of an existing object, update that object if needed and 
 * remove it from the data array. After checking all objects, those that remain in array are saved to new model objects 
 * @param {type} modelType sequelized model type
 * @param {Array} updatedData array of updated data 
 */
const updateExistingObjects = async (modelType, updatedData) => {
    
    try{
        for(let i = updatedData.length - 1; i >= 0; i--){
            
            let currentItem = updatedData[i];
            let currentItemId = currentItem[map["id"]];
            let existingObject = await modelType.findAll( { where: { id: currentItemId} });

            if(existingObject.length === 1 ){
                await updateIfNeeded(existingObject, updatedData);
                updatedData.splice(i, 1);
            }

        }
        
        await addNewObjects(modelType, updatedData);    
        
        return null;
    }
    catch(err)
    {
        return err;
    }
}

/**
 * Update database table to reflect latest dataset passed by api
 * @param {type} objectName type of object to be updated
 * @param {array} updatedObjects  set of objects returned by api
 */
module.exports = async function(modelType, updatedData){
    map = require('./objectMaps.json')[modelType.name];

    // await modelType.destroy({truncate: {cascade: true }});
    const err = await updateExistingObjects(modelType, updatedData);

    if(err) 
        console.log(err)
    else{
        await flagMissingObjects(modelType);
    }

}