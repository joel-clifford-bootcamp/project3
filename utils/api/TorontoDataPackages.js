const https = require("https");
let packageId = "";

// promise to retrieve the package
const getPackage = new Promise((resolve, reject) => {
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

/**
 * Retrieve metadata for Toronto Open Data resource specified by package ID
 * @param {string} pkgId Package identifier
 * @param {function} successCb Callback on success
 * @param {function} errorCb Callback on error
 */
const getPackageInfo = (pkgId, successCb, errorCb) => {
    
    packageId = pkgId;

    getPackage.then(pkg => {
        // this is the metadata of the package
        successCb(pkg);
    }).catch(error => {
        if(errorCb)
            errorCb(pkg)
        else
            console.error(error);
    })
};

/**
 * Retrieve data from Toronto Open Data resource specified by package ID
 * @param {string} pkgId Package identifier
 * @param {function} successCb Callback on success
 * @param {function} errorCb Callback on failure
 */
const getPackageData = (pkgId, successCb, errorCb) => {

    packageId = pkgId;

    getPackage.then(package => {
        // get the datastore resources for the package
        let datastoreResources = package["resources"].filter(r => r.datastore_active);

    // retrieve the first datastore resource as an example
    getDatastoreResource(datastoreResources[0])
        .then(resource => {
            // this is the actual data of the resource
            successCb(resource);
        })
        .catch(error => {
            if(errorCb)
                errorCb(error)
            else
                console.errors(error);
        })
    }).catch(error => {
        if (errorCb)
            errorCb(error);
        else
            console.error(error);
    });
};


module.exports = [ getPackageInfo, getPackageData ];