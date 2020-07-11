
module.exports = function(sequelize, DataTypes) {
    const StationComment = sequelize.define("StationComment", {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type:DataTypes.INTEGER,
            allowNull: false,
            min: 1,
            max: 5
        }
    }, 
    {   
        timestamps: true,
        updatedAt: false 
    });

    // Associations
    StationComment.associate = function(models) {
 
        StationComment.belongsTo(models.BixiStation, {
            allowNull: false,
            onDelete: 'CASCADE'
        });

        StationComment.belongsTo(models.User, {
            allowNull: false,
            onDelete: 'CASCADE'
        });
    }

    return StationComment;
};