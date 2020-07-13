const https = require("https");
const packagesInfo = require("./maps/BicycleParking.json");
const db = require('../../models');
const updateTables = require('../import/updateTables');
const { promises } = require("fs");
const { resolve } = require("path");

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

                Promise.updateTables(updatedResources.map(res => updateTables(res.map, db.BicycleParking, res.data)))
                .then(results => resolve(results))
                .catch(err => err);
            })
            .catch(err => err);
        });
    });
};
