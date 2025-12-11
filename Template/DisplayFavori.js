// Template/DisplayFavori.js
import { TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import commonStyles from './commonStyles';

import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({name: 'favorites.db', location: 'default'});




export const DisplayFavori = ({ infinitive, variety, dist }) => {
    const [isFavorite, setIsFavorite] = useState(null);

      const checkIfFavoriteExists = (verb, dist, variant, callback) => {
        db.transaction((tx) => {
          // Étape 1: Vérifier si la table existe et la créer si nécessaire
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, verb TEXT, dist TEXT, variant TEXT)',
            [],
            () => {
              // Étape 2: Vérifier si l'enregistrement existe
              tx.executeSql(
                'SELECT * FROM favorites WHERE verb = ? AND dist = ? AND variant = ?',
                [verb, dist, variant],
                (tx, results) => {
                  if (results.rows.length > 0) {
                    // L'enregistrement existe
                    callback(true);
                  } else {
                    // L'enregistrement n'existe pas
                    callback(false);
                  }
                },
                (tx, error) => {
                  console.error('Erreur lors de la vérification de l\'enregistrement :', error);
                  callback(false);
                }
              );
            },
            (tx, error) => {
              console.error('Erreur lors de la création de la table :', error);
              callback(false);
            }
          );
        });
      };

      useEffect(() => {
          if (!infinitive || !variety) return;
        console.log('useEffect')
        console.log(infinitive)
          console.log(dist)
          console.log(variety)
        checkIfFavoriteExists(infinitive, dist, variety, (exists) => {
            console.log('check')
            console.log(infinitive)
              console.log(dist)
              console.log(variety)
            console.log('exists')
            console.log(exists)
          setIsFavorite(exists);
        });
      }, [infinitive, dist, variety]);

      const addToFavorites = (verb, dist, variant) => {
          console.log('ajout aux favoris de ' + verb + ' "' + dist + '" ' + variant )
          db.transaction((tx) => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, verb TEXT, dist TEXT, variant TEXT)',
              [],
              () => {
                tx.executeSql(
                  'INSERT INTO favorites (verb, dist, variant) VALUES (?, ?, ?)',
                  [verb, dist, variant],
                  () => {
                    console.log('Favori ajouté avec succès.');
                  },
                  (tx, error) => {
                    console.error('Erreur lors de la suppression du favori :', error);
                  }
                );
              }
            );
          });
          setIsFavorite(true)
        };
    
      const deleteFromFavorites = (verb, dist, variant) => {
        console.log('suppression favoris de ' + verb + ' "' + dist + '" ' + variant )
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM favorites WHERE verb = ? AND dist = ? AND variant = ?',
            [verb, dist, variant],
            () => {
              console.log('Favori supprimé avec succès.');
            },
            (tx, error) => {
              console.error('Erreur lors de la suppression du favori :', error);
            }
          );
        });
        setIsFavorite(false)
      };
    
        if (isFavorite == true) {
          return (
            <TouchableOpacity style={commonStyles.fav_button} onPress={() => deleteFromFavorites(infinitive, dist, variety)}>
                  <Image
                    key={isFavorite ? 'full' : 'empty'}
                    style={commonStyles.fav_picture}
                    source={isFavorite
                      ? require('../Images/favfull.png')
                      : require('../Images/favempty.png')
                    }
                  />
            </TouchableOpacity>
          )
        } else {
          return (
            <TouchableOpacity style={commonStyles.fav_button} onPress={() => addToFavorites(infinitive, dist, variety)}>
                  <Image
                    key={isFavorite ? 'full' : 'empty'}
                    style={commonStyles.fav_picture}
                    source={isFavorite
                      ? require('../Images/favfull.png')
                      : require('../Images/favempty.png')
                    }
                  />
            </TouchableOpacity>
          )
        }
      
};
