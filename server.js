const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

app.use(express.json());

mongoose.connect('mongodb+srv://lkode:lkode%402002@assignment8.7xpuw.mongodb.net/Budget?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const budgetSchema = new mongoose.Schema({
    title: String,
    budget: Number,
    color: String,
});

const Budget = mongoose.model('Budget', budgetSchema);

app.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json({ mybudget: budgets });
    } catch (error) {
        res.status(500).send('Error fetching budget data');
    }
});

app.post('/budget', async (req, res) => {
    const { title, budget , color} = req.body;

    if (!title || !budget || !color) {
        return res.status(400).send('Title, budget and color are required');
    }

    const newBudget = new Budget({ title, budget, color });

    try {
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        res.status(500).send('Error adding budget item');
    }
});

app.use('/', express.static('public'));

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
