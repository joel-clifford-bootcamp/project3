
module.exports = function(sequelize, DataTypes) {
    const BikeParking = sequelize.define("BikeParking", {
        // Unique identifier - Corresponds to 'number' field or JSON object from API call
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        // Name (address) of station
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.FLOAT(11),
            allowNull: false
        },
        lng: {
            type: DataTypes.FLOAT(11),
            allowNull: false
        },
        // Total capacity (calculated as bikes + free)
        capacity: {
            type: DataTypes.INTEGER
        }
    });

    // Associations
    BikeParking.associate = function(models) {
        BikeParking.belongsTo(models.BikeParkingType, {
            foreigKey: {
                allowNull: true
            }
        });
    }

    BikeParking.associate = function(models) {
        BikeParking.belongsTo(models.BikeParkingStatus, {
            foreigKey: {
                nullable: true
            }
        });
    }

    return BikeParking;
};
