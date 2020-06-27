const StationComment = require("./StationComment");

module.exports = function(sequelize, DataTypes) {
    const BixiStation = sequelize.define("BixiStation", {
        // Unique identifier - Corresponds to 'number' field or JSON object from API call
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        // Index of object in array of stations returned by API call - used for locating object faster 
        idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lng: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER
        }
    });

    return BixiStation;
};