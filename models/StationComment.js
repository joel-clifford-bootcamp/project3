
module.exports = function(sequelize, DataTypes) {
    const StationComment = sequelize.define("StationComment", {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
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