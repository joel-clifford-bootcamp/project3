const https = require("https");
const packageInfo = require("./data-packages.json");
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
const getDatastoreResource = resource => new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource["id"]}`, (response) => {
        let dataChunks = [];

        response
            .on("data", (chunk) => {
                dataChunks.push(chunk)
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks)
                resolve(JSON.parse(data.toString())["result"]["records"])
            })
            .on("error", (error) => {
                reject(error)
            })
    })
});

const updatePackages = datastoreResource => new Promise((resolve, reject) => {

    


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

module.exports = function() {

    Promise.all(packageInfo.map(pkg => getPackage(pkg.packageId))).then(allPackages => {

        db.BikeParkingMetaData.findAll( { attributes: [ "packageId", "revisionId" ] } ).then(packagesLastUpdated => {

        const packagesNeedingUpdate = allPackages.filter(pkg => packageNeedsUpdate(pkg, packagesLastUpdated));

        const updatedPackages = Promise.all()

        console.log(packagesNeedingUpdate);
    });
});
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
};