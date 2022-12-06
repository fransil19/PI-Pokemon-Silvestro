const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      initialAutoIncrement: 1000,
    },
    name: {
      type: DataTypes.STRING(200),
      validate: {
        notNull: true,
        notEmpty: true,
      },
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      }
    },
    frontSprite: {
      type: DataTypes.STRING(300),
      validate: {
        isUrl: true,
      },
      allowNull: true,
      field: 'front_sprite'
    },
    backSprite: {
      type: DataTypes.STRING(300),
      validate: {
        isUrl: true,
      },
      allowNull: true,
      field: 'back_sprite'
    },
  });
};
