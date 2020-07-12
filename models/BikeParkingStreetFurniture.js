
module.exports = function(sequelize, DataTypes) {
    const BikeParkingStreetFurniture = sequelize.define("BikeParkingStreetFurniture", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        streetNumber: {
            type: DataTypes.STRING
        },     
        street: {
            type: DataTypes.STRING
        },     
        type: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.DECIMAL(9,6),
            // allowNull: false
        },
        lng:  {
            type: DataTypes.DECIMAL(9,6),
            // allowNull: false
        },
        geometry: {
            type: DataTypes.GEOMETRY
        }
    });

    return BikeParkingStreetFurniture;
};
