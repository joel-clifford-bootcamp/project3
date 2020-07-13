module.exports = function(sequelize, DataTypes) {
    const BicycleParkingType = sequelize.define("BicycleParkingType", {
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        }
    });

    // // Associations
    // BikeParkingType.associate = function(models){
    //     BikeParkingType.hasMany(models.BikeParking);
    // };

    return BicycleParkingType;
};