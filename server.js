import express from 'express';
import Television from './models/Task.js';

const app = express();  // Déclaration de 'app' ici

app.use(express.static('C:/Users/Van Belle Arthur/OneDrive - ECAM/Documents/Passerelle/Techno_Web/LW3L-orm/display'));
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
    const wishlist = await Television.loadMany({ bought: 0 });
    const possessList = await Television.loadMany({ bought: 1 });
    const totalAmount = possessList.reduce((accumulator, currentValue) => accumulator + currentValue.Price, 0);
    console.log(totalAmount);
    res.render('listeTelevisions.ejs', { wishlist, possessList, totalAmount });
});

app.post('/update-tele', async (req, res) => {
    const televisionId = req.body.televisionId;
  
    // Appel de la fonction updateTele pour effectuer la mise à jour côté serveur
    await updateTele(televisionId);
  
    res.send('Mise à jour réussie');
  });
  
  // ... Autres routes et configurations ...
  
  // Fonction pour effectuer la mise à jour côté serveur
  async function updateTele(televisionId) {
    const setValues = { bought: 0 };
    const whereCondition = { id: televisionId }; 
  
    await query('UPDATE televisions.television', setValues, whereCondition);
    console.log('REMOVE FROM LIST');
  }

app.listen(4000, () => {
    console.log('Serveur en cours d\'écoute sur le port 4000');
});
