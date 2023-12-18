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
    res.render('listeTelevisions.ejs', { possessList, wishlist, totalAmount });
});

app.get("/buy/:id", async function (req, res) {
  
    const tv = await Television.load({ id: req.params.id });
    tv.Bought = 1;
    tv.save();
    res.redirect('/');
});

app.get("/destroy/:id", async function (req, res) {
  
  const tv = await Television.load({ id: req.params.id });
  tv.ETAT = "DESTROY";
  tv.save();
  res.redirect('/');
});

app.post('/add', async (req, res)=>{
  const { Model, Price, Size } = req.body;
  const tv = new Television();

  tv.update({Model,Price: parseFloat(Price),Size: parseInt(Size), Etat : "OK", Bought : "0",});

  await tv.save();
  res.redirect('/');


})

app.listen(4000, () => {
    console.log('Serveur en cours d\'écoute sur le port 4000');
});
