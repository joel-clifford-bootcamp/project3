const https = require("https");
const packagesInfo = require("./maps/BicycleParking.json");
const db = require('../../models');
const updateTables = require('../import/updateTables');

// promise to retrieve the package
const getPackage = packageId => new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`, (response) => {
        let dataChunks = [];
        response
            .on("data", (chunk) => {
                dataChunks.push(chunk)
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks)
                resolve(JSON.parse(data.toString())["result"])
            })
            .on("error", (error) => {
                reject(error)
            })
    });
});

// since this package has resources in the datastore, one can get the data rather than just the metadata of the resources
// promise to retrieve data of a datastore resource 
const getDatastoreResource = (resource) => new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource["id"]}`, (response) => {
        let dataChunks = [];

        response
            .on("data", (chunk) => {
                dataChunks.push(chunk)
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks)
                const jsonData = JSON.parse(data.toString())["result"]["records"];
                resolve({
                    map: resource._modelMap,
                    data: jsonData
                });
            })
            .on("error", (error) => {
                reject(error)
            })
    })
});


/**
 * Check if a package's revision does not match there revision stored in database
 * @param {object} package package metadata returned by server 
 * @param {array} packagesLastUpdated array of package metadata from db 
 */
const packageNeedsUpdate = (package, packagesLastUpdated) => {

    const currentPackage = packagesLastUpdated.filter(pkg => pkg.packageId === package.packageId)   

    if(currentPackage.length === 0)
        return true;

    return currentPackage.revisionId != package.revision_id;

}

/**
 * Add model field mapping to each resource in a package
 * @param {object} package Package to wich maping will be added
 */
const addMap = (package) => {

    const currentPackageInfo = packagesInfo.filter(pkg => pkg.packageId === package.id)[0];

    package.resources.forEach(res => {
        res["_modelMap"] = currentPackageInfo["mapping"];
    });
}

module.exports = _ => {
    Promise.all(packagesInfo.map(pkg => getPackage(pkg.packageId)))
    .then(allPackages => {

        db.BicycleParkingMetaData.findAll( { attributes: [ "packageId", "revisionId" ] } )
        .then(packagesLastUpdated => {

            allPackages.forEach(pkg => addMap(pkg));

            const resourcesNeedingUpdate = allPackages
                .filter(pkg => packageNeedsUpdate(pkg, packagesLastUpdated))
                .map(pkg => pkg["resources"][0])
                .filter(resource => resource.datastore_active);

            Promise.all(resourcesNeedingUpdate.map(resource => getDatastoreResource(resource, )))
            .then(updatedResources => {

                console.log(updatedResources[1].map);
                // Promise.all(updatedResources.map(updatedResource => update));
            })
            .catch(err => reject(err));

            // Promise.all(packagesNeedingUpdate.map(package => { console.log(package.resources[0]); getDatastoreResource(package["resources"][0]);}))
            // .then(updatedPackages => {
            //     console.log(updatedPackages.length)
            // });
        });
    });
};
    // Promise.all()kg => {
    //     getPackage(pkg.packageId)
    //     .then(metadata => {

    //         db.BikeParkingMetaData
    //         .findAll( { where: { packageId: metadata.id } } )
    //         .then( result => {  

    //             if(result.revisionId != metadata.revision_id){
    //                 let datastoreResources = metadata["resources"].filter(r => r.datastore_active);

    //                 // retrieve the first datastore resource as an example
    //                 getDatastoreResource(datastoreResources[0])
    //                 .then(async resource => {
    //                     console.log(db[pkg.model])
    //                     // this is the actual data of the resource
    //                     updateTables(db[pkg.model], resource);
    //                 })
    //                 .catch(error => console.log(error));
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     });
    // });
